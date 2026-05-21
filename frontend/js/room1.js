// STANZA TURING
//oggetti da risolvere
let enigmiRisolti = {
    lavagna: false,
    telefono: false,
    macchina: false
};
//oggetti da esplorare
let oggettiEsplorati = {
    mappamondo: false,
    serranda: false,
    cappello: false,
    scatoloni: false
};
//contatori risposte sbagliate
let countLavagna = 0;
let countTelefono = 0;

//funzioni di inizio stanza e scrittura testo iniziale

let skipIntro=false;

function inizioStanzaT() {
    const avatarName = localStorage.getItem('avatar');
    let nomeAvatar = '';
    let messaggio = '';
    if (avatarName === 'detective1') {
        nomeAvatar = 'Alan Turing';
    } else if (avatarName === 'detective2') {
        nomeAvatar = 'Marie Curie';
    } else if (avatarName === 'detective3') {
        nomeAvatar = 'Albert Einstein';
    } else if (avatarName === 'detective4') {
        nomeAvatar = 'Ada Lovelace';
    }
    if (nomeAvatar === 'Alan Turing' || nomeAvatar === 'Albert Einstein') {
        messaggio = `${nomeAvatar} sei entrato nel primo luogo della tua missione, esploralo bene! \nVai alla ricerca di tutti gli oggetti interessanti, conterranno indizi utili e domande per capire in che posto ti trovi e, soprattutto, per decifrare l'enigma finale. \nSolo rispondendo correttamente a tutto la tua avventura potrà continuare.`;
    } else {
        messaggio = `${nomeAvatar} sei entrata nel primo luogo della tua missione, esploralo bene! \nVai alla ricerca di tutti gli oggetti interessanti, conterranno indizi utili e domande per capire in che posto ti trovi e, soprattutto, per decifrare l'enigma finale. \nSolo rispondendo correttamente a tutto la tua avventura potrà continuare.`;
    }
    // digitazione automatica
    const boxtesto = document.getElementById('testoMacchina1');
    boxtesto.style.cursor = 'pointer';
    boxtesto.onclick = function () {
        skipIntro = true;
    };
    scriviTestoT(messaggio, 0);
    avviaTimerStanza();
}

function scriviTestoT(testo, indice) {
    const elemento = document.getElementById('testoMacchina1');
    if (skipIntro) {
        elemento.innerHTML = testo.replace(/\n/g, '<br>');
        mostraBottoneFinaleT();
        return;
    }
    if (indice < testo.length) {
        let carattere = testo.charAt(indice);
        if (carattere === '\n') {
        document.getElementById('testoMacchina1').innerHTML += '<br>';
        } else {
        document.getElementById('testoMacchina1').innerHTML += carattere;
        }
        setTimeout(() => scriviTestoT(testo, indice + 1), 20);
    } else {
        mostraBottoneFinaleT();
    }
}

function mostraBottoneFinaleT() {
    document.getElementById('testoMacchina1').classList.remove('cursore');
    const bottone = document.getElementById('btnEntra');
    bottone.classList.remove('d-none');
    bottone.classList.add('fade-in');
}

function iniziaEsplorazioneT() {
    document.getElementById('introT').classList.add('d-none');
    document.getElementById('room1').classList.remove('blocco-interazione');
    const avatar = document.getElementById('avatarcontenitore');
    avatar.classList.remove('d-none');
    avatar.classList.add('fade-in');
    /* animazione taccuino */
    const avatar2 = document.getElementById('avatarid');
    avatar2.classList.add('taccuino-aggiornato');
    setTimeout(() => {
        avatar2.classList.remove('taccuino-aggiornato');
    }, 1200);
}

// indizi
function mostraAtmosferaTuring() {
    mostraMessaggio('Mappamondo','I messaggi attraversano il continente… ma vengono compresi solo in un luogo. \n Non cercare lontano Agente.');
    oggettiEsplorati.mappamondo = true;
    localStorage.setItem('turing_mappamondo_risolto', 'true');
}

function mostraIndizioTuring() {
    mostraMessaggio('Serranda','Ci sei quasi, hai trovato un appunto segreto appeso qui: Le parole più importanti non sono scritte per intero.\n B_MBE');
    oggettiEsplorati.serranda = true;
    localStorage.setItem('turing_serranda_risolto', 'true');
}

function mostraScatoloni() {
    mostraMessaggio('Scatoloni polverosi','Scartoffie, appunti tecnici  e... una tazza di tè ormai fredda. \n Qualcuno ha lavorato qui a lungo.');
    oggettiEsplorati.scatoloni = true;
    localStorage.setItem('turing_scatoloni_risolto', 'true');
}

function mostraCappello() {
    mostraMessaggio('Cappello', 'Un uomo che ha trasformato lettere in armi');
    oggettiEsplorati.cappello = true;
    localStorage.setItem('turing_cappello_risolto', 'true');
}

//funzione per aprire gli enigmi
function apriModal(titolo,descrizione,richiesta,testoBottone,funzioneControllo,usaPlaceholder) {
    document.getElementById('modalTitle').innerText = titolo;
    document.getElementById('descrizione').innerText = descrizione;
    document.getElementById('richiesta').innerText = richiesta;

    let inputField = document.getElementById('codiceSoluzione');
    inputField.value = '';
    inputField.placeholder = usaPlaceholder ? '?????' : '';
    let btnConferma = document.getElementById('btnConferma');
    btnConferma.innerText = testoBottone;
    btnConferma.onclick = funzioneControllo;
    btnConferma.disabled = false;

    var mioModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('enigmaModal'));
    mioModal.show();
}

//enigmi intermedi
function mostraLavagna() {
    apriModal('Lavagna','Se capisci la macchina, capisci tutto.\n GPKIOC','Decifra gli appunti: ', 'Controlla',controllaLavagna,false);
    document.getElementById('codiceSoluzione').placeholder = '??????';
}

function mostraTelefono() {
    apriModal('Telefono','Ogni numero ha una voce. Ascoltala.\n 20-21-18-9-14-7','Decifra numero: ',
    'Controlla',controllaTelefono,false);
    document.getElementById('codiceSoluzione').placeholder = '??????';
}

//enigma finale
function mostraEnigmaFinale() {
    if (enigmiRisolti.telefono && enigmiRisolti.lavagna && oggettiEsplorati.mappamondo &&
    oggettiEsplorati.cappello && oggettiEsplorati.scatoloni && oggettiEsplorati.serranda) {
        apriModal('Macchina Enigma Intercettata','Agente, abbiamo decifrato parte del messaggio. Serve il nome della macchina che ha permesso di decifrare i messaggi nemici.',
        'Inserisci il nome: ','Decodifica la macchina',controllaEnigma,true);
    } else {
        mostraMessaggio('Accesso Negato','Agente, non sei ancora pronto per la decodifica finale. Ispeziona e risolvi tutti gli oggetti nella stanza.');
        return;
    }
}

// funzioni di controllo risposte enigmi intermedi
async function controllaLavagna() {
    document.getElementById('btnConferma').disabled = true;
    const risposta = document.getElementById('codiceSoluzione').value.trim().toLowerCase();
    if (risposta === 'enigma') {
        const puntiOttenuti = calcolaPunteggioDinamico(30);
        await aggiornaPunteggioGlobale(puntiOttenuti);

        bootstrap.Modal.getInstance(document.getElementById('enigmaModal')).hide();
        enigmiRisolti.lavagna = true;
        localStorage.setItem('turing_lavagna_risolta', 'true');
        mostraMessaggio('Accettato','Geniale! hai decifrato il codice sulla lavagna. \n Puoi continuare a cercare.');
        const modalEnigma = document.getElementById('lavagnaT');
        if (modalEnigma) {
        modalEnigma.style.pointerEvents = 'none';
        modalEnigma.style.opacity = 0.5;
        }
        aggiungiAlTaccuino('room1','lavagna','GPKIOC corrisponde a enigma','provvisorio');
        /* animazione taccuino */
        const avatar = document.getElementById('avatarid');
        avatar.classList.add('taccuino-aggiornato');
        setTimeout(() => {
        avatar.classList.remove('taccuino-aggiornato');
        }, 1200);
    } else {
        countLavagna++;
        if (countLavagna == 2) {
            await aggiornaPunteggioGlobale(-5);
            document.getElementById('codiceSoluzione').value = '';
            document.getElementById('codiceSoluzione').placeholder = "Indizio: spostati nell'alfabeto";
        } else if (countLavagna >= 3) {
            await aggiornaPunteggioGlobale(-7);
            document.getElementById('codiceSoluzione').value = '';
            document.getElementById('codiceSoluzione').placeholder ='Indizio: shift=2';
        } else {
            await aggiornaPunteggioGlobale(-3);
            document.getElementById('codiceSoluzione').value = '';
            document.getElementById('codiceSoluzione').placeholder = 'Riprova';
        }
        document.getElementById('btnConferma').disabled = false;
    }
}

async function controllaTelefono() {
    document.getElementById('btnConferma').disabled = true;
    const risposta = document.getElementById('codiceSoluzione').value.trim().toLowerCase();
    if (risposta === 'turing') {
        const puntiOttenuti = calcolaPunteggioDinamico(30);
        await aggiornaPunteggioGlobale(puntiOttenuti);

        bootstrap.Modal.getInstance(document.getElementById('enigmaModal')).hide();
        enigmiRisolti.telefono = true;
        localStorage.setItem('turing_telefono_risolto', 'true');
        mostraMessaggio('Accettato','Fantastico! hai capito il significato nascosto del numero. \n Continua la tua esplorazione.');
        const modalEnigma = document.getElementById('telefonoT');
        if (modalEnigma) {
            modalEnigma.style.pointerEvents = 'none';
            modalEnigma.style.opacity = 0.5;
        }
        aggiungiAlTaccuino('room1','telefono','20-21-18-9-14-7 corrisponde a Turing','provvisorio');
        const avatar = document.getElementById('avatarid');
        avatar.classList.add('taccuino-aggiornato');
        setTimeout(() => {
        avatar.classList.remove('taccuino-aggiornato');
        }, 1200);
    } else {
        countTelefono++;
        if (countTelefono == 2) {
            await aggiornaPunteggioGlobale(-5);
            document.getElementById('codiceSoluzione').value = '';
            document.getElementById('codiceSoluzione').placeholder ='Indizio: ogni lettera ha un posto';
        } else if (countTelefono >= 3) {
            await aggiornaPunteggioGlobale(-7);
            document.getElementById('codiceSoluzione').value = '';
            document.getElementById('codiceSoluzione').placeholder ='Indizio: A=1,B=2...';
        } else {
            await aggiornaPunteggioGlobale(-3);
            document.getElementById('codiceSoluzione').value = '';
            document.getElementById('codiceSoluzione').placeholder = 'Riprova';
        }
        document.getElementById('btnConferma').disabled = false;
    }
}

// funzione per salvare enigmi intermedi e le note provvisorie nel local storage se ricarichi
// la pagina
function ripristinaStatoTuring() {
    if (localStorage.getItem('turing_lavagna_risolta') === 'true') {
        enigmiRisolti.lavagna = true;
        const modalEnigma = document.getElementById('lavagnaT');
        if (modalEnigma) {
            modalEnigma.style.pointerEvents = 'none';
            modalEnigma.style.opacity = 0.5;
        }
        aggiungiAlTaccuino('room1', 'lavagna', 'GPKIOC corrisponde a enigma', 'provvisorio');
    }
    if (localStorage.getItem('turing_telefono_risolto') === 'true') {
        enigmiRisolti.telefono = true;
        const modalEnigma = document.getElementById('telefonoT');
        if (modalEnigma) {
            modalEnigma.style.pointerEvents = 'none';
            modalEnigma.style.opacity = 0.5;
        }
        aggiungiAlTaccuino('room1', 'telefono', '20-21-18-9-14-7 corrisponde a Turing', 'provvisorio');
    }
}

