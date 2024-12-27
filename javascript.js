const apiKey = 'AIzaSyDtwqafwSbVhhli5JEps6n1i1Mkn76ZoLE'; // Substitua pela sua chave
const channelId = 'UCkA9dtpxsXLat-JfB-_1Dvg'; // Substitua pelo ID do canal
let nextPageToken = ''; // Token para paginação

async function getYouTubeVideos(pageToken = '') {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&order=date&part=snippet&type=video&maxResults=6&pageToken=${pageToken}`;
    try {
        // Adiciona delay antes da requisição
        await delay(1000); // 1000ms = 1 segundo

        const response = await fetch(url);
        const data = await response.json();

        const videoSection = document.getElementById('video-section');
        if (!videoSection) {
            console.error("Elemento #video-section não encontrado.");
            return;
        }

        if (pageToken === '') {
            videoSection.innerHTML = ''; // Limpa os vídeos antigos se for a primeira página
        }

        if (data.items && data.items.length > 0) {
            data.items.forEach(item => {
                const videoId = item.id.videoId;
                const videoTitle = item.snippet.title;
                const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

                const videoContainer = document.createElement('div');
                videoContainer.classList.add('video-container');

                videoContainer.innerHTML = `
                    <iframe 
                        src="https://www.youtube.com/embed/${videoId}" 
                        frameborder="0" 
                        allowfullscreen>
                    </iframe>
                    <h3><a href="${videoUrl}" target="_blank">${videoTitle}</a></h3>
                `;

                videoSection.appendChild(videoContainer);
            });

            nextPageToken = data.nextPageToken || '';
        } else {
            console.log("Nenhum vídeo encontrado!");
        }
    } catch (error) {
        console.error("Erro ao buscar vídeos:", error);
    }
}


// Carrega mais vídeos quando o botão é clicado
function loadMoreVideos() {
    if (nextPageToken) {
        getYouTubeVideos(nextPageToken);
    } else {
        alert('Não há mais vídeos para carregar.');
    }
}

// Carrega os vídeos ao abrir a página
getYouTubeVideos();


// Função para aguardar um tempo antes de executar algo
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
