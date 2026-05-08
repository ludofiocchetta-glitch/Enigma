// inizio stanze
window.onload = async function () {
    try {
        const response = await fetch('/api/me');
        if (response.ok) {
        const data = await response.json();
        localStorage.setItem('stanzaSalvata', data.room);
        localStorage.setItem('username', data.username);
        localStorage.setItem('avatar', data.avatar);
        localStorage.setItem('punteggioFinale', data.score || 0);
        if (data.notebook) {
            localStorage.setItem('taccuinoAgente', JSON.stringify(data.notebook));
        }
        const userform = document.querySelector('.userform');
        if (userform) {
            if (data.room >= 0 && data.room <= 6) {
            const avatarRadio = document.querySelector('input[name="avatar"]:checked');
            window.avatarVecchio = data.avatar;
            window.avatarNuovo = avatarRadio ? avatarRadio.value : data.avatar;
            document.getElementById('modal-nome-agente').innerText = data.username;
            const modalScelta = new bootstrap.Modal(document.getElementById('sceltaPartitaModal'));
            modalScelta.show();
            } else {
            window.avatarVecchio = data.avatar;
            continuaPartita();
            }
        }
        }
    } catch (err) {
        console.error('Errore di controllo della sessione: ', err);
    }
    if (document.getElementById('testoMacchina')) {
        document.getElementById('testoMacchina').classList.add('cursore');
        avviaMissione();
    }
    if (document.getElementById('testoMacchina1')) {
        document.getElementById('testoMacchina1').classList.add('cursore');
        ripristinaStatoTuring();
        inizioStanzaT();
    }
    if (document.getElementById('testoMacchina2')) {
        document.getElementById('testoMacchina2').classList.add('cursore');
        ripristinaStatoCurie();
        inizioStanzaC();
    }
    if (document.getElementById('testoMacchina3')) {
        document.getElementById('testoMacchina3').classList.add('cursore');
        ripristinaStatoEinsetin();
        inizioStanzaE();
    }
    if (document.getElementById('testoMacchina4')) {
        document.getElementById('testoMacchina4').classList.add('cursore');
        ripristinaStatoLovelace();
        inizioStanzaL();
    }
    if (document.getElementById('testoMacchina5')) {
        document.getElementById('testoMacchina5').classList.add('cursore');
        inizioStanzaF();
    }
    if (document.getElementById('avatarid')) {
        caricaAvatarInAngolo();
    }
    if (document.getElementById('testoVittoria')) {
        inizioVittoria();
    }
};

//highest-score prima pagina
document.addEventListener('DOMContentLoaded', async function () {
    const highestScoreText = document.getElementById('highest-score-text');
    
    if (highestScoreText) {
        try {
            const response = await fetch('/api/highest-score');
            if (response.ok) {
                const data = await response.json();
                
                if (data.user === 'Nessuno') {
                highestScoreText.innerText = "Nessun utente registrato. Sii il primo a stabilire un record!";
                } else {
                highestScoreText.innerText = `Record assoluto: ${data.score} pts - Agente ${data.user}`;
                }
            }
        } catch (err) {
            highestScoreText.innerText = "Highest score: impossibile caricare il punteggio";
            console.error("Impossibile caricare l'highest score: ", err);
        }
    }
});

//Mostra/nascondi password
document.addEventListener('DOMContentLoaded', function () {
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('inputpassword');
    const eyeIcon = document.getElementById('eyeIcon');

    if (togglePassword && passwordInput && eyeIcon) {
        togglePassword.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        
        passwordInput.setAttribute('type', type);
        
        eyeIcon.classList.toggle('bi-eye');
        eyeIcon.classList.toggle('bi-eye-slash');
        });
    }
});

// Gestione Audio e Volume
document.addEventListener('DOMContentLoaded', function () {
    const bgMusic = document.getElementById('bgMusic');
    const volumeSlider = document.getElementById('volumeSlider');
    const musicBtn = document.querySelector('.btn-music-game');
    if (bgMusic && volumeSlider && musicBtn) {
        bgMusic.volume = volumeSlider.value;
        volumeSlider.addEventListener('input', function () {
        bgMusic.volume = this.value;
        });
        const startMusic = () => {
            if (bgMusic.paused) {
                bgMusic
                .play()
                .then(() => {
                    console.log('Musica avviata con successo!');
                    document.removeEventListener('click', startMusic);
                    document.removeEventListener('keydown', startMusic);
                })
                .catch((error) => {
                    console.log('Autoplay bloccato, in attesa di interazione:', error);
                });
            }
        };
        startMusic();
        document.addEventListener('click', startMusic);
        document.addEventListener('keydown', startMusic);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const bgMusic = document.getElementById('bgMusic');
    const volumeSlider = document.getElementById('volumeSlider');
    const musicBtn = document.querySelector('.btn-music-gameT') || document.querySelector('.btn-music-gameF');
    if (bgMusic && volumeSlider && musicBtn) {
        bgMusic.volume = volumeSlider.value;
        volumeSlider.addEventListener('input', function () {
        bgMusic.volume = this.value;
        });
        const startMusic = () => {
        if (bgMusic.paused) {
            bgMusic
            .play()
            .then(() => {
                console.log('Musica avviata con successo!');
                document.removeEventListener('click', startMusic);
                document.removeEventListener('keydown', startMusic);
            })
            .catch((error) => {
                console.log('Autoplay bloccato, in attesa di interazione:', error);
            });
        }
        };
        startMusic();
        document.addEventListener('click', startMusic);
        document.addEventListener('keydown', startMusic);
    }
});

//tasto invio
document.addEventListener('keydown', function (event) {
    if (event.key == 'Enter') {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
        event.preventDefault();
        const confirmButton = openModal.querySelector('[id^="btnConferma"]');
        const closeButton = openModal.querySelector(
            '.modal-footer [data-bs-dismiss="modal"]',
        );
        if (confirmButton) {
            confirmButton.click();
        } else if (closeButton) {
            closeButton.click();
        }
        }
    }
});