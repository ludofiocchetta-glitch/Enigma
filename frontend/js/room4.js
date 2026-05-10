//STANZA LOVELACE
//oggetti da esplorare
let oggettiEsploratiL = {
    mappamondo2: false,
    libreria: false,
    quadro: false,
    lampada: false,
    camino: false
};
//oggetti da risolvere
let enigmiRisoltiL = {
    orologio: false,
    libri: false,
    enigma: false
};
//contatori risposte sbagliate
let countOrologio = 0;
let countLibri = 0;

//funzioni di inizio stanza e scrittura testo iniziale

let skipIntro=false;

function inizioStanzaL() {
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
    if (nomeAvatar == 'Alan Turing' || nomeAvatar == 'Albert Einstein') {
        messaggio = `${nomeAvatar} ce l'hai fatta, ti stai avvicinando sempre di più alla fine.\n Ora ti trovi nella quarta stanza della tua missione, quando sei pronto puoi iniziare l'esplorazione.
            Osserva tutto con attenzione... anche il più piccolo dettaglio potrebbe fare la differenza. \n Fidati del tuo intuito,ormai sei un esperto!\n Buon divertimento :)`;
    } else {
        messaggio = `${nomeAvatar} ce l'hai fatta, ti stai avvicinando sempre di più alla fine.\n Ora ti trovi nella quarta stanza della tua missione, quando sei pronta puoi iniziare l'esplorazione.
            Osserva tutto con attenzione... anche il più piccolo dettaglio potrebbe fare la differenza. \n Fidati del tuo intuito,ormai sei un esperta!\n Buon divertimento :)`;
    }
    const boxtesto = document.getElementById('testoMacchina4');
    boxtesto.style.cursor = 'pointer';
    boxtesto.onclick = function () {
        skipIntro = true;
    };
    scriviTestoL(messaggio, 0);
}

function scriviTestoL(testo, indice) {
    const elemento = document.getElementById('testoMacchina4');
    if (skipIntro) {
        elemento.innerHTML = testo.replace(/\n/g, '<br>');
        mostraBottoneFinaleL();
        return;
    }
    if (indice < testo.length) {
        let carattere = testo.charAt(indice);
        if (carattere === '\n') {
            document.getElementById('testoMacchina4').innerHTML += '<br>';
        } else {
            document.getElementById('testoMacchina4').innerHTML += carattere;
        }
        setTimeout(() => scriviTestoL(testo, indice + 1), 20);
    } else {
        mostraBottoneFinaleL();
    }
}

function mostraBottoneFinaleL() {
    document.getElementById('testoMacchina4').classList.remove('cursore');
    const bottone = document.getElementById('btnEntra');
    bottone.classList.remove('d-none');
    bottone.classList.add('fade-in');
}

function iniziaEsplorazioneL() {
    document.getElementById('introL').classList.add('d-none');
    document.getElementById('room4').classList.remove('blocco-interazione');
    const avatar = document.getElementById('avatarcontenitore4');
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
function mostraMappamondo() {
    mostraMessaggio('Mappamondo',"L'Italia e l'Inghilterra sono unite da un filo rosso. \n Accanto c'è un biglietto: \n gli appunti del matematico italiano Menabrea erano solo la teoria, il miracolo è tradurli in ingranaggi... fai molta attenzione alle operazioni di divisione.");
    oggettiEsploratiL.mappamondo2 = true;
}

function mostraAtmosferaLovelace() {
    mostraMessaggio('Camino',"Sulla cassa di legno c'è inciso: perché il meccanismo funzioni, il denominatore finale deve nascere da una somma, non da una moltiplicazione.");
    oggettiEsploratiL.camino = true;
}

function mostraLampada() {
    mostraMessaggio('Lampada','La macchina può replicare i modelli perfetti della natura, come la spirale di una conchiglia o i petali di un fiore. \n Ogni nuovo passo si basa sulla somma del passato.');
    oggettiEsploratiL.lampada = true;
}

function mostraQuadro() {
    mostraMessaggio('Quadro',"Sotto il quadro, c'è una piccola targhetta: \n il futuro appartiene a chi sa trasformare i numeri in idee.");
    oggettiEsploratiL.quadro = true;
}

function mostraLibreria() {
    mostraMessaggio('Libreria',"Ci sono degli appunti:\n l'equazione per i numeri di Bernoulli è immensa, per iniziare la macchina deve prima calcolare il coefficiente base. \nBisogna prendere (2n-1) e dividerlo per (2n+1).");
    oggettiEsploratiL.libreria = true;
}

//funzione per aprire gli enigmi
function apriModalL(titolo,descrizione,richiesta,testoBottone,funzioneControllo,usaPlaceholder) {
    document.getElementById('modalTitleL').innerText = titolo;
    document.getElementById('descrizioneL').innerText = descrizione;
    document.getElementById('richiestaL').innerText = richiesta;

    let inputField = document.getElementById('LovelaceSoluzione');
    inputField.value = '';
    inputField.placeholder = usaPlaceholder ? 'Vx,Vy' : '';
    let btnConferma = document.getElementById('btnConfermaL');
    btnConferma.innerText = testoBottone;
    btnConferma.onclick = funzioneControllo;

    var mioModal = bootstrap.Modal.getOrCreateInstance(
        document.getElementById('LovelaceModal'),
    );
    mioModal.show();
}

//enigmi intermedi
function mostraOrologio() {
    apriModalL('Orologio','Il pendolo oscilla seguendo un ritmo strano, inciso sul legno ci sono dei numeri: 1,1,2,3,5,8...\n Per far partire il primo programma, devi dimostrare di aver capito lo schema perfetto che la natura ha inserito.',
    'Decifra i successivi tre numeri della sequenza: ','Controlla',controllaOrologio,false);
    document.getElementById('LovelaceSoluzione').placeholder = '?,?,?';
}

function mostraLibri() {
    apriModalL('Libri',"Un titolo spicca: le istruzioni contano più dei numeri.\n Qualcuno ha sottolineato una frase: 'ordine delle operazioni.'",
    "Come si chiama l'insieme di istruzioni che ti permette di risolvere problemi, tenendo conto dell'ordine: ",
    'Controlla',controllaLibri,false);
    document.getElementById('LovelaceSoluzione').placeholder = '?????????';
}

//enigma finale
function apriEnigmaLovelace() {
    if (enigmiRisoltiL.orologio && enigmiRisoltiL.libri && oggettiEsploratiL.mappamondo2 &&
    oggettiEsploratiL.libreria && oggettiEsploratiL.quadro && oggettiEsploratiL.lampada && oggettiEsploratiL.camino) {
        apriModalL('Algoritmo trovato', 'Agente, hai trovato il libro di Ada Lovelace con il suo algoritmo Note G, ma una variabile sembra sbagliata. Correggila! \n V1 = 1,V2 = 2,V3 = n,V4 = V2*V3,V5 = V4-V1,V6 = V4+V1,V7 = V5/V4',
        'Inserisci la variabile sbagliata e poi quella coretta nella forma Vx,Vy:',"Risolvi l'algoritmo",
        controllaLovelace,true);
    } else {
        mostraMessaggio('Accesso Negato','Agente, non sei ancora pronto per la risoluzione finale. Ispeziona e risolvi tutti gli oggetti nella stanza.');
        return;
    }
}

// funzioni di controllo risposte enigmi intermedi
function controllaOrologio() {
    const risposta = document.getElementById('LovelaceSoluzione').value.trim();
    if (risposta === '13,21,34') {
        aggiornaPunteggioGlobale(15);
        bootstrap.Modal.getInstance(
        document.getElementById('LovelaceModal')).hide();
        enigmiRisoltiL.orologio = true;
        localStorage.setItem('lovelace_orologio_risolto', 'true');
        mostraMessaggio('Accettato','Geniale! hai decifrato la sequenza. \n Puoi continuare a cercare.');
        const modalEnigma = document.getElementById('orologioL');
        if (modalEnigma) {
        modalEnigma.style.pointerEvents = 'none';
        modalEnigma.style.opacity = 0.5;
        }
        aggiungiAlTaccuino('room4','orologio','La sequenza di Fibonacci continua con 13,21,34','provvisorio');
        const avatar = document.getElementById('avatarid');
        avatar.classList.add('taccuino-aggiornato');
        setTimeout(() => {
        avatar.classList.remove('taccuino-aggiornato');
        }, 1200);
    } else {
        countOrologio++;
        if (countOrologio == 2) {
        aggiornaPunteggioGlobale(-5);
        document.getElementById('LovelaceSoluzione').value = '';
        document.getElementById('LovelaceSoluzione').placeholder ='Indizio: Fibonacci';
        } else if (countOrologio >= 3) {
        aggiornaPunteggioGlobale(-3);
        document.getElementById('LovelaceSoluzione').value = '';
        document.getElementById('LovelaceSoluzione').placeholder ='Indizio: somma gli ultimi due numeri';
        } else {
        aggiornaPunteggioGlobale(-5);
        document.getElementById('LovelaceSoluzione').value = '';
        document.getElementById('LovelaceSoluzione').placeholder = 'Riprova';
        }
    }
}

function controllaLibri() {
    const risposta = document.getElementById('LovelaceSoluzione').value.trim().toLowerCase();
    if (risposta === 'algoritmo') {
        aggiornaPunteggioGlobale(15);
        bootstrap.Modal.getInstance(
        document.getElementById('LovelaceModal')).hide();
        enigmiRisoltiL.libri = true;
        localStorage.setItem('lovelace_libri_risolti', 'true');
        mostraMessaggio('Accettato','Perfetto! hai capito il libro. \n Continua la tua esplorazione.');
        const modalEnigma = document.getElementById('libriL');
        if (modalEnigma) {
        modalEnigma.style.pointerEvents = 'none';
        modalEnigma.style.opacity = 0.5;
        }
        aggiungiAlTaccuino('room4','libri',"L'algoritmo è una sequenza di istruzioni ordinate",'provvisorio');
        const avatar = document.getElementById('avatarid');
        avatar.classList.add('taccuino-aggiornato');
        setTimeout(() => {
        avatar.classList.remove('taccuino-aggiornato');
        }, 1200);
    } else {
        countLibri++;
        if (countLibri == 2) {
        aggiornaPunteggioGlobale(-5);
        document.getElementById('LovelaceSoluzione').value = '';
        document.getElementById('LovelaceSoluzione').placeholder ='Indizio: ricetta';
        } else if (countLibri >= 3) {
        aggiornaPunteggioGlobale(-3);
        document.getElementById('LovelaceSoluzione').value = '';
        document.getElementById('LovelaceSoluzione').placeholder ='Indizio: lo è quello di Fibonacci';
        } else {
        aggiornaPunteggioGlobale(-5);
        document.getElementById('LovelaceSoluzione').value = '';
        document.getElementById('LovelaceSoluzione').placeholder = 'Riprova';
        }
    }
}

// funzione per salvare enigmi intermedi nel local storage se ricarichi la pagina
function ripristinaStatoLovelace() {
    if (localStorage.getItem('lovelace_orologio_risolto') === 'true') {
        enigmiRisoltiL.orologio = true;
        const modalEnigma = document.getElementById('orologioL');
        if (modalEnigma) {
        modalEnigma.style.pointerEvents = 'none';
        modalEnigma.style.opacity = 0.5;
        }
    }
    if (localStorage.getItem('lovelace_libri_risolti') === 'true') {
        enigmiRisoltiL.libri = true;
        const modalEnigma = document.getElementById('libriL');
        if (modalEnigma) {
        modalEnigma.style.pointerEvents = 'none';
        modalEnigma.style.opacity = 0.5;
        }
    }
    if (localStorage.getItem('lovelace_enigma_risolto') === 'true') {
        enigmiRisoltiL.enigma = true;
        const modalEnigma = document.getElementById('appuntiL');
        if (modalEnigma) {
        modalEnigma.style.pointerEvents = 'none';
        modalEnigma.style.opacity = 0.5;
        }
    }
}
