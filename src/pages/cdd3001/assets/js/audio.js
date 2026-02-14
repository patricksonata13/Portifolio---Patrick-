const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playEngineSound() {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(40, audioCtx.currentTime); // Frequência baixa (ronco)
    
    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime); // Volume baixo para não incomodar
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
}
