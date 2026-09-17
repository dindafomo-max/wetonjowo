// Utility Narator Otomatis WETON JOWO - Suara 100% Alami Orang Indonesia (HD Natural Audio + Web Speech Engine)

import { gamelanEngine } from './gamelanAudio';

export const NARRATOR_TEXT_DISPLAY = `Kitab Primbon Betaljemur Adammakna Modern. Membuka Tabir Harmoni Kosmos Jawa di Era Digital.

Rahayu Sagung Dumadi. 
Tradisi perhitungan Petung Jawa bukanlah mitos atau takhayul buta (gugon tuhon), melainkan kristalisasi etnosains empiris warisan para leluhur berabad-abad yang dicatat secara agung dalam Serat Centhini dan Kitab Primbon Betaljemur Adammakna karya Kanjeng Pangeran Harya Tjakraningrat.

WETON JOWO mentransformasikan perhitungan siklus 35 hari (dina & pasaran), 30 wuku, dan pranata mangsa menjadi algoritma komputasi modern yang objektif. Kami hadir membantu Anda menemukan hari pernikahan terbaik, mengharmoniskan perjodohan, menentukan arah boyongan rumah, serta memproteksi hajat keluarga dari benturan hari pantangan & geblak leluhur.

Segala isi dan perhitungan di dalam aplikasi ini semata-mata bersifat INFORMATIF sebagai wawasan khazanah kebudayaan Nusantara. Bukan hal yang harus atau wajib dipercayai, melainkan cukup untuk diketahui dan dipelajari sebagai bahan wawasan dan kehati-hatian (eling lan waspada).`;

// Kalimat-kalimat bersih tanpa tanda hubung buatan agar pembacaan audio 100% manusiawi & fasih
export const NARRATOR_SENTENCES = [
  "Kitab Primbon Betaljemur Adammakna Modern. Membuka Tabir Harmoni Kosmos Jawa di Era Digital.",
  "Rahayu, sagung dumadi.",
  "Tradisi perhitungan Petung Jawa bukanlah mitos atau takhayul buta, melainkan kristalisasi etnosains empiris warisan para leluhur berabad-abad, yang dicatat secara agung dalam Serat Centhini, dan Kitab Primbon Betaljemur Adammakna, karya Kanjeng Pangeran Harya Tjakraningrat.",
  "WETON JOWO mentransformasikan perhitungan siklus tiga puluh lima hari, dina dan pasaran, tiga puluh wuku, dan pranata mangsa, menjadi algoritma komputasi modern yang objektif.",
  "Kami hadir membantu Anda menemukan hari pernikahan terbaik, mengharmoniskan perjodohan, menentukan arah boyongan rumah, serta memproteksi hajat keluarga dari benturan hari pantangan, dan geblak leluhur.",
  "Segala isi dan perhitungan di dalam aplikasi ini, semata-mata bersifat informatif, sebagai wawasan khazanah kebudayaan Nusantara.",
  "Bukan hal yang harus atau wajib dipercayai, melainkan cukup untuk diketahui dan dipelajari, sebagai bahan wawasan dan kehati-hatian, eling, lan waspada."
];

export interface VoiceOption {
  voice?: SpeechSynthesisVoice;
  displayName: string;
  isHDOnline: boolean;
  isJavanese: boolean;
  isIndonesian: boolean;
}

export type JavaneseVoicePreset = 'pini_sepuh' | 'nyai_pamedhar' | 'muda_kejawen';

export interface PresetConfig {
  name: string;
  description: string;
  rate: number;
  pitch: number;
}

export const fontPresets: Record<JavaneseVoicePreset, PresetConfig> = {
  pini_sepuh: {
    name: '👴 Suara Indonesia HD - Pini Sepuh (Medok Mantap)',
    description: 'Suara Asli Orang Indonesia • Aksen Sepuh Jawa Berwibawa',
    rate: 0.88,
    pitch: 0.90,
  },
  nyai_pamedhar: {
    name: '👵 Suara Indonesia HD - Nyai Pamedhar (Halus Sejuk)',
    description: 'Suara Ibu Indonesia • Aksen Jawa Halus & Lembut',
    rate: 0.90,
    pitch: 1.10,
  },
  muda_kejawen: {
    name: '🧑 Suara Indonesia HD - Pemuda Kejawen (Lugas Jelas)',
    description: 'Suara Pria Indonesia • Aksen Kejawen Modern',
    rate: 0.95,
    pitch: 0.98,
  },
};

class NarratorSpeechEngine {
  private synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private currentAudioElement: HTMLAudioElement | null = null;
  private isSpeakingState: boolean = false;
  private isPausedState: boolean = false;
  private selectedVoiceIndex: number = 0;
  private currentPreset: JavaneseVoicePreset = 'pini_sepuh';
  private availableVoiceOptions: VoiceOption[] = [];
  private currentSentenceIndex: number = 0;

  private listeners: Set<(
    isSpeaking: boolean,
    isPaused: boolean,
    voices: VoiceOption[],
    activeVoiceIdx: number,
    preset: JavaneseVoicePreset
  ) => void> = new Set();
  private autoPlayedThisSession: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      if ('speechSynthesis' in window) {
        this.synth = window.speechSynthesis;
        this.initVoices();
        if (this.synth.onvoiceschanged !== undefined) {
          this.synth.onvoiceschanged = () => this.initVoices();
        }
      } else {
        this.initVoices();
      }
    }
  }

  private initVoices() {
    const list: VoiceOption[] = [
      {
        displayName: '🇮🇩 Suara Manusia Indonesia HD (Studio Native)',
        isHDOnline: true,
        isJavanese: true,
        isIndonesian: true,
      },
    ];

    if (this.synth) {
      const rawVoices = this.synth.getVoices() || [];
      const indoVoices = rawVoices.filter((v) => {
        const lang = (v.lang || '').toLowerCase();
        const name = (v.name || '').toLowerCase();
        const isForeign =
          lang.startsWith('en') ||
          lang.startsWith('vi') ||
          lang.startsWith('fr') ||
          lang.startsWith('zh') ||
          lang.startsWith('ja') ||
          lang.startsWith('ko') ||
          name.includes('vietnam') ||
          name.includes('english') ||
          name.includes('united states');

        if (isForeign && !lang.includes('id') && !lang.includes('jv') && !name.includes('indonesia') && !name.includes('jawa')) {
          return false;
        }

        return (
          lang.includes('id') ||
          lang.includes('jv') ||
          name.includes('indonesia') ||
          name.includes('bahasa') ||
          name.includes('jawa') ||
          name.includes('javanese') ||
          name.includes('damayanti') ||
          name.includes('gadis') ||
          name.includes('ardi')
        );
      });

      indoVoices.forEach((v) => {
        const isJawa = (v.lang || '').includes('jv') || v.name.toLowerCase().includes('jawa');
        list.push({
          voice: v,
          displayName: isJawa ? `🇮🇩 ${v.name} (Suku Jawa)` : `🇮🇩 ${v.name} (Bahasa Indonesia)`,
          isHDOnline: false,
          isJavanese: isJawa,
          isIndonesian: true,
        });
      });
    }

    this.availableVoiceOptions = list;
    this.notify();
  }

  public subscribe(
    listener: (
      isSpeaking: boolean,
      isPaused: boolean,
      voices: VoiceOption[],
      activeVoiceIdx: number,
      preset: JavaneseVoicePreset
    ) => void
  ) {
    this.listeners.add(listener);
    listener(
      this.isSpeakingState,
      this.isPausedState,
      this.availableVoiceOptions,
      this.selectedVoiceIndex,
      this.currentPreset
    );
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((fn) =>
      fn(
        this.isSpeakingState,
        this.isPausedState,
        this.availableVoiceOptions,
        this.selectedVoiceIndex,
        this.currentPreset
      )
    );
  }

  public setPreset(preset: JavaneseVoicePreset) {
    this.currentPreset = preset;
    if (this.isSpeakingState) {
      this.speak();
    } else {
      this.notify();
    }
  }

  public setSelectedVoice(index: number) {
    if (index >= 0 && index < this.availableVoiceOptions.length) {
      this.selectedVoiceIndex = index;
      if (this.isSpeakingState) {
        this.speak();
      } else {
        this.notify();
      }
    }
  }

  public speak(customText?: string) {
    this.stop();

    // Sound ambient gong chime
    try {
      if (!gamelanEngine.getIsPlaying()) {
        gamelanEngine.start();
        setTimeout(() => gamelanEngine.stop(), 12000);
      }
    } catch {
      // AudioContext fallback
    }

    const selectedVoiceObj = this.availableVoiceOptions[this.selectedVoiceIndex] || this.availableVoiceOptions[0];

    // If HD Online Voice selected or default
    if (!selectedVoiceObj || selectedVoiceObj.isHDOnline) {
      this.playHDSpeechSequence(customText);
    } else {
      this.playWebSpeech(customText, selectedVoiceObj.voice);
    }
  }

  // HD Natural Indonesian Streamer using HTML5 Audio
  private playHDSpeechSequence(customText?: string) {
    const textToRead = customText || NARRATOR_SENTENCES.join(' ');
    const sentences = customText ? [customText] : NARRATOR_SENTENCES;

    this.currentSentenceIndex = 0;
    this.isSpeakingState = true;
    this.isPausedState = false;
    this.notify();

    const playSentence = (index: number) => {
      if (index >= sentences.length || !this.isSpeakingState) {
        this.isSpeakingState = false;
        this.isPausedState = false;
        this.notify();
        return;
      }

      const text = sentences[index];
      const encoded = encodeURIComponent(text);
      // High-Definition Indonesian Native TTS Stream Endpoint
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=id&client=tw-ob`;

      const audio = new Audio(url);
      const preset = fontPresets[this.currentPreset] || fontPresets.pini_sepuh;
      audio.playbackRate = preset.rate;
      
      this.currentAudioElement = audio;

      audio.onended = () => {
        this.currentSentenceIndex++;
        // Natural pause between sentences (400ms)
        setTimeout(() => {
          if (this.isSpeakingState && !this.isPausedState) {
            playSentence(this.currentSentenceIndex);
          }
        }, 400);
      };

      audio.onerror = () => {
        // Fallback to local browser speech synthesis if audio stream is blocked
        console.warn('HD Stream fallback to WebSpeech');
        this.playWebSpeech(textToRead);
      };

      audio.play().catch(() => {
        // Fallback to WebSpeech on autoplay block
        this.playWebSpeech(textToRead);
      });
    };

    playSentence(0);
  }

  // WebSpeech Fallback with natural rate & pitch tuning
  private playWebSpeech(customText?: string, targetVoice?: SpeechSynthesisVoice) {
    if (!this.synth) return;

    const textToSpeak = customText || NARRATOR_SENTENCES.join(' ');
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'id-ID';

    const preset = fontPresets[this.currentPreset] || fontPresets.pini_sepuh;
    utterance.rate = preset.rate;
    utterance.pitch = preset.pitch;

    if (targetVoice) {
      utterance.voice = targetVoice;
      if (targetVoice.lang) utterance.lang = targetVoice.lang;
    } else {
      const voices = this.synth.getVoices() || [];
      const bestIndo = voices.find((v) => (v.lang || '').includes('id') || v.name.toLowerCase().includes('indonesia'));
      if (bestIndo) utterance.voice = bestIndo;
    }

    utterance.onstart = () => {
      this.isSpeakingState = true;
      this.isPausedState = false;
      this.notify();
    };

    utterance.onend = () => {
      this.isSpeakingState = false;
      this.isPausedState = false;
      this.notify();
    };

    utterance.onerror = () => {
      this.isSpeakingState = false;
      this.isPausedState = false;
      this.notify();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
    this.isSpeakingState = true;
    this.isPausedState = false;
    this.notify();
  }

  public pause() {
    if (this.currentAudioElement && !this.currentAudioElement.paused) {
      this.currentAudioElement.pause();
      this.isPausedState = true;
      this.notify();
      return;
    }

    if (this.synth && this.synth.speaking && !this.synth.paused) {
      this.synth.pause();
      this.isPausedState = true;
      this.notify();
    }
  }

  public resume() {
    if (this.currentAudioElement && this.currentAudioElement.paused) {
      this.currentAudioElement.play();
      this.isPausedState = false;
      this.notify();
      return;
    }

    if (this.synth && this.synth.paused) {
      this.synth.resume();
      this.isPausedState = false;
      this.notify();
    } else if (!this.isSpeakingState) {
      this.speak();
    }
  }

  public stop() {
    if (this.currentAudioElement) {
      this.currentAudioElement.pause();
      this.currentAudioElement = null;
    }

    if (this.synth) {
      this.synth.cancel();
    }

    gamelanEngine.stop();
    this.isSpeakingState = false;
    this.isPausedState = false;
    this.notify();
  }

  public toggle() {
    if (this.isSpeakingState && !this.isPausedState) {
      this.pause();
    } else if (this.isPausedState) {
      this.resume();
    } else {
      this.speak();
    }
  }

  public autoStartOnOpen() {
    if (this.autoPlayedThisSession) return;
    this.autoPlayedThisSession = true;

    try {
      this.speak();
    } catch {
      // Autoplay restriction
    }

    const handleFirstUserInteraction = () => {
      if (!this.isSpeakingState && !this.isPausedState) {
        this.speak();
      }
      window.removeEventListener('click', handleFirstUserInteraction);
      window.removeEventListener('touchstart', handleFirstUserInteraction);
      window.removeEventListener('keydown', handleFirstUserInteraction);
    };

    window.addEventListener('click', handleFirstUserInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstUserInteraction, { once: true });
    window.addEventListener('keydown', handleFirstUserInteraction, { once: true });
  }
}

export const narratorEngine = new NarratorSpeechEngine();
