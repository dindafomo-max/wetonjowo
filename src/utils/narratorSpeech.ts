// Utility Narator Otomatis WETON JOWO menggunakan Web Speech Synthesis API
// Dikhususkan 100% untuk Karakter Suara Orang Indonesia Suku Jawa (Aksen Medok, Tenang, Berwibawa & Eling Waspada)

import { gamelanEngine } from './gamelanAudio';

export const NARRATOR_TEXT_DISPLAY = `Kitab Primbon Betaljemur Adammakna Modern. Membuka Tabir Harmoni Kosmos Jawa di Era Digital.

Rahayu Sagung Dumadi. 
Tradisi perhitungan Petung Jawa bukanlah mitos atau takhayul buta (gugon tuhon), melainkan kristalisasi etnosains empiris warisan para leluhur berabad-abad yang dicatat secara agung dalam Serat Centhini dan Kitab Primbon Betaljemur Adammakna karya Kanjeng Pangeran Harya Tjakraningrat.

WETON JOWO mentransformasikan perhitungan siklus 35 hari (dina & pasaran), 30 wuku, dan pranata mangsa menjadi algoritma komputasi modern yang objektif. Kami hadir membantu Anda menemukan hari pernikahan terbaik, mengharmoniskan perjodohan, menentukan arah boyongan rumah, serta memproteksi hajat keluarga dari benturan hari pantangan & geblak leluhur.

Segala isi dan perhitungan di dalam aplikasi ini semata-mata bersifat INFORMATIF sebagai wawasan khazanah kebudayaan Nusantara. Bukan hal yang harus atau wajib dipercayai, melainkan cukup untuk diketahui dan dipelajari sebagai bahan wawasan dan kehati-hatian (eling lan waspada).`;

// Teks dengan artikulasi fonetik Jawa (Medok & Berwibawa)
export const NARRATOR_TEXT_JAVANESE_MEDOK = `Ki-tab Prim-bon Be-thal-je-mur Ad-dam-mak-na Mo-dern. Mem-bu-ka Ta-bir Har-mo-ni Kos-mos Ja-wa di E-ra Di-gi-tal.

Ra-ha-yu, sa-gung du-ma-di. 

Tra-di-si per-hi-tung-an Pe-tung Ja-wa, bu-kan-lah mi-tos a-tau tak-ha-yul bu-ta, gu-gon thu-hon, me-la-in-kan kris-ta-li-sa-si et-no-sa-ins em-pi-ris wa-ri-san pa-ra le-lu-hur ber-a-bad-a-bad, yang di-ca-tat se-ca-ra a-gung da-lam Se-rat Chen-thi-ni, dan Ki-tab Prim-bon Be-thal-je-mur Ad-dam-mak-na, kar-ya Kan-jeng Pa-nge-ran Har-ya Cak-ra-ning-rat.

WE-THON JO-WO, men-trans-for-ma-si-kan per-hi-tung-an sik-lus tigang puluh gangsal ha-ri, di-na dan pa-sa-ran, ti-ga pu-luh wu-ku, dan pra-na-ta mang-sa, me-nja-di al-go-rit-ma kom-pu-ta-si mo-dern yang ob-jek-tif. Ka-mi ha-dir mem-ban-tu An-da me-ne-mu-kan ha-ri per-ni-kah-an ter-ba-ik, meng-har-mo-nis-kan per-jo-doh-an, me-nen-tu-kan a-rah bo-yong-an ru-mah, ser-ta mem-pro-tek-si ha-jat ke-lu-ar-ga da-ri ben-tu-ran ha-ri pan-ta-ngan, dan geb-lak le-lu-hur.

Se-ga-la i-si dan per-hi-tung-an di da-lam ap-li-ka-si i-ni, se-ma-ta-ma-ta ber-si-fat IN-FOR-MA-TIF, se-ba-gai wa-wa-san kha-za-nah ke-bu-da-ya-an Nu-san-ta-ra. Bu-kan hal yang ha-rus a-tau wa-jib di-per-ca-ya-i, me-la-in-kan cu-kup un-tuk di-ke-ta-hu-i dan di-pe-la-ja-ri, se-ba-gai ba-han wa-wa-san dan ke-ha-ti-ha-ti-an, e-ling, lan was-pa-da.`;

export interface VoiceOption {
  voice: SpeechSynthesisVoice;
  displayName: string;
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
    name: '👴 Pini Sepuh Medok (Pria Jawa Mantap)',
    description: 'Aksen Jawa Medok, Nada Dalam, Tenang & Wibawa',
    rate: 0.82,
    pitch: 0.84,
  },
  nyai_pamedhar: {
    name: '👵 Nyai Pamedhar Sabda (Wanita Jawa Halus)',
    description: 'Suara Ibu/Nyai Jawa Halus, Lembut & Sejuk',
    rate: 0.85,
    pitch: 1.15,
  },
  muda_kejawen: {
    name: '🧑 Pemuda Kejawen (Logat Jawa Modern)',
    description: 'Aksen Indonesia Logat Jawa Jelas & Semangat',
    rate: 0.94,
    pitch: 0.98,
  },
};

class NarratorSpeechEngine {
  private synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeakingState: boolean = false;
  private isPausedState: boolean = false;
  private selectedVoiceIndex: number = 0;
  private currentPreset: JavaneseVoicePreset = 'pini_sepuh';
  private availableVoiceOptions: VoiceOption[] = [];
  private listeners: Set<(
    isSpeaking: boolean,
    isPaused: boolean,
    voices: VoiceOption[],
    activeVoiceIdx: number,
    preset: JavaneseVoicePreset
  ) => void> = new Set();
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

    // Filter strictly for Indonesian (id / id-ID) or Javanese (jv / jw / jawa) voices
    const validVoices = rawVoices.filter((v) => {
      const lang = (v.lang || '').toLowerCase();
      const name = (v.name || '').toLowerCase();

      // Exclude foreign languages explicitly
      const isForeign =
        lang.startsWith('en') ||
        lang.startsWith('vi') ||
        lang.startsWith('fr') ||
        lang.startsWith('es') ||
        lang.startsWith('zh') ||
        lang.startsWith('ja') ||
        lang.startsWith('ko') ||
        lang.startsWith('de') ||
        lang.startsWith('ru') ||
        lang.startsWith('hi') ||
        lang.startsWith('ar') ||
        name.includes('vietnam') ||
        name.includes('united states') ||
        name.includes('english') ||
        name.includes('american') ||
        name.includes('british');

      if (isForeign && !lang.includes('id') && !lang.includes('jv') && !lang.includes('jw') && !name.includes('indonesia') && !name.includes('jawa')) {
        return false;
      }

      return (
        lang.includes('id') ||
        lang.includes('jv') ||
        lang.includes('jw') ||
        name.includes('indonesia') ||
        name.includes('bahasa') ||
        name.includes('javanese') ||
        name.includes('jawa') ||
        name.includes('damayanti') ||
        name.includes('gadis') ||
        name.includes('ardi') ||
        name.includes('andika')
      );
    });

    if (validVoices.length === 0) {
      // Create clean Indonesian fallback voice profiles if device browser doesn't list explicit id-ID objects
      const systemDefaultVoice = rawVoices.find((v) => (v.lang || '').toLowerCase().includes('id')) || null;
      this.availableVoiceOptions = [
        {
          voice: systemDefaultVoice as SpeechSynthesisVoice,
          displayName: '🇮🇩 Suara Indonesia (Suku Jawa Original)',
          isJavanese: true,
          isIndonesian: true,
        },
        {
          voice: systemDefaultVoice as SpeechSynthesisVoice,
          displayName: '🇮🇩 Suara Indonesia (Logat Kejawen Medok)',
          isJavanese: true,
          isIndonesian: true,
        },
      ];
    } else {
      this.availableVoiceOptions = validVoices.map((v) => {
        const lang = (v.lang || '').toLowerCase();
        const name = (v.name || '').toLowerCase();
        const isJawa = lang.includes('jv') || lang.includes('jw') || name.includes('javanese') || name.includes('jawa');

        return {
          voice: v,
          displayName: isJawa
            ? `🇮🇩 ${v.name} (Suku Jawa Original)`
            : `🇮🇩 ${v.name} (Bahasa Indonesia)`,
          isJavanese: isJawa,
          isIndonesian: true,
        };
      });
    }

    // Sort so Javanese (jv) comes before standard Indonesian (id)
    this.availableVoiceOptions.sort((a, b) => {
      const aScore = a.isJavanese ? 4 : 2;
      const bScore = b.isJavanese ? 4 : 2;
      return bScore - aScore;
    });

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
      this.speak(); // Restart with new preset tone
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
    if (!this.synth) return;

    if (this.availableVoiceOptions.length === 0) {
      this.initVoices();
    }

    // Stop existing speech
    this.synth.cancel();

    // Trigger soft Gamelan Gong ambiance
    try {
      if (!gamelanEngine.getIsPlaying()) {
        gamelanEngine.start();
        setTimeout(() => {
          gamelanEngine.stop();
        }, 12000);
      }
    } catch {
      // Audio fallback
    }

    const textToSpeak = customText || NARRATOR_TEXT_JAVANESE_MEDOK;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    // Set language to Indonesian/Javanese
    utterance.lang = 'id-ID';

    // Apply Preset (Rate & Pitch for Javanese Medok accent)
    const preset = fontPresets[this.currentPreset] || fontPresets.pini_sepuh;
    utterance.rate = preset.rate;
    utterance.pitch = preset.pitch;

    // Pick selected voice or fallback strictly to Javanese/Indonesian voice
    if (this.availableVoiceOptions.length > 0) {
      const selectedObj = this.availableVoiceOptions[this.selectedVoiceIndex] || this.availableVoiceOptions[0];
      if (selectedObj && selectedObj.voice) {
        const vLang = (selectedObj.voice.lang || '').toLowerCase();
        const vName = (selectedObj.voice.name || '').toLowerCase();
        const isIndoOrJawa = vLang.includes('id') || vLang.includes('jv') || vLang.includes('jw') || vName.includes('indonesia') || vName.includes('jawa');
        if (isIndoOrJawa) {
          utterance.voice = selectedObj.voice;
          if (selectedObj.isJavanese || vLang.includes('jv') || vLang.includes('jw')) {
            utterance.lang = selectedObj.voice.lang || 'jv-ID';
          }
        }
      }
    } else {
      const voices = this.synth.getVoices();
      const javaneseVoice = voices.find((v) => (v.lang || '').includes('jv') || (v.lang || '').includes('jw') || v.name.toLowerCase().includes('jawa'));
      const indoVoice = voices.find((v) => (v.lang || '').includes('id') || v.name.toLowerCase().includes('indonesia'));
      
      if (javaneseVoice) {
        utterance.voice = javaneseVoice;
        utterance.lang = javaneseVoice.lang;
      } else if (indoVoice) {
        utterance.voice = indoVoice;
        utterance.lang = indoVoice.lang || 'id-ID';
      }
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
