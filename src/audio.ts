export class DarkAtmosphereSynth {
  private ctx: AudioContext | null = null;
  private oscillators: OscillatorNode[] = [];
  private gainNode: GainNode | null = null;
  private isPlaying = false;
  private glitchInterval: any;

  start() {
    if (this.isPlaying) return;
    this.isPlaying = true;

    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    this.ctx = new AudioContextClass();
    this.gainNode = this.ctx.createGain();
    this.gainNode.connect(this.ctx.destination);
    
    // Very low volume overall
    this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
    this.gainNode.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 2);

    // Create a dark drone sound (A1, A2, E2)
    const freqs = [55, 110, 82.41];
    
    freqs.forEach(freq => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.value = freq;
      
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 150 + Math.random() * 100;
      
      // LFO for filter modulation (breathing/evolving effect)
      const lfo = this.ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 0.05 + Math.random() * 0.1;
      
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.value = 50 + Math.random() * 50;
      
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      
      osc.connect(filter);
      filter.connect(this.gainNode);
      
      osc.start();
      lfo.start();
      
      this.oscillators.push(osc, lfo);
    });
    
    // Add intermittent glitch noise
    this.glitchInterval = setInterval(() => {
      this.playGlitch();
    }, 4000 + Math.random() * 6000);
  }
  
  private playGlitch() {
    if (!this.ctx || !this.gainNode || !this.isPlaying) return;
    
    const osc = this.ctx.createOscillator();
    osc.type = Math.random() > 0.5 ? 'square' : 'sawtooth';
    osc.frequency.setValueAtTime(50 + Math.random() * 1000, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(20 + Math.random() * 100, this.ctx.currentTime + 0.1);
    
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1000 + Math.random() * 2000;
    
    const glitchGain = this.ctx.createGain();
    glitchGain.gain.setValueAtTime(0, this.ctx.currentTime);
    glitchGain.gain.linearRampToValueAtTime(0.05 + Math.random() * 0.05, this.ctx.currentTime + 0.01);
    glitchGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
    
    osc.connect(filter);
    filter.connect(glitchGain);
    glitchGain.connect(this.gainNode);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.2);
  }

  playClick() {
    if (!this.isPlaying) return;
    
    // Create a new context if not started, just for this click?
    // Actually we only play clicks if audio is enabled
    if (!this.ctx || !this.gainNode) return;
    
    const osc = this.ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.setValueAtTime(800 + Math.random() * 200, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.05);
    
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 2000;
    
    const clickGain = this.ctx.createGain();
    clickGain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    clickGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
    
    osc.connect(filter);
    filter.connect(clickGain);
    clickGain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.06);
  }

  stop() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    
    clearInterval(this.glitchInterval);
    
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 1);
      setTimeout(() => {
        this.oscillators.forEach(osc => {
          try { osc.stop(); } catch(e) {}
        });
        this.oscillators = [];
        this.ctx?.close();
        this.ctx = null;
      }, 1000);
    }
  }
}

export const synth = new DarkAtmosphereSynth();
