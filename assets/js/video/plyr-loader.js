// Plyr.io - Player de vídeo profissional
(function() {
    // Carrega CSS do Plyr
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.plyr.io/3.7.8/plyr.css';
    document.head.appendChild(link);
    
    // Carrega JS do Plyr
    const script = document.createElement('script');
    script.src = 'https://cdn.plyr.io/3.7.8/plyr.js';
    script.onload = function() {
        // Inicializa todos os players
        const players = Plyr.setup('.js-player', {
            controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen', 'settings'],
            youtube: { noCookie: true, rel: 0, modestbranding: 1 },
            vimeo: { byline: false, portrait: false, title: false },
            ratio: '16:9',
            fullscreen: { enabled: true, fallback: true }
        });
        console.log('🎬 Plyr carregado:', players.length, 'players');
    };
    document.head.appendChild(script);
})();
