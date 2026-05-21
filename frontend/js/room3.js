//STANZA EINSTEIN
//oggetti da esplorare
let oggettiEsploratiE = {
    ritratto: false,
    tavolo: false,
    cassetti: false,
    luna: false
};
//oggetti da risolvere
let enigmiRisoltiE = {
    mappamondo: false,
    mobile: false,
    lavagna: false
};
//contatori risposte sbagliate
let countMobile = 0;
let countMappamondo = 0;

//funzioni di inizio stanza e scrittura testo iniziale

let skipIntro=false;

function inizioStanzaE() {
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
        messaggio = `${nomeAvatar} stai facendo grandi progressi, ormai sei nel vivo della missione!
            Questa è la terza stanza, un passaggio cruciale verso la conclusione. Osserva ogni dettaglio e ragiona con attenzione.
            Non lasciarti sfuggire nulla, perché ogni elemento potrebbe essere la chiave per proseguire.
            Sei sempre più vicino alla verità… continua così!`;
    } else {
        messaggio = `${nomeAvatar} stai facendo grandi progressi, ormai sei nel vivo della missione!
            Questa è la terza stanza, un passaggio cruciale verso la conclusione. Osserva ogni dettaglio e ragiona con attenzione.
            Non lasciarti sfuggire nulla, perché ogni elemento potrebbe essere la chiave per proseguire.
            Sei sempre più vicina alla verità… continua così!`;
    }
    // digitazione automatica
    const boxtesto = document.getElementById('testoMacchina3');
    boxtesto.style.cursor = 'pointer';
    boxtesto.onclick = function () {
        skipIntro = true;
    };
    scriviTestoE(messaggio, 0);
    avviaTimerStanza();
}

function scriviTestoE(testo, indice) {
    const elemento = document.getElementById('testoMacchina3');

    if (skipIntro) {
        elemento.innerHTML = testo.replace(/\n/g, '<br>');
        mostraBottoneFinaleE();
        return;
    }

    if (indice < testo.length) {
        let carattere = testo.charAt(indice);
        if (carattere === '\n') {
        document.getElementById('testoMacchina3').innerHTML += '<br>';
        } else {
        document.getElementById('testoMacchina3').innerHTML += carattere;
        }
        setTimeout(() => scriviTestoE(testo, indice + 1), 20);
    } else {
        mostraBottoneFinaleE();
    }
}

function mostraBottoneFinaleE() {
    document.getElementById('testoMacchina3').classList.remove('cursore');
    const bottone = document.getElementById('btnEntra');
    bottone.classList.remove('d-none');
    bottone.classList.add('fade-in');
}

function iniziaEsplorazioneE() {
    document.getElementById('introE').classList.add('d-none');
    document.getElementById('room3').classList.remove('blocco-interazione');
    const avatar = document.getElementById('avatarcontenitore3');
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
function mostraTavolo() {
    mostraMessaggio('Tavolo',"Tra gli appunti c'è una frase: “Massa ed energia sono la stessa cosa, in forme diverse.”");
    oggettiEsploratiE.tavolo = true;
}

function mostraAtmosferaEinstein() {
    mostraMessaggio('Cassettiera',"Nei cassetti c'è un foglio con una formula:\n E = ? · c² \n Accanto qualcuno ha annotato:“Manca una sola lettera”");
    oggettiEsploratiE.cassetti = true;
}

function mostraIndizioEinstein() {
    mostraMessaggio('Ritratto','Un uomo dai capelli spettinati ti osserva dalla cornice.\n Sotto è inciso: \n“La fantasia è più importante della conoscenza.”');
    oggettiEsploratiE.ritratto = true;
}

function mostraLuna() {
    mostraMessaggio('Quadro','Ciò che sembra vero per uno, può non esserlo per un altro.');
    oggettiEsploratiE.luna = true;
}

//funzione per aprire gli enigmi
function apriModalE(titolo,descrizione,richiesta,testoBottone,funzioneControllo,usaPlaceholder) {
    document.getElementById('modalTitleE').innerText = titolo;
    document.getElementById('descrizioneE').innerText = descrizione;
    document.getElementById('richiestaE').innerText = richiesta;

    let inputField = document.getElementById('EinsteinSoluzione');
    inputField.value = '';
    inputField.placeholder = usaPlaceholder ? '?=??' : '';
    let btnConferma = document.getElementById('btnConfermaE');
    btnConferma.innerText = testoBottone;
    btnConferma.onclick = funzioneControllo;
    btnConferma.disabled = false;

    var mioModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('EinsteinModal'));
    mioModal.show();
}

//enigmi intermedi
function mostraMobile() {
    apriModalE('Mobile','Quali due grandezze sono relative?','Inserisci le grandezze: ','Controlla',
    controllaMobile,false);
    document.getElementById('EinsteinSoluzione').placeholder = '?????? e ?????';
}

function mostraMappamondoE() {
    apriModalE('Mobile','Come si chiama il sistema da cui osservi un fenomeno?','Inserisci la risposta: ',
    'Controlla',controllaMappamondoE,false);
    document.getElementById('EinsteinSoluzione').placeholder = '???????????';
}

//enigma finale
function apriEnigmaEinstein() {
    if (enigmiRisoltiE.mappamondo && enigmiRisoltiE.mobile && oggettiEsploratiE.cassetti &&
    oggettiEsploratiE.tavolo && oggettiEsploratiE.ritratto && oggettiEsploratiE.luna) {
        apriModalE('Formula trovata',"Agente, sulla lavagna un po' cancellata è scritta la formula scoperta da Einstein che ha rivoluzionato la fisica. \n Completala tu per aprire il passaggio. \n E=...",
        'Inserisci la formula completa',"Risolvi l'equazione",controllaEinstein,true);
    } else {
        mostraMessaggio('Accesso Negato','Agente, non sei ancora pronto per la risoluzione finale. Ispeziona e risolvi tutti gli oggetti nella stanza.');
        return;
    }
}

// funzioni di controllo risposte enigmi intermedi
async function controllaMobile() {
    document.getElementById('btnConfermaE').disabled = true;
    const risposta = document.getElementById('EinsteinSoluzione').value.trim().toLowerCase();
    if (risposta === 'spazio e tempo' || risposta === 'tempo e spazio') {
        const puntiOttenuti = calcolaPunteggioDinamico(30);
        await aggiornaPunteggioGlobale(puntiOttenuti);

        bootstrap.Modal.getInstance(document.getElementById('EinsteinModal')).hide();
        enigmiRisoltiE.mobile = true;
        localStorage.setItem('einstein_mobile_risolto', 'true');
        mostraMessaggio('Accettato','Fortissimo! hai capito quali sono le grandezze. \n Puoi continuare la tua ricerca.');
        const modalEnigma = document.getElementById('mobileE');
        if (modalEnigma) {
            modalEnigma.style.pointerEvents = 'none';
            modalEnigma.style.opacity = 0.5;
        }
        aggiungiAlTaccuino('room3','mobile','Lo spazio e il tempo sono relativi','provvisorio');
        const avatar = document.getElementById('avatarid');
        avatar.classList.add('taccuino-aggiornato');
        setTimeout(() => {
        avatar.classList.remove('taccuino-aggiornato');
        }, 1200);
    }
    //  INIZIO TRUCCO "SKIP" (DA CANCELLARE PRIMA DELLA CONSEGNA) 👇
    else if (risposta === 'skip') {
        const taccuinoDaSalvare = JSON.parse(localStorage.getItem('taccuinoAgente')) || [];
        await fetch('/api/room-completed', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                newRoom: 3, 
                notebook: taccuinoDaSalvare 
            })
        });
        window.location.href = '/index/room/4'; 
    }
    // FINE TRUCCO "SKIP" 👆
    else {
        countMobile++;
        if (countMobile == 2) {
            await aggiornaPunteggioGlobale(-5);
            document.getElementById('EinsteinSoluzione').value = '';
            document.getElementById('EinsteinSoluzione').placeholder ='Indizio: formano un unico concetto';
        } else if (countMobile >= 3) {
            await aggiornaPunteggioGlobale(-7);
            document.getElementById('EinsteinSoluzione').value = '';
            document.getElementById('EinsteinSoluzione').placeholder ='Indizio: sono legate alla velocità';
        } else {
            await aggiornaPunteggioGlobale(-3);
            document.getElementById('EinsteinSoluzione').value = '';
            document.getElementById('EinsteinSoluzione').placeholder = 'Riprova';
        }
        document.getElementById('btnConfermaE').disabled = false;
    }
}

async function controllaMappamondoE() {
    document.getElementById('btnConfermaE').disabled = true;
    const risposta = document.getElementById('EinsteinSoluzione').value.trim().toLowerCase();
    if (risposta === 'riferimento' || risposta === 'sistema di riferimento' || risposta==='di riferimento') {
        const puntiOttenuti = calcolaPunteggioDinamico(30);
        await aggiornaPunteggioGlobale(puntiOttenuti);
        bootstrap.Modal.getInstance(document.getElementById('EinsteinModal')).hide();
        enigmiRisoltiE.mappamondo = true;
        localStorage.setItem('einstein_mappamondo_risolto', 'true');
        mostraMessaggio('Accettato','Perfetto, sai tutto sui sistemi di riferimento! \n Continua ad esplorare.');
        const modalEnigma = document.getElementById('mappamondoE');
        if (modalEnigma) {
            modalEnigma.style.pointerEvents = 'none';
            modalEnigma.style.opacity = 0.5;
        }
        aggiungiAlTaccuino('room3','mappamondo','Il punto da cui osservi in fisica è il punto di riferimento','provvisorio');
        const avatar = document.getElementById('avatarid');
        avatar.classList.add('taccuino-aggiornato');
        setTimeout(() => {
        avatar.classList.remove('taccuino-aggiornato');
        }, 1200);
    } else {
        countMappamondo++;
        if (countMappamondo == 2) {
            await aggiornaPunteggioGlobale(-5);
            document.getElementById('EinsteinSoluzione').value = '';
            document.getElementById('EinsteinSoluzione').placeholder ='Indizio: un esempio classico è il treno';
        } else if (countMappamondo >= 3) {
            await aggiornaPunteggioGlobale(-7);
            document.getElementById('EinsteinSoluzione').value = '';
            document.getElementById('EinsteinSoluzione').placeholder ='Indizio: sistema di...';
        } else {
            await aggiornaPunteggioGlobale(-3);
            document.getElementById('EinsteinSoluzione').value = '';
            document.getElementById('EinsteinSoluzione').placeholder = 'Riprova';
        }
        document.getElementById('btnConfermaE').disabled = false;
    }
}

// funzione per salvare enigmi intermedi e le note provvisorie nel local storage se ricarichi 
// la pagina
function ripristinaStatoEinsetin() {
    if (localStorage.getItem('einstein_mobile_risolto') === 'true') {
        enigmiRisoltiE.mobile = true;
        const modalEnigma = document.getElementById('mobileE');
        if (modalEnigma) {
            modalEnigma.style.pointerEvents = 'none';
            modalEnigma.style.opacity = 0.5;
        }
        aggiungiAlTaccuino('room3','mobile','Lo spazio e il tempo sono relativi','provvisorio');
    }
    if (localStorage.getItem('einstein_mappamondo_risolto') === 'true') {
        enigmiRisoltiE.mappamondo = true;
        const modalEnigma = document.getElementById('mappamondoE');
        if (modalEnigma) {
            modalEnigma.style.pointerEvents = 'none';
            modalEnigma.style.opacity = 0.5;
        }
        aggiungiAlTaccuino('room3','mappamondo','Il punto da cui osservi in fisica è il punto di riferimento','provvisorio');
    }
}
