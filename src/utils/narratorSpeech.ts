// Utility Narator Otomatis WETON JOWO menggunakan Web Speech Synthesis API
// Bahasa Indonesia (id-ID) - 100% Native Browser Engine without external API dependencies

export const NARRATOR_TEXT_FULL = `Kitab Primbon Betaljemur Adammakna Modern. Membuka Tabir Harmoni Kosmos Jawa di Era Digital.

Rahayu Sagung Dumadi. 
Tradisi perhitungan Petung Jawa bukanlah mitos atau takhayul buta (gugon tuhon), melainkan kristalisasi etnosains empiris warisan para leluhur berabad-abad yang dicatat secara agung dalam Serat Centhini dan Kitab Primbon Betaljemur Adammakna karya Kanjeng Pangeran Harya Tjakraningrat.

WETON JOWO mentransformasikan perhitungan siklus 35 hari (dina dan pasaran), 30 wuku, dan pranata mangsa menjadi algoritma komputasi modern yang objektif. Kami hadir membantu Anda menemukan hari pernikahan terbaik, mengharmoniskan perjodohan, menentukan arah boyongan rumah, serta memproteksi hajat keluarga dari benturan hari pantangan dan geblak leluhur.

Segala isi dan perhitungan di dalam aplikasi ini semata-mata bersifat INFORMATIF sebagai wawasan khazanah kebudayaan Nusantara. Bukan hal yang harus atau wajib dipercayai, melainkan cukup untuk diketahui dan dipelajari sebagai bahan wawasan dan kehati-hatian (eling lan waspada).`;

class NarratorSpeechEngine {
  private synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeakingState: boolean = false;
  private isPausedState: boolean = false;
  private listeners: Set<(isSpeaking: boolean, isPaused: boolean) => void> = new Set();
  private autoPlayedThisSession: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public subscribe(listener: (isSpeaking: boolean, isPaused: boolean) => void) {
    this.listeners.add(listener);
    listener(this.isSpeakingState, this.isPausedState);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.isSpeakingState, this.isPausedState));
  }

  public speak(customText?: string) {
    if (!this.synth) return;

    // Stop any existing speech
    this.synth.cancel();

    const textToSpeak = customText || NARRATOR_TEXT_FULL;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'id-ID';
    utterance.rate = 0.95; // Kecepatan sedang & berwibawa
    utterance.pitch = 1.0;

    // Pick best Indonesian voice if available
    const voices = this.synth.getVoices();
    const indonesianVoice = voices.find(
      (v) => v.lang.includes('id') || v.lang.includes('ID') || v.name.toLowerCase().includes('indonesia')
    );
    if (indonesianVoice) {
      utterance.voice = indonesianVoice;
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
