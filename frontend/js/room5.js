//STANZA FINALE
//oggetti da esplorare
let oggettiEsploratiF = {
    uomo: false,
};
//oggetti da risolvere
let enigmiRisoltiF = {
    muro: false,
    muro2: false
};
//contatori risposte sbagliate
let countMuro = 0;
let countMuro2 = 0;

//funzioni di inizio stanza e scrittura testo iniziale

let skipIntro=false;

function inizioStanzaF() {
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
        messaggio = `${nomeAvatar} Sei arrivato all’ultima fase. \nLe quattro stanze non erano casuali, ogni ambiente era un test. Ogni mente -Alan Turing, Marie Curie, Albert Einstein, Ada Lovelace — ti ha fornito gli strumenti necessari. 
            Non troverai nuove informazioni qui, solo connessioni. I dati che ti servono li hai già raccolti, ora devi dimostrare di saperli usare.
            Analizza ciò che hai visto, controlla i tuoi appunti, ricostruisci il percorso e individua il codice.
            La missione si conclude qui. \nLa via d’uscita è già nelle tue mani...`;
    } else {
        messaggio = `${nomeAvatar} Sei arrivata all’ultima fase. \nLe quattro stanze non erano casuali, ogni ambiente era un test. Ogni mente -Alan Turing, Marie Curie, Albert Einstein, Ada Lovelace — ti ha fornito gli strumenti necessari. 
            Non troverai nuove informazioni qui, solo connessioni. I dati che ti servono li hai già raccolti, ora devi dimostrare di saperli usare.
            Analizza ciò che hai visto, controlla i tuoi appunti, ricostruisci il percorso e individua il codice.
            La missione si conclude qui. \nLa via d’uscita è già nelle tue mani...`;
    }
    // digitazione automatica
    const boxtesto = document.getElementById('testoMacchina5');
    boxtesto.style.cursor = 'pointer';
    boxtesto.onclick = function () {
        skipIntro = true;
    };
    scriviTestoF(messaggio, 0);
}

function scriviTestoF(testo, indice) {
    const elemento = document.getElementById('testoMacchina5');

    if (skipIntro) {
        elemento.innerHTML = testo.replace(/\n/g, '<br>');
        mostraBottoneFinaleF();
        return;
    }

    if (indice < testo.length) {
        let carattere = testo.charAt(indice);
        if (carattere === '\n') {
            document.getElementById('testoMacchina5').innerHTML += '<br>';
        } else {
            document.getElementById('testoMacchina5').innerHTML += carattere;
        }
        setTimeout(() => scriviTestoF(testo, indice + 1), 20);
    } else {
        mostraBottoneFinaleF();
    }
}

function mostraBottoneFinaleF() {
    document.getElementById('testoMacchina5').classList.remove('cursore');
    const bottone = document.getElementById('btnEntra');
    bottone.classList.remove('d-none');
    bottone.classList.add('fade-in');
}

function iniziaEsplorazioneF() {
    document.getElementById('introF').classList.add('d-none');
    document.getElementById('room5').classList.remove('blocco-interazione');
    const avatar = document.getElementById('avatarcontenitore5');
    avatar.classList.remove('d-none');
    avatar.classList.add('fade-in');
    /* animazione taccuino */
    const avatar2 = document.getElementById('avatarid');
    avatar2.classList.add('taccuino-aggiornato');
    setTimeout(() => {
        avatar2.classList.remove('taccuino-aggiornato');
    }, 1200);
}

// indizio
function mostraIndizioUomo() {
    mostraMessaggio('Mandante',"Finalmente, sapevo che ce l'avresti fatta ad arrivare fin qui!\n Hai attraversato grandi menti… ma non hai ancora finito, la conoscenza non serve a nulla se non sai collegarla.\n Hai dimostrato di saper osservare, analizzare, dedurre, ora non ti resta che un ultimo passo. \nIl codice che cerci non è nascosto qui, è dentro ciò che hai già fatto.\nSolo chi comprende l’insieme può andare oltre.");
    oggettiEsploratiF.uomo = true;
}

//funzione per aprire gli enigmi
function apriModalF(titolo,descrizione,richiesta,testoBottone,funzioneControllo,usaPlaceholder) {
    document.getElementById('modalTitleF').innerText = titolo;
    document.getElementById('descrizioneF').innerText = descrizione;
    document.getElementById('richiestaF').innerText = richiesta;

    let inputField = document.getElementById('FinalSoluzione');
    inputField.value = '';
    inputField.placeholder = usaPlaceholder ? '?????????' : '';
    let btnConferma = document.getElementById('btnConfermaF');
    btnConferma.innerText = testoBottone;
    btnConferma.onclick = funzioneControllo;

    var mioModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('FinalModal'));
    mioModal.show();
}

//enigma intermedio
function mostraMuro() {
    if (oggettiEsploratiF.uomo && !enigmiRisoltiF.muro) {
        apriModalF('Intrecci','Agente, il mandante vuole sapere qual è il linguaggio che avevano in comune tutte le stanze.',
        'Inserisci la soluzione','Controlla',controllaMuro,false);
        document.getElementById('FinalSoluzione').placeholder = '??????';
    } else if (oggettiEsploratiF.uomo && enigmiRisoltiF.muro) {
        mostraCodiceFinale();
    } else {
        mostraMessaggio('Accesso Negato','Agente, corri a parlare con il tuo mandante prima. \n Poi torna qui.');
        return;
    }
}

//funzione per il tasto continua
function mostraMessaggioContinua(titolo, testo, callback) {
    document.getElementById('infoTitolo').innerText = titolo;
    document.getElementById('infoTesto').innerText = testo;
    let btn = document.querySelector('#infoModal .modal-footer button');
    btn.innerText = 'Continua';
    btn.removeAttribute('data-bs-dismiss');
    btn.onclick = function () {
        bootstrap.Modal.getInstance(document.getElementById('infoModal')).hide();
        btn.innerText = 'Chiudi';
        btn.setAttribute('data-bs-dismiss', 'modal');
        btn.onclick = null;
        callback();
    };

    var mioModalInfo = bootstrap.Modal.getOrCreateInstance(document.getElementById('infoModal'));
    mioModalInfo.show();
}

//enigma finale
function mostraCodiceFinale() {
    apriModalF('Accesso finale',"Agente, ora c'è bisogno del tuo codice! \n Inserisci il numero che hai ricostruito.",
    'Codice:','Sblocca',controllaCodiceFinale,true);
}

// funzione di controllo risposta all'enigma intermedio
function controllaMuro() {
    const risposta = document.getElementById('FinalSoluzione').value.trim().toLowerCase();
    if (risposta === 'logica') {
        aggiornaPunteggioGlobale(15);
        bootstrap.Modal.getInstance(document.getElementById('FinalModal')).hide();
        enigmiRisoltiF.muro = true;
        setTimeout(() => {
        mostraMessaggioContinua('Accettato', 'Agente bravissimo, hai capito il modo di ragionare. Ora unisci i frammenti.',mostraCodiceFinale);
        }, 500);
    } else {
        countMuro++;
        if (countMuro == 2) {
        aggiornaPunteggioGlobale(-5);
        document.getElementById('FinalSoluzione').value = '';
        document.getElementById('FinalSoluzione').placeholder ="Fondamentale per l'AI";
        } else if (countMuro >= 3) {
        aggiornaPunteggioGlobale(-3);
        document.getElementById('FinalSoluzione').value = '';
        document.getElementById('FinalSoluzione').placeholder ='Lo è quella del primo ordine';
        } else {
        aggiornaPunteggioGlobale(-5);
        document.getElementById('FinalSoluzione').value = '';
        document.getElementById('FinalSoluzione').placeholder ='Pensaci bene, è un linguaggio formale';
        }
    }
}