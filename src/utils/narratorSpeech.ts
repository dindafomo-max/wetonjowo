// Utility Narator Otomatis WETON JOWO menggunakan Web Speech Synthesis API
// Dikhususkan untuk karakter suara logat & intonation Orang Indonesia Suku Jawa (Tenang, Berwibawa, Eling & Waspada)

import { gamelanEngine } from './gamelanAudio';

export const NARRATOR_TEXT_DISPLAY = `Kitab Primbon Betaljemur Adammakna Modern. Membuka Tabir Harmoni Kosmos Jawa di Era Digital.

Rahayu Sagung Dumadi. 
Tradisi perhitungan Petung Jawa bukanlah mitos atau takhayul buta (gugon tuhon), melainkan kristalisasi etnosains empiris warisan para leluhur berabad-abad yang dicatat secara agung dalam Serat Centhini dan Kitab Primbon Betaljemur Adammakna karya Kanjeng Pangeran Harya Tjakraningrat.

WETON JOWO mentransformasikan perhitungan siklus 35 hari (dina & pasaran), 30 wuku, dan pranata mangsa menjadi algoritma komputasi modern yang objektif. Kami hadir membantu Anda menemukan hari pernikahan terbaik, mengharmoniskan perjodohan, menentukan arah boyongan rumah, serta memproteksi hajat keluarga dari benturan hari pantangan & geblak leluhur.

Segala isi dan perhitungan di dalam aplikasi ini semata-mata bersifat INFORMATIF sebagai wawasan khazanah kebudayaan Nusantara. Bukan hal yang harus atau wajib dipercayai, melainkan cukup untuk diketahui dan dipelajari sebagai bahan wawasan dan kehati-hatian (eling lan waspada).`;

// Teks dengan jeda fonetik khusus agar logat & artikulasi aksen Jawa Indonesia teratur dengan baik
export const NARRATOR_TEXT_PHONETIC = `Kitab Primbon Betaljemur Adammakna Modern. Membuka Tabir Harmoni Kosmos Jawa di Era Digital.

Rahayu, sagung dumadi. 

Tradisi perhitungan Petung Jawa, bukanlah mitos atau takhayul buta, gugon tuhon, melainkan kristalisasi etnosains empiris warisan para leluhur berabad-abad, yang dicatat secara agung dalam Serat Centhini, dan Kitab Primbon Betaljemur Adammakna, karya Kanjeng Pangeran Harya Tjakraningrat.

WETON JOWO, mentransformasikan perhitungan siklus 35 hari, dina dan pasaran, 30 wuku, dan pranata mangsa, menjadi algoritma komputasi modern yang objektif. Kami hadir membantu Anda menemukan hari pernikahan terbaik, mengharmoniskan perjodohan, menentukan arah boyongan rumah, serta memproteksi hajat keluarga dari benturan hari pantangan, dan geblak leluhur.

Segala isi dan perhitungan di dalam aplikasi ini, semata-mata bersifat INFORMATIF, sebagai wawasan khazanah kebudayaan Nusantara. Bukan hal yang harus atau wajib dipercayai, melainkan cukup untuk diketahui dan dipelajari, sebagai bahan wawasan dan kehati-hatian, eling, lan waspada.`;

export interface VoiceOption {
  voice: SpeechSynthesisVoice;
  displayName: string;
  isJavaneseOrIndonesian: boolean;
}

class NarratorSpeechEngine {
  private synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeakingState: boolean = false;
  private isPausedState: boolean = false;
  private selectedVoiceIndex: number = 0;
  private availableVoiceOptions: VoiceOption[] = [];
  private listeners: Set<(isSpeaking: boolean, isPaused: boolean, voices: VoiceOption[], activeVoiceIdx: number) => void> = new Set();
  private autoPlayedThisSession: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices() {
    if (!this.synth) return;
    const rawVoices = this.synth.getVoices();
    if (!rawVoices || rawVoices.length === 0) return;

    // Filter & rank voices: Javanese (jv/jw) > Indonesian (id) > Others
    const options: VoiceOption[] = rawVoices.map((v) => {
      const lang = v.lang.toLowerCase();
      const name = v.name.toLowerCase();
      const isJavanese = lang.includes('jv') || lang.includes('jw') || name.includes('javanese') || name.includes('jawa');
      const isIndonesian = lang.includes('id') || name.includes('indonesia') || name.includes('bahasa');

      let label = v.name;
      if (isJavanese) label += ' 🇮🇩 (Logat Jawa)';
      else if (isIndonesian) label += ' 🇮🇩 (Bahasa Indonesia)';

      return {
        voice: v,
        displayName: label,
        isJavaneseOrIndonesian: isJavanese || isIndonesian,
      };
    });

    // Sort so Javanese & Indonesian voices appear first
    options.sort((a, b) => {
      const aScore = a.displayName.includes('Jawa') ? 3 : a.isJavaneseOrIndonesian ? 2 : 0;
      const bScore = b.displayName.includes('Jawa') ? 3 : b.isJavaneseOrIndonesian ? 2 : 0;
      return bScore - aScore;
    });

    this.availableVoiceOptions = options;
    this.notify();
  }

  public subscribe(listener: (isSpeaking: boolean, isPaused: boolean, voices: VoiceOption[], activeVoiceIdx: number) => void) {
    this.listeners.add(listener);
    listener(this.isSpeakingState, this.isPausedState, this.availableVoiceOptions, this.selectedVoiceIndex);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.isSpeakingState, this.isPausedState, this.availableVoiceOptions, this.selectedVoiceIndex));
  }

  public setSelectedVoice(index: number) {
    if (index >= 0 && index < this.availableVoiceOptions.length) {
      this.selectedVoiceIndex = index;
      if (this.isSpeakingState) {
        this.speak(); // restart with new voice
      } else {
        this.notify();
      }
    }
  }

  public speak(customText?: string) {
    if (!this.synth) return;

    // Refresh voices if list was empty initially
    if (this.availableVoiceOptions.length === 0) {
      this.initVoices();
    }

    // Stop any existing speech
    this.synth.cancel();

    // Soft Gamelan Gong Chime background
    try {
      if (!gamelanEngine.getIsPlaying()) {
        gamelanEngine.start();
        // Stop background gamelan after 12 seconds so narration is crystal clear
        setTimeout(() => {
          gamelanEngine.stop();
        }, 12000);
      }
    } catch {
      // AudioContext fallback
    }

    const textToSpeak = customText || NARRATOR_TEXT_PHONETIC;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'id-ID';

    // Tempo khas Kejawen: Tenang, matang, berwibawa (0.88)
    utterance.rate = 0.88;
    // Nada pitch khas pini sepuh / pamedhar sabda: Agak dalam & hangat (0.92)
    utterance.pitch = 0.92;

    // Pick chosen voice or best Indonesian/Javanese voice
    if (this.availableVoiceOptions.length > 0) {
      const selectedObj = this.availableVoiceOptions[this.selectedVoiceIndex] || this.availableVoiceOptions[0];
      utterance.voice = selectedObj.voice;
    } else {
      const voices = this.synth.getVoices();
      const bestMatch = voices.find((v) => v.lang.includes('id') || v.lang.includes('ID') || v.name.toLowerCase().includes('indonesia'));
      if (bestMatch) utterance.voice = bestMatch;
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
    if (!this.synth) return;
    if (this.synth.speaking && !this.synth.paused) {
      this.synth.pause();
      this.isPausedState = true;
      this.notify();
    }
  }

  public resume() {
    if (!this.synth) return;
    if (this.synth.paused) {
      this.synth.resume();
      this.isPausedState = false;
      this.notify();
    } else if (!this.isSpeakingState) {
      this.speak();
    }
  }

  public stop() {
    if (!this.synth) return;
    this.synth.cancel();
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

    // Attempt autoplay immediately
    try {
      this.speak();
    } catch {
      // Browser blocked autoplay without user gesture
    }

    // Set up a one-time document click/touch fallback to ensure narration starts on user's first click
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

