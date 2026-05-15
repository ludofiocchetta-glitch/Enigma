//STANZA CURIE
//oggetti da esplorare
let oggettiEsploratiC = {
    scaffale: false,
    foglio: false,
    tavolo: false
};
//oggetti da risolvere
let enigmiRisoltiC = {
    bilancia: false,
    pozioni: false,
    lavagna: false
};
//contatori risposte sbagliate
let countBilancia = 0;
let countPozioni = 0;

//funzioni di inizio stanza e scrittura testo iniziale

let skipIntro=false;

function inizioStanzaC() {
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
    messaggio = `${nomeAvatar} ottimo lavoro, hai superato la prima sfida! \n Ora ti trovi nella seconda stanza della tua missione, un luogo pieno di dettagli che potrebbero sfuggire a un occhio distratto.
        Esplora con attenzione, raccogli tutti gli indizi e mettiti alla prova con le nuove domande. Ogni risposta corretta ti porterà sempre più vicino al tuo obiettivo finale. \n Buona esplorazione!`;
    // digitazione automatica
    const boxtesto = document.getElementById('testoMacchina2');
    boxtesto.style.cursor = 'pointer';
    boxtesto.onclick = function () {
        skipIntro = true;
    };
    scriviTestoC(messaggio, 0);
    avviaTimerStanza();
}

function scriviTestoC(testo, indice) {
    const elemento = document.getElementById('testoMacchina2');

    if (skipIntro) {
        elemento.innerHTML = testo.replace(/\n/g, '<br>');
        mostraBottoneFinaleC();
        return;
    }

    if (indice < testo.length) {
        let carattere = testo.charAt(indice);
        if (carattere === '\n') {
        document.getElementById('testoMacchina2').innerHTML += '<br>';
        } else {
        document.getElementById('testoMacchina2').innerHTML += carattere;
        }
        setTimeout(() => scriviTestoC(testo, indice + 1), 20);
    } else {
        mostraBottoneFinaleC();
    }
}

function mostraBottoneFinaleC() {
    document.getElementById('testoMacchina2').classList.remove('cursore');
    const bottone = document.getElementById('btnEntra');
    bottone.classList.remove('d-none');
    bottone.classList.add('fade-in');
}

function iniziaEsplorazioneC() {
    document.getElementById('introC').classList.add('d-none');
    document.getElementById('room2').classList.remove('blocco-interazione');
    const avatar = document.getElementById('avatarcontenitore2');
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
function mostraAtmosferaCurie() {
    mostraMessaggio('Tavolo','Gli atomi non scompaiono. Cambiano solo disposizione. \n Sotto, una freccia disegnata collega due lati di un’equazione chimica.');
    oggettiEsploratiC.tavolo = true;
}

function mostraIndizioCurie() {
    mostraMessaggio('Appunti appesi','Un foglio ingiallito è fissato al muro. \n Alcune parole sono cerchiate più volte: \n “In ogni reazione… la massa totale rimane costante.”');
    oggettiEsploratiC.foglio = true;
}

function mostraScaffale() {
    mostraMessaggio('Scaffale polveroso','Ricerca sulla radioattività-esperimenti con uranio e polonio');
    oggettiEsploratiC.scaffale = true;
}

function mostraTavolo() {
    mostraMessaggio('Tavolo',"Tra gli appunti c'è una frase: “Massa ed energia sono la stessa cosa, in forme diverse.”");
    oggettiEsploratiC.tavolo = true;
}

//funzione per aprire gli enigmi
function apriModalC(titolo,descrizione,richiesta,testoBottone,funzioneControllo,usaPlaceholder) {
    document.getElementById('modalTitleC').innerText = titolo;
    document.getElementById('descrizioneC').innerText = descrizione;
    document.getElementById('richiestaC').innerText = richiesta;

    let inputField = document.getElementById('CurieSoluzione');
    inputField.value = '';
    inputField.placeholder = usaPlaceholder ? 'a,b,c,d' : '';
    let btnConferma = document.getElementById('btnConfermaC');
    btnConferma.innerText = testoBottone;
    btnConferma.onclick = funzioneControllo;

    var mioModal = bootstrap.Modal.getOrCreateInstance(
        document.getElementById('CurieModal'),
    );
    mioModal.show();
}

//enigmi intermedi
function mostraBilancia() {
    apriModalC('Bilancia','Se gli atomi non si creano né si distruggono, cosa bisogna fare per rendere corretta un’equazione chimica?',
    'Inserisci la risposta: ','Controlla',controllaBilancia,false);
    document.getElementById('CurieSoluzione').placeholder = '??????????';
}

function mostraPozioni() {
    apriModalC('Pozioni','Qual è il nome dello scienziato la cui legge che afferma che la materia non si crea né si distrugge?',
    'Inserisci il nome della legge: ','Controlla',controllaPozioni,false);
    document.getElementById('CurieSoluzione').placeholder = '?????????';
}

//enigma finale
function risolviEquazioneFinale() {
    if (enigmiRisoltiC.bilancia && enigmiRisoltiC.pozioni && oggettiEsploratiC.foglio
    && oggettiEsploratiC.scaffale && oggettiEsploratiC.tavolo) {
        apriModalC('Equazione trovata',"Agente, sul tavolo principale c'è un quaderno aperto di Marie. \nL’ultima pagina contiene un’equazione incompleta: \n aFe + bH₂O → cFe₃O₄ + dH₂ \n Sotto è scritto: “Solo chi rispetta la legge di Lavoisier potrà aprire il passaggio.”",
        'Inserisci i coefficienti corretti nella forma a,b,c,d',"Bilancia l'equazione",controllaEquazione,
        true);
    } else {
        mostraMessaggio('Accesso Negato','Agente, non sei ancora pronto per la risoluzione finale. Ispeziona e risolvi tutti gli oggetti nella stanza.');
        return;
    }
}

// funzioni di controllo risposte enigmi intermedi
async function controllaBilancia() {
    const risposta = document.getElementById('CurieSoluzione').value.trim().toLowerCase();
    if (risposta === 'bilanciare') {
        const puntiOttenuti = calcolaPunteggioDinamico(30);
        await aggiornaPunteggioGlobale(puntiOttenuti);

        bootstrap.Modal.getInstance(document.getElementById('CurieModal')).hide();
        enigmiRisoltiC.bilancia = true;
        localStorage.setItem('curie_bilancia_risolta', 'true');
        mostraMessaggio('Accettato','Ottimo! hai capito le equazioni chimiche. \n Puoi continuare a cercare.');
        const modalEnigma = document.getElementById('bilanciaC');
        if (modalEnigma) {
            modalEnigma.style.pointerEvents = 'none';
            modalEnigma.style.opacity = 0.5;
        }
        aggiungiAlTaccuino('room2','bilancia',"Un'equazione chimica va bilanciata",'provvisorio');
        const avatar = document.getElementById('avatarid');
        avatar.classList.add('taccuino-aggiornato');
        setTimeout(() => {
        avatar.classList.remove('taccuino-aggiornato');
        }, 1200);
    } else {
        countBilancia++;
        if (countBilancia >= 3) {
            await aggiornaPunteggioGlobale(-3);
            document.getElementById('CurieSoluzione').value = '';
            document.getElementById('CurieSoluzione').placeholder ='i due lati devono avere lo stesso numero di atomi';
        } else if (countBilancia == 2) {
            await aggiornaPunteggioGlobale(-5);
            document.getElementById('CurieSoluzione').value = '';
            document.getElementById('CurieSoluzione').placeholder ='Indizio: modificare i numeri davanti le formule';
        } else {
            await aggiornaPunteggioGlobale(-7);
            document.getElementById('CurieSoluzione').value = '';
            document.getElementById('CurieSoluzione').placeholder = 'Riprova';
        }
    }
}

async function controllaPozioni() {
    const risposta = document.getElementById('CurieSoluzione').value.trim().toLowerCase();
    if (risposta === 'lavoisier') {
        const puntiOttenuti = calcolaPunteggioDinamico(30);
        await aggiornaPunteggioGlobale(puntiOttenuti);

        bootstrap.Modal.getInstance(document.getElementById('CurieModal')).hide();
        enigmiRisoltiC.pozioni = true;
        localStorage.setItem('curie_pozioni_risolte', 'true');
        mostraMessaggio('Accettato','Bravissimo! hai decifrato il principio. \n Continua la tua missione.');
        const modalEnigma = document.getElementById('pozioniC');
        if (modalEnigma) {
            modalEnigma.style.pointerEvents = 'none';
            modalEnigma.style.opacity = 0.5;
        }
        aggiungiAlTaccuino('room2','pozioni','La legge di Lavoisier afferma che la materia non si crea nè si distrugge','provvisorio');
        const avatar = document.getElementById('avatarid');
        avatar.classList.add('taccuino-aggiornato');
        setTimeout(() => {
        avatar.classList.remove('taccuino-aggiornato');
        }, 1200);
    } else {
        countPozioni++;
        if (countPozioni == 2) {
            await aggiornaPunteggioGlobale(-3);
            document.getElementById('CurieSoluzione').value = '';
            document.getElementById('CurieSoluzione').placeholder ='Indizio: nome di uno scienziato francese';
        } else if (countPozioni >= 3) {
            await aggiornaPunteggioGlobale(-5);
            document.getElementById('CurieSoluzione').value = '';
            document.getElementById('CurieSoluzione').placeholder ='Indizio: Lavo...';
        } else {
            await aggiornaPunteggioGlobale(-7);
            document.getElementById('CurieSoluzione').value = '';
            document.getElementById('CurieSoluzione').placeholder = 'Riprova';
        }
    }
}

// funzione per salvare enigmi intermedi e le note provvisorie nel local storage se ricarichi
// la pagina
function ripristinaStatoCurie() {
    if (localStorage.getItem('curie_bilancia_risolta') === 'true') {
        enigmiRisoltiC.bilancia = true;
        const modalEnigma = document.getElementById('bilanciaC');
        if (modalEnigma) {
            modalEnigma.style.pointerEvents = 'none';
            modalEnigma.style.opacity = 0.5;
        }
        aggiungiAlTaccuino('room2','bilancia',"Un'equazione chimica va bilanciata",'provvisorio');
    }
    if (localStorage.getItem('curie_pozioni_risolte') === 'true') {
        enigmiRisoltiC.pozioni = true;
        const modalEnigma = document.getElementById('pozioniC');
        if (modalEnigma) {
            modalEnigma.style.pointerEvents = 'none';
            modalEnigma.style.opacity = 0.5;
        }
        aggiungiAlTaccuino('room2','pozioni','La legge di Lavoisier afferma che la materia non si crea nè si distrugge','provvisorio');
    }
}


