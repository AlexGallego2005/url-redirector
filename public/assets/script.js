async function verify() {
    const urlInput = document.getElementById('urlInput');
    const errorMessage = document.getElementById('errorMessage');
    const url = urlInput.value.trim();

    // Limpiar mensaje de error
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';

    // Verificar si la URL está vacía
    if (!url) {
        errorMessage.textContent = 'Por favor, introduce una URL';
        errorMessage.style.display = 'block';
        return undefined;
    }

    try {
        new URL(url);
        return url;
    } catch (err) {
        errorMessage.textContent = 'La URL no es válida. Verifica que esté correctamente formateada.';
        errorMessage.style.display = 'block';
        return undefined;
    }
};

function createShortlink(x) {
    verify().then((url) => {
        if (!url) return;
        fetch(`${ window.location.protocol }//${ window.location.host }/api/shortcode/create?url=${ encodeURIComponent(url) }`).then( async (res) => {
            const json = await res?.json();
            if (!json || !json?.url) return new Error('error creating shortlink');

            navigator.clipboard.writeText(json?.url);
            const span = x.getElementsByTagName('span');
            span[0].style.transition = 'all .3s';
            span[0].style.opacity = '0';
            span[1].style.transition = 'all .3s';
            span[1].style.opacity = '1';
            setTimeout(() => {
                span[0].style.opacity = '1';
                span[1].style.opacity = '0';
            }, 1500);

            document.getElementById('urlInput').value = '';
        })
    });
}

function redirectUrl() {
    verify().then((url) => {
        if (!url) return;
        window.location.href = `/?url=${encodeURIComponent(url)}`;
    });
};

function copyToClipboard(x) {
    verify().then((url) => {
        if (!url) return;
        navigator.clipboard.writeText(`${ window.location.protocol }//${ window.location.host }/?url=${ url }`);
        const span = x.getElementsByTagName('span');
        span[0].style.transition = 'all .3s';
        span[0].style.opacity = '0';
        span[1].style.transition = 'all .3s';
        span[1].style.opacity = '1';
        setTimeout(() => {
            span[0].style.opacity = '1';
            span[1].style.opacity = '0';
        }, 1500);

        document.getElementById('urlInput').value = '';
    });
};

// Añadir event listener para la tecla Enter
document.getElementById('urlInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        redirectUrl();
    };
});