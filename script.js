function go() {
    const inputname=document.getElementById('inputname');
    const nome=inputname.value;
    const avatar=document.querySelector('input[name="avatar"]:checked').value;
    inputname.classList.remove('is-invalid');

    if (nome.trim() === "") {
        inputname.classList.add('is-invalid');
        inputname.placeholder = "Required field!";
        return;
    }
    localStorage.setItem('username',nome);
    localStorage.setItem('avatar',avatar);
    console.log("Data saved"+nome+avatar+"\n");
    window.location.href = "mission.html";
}

window.onload = function() {
    if (document.getElementById('testoMacchina')) {
        document.getElementById('testoMacchina').classList.add('cursore'); 
        avviaMissione();
    }
    if (document.getElementById('testoMacchina1')) {
        document.getElementById('testoMacchina1').classList.add('cursore'); 
        inizioStanzaT();
    }
    if (document.getElementById('avatarid')) {
        caricaAvatarInAngolo();
    }
};

let skipIntro = false;

function avviaMissione() {
    const avatarName= localStorage.getItem('avatar');
    const userName= localStorage.getItem('username');
    
    let nomeAvatar = "";
    let imgAvatar = "";

    if (avatarName === "detective1") {
        nomeAvatar = "Alan Turing";
        imgAvatar = "Alan Turing.png";
    } else if (avatarName === "detective2") {
        nomeAvatar = "Marie Curie";
        imgAvatar = "Marie Curie.png";
    } else if (avatarName === "detective3") {
        nomeAvatar = "Albert Einstein";
        imgAvatar = "Albert Einstein.png";
    } else if (avatarName === "detective4") {
        nomeAvatar = "Ada Lovelace";
        imgAvatar = "Ada Lovelace.png";
    }
    
    document.getElementById('avatarScelto').src = imgAvatar;
    
    const messaggio = `Benvenuto Agente ${userName}, la tua copertura sarà il profilo di ${nomeAvatar}.\nLa tua missione è vitale: dovrai infiltrarti e completare 5 stanze top-secret. Per fuggire da ciascuna, dovrai trovare gli indizi nascosti e rispondere correttamente ai quesiti scientifici. Fai in fretta, il tempo scorre e le comunicazioni potrebbero interrompersi da un momento all'altro.\nBuona fortuna.`;
    // digitazione automatica
    const boxtesto = document.getElementById('testoMacchina');
    boxtesto.style.cursor = "pointer";
    boxtesto.onclick = function() {
        skipIntro = true;
    }
    scriviTesto(messaggio, 0);
}

// Funzione ricorsiva per l'effetto macchina da scrivere
function scriviTesto(testo, indice) {
    const elemento = document.getElementById('testoMacchina');

    if (skipIntro) {
        elemento.innerHTML = testo.replace(/\n/g, "<br>");
        mostraBottoneFinale();
        return;
    }

    if (indice < testo.length) {
        let carattere = testo.charAt(indice);
        if (carattere === '\n') {
            document.getElementById('testoMacchina').innerHTML += "<br>";
        } else {
            document.getElementById('testoMacchina').innerHTML += carattere;
        }
        setTimeout(() => scriviTesto(testo, indice + 1), 20);
    } else {
        mostraBottoneFinale();
    }
}

function mostraBottoneFinale() {
    document.getElementById('testoMacchina').classList.remove('cursore');
    const bottone = document.getElementById('btnEntra');
    bottone.classList.remove('d-none');
    bottone.classList.add('fade-in');
}

function iniziaEscapeRoom() {
    const avatarname = localStorage.getItem('avatar');
    window.location.href="room1.html";
    
}

const userName = document.getElementById('inputname');

if (userName !== null) {
    campoNome.addEventListener('input', function() {
        this.classList.remove('is-invalid');
        this.placeholder = ""; 
    });
}

function caricaAvatarInAngolo() {
    const avatarname = localStorage.getItem('avatar');
    let imgAvatar = "";
    if (avatarname === "detective1") {
        imgAvatar = "Alan Turing.png";
    } else if (avatarname === "detective2") {
        imgAvatar = "Marie Curie.png";
    } else if (avatarname === "detective3") {
        imgAvatar = "Albert Einstein.png";
    } else if (avatarname === "detective4") {
        imgAvatar = "Ada Lovelace.png";
    }
    const targetImg = document.getElementById('avatarid');
    if (targetImg && imgAvatar !== "") {
        targetImg.src = imgAvatar;
    }
}

function mostraMessaggio(titolo, testo) {
    document.getElementById('infoTitolo').innerText = titolo;
    document.getElementById('infoTesto').innerText = testo;
    var mioModalInfo = new bootstrap.Modal(document.getElementById('infoModal'));
    mioModalInfo.show();
}


/*FUNZIONI STANZA TURING*/
//funzioni per il testo all'entrata della stanza
function inizioStanzaT() {
    const avatarName= localStorage.getItem('avatar');
    let nomeAvatar = "";
    if (avatarName === "detective1") {
        nomeAvatar = "Alan Turing";
    } else if (avatarName === "detective2") {
        nomeAvatar = "Marie Curie";
    } else if (avatarName === "detective3") {
        nomeAvatar = "Albert Einstein";
    } else if (avatarName === "detective4") {
        nomeAvatar = "Ada Lovelace";
    }    
    const messaggio = `${nomeAvatar} sei entrato nel primo luogo della tua missione, esploralo bene! \nVai alla ricerca di tutti gli oggetti interessanti, conterranno indizi utili e domande per capire in che posto ti trovi e, soprattutto, per decifrare l'enigma finale. \nSolo rispondendo correttamente a tutto la tua avventura potrà continuare.`;
    // digitazione automatica
    const boxtesto = document.getElementById('testoMacchina1');
    boxtesto.style.cursor = "pointer";
    boxtesto.onclick = function() {
        skipIntro = true;
    }
    scriviTestoT(messaggio, 0);

}

function scriviTestoT(testo, indice) {
    const elemento = document.getElementById('testoMacchina1');

    if (skipIntro) {
        elemento.innerHTML = testo.replace(/\n/g, "<br>");
        mostraBottoneFinaleT();
        return;
    }

    if (indice < testo.length) {
        let carattere = testo.charAt(indice);
        if (carattere === '\n') {
            document.getElementById('testoMacchina1').innerHTML += "<br>";
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
    const avatar=document.getElementById('avatarcontenitore');
    avatar.classList.remove('d-none');
    avatar.classList.add('fade-in');
}

let countLavagna=0;
let countTelefono=0;

let enigmiRisolti= {
    lavagna:false,
    telefono:false
};

let oggettiEsplorati= {
    mappamondo:false,
    schedario:false,
    cappello:false,
    scatoloni:false
};

function mostraAtmosferaTuring() {
    mostraMessaggio("Mappamondo", "I messaggi attraversano il continente… ma vengono compresi solo in un luogo. \n Non cercare lontano Agente.");
    oggettiEsplorati.mappamondo=true;
}

function mostraIndizioTuring() {
    mostraMessaggio("Schedario Chiuso", "Ci sei quasi, hai trovato un appunto segreto: Le parole più importanti non sono scritte per intero.\n B_MBE");
    oggettiEsplorati.schedario=true;
}

function mostraScatoloni() {
    mostraMessaggio("Scatoloni polverosi", "Scartoffie, appunti tecnici  e... una tazza di tè ormai fredda. \n Qualcuno ha lavorato qui a lungo.");
    oggettiEsplorati.scatoloni=true;
}

function mostraCappello() {
    mostraMessaggio("Cappello", "Un uomo che ha trasformato lettere in armi");
    oggettiEsplorati.cappello=true;
}

/*FUNZIONE PER IL MODALE DINAMICO*/
function apriModal(titolo, descrizione, richiesta, testoBottone, funzioneControllo, usaPlaceholder) {
    document.getElementById('modalTitle').innerText = titolo;
    document.getElementById('descrizione').innerText = descrizione;
    document.getElementById('richiesta').innerText = richiesta;
    
    let inputField = document.getElementById('codiceSoluzione');
    inputField.value = "";
    inputField.placeholder = usaPlaceholder ? "?????" : "";
    let btnConferma = document.getElementById('btnConferma');
    btnConferma.innerText = testoBottone;
    btnConferma.onclick = funzioneControllo;

    var mioModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('enigmaModal'));
    mioModal.show();
}

function mostraLavagna() {
    apriModal("Lavagna", "Se capisci la macchina, capisci tutto.\n GPKIOC",
        "Decifra gli appunti: ", "Controlla", controllaLavagna,false);
}

function controllaLavagna() {
    const risposta=document.getElementById('codiceSoluzione').value.trim().toLowerCase()
    if (risposta=="enigma") {
        bootstrap.Modal.getInstance(document.getElementById('enigmaModal')).hide();
        mostraMessaggio("Accettato", "Geniale! hai decifrato il codice sulla lavagna. \n Puoi continuare a cercare.");
        enigmiRisolti.lavagna=true;
    } else {
        countLavagna++;
        if (countLavagna==2) {
            document.getElementById('codiceSoluzione').value = "";
            document.getElementById('codiceSoluzione').placeholder = "Indizio: spostati nell'alfabeto";
        }
        else if (countLavagna>=3) {
            document.getElementById('codiceSoluzione').value = "";
            document.getElementById('codiceSoluzione').placeholder = "Indizio: shift=2";
        }
        else {
            document.getElementById('codiceSoluzione').value = "";
            document.getElementById('codiceSoluzione').placeholder = "Riprova";
        }
    }
}

function mostraTelefono() {
    apriModal("Telefono", "Ogni numero ha una voce. Ascoltala.\n 20-21-18-9-14-7",
        "Decifra numero: ","Controlla", controllaTelefono,false);
}

function controllaTelefono() {
    const risposta=document.getElementById('codiceSoluzione').value.trim().toLowerCase()
    if (risposta=="turing") {
        bootstrap.Modal.getInstance(document.getElementById('enigmaModal')).hide();
        mostraMessaggio("Accettato", "Fantastico! hai capito il significato nascosto del numero. \n Continua la tua esplorazione.");
        enigmiRisolti.telefono=true;
    } else {
        countTelefono++;
        if (countTelefono==2) {
            document.getElementById('codiceSoluzione').value = "";
            document.getElementById('codiceSoluzione').placeholder = "Indizio: ogni lettera ha un posto";
        }
        else if (countTelefono>=3) {
            document.getElementById('codiceSoluzione').value = "";
            document.getElementById('codiceSoluzione').placeholder = "Indizio: A=1,B=2...";
        }
        else {
            document.getElementById('codiceSoluzione').value = "";
            document.getElementById('codiceSoluzione').placeholder = "Riprova";
        }
    }
}

function mostraEnigmaFinale() {
    if (enigmiRisolti.telefono && enigmiRisolti.lavagna && oggettiEsplorati.mappamondo 
    && oggettiEsplorati.cappello && oggettiEsplorati.scatoloni && oggettiEsplorati.schedario) {
        apriModal("Macchina Enigma Intercettata","Agente, abbiamo decifrato parte del messaggio. Serve il nome della macchina che ha permesso di decifrare i messaggi nemici.",
        "Inserisci il nome: ", "Decodifica la macchina", controllaEnigma,true);
    }
    else {
        mostraMessaggio("Accesso Negato", "Agente, non sei ancora pronto per la decodifica finale. Ispeziona tutti gli oggetti nella stanza.");
        return;
    }
}

function controllaEnigma() {
    const rispostaUtente = document.getElementById('codiceSoluzione').value.trim().toLowerCase();
    const soluzioneCorretta = "bombe";
    
    if (rispostaUtente === soluzioneCorretta) {
        bootstrap.Modal.getInstance(document.getElementById('enigmaModal')).hide();
        mostraMessaggio("Codice Accettato!", "Bravo Agente! La porta si è sbloccata. Preparati a scappare...");
        setTimeout(() => { window.location.href = "room2.html"; }, 3000);
    } else {
        document.getElementById('codiceSoluzione').value = "";
        document.getElementById('codiceSoluzione').placeholder = "Non è il nome che stiamo cercando. Riprova!";
    }
}
/*FUNZIONI STANZA CURIE*/
function mostraAtmosferaCurie() {
    mostraMessaggio("Laboratorio Abbandonato", "Il laboratorio è in rovina, ma l'odore di sostanze chimiche è ancora forte. Qualcosa di importante deve essere nascosto qui...");
}

function mostraIndizioCurie() {
    mostraMessaggio("Appunti appesi", "Qualcuno ha sottolineato tre volte di ricordarsi la legge di Lavoisier: 'Nulla si crea, nulla si distrugge, tutto si trasforma'. Deve essere importante!");
}

function risolviEquazioneFinale() {
    document.getElementById('equazioneSoluzione').value = "";
    document.getElementById('equazioneSoluzione').placeholder = "?,?,?,?";
    var mioModal = new bootstrap.Modal(document.getElementById('equazioneModal'));
    mioModal.show();
}

function controllaEquazione() {
    const rispostaUtente = document.getElementById('equazioneSoluzione').value;
    const soluzioneCorretta = "3,4,1,4";

    if (rispostaUtente === soluzioneCorretta) {
        bootstrap.Modal.getInstance(document.getElementById('equazioneModal')).hide();
        mostraMessaggio("Equazione Bilanciata!", "Ottimo lavoro, Agente! La porta si è sbloccata. Preparati a scappare...");
        setTimeout(() => { window.location.href = "room3.html"; }, 3000);
    } else {
        document.getElementById('equazioneSoluzione').value = "";
        document.getElementById('equazioneSoluzione').placeholder = "ERRATO. Riprova!";
    }
}

/* FUNZIONI EINSTEIN*/ 

function mostraScaffali() {
    mostraMessaggio("Scaffali", "Sugli scaffali vedi un mucchio di libri di fisica, ma nulla che ti sembra utile");
}

function mostraAtmosferaEinstein() {
    mostraMessaggio("Sedia", "Questa è lo studio dove il leggendario Einstein ha concepito le teorie più rivoluzionarie del XX secolo");
}

function mostraIndizioEinstein() {
    mostraMessaggio("Scartoffie", "Trovi una citazione di Einstein \"La massa ed l'energaia sono di fatto equivalenti\"");
}

function apriEnigmaEinstein() {
    document.getElementById('EinsteinSoluzione').value="";
    document.getElementById('EinsteinSoluzione').placeholder="x"
   var mioModal = new bootstrap.Modal(document.getElementById('EinsteinModal'));
    mioModal.show();
}

function controllaEinstein() {
    const solution = "m";
    const UserAnswer = document.getElementById('EinsteinSoluzione').value;

    if (solution == UserAnswer) {
        bootstrap.Modal.getInstance(document.getElementById('EinsteinModal')).hide();
        mostraMessaggio("Equazione risolta!", "Ottimo lavoro, Agente! La porta si è sbloccata. Preparati a scappare...")
        setTimeout(() => {window.location.href= "room4.html"},3000);
    }
    else {
        document.getElementById('EinsteinSoluzione').value = "";
        document.getElementById('EinsteinSoluzione').placeholder = "ERRATO. Riprova!";
    }
}

/* funzioni lovelace*/

function mostraMappamondo() {
    mostraMessaggio("Mappamondo", "Agente immagino ti manchi casa,ma hai una missione da portare a termine");
}

function mostraAtmosferaLovelace() {
    mostraMessaggio("Camino", "Ti trovi nello studio di Ada Lovelace considerata la madre dell'informatica!");
}

function mostraOrologio() {
    mostraMessaggio("Orologio", "Il tempo scorre veloce, corri ad esplorare!")
}

function mostraIndizioLovelace() {
    mostraMessaggio("Appunti", "Sembrano gli appunti di Ada:\n \"Ho scoperto come calcolare i numeri di Bernoulli sulla macchina di Babbage il risultato finale è: \n1/2*(2n-1/2n+1)\"");
}

function apriEnigmaLovelace() {
    document.getElementById('LovelaceSoluzione').value="";
    document.getElementById('LovelaceSoluzione').placeholder="x,x"
   var mioModal = new bootstrap.Modal(document.getElementById('LovelaceModal'));
    mioModal.show();
}

function controllaLovelace() {
    const solution = "V4,V6" 
    const UserAnswer = document.getElementById('LovelaceSoluzione').value;

    if (solution == UserAnswer) {
        bootstrap.Modal.getInstance(document.getElementById('LovelaceModal')).hide();
        mostraMessaggio("Variabile troavata!", "Ottimo lavoro, Agente! La porta si è sbloccata. Preparati a scappare...")
        setTimeout(() => {window.location.href= "room5.html"},3000);
    }
    else {
        document.getElementById('LovelaceSoluzione').value = "";
        document.getElementById('LovelaceSoluzione').placeholder = "ERRATO. Riprova!";
    }


}

