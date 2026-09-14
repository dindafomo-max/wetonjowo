// Synthesizer Audio Gamelan Slendro Meditatif Tradisional Jawa
// Murni menggunakan Web Audio API tanpa perlu file mp3 eksternal (100% offline & instan)

class GamelanAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private masterGain: GainNode | null = null;

  // Frekuensi Nada Gamelan Pelog / Slendro Luhur (Hz)
  // 1 (Panunggul/Ji): 260Hz, 2 (Gulu/Ro): 290Hz, 3 (Dhadha/Lu): 330Hz, 5 (Lima/Ma): 390Hz, 6 (Nem/Nem): 440Hz, Gong: 110Hz
  private scale = [110, 260, 290, 330, 390, 440, 520, 580];

  // Melodi rintik meditatif slendro
  private melodyIndex = 0;
  private sequence = [1, 2, 3, 5, 3, 2, 4, 5, 0, 3, 2, 1, 5, 4, 3, 2, 0];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime); // Lembut & hening
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Membunyikan satu dentang bilah gamelan (saron/slenthem) dengan harmonik perunggu
  private playGamelanTone(freq: number, isGong: boolean = false) {
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;

    // Fundamental oscillator (triangle/sine)
    const osc1 = this.ctx.createOscillator();
    osc1.type = isGong ? 'sine' : 'triangle';
    osc1.frequency.setValueAtTime(freq, now);

    // Overtone oscillator untuk getaran logam perunggu (metallic timbre)
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2.76, now); // Karakter resonansi bilah perunggu

    const noteGain = this.ctx.createGain();
    const duration = isGong ? 4.5 : 2.2;

    // Envelope dentang: Attack cepat, lalu peluruhan eksponensial khas instrumen pukul gamelan
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.linearRampToValueAtTime(isGong ? 0.35 : 0.22, now + 0.02);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.connect(noteGain);
    osc2.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  }

  public start() {
    if (this.isPlaying) return;
    this.initContext();
    this.isPlaying = true;

    // Mainkan dentang pembuka (suara gong penanda masuk)
    this.playGamelanTone(this.scale[0], true);

    const step = () => {
      if (!this.isPlaying) return;

      const noteIdx = this.sequence[this.melodyIndex % this.sequence.length];
      const isGong = noteIdx === 0;
      const freq = this.scale[noteIdx];

      this.playGamelanTone(freq, isGong);
      this.melodyIndex++;

      // Tempo tenang, berjarak 1.4 - 2.2 detik per ketukan
      const nextDelay = isGong ? 2800 : 1400 + Math.random() * 400;
      this.timerId = window.setTimeout(step, nextDelay);
    };

    this.timerId = window.setTimeout(step, 1800);
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const gamelanEngine = new GamelanAudioEngine();
