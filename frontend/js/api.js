// PAGINA LOGIN
// funzione per accedere
async function eseguiLogin() {
    const inputname = document.getElementById('inputname');
    const inputpassword = document.getElementById('inputpassword');
    const avatarSelezionato = document.querySelector('input[name="avatar"]:checked').value;
    const username = inputname.value.trim();
    const password = inputpassword.value.trim();
    const errorDiv = document.getElementById('passwordError');
    const nameErrorDiv = document.getElementById('nameError');

    inputname.classList.remove('is-invalid');
    inputpassword.classList.remove('is-invalid');

    if (errorDiv) {
        errorDiv.innerText = '';
        errorDiv.classList.remove('d-block');
    }

    if (nameErrorDiv) {
        nameErrorDiv.innerText = '';
        nameErrorDiv.classList.remove('d-block');
    }

    if (username === '') {
        inputname.classList.add('is-invalid');
        if (nameErrorDiv) {
            nameErrorDiv.innerText = 'Campo obbligatorio!';
            nameErrorDiv.classList.add('d-block');
        }
        return;
    }
    const specialCharRegex = /[!@#$%&*.?_]/;
    if (password === '') {
        inputpassword.classList.add('is-invalid');
        if (errorDiv) {
            errorDiv.innerText = 'Campo obbligatorio!';
            errorDiv.classList.add('d-block');
        }
        return;
    } else if (password.length < 8) {
        inputpassword.classList.add('is-invalid');
        if (errorDiv) {
            errorDiv.innerText = 'Minimo 8 caratteri';
            errorDiv.classList.add('d-block');
        }
        return;
    } else if (!specialCharRegex.test(password)) {
        inputpassword.classList.add('is-invalid');
        if (errorDiv) {
            errorDiv.innerText = 'Minimo un carattere speciale (!@#$%&*.?_)';
            errorDiv.classList.add('d-block');
        }
        return;
    }
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password }),
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('username', username);
            localStorage.setItem('stanzaSalvata', data.room);
            localStorage.setItem('punteggioFinale', data.score || 0);

            if (data.room >= 0 && data.room <= 6) {
                window.avatarVecchio = data.avatar;
                window.avatarNuovo = avatarSelezionato;
                document.getElementById('modal-nome-agente').innerText = username;
                const modalScelta = new bootstrap.Modal(document.getElementById('sceltaPartitaModal'));
                modalScelta.show();
            } else {
                window.avatarNuovo = avatarSelezionato;
                nuovaPartita();
            }
        } else if (response.status === 404) {
            //utente non trovato
            const modal = new bootstrap.Modal(document.getElementById('modalUtenteInesistente'));
            modal.show();
        } else if (response.status === 401) {
            //password errata
            inputpassword.value = '';
            const modal = new bootstrap.Modal(document.getElementById('modalPasswordErrata'));
            modal.show();
        } else {
            //altri errori
            inputname.value = '';
            const modalErrore = new bootstrap.Modal(document.getElementById('erroreServerModal'));
            modalErrore.show();
        }
    } catch (err) {
        //errore di rete o connessione
        console.error('Errore di connessione: ', err);
        const modalErrore = new bootstrap.Modal(document.getElementById('erroreServerModal'));
        modalErrore.show();
    }
}
// funzione per registrarsi
async function eseguiRegistrazione() {
    const inputname = document.getElementById('inputname');
    const inputpassword = document.getElementById('inputpassword');
    const avatar = document.querySelector('input[name="avatar"]:checked').value;
    const username = inputname.value.trim();
    const password = inputpassword.value.trim();
    const errorDiv = document.getElementById('passwordError');
    const nameErrorDiv = document.getElementById('nameError');

    inputname.classList.remove('is-invalid');
    inputpassword.classList.remove('is-invalid');

    if (errorDiv) {
        errorDiv.innerText = '';
        errorDiv.classList.remove('d-block');
    }

    if (nameErrorDiv) {
        nameErrorDiv.innerText = '';
        nameErrorDiv.classList.remove('d-block');
    }

    if (username === '') {
        inputname.classList.add('is-invalid');
        if (nameErrorDiv) {
            nameErrorDiv.innerText = 'Campo obbligatorio!';
            nameErrorDiv.classList.add('d-block');
        }
        return;
    }
    const specialCharRegex = /[!@#$%&*.?_]/;
    if (password === '') {
        inputpassword.classList.add('is-invalid');
        if (errorDiv) {
            errorDiv.innerText = 'Campo obbligatorio!';
            errorDiv.classList.add('d-block');
        }
        return;
    } else if (password.length < 8) {
        inputpassword.classList.add('is-invalid');
        if (errorDiv) {
            errorDiv.innerText = 'Minimo 8 caratteri';
            errorDiv.classList.add('d-block');
        }
        return;
    } else if (!specialCharRegex.test(password)) {
        inputpassword.classList.add('is-invalid');
        if (errorDiv) {
            errorDiv.innerText = 'Minimo un carattere speciale (!@#$%&*.?_)';
            errorDiv.classList.add('d-block');
        }
        return;
    }
    try {
        const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: username,
            password: password,
            avatar: avatar,
        }),
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.clear();
            localStorage.setItem('avatar', avatar);
            localStorage.setItem('username', username);
            localStorage.setItem('stanzaSalvata', 0);
            window.location.href = '/index/room/0';
        } else {
            if (data.error && data.error.includes('Username già esistente')) {
                const modal = new bootstrap.Modal(document.getElementById('modalUtenteGiaEsistente'));
                modal.show();
            } else {
                inputname.value = '';
                inputpassword.value = '';
                const modalErrore = new bootstrap.Modal(document.getElementById('erroreServerModal'));
                modalErrore.show();
            }
        }
    } catch (err) {
        console.error('Errore di connessione: ', err);
        const modalErrore = new bootstrap.Modal(document.getElementById('erroreServerModal'));
        modalErrore.show();
    }
}

// aggiornare punteggio giocatore
async function aggiornaPunteggioGlobale(pti) {
    let punteggioAttuale = parseInt(localStorage.getItem('punteggioFinale')) || 0;
    punteggioAttuale += pti;
    localStorage.setItem('punteggioFinale', punteggioAttuale);
    const username = localStorage.getItem('username');

    if(username){
        try{
            await fetch('/api/update-score', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({username : username, newScore: punteggioAttuale})
            });
        }catch(err){
            console.error("Errore di sincronizzazzione del punteggio: ", err);
        }
    }
}

// inizio nuova partita e reset vecchia se utente che ha già giocato
async function nuovaPartita() {
    localStorage.removeItem('recordId');
    const username = localStorage.getItem('username');
    const avatar = window.avatarNuovo;
    try {
        await fetch('/api/reset-game', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, nuovoAvatar: avatar }),
        });

        localStorage.clear();
        localStorage.setItem('username', username);
        localStorage.setItem('avatar', avatar);
        localStorage.setItem('stanzaSalvata', 0);

        window.location.href = '/index/room/0';
    } catch (err) {
        console.error('Impossibile contattare il server per il reset:', err);
    }
}
// inizio gioco
async function iniziaEscapeRoom() {
    const username = localStorage.getItem('username');
    try {
        const response = await fetch('/api/room-completed', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                newRoom: 0 // Il backend salva 0 nel DB e imposta la sessione a 1
            }),
        });
        if (response.ok) {
            window.location.href = '/index/room/1';
        } else {
            console.error('Errore durante l\'aggiornamento della stanza');
        }
    } catch (err) {
        console.error('Errore di connessione: ', err);
    }
}

// Logout
async function eseguiLogout() {
    try {
        const response = await fetch('/api/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            console.log('Logout dal server completato con successo.');
        } else {
            console.warn("Il server ha risposto con un errore, ma forzo comunque l'uscita locale.");
        }
    } catch (err) {
        console.error('Impossibile contattare il server', err);
    } finally {
        localStorage.clear();
        window.location.href = '/';
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
// classifica
async function mostraClassifica() {
    document.getElementById('introV').classList.add('d-none');
    document.getElementById('leaderboard-container').classList.remove('d-none');
    
    const scoreFinale = localStorage.getItem('punteggioFinale') || 0;
    const username = localStorage.getItem('username');
    const devoSalvare = localStorage.getItem('devoSalvareInClassifica') === 'true';

    try {
        const response = await fetch('/api/leaderboard', {
            method: 'PUT',
            headers: { 'Content-type' : 'application/json' },
            body: JSON.stringify({
                username: username,
                final_score: scoreFinale,
                salva: devoSalvare
            })
        });

        if (response.ok) {
            const data = await response.json();
            if (devoSalvare) {
                localStorage.removeItem('devoSalvareInClassifica');
                if (data.insertedId) {
                    localStorage.setItem('recordId', data.insertedId);
                }
            }
            document.getElementById('punteggio-giocatore').innerText = data.punteggioReale;
            document.getElementById('posizione-giocatore').innerText = data.currentRank;
            const recordId = localStorage.getItem('recordId');
            popolaClassificaReale(data.leaderboard, recordId, username, data.punteggioReale);
        }
    } catch(err) {
        console.error("Errore classifica", err);
    }
}

// controllo degli enigmi finali
// STANZA TURING
async function controllaEnigma() {
    document.getElementById('btnConferma').disabled = true;
    const rispostaUtente = document.getElementById('codiceSoluzione').value.trim().toLowerCase();
    const soluzioneCorretta = 'bombe';

    if (rispostaUtente === soluzioneCorretta) {
        const puntiOttenuti = calcolaPunteggioDinamico(40);
        await aggiornaPunteggioGlobale(puntiOttenuti);

        resetTimer();

        bootstrap.Modal.getInstance(document.getElementById('enigmaModal')).hide();
        mostraMessaggio('Codice accettato!','Bravo Agente! La porta si è sbloccata. Preparati a scappare...');
        enigmiRisolti.macchina = true;

        const modalEnigma = document.getElementById('macchinaT');
        if (modalEnigma) {
            modalEnigma.style.pointerEvents = 'none';
            modalEnigma.style.opacity = 0.5;
        }

        pulisciTaccuino();
        aggiungiAlTaccuino('room1','codice','Hai ottenuto questo numero: 20','finale');
        const taccuinoDaSalvare = JSON.parse(localStorage.getItem('taccuinoAgente')) || [];
        try {
            const response = await fetch('/api/room-completed', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    newRoom: 1,
                    notebook: taccuinoDaSalvare
                }),
            });

            if (response.ok) {
                setTimeout(() => {
                window.location.href = '/index/room/2';
                }, 2500);
            }
            else {
                const errorData = await response.json(); 
                console.error("dati rifiutati da server:", response.status, errorData);
            }
        } catch (err) {
            console.error("Errore nel salvataggio progressi: ", err);
        }
    } else {
        await aggiornaPunteggioGlobale(-7);
        document.getElementById('codiceSoluzione').value = '';
        document.getElementById('codiceSoluzione').placeholder ='Non è il nome che stiamo cercando. Riprova!';
        document.getElementById('btnConferma').disabled = false;
    }
}

// STANZA CURIE
async function controllaEquazione() {
    document.getElementById('btnConfermaC').disabled = true;
    const rispostaUtente = document.getElementById('CurieSoluzione').value.trim();
    if (rispostaUtente === '3,4,1,4' || rispostaUtente==='3414' || rispostaUtente==='3-4-1-4' || rispostaUtente==='3 4 1 4') {
        const puntiOttenuti = calcolaPunteggioDinamico(40);
        await aggiornaPunteggioGlobale(puntiOttenuti);

        resetTimer();

        bootstrap.Modal.getInstance(document.getElementById('CurieModal')).hide();
        mostraMessaggio('Equazione Bilanciata!','Ottimo lavoro, Agente! La porta si sta aprendo. Sei pronto per la prossima missione...');
        enigmiRisoltiC.lavagna = true;

        const modalEnigma = document.getElementById('lavagnaC');
        if (modalEnigma) {
            modalEnigma.style.pointerEvents = 'none';
            modalEnigma.style.opacity = 0.5;
        }

        pulisciTaccuino();
        aggiungiAlTaccuino('room2','codice','Hai ottenuto questo numero: 3414','finale');
        const taccuinoDaSalvare = JSON.parse(localStorage.getItem('taccuinoAgente')) || [];
        try {
            const response = await fetch('/api/room-completed', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    newRoom: 2,
                    notebook: taccuinoDaSalvare
                }),
            });

            if (response.ok) {
                setTimeout(() => {
                window.location.href = '/index/room/3';
                }, 2500);
            }
        } catch (err) {
            console.error("Errore nel salvataggio progressi: ", err);
        }
    } else {
        await aggiornaPunteggioGlobale(-7);
        document.getElementById('CurieSoluzione').value = '';
        document.getElementById('CurieSoluzione').placeholder = 'Non sono i coefficienti giusti,riprova!';
        document.getElementById('btnConfermaC').disabled = false;
    }
}

// STANZA EINSTEIN
async function controllaEinstein() {
    document.getElementById('btnConfermaE').disabled = true;
    const rispostaUtente = document.getElementById('EinsteinSoluzione').value.trim().toLowerCase();
    const soluzioneCorretta = 'e=mc^2';

    if (rispostaUtente === soluzioneCorretta) {
        const puntiOttenuti = calcolaPunteggioDinamico(40);
        await aggiornaPunteggioGlobale(puntiOttenuti);

        resetTimer();

        bootstrap.Modal.getInstance(document.getElementById('EinsteinModal')).hide();
        mostraMessaggio('Formula corretta!','Bravissimo Agente! \n Il passaggio segreto si sta aprendo, puoi continuare la tua missione...');
        
        const modalEnigma = document.getElementById('lavagnaE');
        if (modalEnigma) {
            modalEnigma.style.pointerEvents = 'none';
            modalEnigma.style.opacity = 0.5;
        }

        pulisciTaccuino();
        aggiungiAlTaccuino('room3','codice','Hai ottenuto questo numero: 2','finale');
        const taccuinoDaSalvare = JSON.parse(localStorage.getItem('taccuinoAgente')) || [];
        try {
            const response = await fetch('/api/room-completed', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                newRoom: 3,
                notebook: taccuinoDaSalvare
                }),
            });

            if (response.ok) {
                setTimeout(() => {
                window.location.href = '/index/room/4';
                }, 2500);
            }
        } catch (err) {
            console.error("Errore nel salvataggio progressi: ", err);
        }
    } else {
        await aggiornaPunteggioGlobale(-7);
        document.getElementById('EinsteinSoluzione').value = '';
        document.getElementById('EinsteinSoluzione').placeholder ='Non è questa la formula che cerchiamo,riprova!';
        document.getElementById('btnConfermaE').disabled = false;
    }
}

// STANZA LOVELACE
async function controllaLovelace() {
    document.getElementById('btnConfermaL').disabled = true;
    const rispostaUtente = document.getElementById('LovelaceSoluzione').value.trim().toLowerCase();

    if (rispostaUtente === 'v4,v6'|| rispostaUtente==='v4 v6' || rispostaUtente==='v4v6' || rispostaUtente==='v4-v6') {
        const puntiOttenuti = calcolaPunteggioDinamico(40);
        await aggiornaPunteggioGlobale(puntiOttenuti);

        resetTimer();

        bootstrap.Modal.getInstance(document.getElementById('LovelaceModal')).hide();
        mostraMessaggio('Risoluzione accettata!','Bravissimo Agente! sei pronto per la missione finale...');
        enigmiRisoltiL.enigma = true;
        localStorage.setItem('lovelace_enigma_risolto', 'true');

        const modalEnigma = document.getElementById('appuntiL');
        if (modalEnigma) {
            modalEnigma.style.pointerEvents = 'none';
            modalEnigma.style.opacity = 0.5;
        }

        pulisciTaccuino();
        aggiungiAlTaccuino('room4','codice','Hai ottenuto questo numero: 46','finale');
        const taccuinoDaSalvare = JSON.parse(localStorage.getItem('taccuinoAgente')) || [];
        try {
            const response = await fetch('/api/room-completed', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                newRoom: 4,
                notebook: taccuinoDaSalvare
                }),
            });

            if (response.ok) {
                setTimeout(() => {
                window.location.href = '/index/room/5';
                }, 2500);
            }
        } catch (err) {
            console.error("Errore nel salvataggio progressi: ", err);
        }
    } else {
        await aggiornaPunteggioGlobale(-7);
        document.getElementById('LovelaceSoluzione').value = '';
        document.getElementById('LovelaceSoluzione').placeholder ='Non sono le variabili che cerchiamo. Riprova!';
        document.getElementById('btnConfermaL').disabled = false;
    }
}

// STANZA FINALE
async function controllaCodiceFinale() {
    document.getElementById('btnConfermaF').disabled = true;
    const risposta = document.getElementById('FinalSoluzione').value.trim();
   
    if (risposta === '203414246' || risposta==='20-3414-2-46' || risposta==='20 3414 2 46' || risposta==='20,3414,2,46') {
        const puntiOttenuti = calcolaPunteggioDinamico(60);
        await aggiornaPunteggioGlobale(puntiOttenuti);

        resetTimer();

        bootstrap.Modal.getInstance(document.getElementById('FinalModal')).hide();
        mostraMessaggio('Codice Accettato!',"Incredibile Agente ce l'hai fatta! \n Hai completato tutta la missione in modo brillante. \n La porta si sta aprendo...");
        enigmiRisoltiF.muro2 = true;
        localStorage.setItem('final_enigma_risolto', 'true');

        const modalEnigma = document.getElementById('muroF');
        if (modalEnigma) {
            modalEnigma.style.pointerEvents = 'none';
            modalEnigma.style.opacity = 0.5;
        }
        
        const taccuinoDaSalvare = JSON.parse(localStorage.getItem('taccuinoAgente')) || [];
        try {
            const response = await fetch('/api/room-completed', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                    newRoom: 5,
                    notebook: taccuinoDaSalvare
                }),
            });

            if (response.ok) {
                localStorage.setItem('devoSalvareInClassifica', 'true');
                setTimeout(() => {
                    window.location.href = '/index/room/6';
                }, 2500);
            }
        } catch (err) {
            console.error("Errore nel salvataggio progressi: ", err);
        }
    } else {
        countMuro2++;
        if (countMuro2 == 2) {
            await aggiornaPunteggioGlobale(-7);
            document.getElementById('FinalSoluzione').value = '';
            document.getElementById('FinalSoluzione').placeholder ='Leggili attentamente';
            document.getElementById('btnConfermaF').disabled = false;
        } else if (countMuro2 >= 3) {
            await aggiornaPunteggioGlobale(-9);
            document.getElementById('FinalSoluzione').value = '';
            document.getElementById('FinalSoluzione').placeholder ="Attenzione all'ordine";
            document.getElementById('btnConfermaF').disabled = false;
        } else {
            await aggiornaPunteggioGlobale(-5);
            document.getElementById('FinalSoluzione').value = '';
            document.getElementById('FinalSoluzione').placeholder = 'Controlla i tuoi appunti';
            document.getElementById('btnConfermaF').disabled = false;
        }
    }
}