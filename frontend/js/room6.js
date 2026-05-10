//funzioni di inizio stanza e scrittura testo iniziale

let skipIntro=false;

function inizioVittoria() {
    const userName = localStorage.getItem('username');
    const avatarName = localStorage.getItem('avatar');
    let imgAvatar = '';
    if (avatarName === 'detective1') {
        imgAvatar = '/assets/images/Alan Turing.png';
    } else if (avatarName === 'detective2') {
        imgAvatar = '/assets/images/Marie Curie.png';
    } else if (avatarName === 'detective3') {
        imgAvatar = '/assets/images/Albert Einstein.png';
    } else if (avatarName === 'detective4') {
        imgAvatar = '/assets/images/Ada Lovelace.png';
    }
    const targetImg = document.getElementById('avatar-vittoria');
    if (targetImg && imgAvatar !== '') {
        targetImg.src = imgAvatar;
    }
    const messaggio = `Missione conclusa con successo Agente ${userName}.\nHai esplorato e decifrato alla perfezione i segreti delle stanze di Turing, Curie, Einstein e Lovelace.\nLa tua mente si è dimostrata all'altezza dei più grandi geni della storia.\n Le tue risposte sono state analizzate attentamente...`;
    const boxtesto = document.getElementById('testoVittoria');
    if (boxtesto) {
        boxtesto.style.cursor = 'pointer';
        boxtesto.onclick = function () {
        skipIntro = true;
        };
        scriviTestoV(messaggio, 0);
    }
}

function scriviTestoV(testo, indice) {
    const elemento = document.getElementById('testoVittoria');
    if (skipIntro) {
        elemento.innerHTML = testo.replace(/\n/g, '<br>');
        document.getElementById('btnClassifica').classList.remove('d-none');
        return;
    }
    if (indice < testo.length) {
        let carattere = testo.charAt(indice);
        if (carattere === '\n') {
        elemento.innerHTML += '<br>';
        } else {
        elemento.innerHTML += carattere;
        }
        setTimeout(() => scriviTestoV(testo, indice + 1), 30);
    } else {
        document.getElementById('btnClassifica').classList.remove('d-none');
    }
}

// Funzione per popolare la classifica
function popolaClassificaReale(leaderboardData, recordId, username, punteggioReale) {
    const tbody = document.getElementById('leaderboard-body');
    tbody.innerHTML = '';
    let giaEvidenziato = false;

    leaderboardData.forEach((player, index) => {
        let rigaClasse = '';

        if (recordId) {
            if (player.id == recordId) {
                rigaClasse = 'class="giocatore-corrente fw-bold"';
            }
        } else {
            // Se entra solo per vedere la classifica evidenzia il punteggio più alto
            if (player.user === username && player.score == punteggioReale && !giaEvidenziato) {
                rigaClasse = 'class="giocatore-corrente fw-bold"';
                giaEvidenziato = true;
            }
        }

        let riga = `<tr ${rigaClasse}>
                <td>#${index + 1}</td>
                <td>${player.user}</td>
                <td>${player.score} pts</td>
            </tr>`;
        tbody.innerHTML += riga;
    })
}
