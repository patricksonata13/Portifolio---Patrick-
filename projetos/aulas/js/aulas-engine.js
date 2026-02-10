async function initAulas() {
    const user = await window.supabaseClient.auth.getUser();
    
    if (!user.data.user) {
        // Se não estiver logado, manda para o login
        window.location.href = '../../login.html';
        return;
    }

    console.log("Bem-vindo aluno:", user.data.user.email);
    loadProgress(user.data.user.id);
}

// Função para trocar o vídeo do player
function playLesson(videoUrl, title, lessonId) {
    const player = document.getElementById('main-video-player');
    const titleDisplay = document.getElementById('current-lesson-title');
    
    player.src = videoUrl;
    titleDisplay.innerText = title;
    
    saveProgress(lessonId);
}

async function saveProgress(lessonId) {
    const { data: { user } } = await window.supabaseClient.auth.getUser();
    await window.supabaseClient
        .from('aula_progresso')
        .upsert({ 
            user_id: user.id, 
            aula_id: lessonId, 
            concluida: true 
        });
}

async function loadProgress(userId) {
    const { data } = await window.supabaseClient
        .from('aula_progresso')
        .select('aula_id')
        .eq('user_id', userId);
    
    if (data) {
        data.forEach(p => {
            const el = document.querySelector(`[data-lesson-id="${p.aula_id}"]`);
            if (el) el.classList.add('completed');
        });
    }
}

initAulas();
