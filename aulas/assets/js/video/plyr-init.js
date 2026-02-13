// Plyr.io - Player de vídeo leve e bonito
document.addEventListener('DOMContentLoaded', function() {
    // Carrega Plyr do CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.plyr.io/3.7.8/plyr.js';
    script.onload = function() {
        const players = Plyr.setup('.js-player', {
            controls: ['play-large', 'play', 'progress', 'current-time', 
'mute', 'volume', 'fullscreen'],
            youtube: { noCookie: true, rel: 0, showinfo: 0, 
modestbranding: 1 }
        });
    };
    document.head.appendChild(script);
    
    // CSS do Plyr
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.plyr.io/3.7.8/plyr.css';
    document.head.appendChild(link);
});
