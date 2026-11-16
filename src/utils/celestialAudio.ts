// Ambient celestial sound generator using Web Audio API
class CelestialAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private droneOscillators: OscillatorNode[] = [];
  private chimeTimer: any = null;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
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

  public start() {
    try {
      this.init();
      if (!this.ctx) return;

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 3);
      this.masterGain.connect(this.ctx.destination);

      // Low celestial harmonic frequencies (432Hz harmonic series: 108Hz, 216Hz, 432Hz, 648Hz)
      const freqs = [108, 162, 216, 324];
      this.droneOscillators = freqs.map((f, idx) => {
        const osc = this.ctx!.createOscillator();
        const oscGain = this.ctx!.createGain();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(f, this.ctx!.currentTime);

        // subtle LFO for cosmic breathing effect
        const lfo = this.ctx!.createOscillator();
        const lfoGain = this.ctx!.createGain();
        lfo.frequency.setValueAtTime(0.1 + idx * 0.05, this.ctx!.currentTime);
        lfoGain.gain.setValueAtTime(1.5, this.ctx!.currentTime);
        lfo.connect(osc.frequency);
        lfo.start();

        oscGain.gain.setValueAtTime(0.02 / (idx + 1), this.ctx!.currentTime);
        osc.connect(oscGain);
        oscGain.connect(this.masterGain!);
        osc.start();
        return osc;
      });

      // Periodically trigger a gentle high cosmic chime
      const scheduleChime = () => {
        if (!this.isPlaying || !this.ctx || !this.masterGain) return;
        this.playChime();
        const nextTime = 4000 + Math.random() * 6000;
        this.chimeTimer = setTimeout(scheduleChime, nextTime);
      };
      this.chimeTimer = setTimeout(scheduleChime, 2000);

      this.isPlaying = true;
    } catch (e) {
      console.warn('Audio playback not supported or user gesture needed:', e);
    }
  }

  public playChime(freq = 864 + Math.random() * 400) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const chimeOsc = this.ctx.createOscillator();
      const chimeGain = this.ctx.createGain();
      chimeOsc.type = 'sine';
      chimeOsc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      chimeGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      chimeGain.gain.exponentialRampToValueAtTime(0.03, this.ctx.currentTime + 0.05);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 2.5);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(this.masterGain);
      chimeOsc.start();
      chimeOsc.stop(this.ctx.currentTime + 2.6);
    } catch {
      // Audio node failure fallback
    }
  }

  public stop() {
    if (!this.ctx) return;
    if (this.chimeTimer) clearTimeout(this.chimeTimer);
    if (this.masterGain) {
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1);
      setTimeout(() => {
        this.droneOscillators.forEach(osc => {
          try { osc.stop(); } catch {}
        });
        this.droneOscillators = [];
        this.isPlaying = false;
      }, 1000);
    } else {
      this.isPlaying = false;
    }
  }
}

export const celestialAudio = new CelestialAudioEngine();
