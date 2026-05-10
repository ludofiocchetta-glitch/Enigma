//Inizio stanze
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

//Funzione per continuare la sessione
function continuaPartita() {
    localStorage.setItem('avatar', window.avatarVecchio);
    const stanza = parseInt(localStorage.getItem('stanzaSalvata')) || 0;

    if (stanza === 0) {
        window.location.href = '/index/room/0';
    } else if (stanza === 1) {
        window.location.href = '/index/room/1';
    } else if (stanza === 2) {
        window.location.href = '/index/room/2';
    } else if (stanza === 3) {
        window.location.href = '/index/room/3';
    } else if (stanza === 4) {
        window.location.href = '/index/room/4';
    } else if (stanza === 5) {
        window.location.href = '/index/room/5';
    } else if (stanza === 6) {
        window.location.href = '/index/room/6';
    } else {
        window.location.href = '/index/room/0';
    }
}

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

// Mostra/nascondi password
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

//Avatar in alto alla pagina
function caricaAvatarInAngolo() {
    const avatarname = localStorage.getItem('avatar');
    let imgAvatar = '';
    if (avatarname === 'detective1') {
        imgAvatar = '/assets/images/Alan Turing.png';
    } else if (avatarname === 'detective2') {
        imgAvatar = '/assets/images/Marie Curie.png';
    } else if (avatarname === 'detective3') {
        imgAvatar = '/assets/images/Albert Einstein.png';
    } else if (avatarname === 'detective4') {
        imgAvatar = '/assets/images/Ada Lovelace.png';
    }
    const targetImg = document.getElementById('avatarid');
    if (targetImg && imgAvatar !== '') {
        targetImg.src = imgAvatar;
    }
}
// funzione per mostrare gli indizi
function mostraMessaggio(titolo, testo) {
    document.getElementById('infoTitolo').innerText = titolo;
    document.getElementById('infoTesto').innerText = testo;
    var mioModalInfo = bootstrap.Modal.getOrCreateInstance(
        document.getElementById('infoModal'),
    );
    mioModalInfo.show();
}

//funzioni per il taccuino
//aggiunge le scoperte al taccuino
function aggiungiAlTaccuino(stanza, oggetto, contenuto, tipo) {
    let taccuino = JSON.parse(localStorage.getItem('taccuinoAgente')) || [];
    taccuino.push({stanza: stanza,oggetto: oggetto,contenuto: contenuto,tipo: tipo});
    localStorage.setItem('taccuinoAgente', JSON.stringify(taccuino));
}
//elimina le scoperte temporanee
function pulisciTaccuino() {
    let taccuino = JSON.parse(localStorage.getItem('taccuinoAgente')) || [];
    // Filtra e mantieni solo gli elementi che hanno tipo "finale"
    taccuino = taccuino.filter((nota) => nota.tipo === 'finale');
    localStorage.setItem('taccuinoAgente', JSON.stringify(taccuino));
}
//apre il taccuino
function apriTaccuino() {
    let taccuino = JSON.parse(localStorage.getItem('taccuinoAgente')) || [];
    let testo = '';

    if (taccuino.length == 0) {
        testo = 'Agente, questo è il tuo taccuino personale. Risolvi gli enigmi per raccogliere indizi.';
    } else {
        taccuino.forEach((nota) => {
            if (nota.tipo === 'finale') {
                testo += `${nota.stanza} - ${nota.contenuto}\n\n`;
            } else {
                testo += `${nota.stanza}-${nota.oggetto}: ${nota.contenuto}\n\n`;
            }
        });
    }
    mostraMessaggio('Taccuino agente', testo);
}