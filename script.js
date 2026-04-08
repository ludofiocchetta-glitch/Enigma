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
    if (document.getElementById('testoMacchina2')) {
        document.getElementById('testoMacchina2').classList.add('cursore'); 
        inizioStanzaC();
    }
    if (document.getElementById('testoMacchina3')) {
        document.getElementById('testoMacchina3').classList.add('cursore'); 
        inizioStanzaE();
    }
    if (document.getElementById('testoMacchina4')) {
        document.getElementById('testoMacchina4').classList.add('cursore'); 
        inizioStanzaL();
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
    let messaggio="";
    if (avatarName === "detective1") {
        nomeAvatar = "Alan Turing";
    } else if (avatarName === "detective2") {
        nomeAvatar = "Marie Curie";
    } else if (avatarName === "detective3") {
        nomeAvatar = "Albert Einstein";
    } else if (avatarName === "detective4") {
        nomeAvatar = "Ada Lovelace";
    }    
    if (nomeAvatar==="Alan Turing" || nomeAvatar==="Albert Einstein") {
        messaggio = `${nomeAvatar} sei entrato nel primo luogo della tua missione, esploralo bene! \nVai alla ricerca di tutti gli oggetti interessanti, conterranno indizi utili e domande per capire in che posto ti trovi e, soprattutto, per decifrare l'enigma finale. \nSolo rispondendo correttamente a tutto la tua avventura potrà continuare.`;
    }
    else {
        messaggio = `${nomeAvatar} sei entrata nel primo luogo della tua missione, esploralo bene! \nVai alla ricerca di tutti gli oggetti interessanti, conterranno indizi utili e domande per capire in che posto ti trovi e, soprattutto, per decifrare l'enigma finale. \nSolo rispondendo correttamente a tutto la tua avventura potrà continuare.`;
    }
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
    document.getElementById('codiceSoluzione').placeholder = "??????";
}

function controllaLavagna() {
    const risposta=document.getElementById('codiceSoluzione').value.trim().toLowerCase();
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
     document.getElementById('codiceSoluzione').placeholder = "??????";
}

function controllaTelefono() {
    const risposta=document.getElementById('codiceSoluzione').value.trim().toLowerCase();
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
        mostraMessaggio("Accesso Negato", "Agente, non sei ancora pronto per la decodifica finale. Ispeziona e risolvi tutti gli oggetti nella stanza.");
        return;
    }
}

function controllaEnigma() {
    const rispostaUtente = document.getElementById('codiceSoluzione').value.trim().toLowerCase();
    const soluzioneCorretta = "bombe";
    
    if (rispostaUtente === soluzioneCorretta) {
        bootstrap.Modal.getInstance(document.getElementById('enigmaModal')).hide();
        mostraMessaggio("Codice accettato!", "Bravo Agente! La porta si è sbloccata. Preparati a scappare...");
        setTimeout(() => { window.location.href = "room2.html"; }, 3000);
    } else {
        document.getElementById('codiceSoluzione').value = "";
        document.getElementById('codiceSoluzione').placeholder = "Non è il nome che stiamo cercando. Riprova!";
    }
}
/*FUNZIONI STANZA CURIE*/
//funzioni per il testo all'entrata della stanza
function inizioStanzaC() {
    const avatarName= localStorage.getItem('avatar');
    let nomeAvatar = "";
    let messaggio="";
    if (avatarName === "detective1") {
        nomeAvatar = "Alan Turing";
    } else if (avatarName === "detective2") {
        nomeAvatar = "Marie Curie";
    } else if (avatarName === "detective3") {
        nomeAvatar = "Albert Einstein";
    } else if (avatarName === "detective4") {
        nomeAvatar = "Ada Lovelace";
    }    
    messaggio=`${nomeAvatar} ottimo lavoro, hai superato la prima sfida! \n Ora ti trovi nella seconda stanza della tua missione, un luogo pieno di dettagli che potrebbero sfuggire a un occhio distratto. 
    Esplora con attenzione, raccogli tutti gli indizi e mettiti alla prova con le nuove domande. Ogni risposta corretta ti porterà sempre più vicino al tuo obiettivo finale. \n Buona esplorazione!`
    // digitazione automatica
    const boxtesto = document.getElementById('testoMacchina2');
    boxtesto.style.cursor = "pointer";
    boxtesto.onclick = function() {
        skipIntro = true;
    }
    scriviTestoC(messaggio, 0);

}

function scriviTestoC(testo, indice) {
    const elemento = document.getElementById('testoMacchina2');

    if (skipIntro) {
        elemento.innerHTML = testo.replace(/\n/g, "<br>");
        mostraBottoneFinaleC();
        return;
    }

    if (indice < testo.length) {
        let carattere = testo.charAt(indice);
        if (carattere === '\n') {
            document.getElementById('testoMacchina2').innerHTML += "<br>";
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
    const avatar=document.getElementById('avatarcontenitore2');
    avatar.classList.remove('d-none');
    avatar.classList.add('fade-in');
}

let countBilancia=0;
let countPozioni=0;

let oggettiEsploratiC= {
    scaffale:false,
    foglio:false,
    tavolo:false
};

let enigmiRisoltiC= {
    bilancia:false,
    pozioni:false
};

function mostraAtmosferaCurie() {
    mostraMessaggio("Tavolo", "Gli atomi non scompaiono. Cambiano solo disposizione. \n Sotto, una freccia disegnata collega due lati di un’equazione chimica.");
    oggettiEsploratiC.tavolo=true;
}

function mostraIndizioCurie() {
    mostraMessaggio("Appunti appesi", "Un foglio ingiallito è fissato al muro. \n Alcune parole sono cerchiate più volte: \n “In ogni reazione… la massa totale rimane costante.”");
    oggettiEsploratiC.foglio=true;
}

function mostraScaffale() {
    mostraMessaggio("Scaffale polveroso", "Ricerca sulla radioattività-esperimenti con uranio e polonio");
    oggettiEsploratiC.scaffale=true;
}

function apriModalC(titolo, descrizione, richiesta, testoBottone, funzioneControllo, usaPlaceholder) {
    document.getElementById('modalTitleC').innerText = titolo;
    document.getElementById('descrizioneC').innerText = descrizione;
    document.getElementById('richiestaC').innerText = richiesta;
    
    let inputField = document.getElementById('CurieSoluzione');
    inputField.value = "";
    inputField.placeholder = usaPlaceholder ? "a,b,c,d" : "";
    let btnConferma = document.getElementById('btnConfermaC');
    btnConferma.innerText = testoBottone;
    btnConferma.onclick = funzioneControllo;

    var mioModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('CurieModal'));
    mioModal.show();
}


function mostraBilancia() { 
    apriModalC("Bilancia", "Se gli atomi non si creano né si distruggono, cosa bisogna fare per rendere corretta un’equazione chimica?",
        "Inserisci la risposta: ","Controlla",controllaBilancia,false);
        document.getElementById('CurieSoluzione').placeholder = "??????????";
}

function controllaBilancia() {
    const risposta=document.getElementById('CurieSoluzione').value.trim().toLowerCase();
    if (risposta=="bilanciare") {
        bootstrap.Modal.getInstance(document.getElementById('CurieModal')).hide();
        mostraMessaggio("Accettato", "Ottimo! hai capito le equazioni chimiche. \n Puoi continuare a cercare.");
        enigmiRisoltiC.bilancia=true;
    } else {
        countBilancia++;
        if (countBilancia>=3) {
            document.getElementById('CurieSoluzione').value = "";
            document.getElementById('CurieSoluzione').placeholder = "i due lati devono avere lo stesso numero di atomi";
        }
        else if (countBilancia==2) {
            document.getElementById('CurieSoluzione').value = "";
            document.getElementById('CurieSoluzione').placeholder = "Indizio: modificare i numeri davanti le formule";
        }
        else {
            document.getElementById('CurieSoluzione').value = "";
            document.getElementById('CurieSoluzione').placeholder = "Riprova";
        }
    }
}

function mostraPozioni() { 
    apriModalC("Pozioni", "Qual è il nome del principio afferma che la materia non si crea né si distrugge?",
        "Inserisci il nome: ","Controlla",controllaPozioni,false);
        document.getElementById('CurieSoluzione').placeholder = "?????????";
}

function controllaPozioni() {
    const risposta=document.getElementById('CurieSoluzione').value.trim().toLowerCase();
    if (risposta=="lavoisier") {
        bootstrap.Modal.getInstance(document.getElementById('CurieModal')).hide();
        mostraMessaggio("Accettato", "Bravissimo! hai decifrato il principio. \n Continua la tua missione.");
        enigmiRisoltiC.pozioni=true;
    } else {
        countPozioni++;
        if (countPozioni==2) {
            document.getElementById('CurieSoluzione').value = "";
            document.getElementById('CurieSoluzione').placeholder = "Indizio: nome di uno scienziato francese";
        }
        else if (countPozioni>=3) {
            document.getElementById('CurieSoluzione').value = "";
            document.getElementById('CurieSoluzione').placeholder = "Indizio: Lavo...";
        }
        else {
            document.getElementById('CurieSoluzione').value = "";
            document.getElementById('CurieSoluzione').placeholder = "Riprova";
        }
    }
}

function risolviEquazioneFinale() {
    if (enigmiRisoltiC.bilancia && enigmiRisoltiC.pozioni && oggettiEsploratiC.foglio && oggettiEsploratiC.scaffale && oggettiEsploratiC.tavolo) {
        apriModalC("Equazione trovata","Agente, sul tavolo principale c'è un quaderno aperto di Marie. \nL’ultima pagina contiene un’equazione incompleta: \n aFe + bH₂O → cFe₃O₄ + dH₂ \n Sotto è scritto: “Solo chi rispetta la legge potrà aprire il passaggio.”",
            "Inserisci i coefficienti corretti nella forma a,b,c,d","Risolvi l'equazione",controllaEquazione,true);
    }
    else {
        mostraMessaggio("Accesso Negato", "Agente, non sei ancora pronto per la risoluzione finale. Ispeziona e risolvi tutti gli oggetti nella stanza.");
        return;
    }
}

function controllaEquazione() {
    const rispostaUtente = document.getElementById('CurieSoluzione').value.trim();
    const soluzioneCorretta = "3,4,1,4";
    if (rispostaUtente === soluzioneCorretta) {
        bootstrap.Modal.getInstance(document.getElementById('CurieModal')).hide();
        mostraMessaggio("Equazione Bilanciata!", "Ottimo lavoro, Agente! La porta si sta aprendo. Sei pronto per la prossima missione...");
        setTimeout(() => { window.location.href = "room3.html"; }, 3000);
    } else {
        document.getElementById('CurieSoluzione').value = "";
        document.getElementById('CurieSoluzione').placeholder = "Non sono i coefficienti giusti,riprova!";
    }
}

/* FUNZIONI EINSTEIN*/ 
//funzioni per il testo all'entrata della stanza
function inizioStanzaE() {
    const avatarName= localStorage.getItem('avatar');
    let nomeAvatar = "";
    let messaggio="";
    if (avatarName === "detective1") {
        nomeAvatar = "Alan Turing";
    } else if (avatarName === "detective2") {
        nomeAvatar = "Marie Curie";
    } else if (avatarName === "detective3") {
        nomeAvatar = "Albert Einstein";
    } else if (avatarName === "detective4") {
        nomeAvatar = "Ada Lovelace";
    }    
    if (nomeAvatar==="Alan Turing" || nomeAvatar==="Albert Einstein") {
        messaggio=`${nomeAvatar} stai facendo grandi progressi, ormai sei nel vivo della missione!
        Questa è la terza stanza, un passaggio cruciale verso la conclusione. Osserva ogni dettaglio e ragiona con attenzione.
        Non lasciarti sfuggire nulla, perché ogni elemento potrebbe essere la chiave per proseguire.
        Sei sempre più vicino alla verità… continua così!`;
    }
    else {
        messaggio=`${nomeAvatar} stai facendo grandi progressi, ormai sei nel vivo della missione!
        Questa è la terza stanza, un passaggio cruciale verso la conclusione. Osserva ogni dettaglio e ragiona con attenzione.
        Non lasciarti sfuggire nulla, perché ogni elemento potrebbe essere la chiave per proseguire.
        Sei sempre più vicina alla verità… continua così!`;
    }
    // digitazione automatica
    const boxtesto = document.getElementById('testoMacchina3');
    boxtesto.style.cursor = "pointer";
    boxtesto.onclick = function() {
        skipIntro = true;
    }
    scriviTestoE(messaggio, 0);

}

function scriviTestoE(testo, indice) {
    const elemento = document.getElementById('testoMacchina3');

    if (skipIntro) {
        elemento.innerHTML = testo.replace(/\n/g, "<br>");
        mostraBottoneFinaleE();
        return;
    }

    if (indice < testo.length) {
        let carattere = testo.charAt(indice);
        if (carattere === '\n') {
            document.getElementById('testoMacchina3').innerHTML += "<br>";
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
    const avatar=document.getElementById('avatarcontenitore3');
    avatar.classList.remove('d-none');
    avatar.classList.add('fade-in');
}

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

//funzioni per il testo all'entrata della stanza
function inizioStanzaL() {
    const avatarName= localStorage.getItem('avatar');
    let nomeAvatar = "";
    let messaggio="";
    if (avatarName === "detective1") {
        nomeAvatar = "Alan Turing";
    } else if (avatarName === "detective2") {
        nomeAvatar = "Marie Curie";
    } else if (avatarName === "detective3") {
        nomeAvatar = "Albert Einstein";
    } else if (avatarName === "detective4") {
        nomeAvatar = "Ada Lovelace";
    }    
    if (nomeAvatar=="Alan Turing" || nomeAvatar=="Albert Einstein") {
        messaggio = `${nomeAvatar} ce l'hai fatta, ti stai avvicinando sempre di più alla fine.\n Ora ti trovi nella quarta stanza della tua missione, quando sei pronto puoi iniziare l'esplorazione.
        Osserva tutto con attenzione... anche il più piccolo dettaglio potrebbe fare la differenza. \n Fidati del tuo intuito,ormai sei un esperto!\n Buon divertimento :)`;
    }
    else {
        messaggio = `${nomeAvatar} ce l'hai fatta, ti stai avvicinando sempre di più alla fine.\n Ora ti trovi nella quarta stanza della tua missione, quando sei pronta puoi iniziare l'esplorazione.
        Osserva tutto con attenzione... anche il più piccolo dettaglio potrebbe fare la differenza. \n Fidati del tuo intuito,ormai sei un esperta!\n Buon divertimento :)`;
    }
    const boxtesto = document.getElementById('testoMacchina4');
    boxtesto.style.cursor = "pointer";
    boxtesto.onclick = function() {
        skipIntro = true;
    }
    scriviTestoL(messaggio, 0);

}

function scriviTestoL(testo, indice) {
    const elemento = document.getElementById('testoMacchina4');

    if (skipIntro) {
        elemento.innerHTML = testo.replace(/\n/g, "<br>");
        mostraBottoneFinaleL();
        return;
    }

    if (indice < testo.length) {
        let carattere = testo.charAt(indice);
        if (carattere === '\n') {
            document.getElementById('testoMacchina4').innerHTML += "<br>";
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
    const avatar=document.getElementById('avatarcontenitore4');
    avatar.classList.remove('d-none');
    avatar.classList.add('fade-in');
}

let countOrologio=0;
let countLibri=0;

let enigmiRisoltiL= {
    orologio:false,
    libri:false
};

let oggettiEsploratiL= {
    mappamondo2:false,
    libreria:false,
    quadro:false,
    lampada:false,
    camino:false
};

function mostraMappamondo() {
    mostraMessaggio("Mappamondo", "L'Italia e l'Inghilterra sono unite da un filo rosso. \n Accanto c'è un biglietto: \n gli appunti del matematico italiano Menabrea erano solo la teoria, il miracolo è tradurli in ingranaggi... fai molta attenzione alle operazioni di divisione.");
    oggettiEsploratiL.mappamondo2=true;
}

function mostraAtmosferaLovelace() {
    mostraMessaggio("Camino", "Sulla cassa di legno c'è inciso: perché il meccanismo funzioni, il denominatore finale deve nascere da una somma, non da una moltiplicazione.");
    oggettiEsploratiL.camino=true;
}

function mostraLampada() {
    mostraMessaggio("Lampada","La macchina può replicare i modelli perfetti della natura, come la spirale di una conchiglia o i petali di un fiore. \n Ogni nuovo passo si basa sulla somma del passato.")
    oggettiEsploratiL.lampada=true;
}

function mostraQuadro() {
    mostraMessaggio("Quadro","Sotto il quadro, c'è una piccola targhetta: \n il futuro appartiene a chi sa trasformare i numeri in idee.");
    oggettiEsploratiL.quadro=true;
}

function mostraLibreria() {
    mostraMessaggio("Libreria", "Ci sono degli appunti:\n l'equazione per i numeri di Bernoulli è immensa, per iniziare la macchina deve prima calcolare il coefficiente base. \nBisogna prendere (2n-1) e dividerlo per (2n+1)."); 
    oggettiEsploratiL.libreria=true;
}

function apriModalL(titolo, descrizione, richiesta, testoBottone, funzioneControllo, usaPlaceholder) {
    document.getElementById('modalTitleL').innerText = titolo;
    document.getElementById('descrizioneL').innerText = descrizione;
    document.getElementById('richiestaL').innerText = richiesta;
    
    let inputField = document.getElementById('LovelaceSoluzione');
    inputField.value = "";
    inputField.placeholder = usaPlaceholder ? "Vx,Vy" : "";
    let btnConferma = document.getElementById('btnConfermaL');
    btnConferma.innerText = testoBottone;
    btnConferma.onclick = funzioneControllo;

    var mioModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('LovelaceModal'));
    mioModal.show();
}


function mostraOrologio() { 
    apriModalL("Orologio", "Il pendolo oscilla seguendo un ritmo strano, inciso sul legno ci sono dei numeri: 1,1,2,3,5,8...\n Per far partire il primo programma, devi dimostrare di aver capito lo schema perfetto che la natura ha inserito.",
        "Decifra i successivi tre numeri della sequenza: ","Controlla",controllaOrologio,false);
        document.getElementById('LovelaceSoluzione').placeholder = "?,?,?";
}

function controllaOrologio() {
    const risposta=document.getElementById('LovelaceSoluzione').value.trim();
    if (risposta=="13,21,34") {
        bootstrap.Modal.getInstance(document.getElementById('LovelaceModal')).hide();
        mostraMessaggio("Accettato", "Geniale! hai decifrato la sequenza. \n Puoi continuare a cercare.");
        enigmiRisoltiL.orologio=true;
    } else {
        countOrologio++;
        if (countOrologio==2) {
            document.getElementById('LovelaceSoluzione').value = "";
            document.getElementById('LovelaceSoluzione').placeholder = "Indizio: Fibonacci";
        }
        else if (countOrologio>=3) {
            document.getElementById('LovelaceSoluzione').value = "";
            document.getElementById('LovelaceSoluzione').placeholder = "Indizio: somma gli ultimi due numeri";
        }
        else {
            document.getElementById('LovelaceSoluzione').value = "";
            document.getElementById('LovelaceSoluzione').placeholder = "Riprova";
        }
    }
}

function mostraLibri() { 
    apriModalL("Libri", "Un titolo spicca: le istruzioni contano più dei numeri.\n Qualcuno ha sottolineato una frase: 'ordine delle operazioni.'",
        "Come si chiama l'insieme di istruzioni che ti permette di risolvere problemi, tenendo conto dell'ordine: ","Controlla", controllaLibri,false);
    document.getElementById('LovelaceSoluzione').placeholder = "?????????";
}

function controllaLibri() {
    const risposta=document.getElementById('LovelaceSoluzione').value.trim().toLowerCase()
    if (risposta=="algoritmo") {
        bootstrap.Modal.getInstance(document.getElementById('LovelaceModal')).hide();
        mostraMessaggio("Accettato", "Perfetto! hai capito il libro. \n Continua la tua esplorazione.");
        enigmiRisoltiL.libri=true;
    } else {
        countLibri++;
        if (countLibri==2) {
            document.getElementById('LovelaceSoluzione').value = "";
            document.getElementById('LovelaceSoluzione').placeholder = "Indizio: ricetta";
        }
        else if (countLibri>=3) {
            document.getElementById('LovelaceSoluzione').value = "";
            document.getElementById('LovelaceSoluzione').placeholder = "Indizio: lo è quello di Fibonacci";
        }
        else {
            document.getElementById('LovelaceSoluzione').value = "";
            document.getElementById('LovelaceSoluzione').placeholder = "Riprova";
        }
    }
}

function apriEnigmaLovelace() {
    if (enigmiRisoltiL.orologio && enigmiRisoltiL.libri && oggettiEsploratiL.mappamondo2 
    && oggettiEsploratiL.libreria && oggettiEsploratiL.quadro && oggettiEsploratiL.lampada && oggettiEsploratiL.camino) {
        apriModalL("Algoritmo trovato","Agente, hai trovato il libro di Ada Lovelace con il suo algoritmo Note G, ma una variabile sembra sbagliata. Correggila! \n V1 = 1,V2 = 2,V3 = n,V4 = V2*V3,V5 = V4-V1,V6 = V4+V1,V11 = V5/V4",
        "Inserisci la variabile sbagalita e poi quella coretta nella forma Vx,Vy:", "Risolvi l'algoritmo", controllaLovelace,true);
    }
    else {
        mostraMessaggio("Accesso Negato", "Agente, non sei ancora pronto per la risoluzione finale. Ispeziona e risolvi tutti gli oggetti nella stanza.");
        return;
    }
}

function controllaLovelace() {
    const rispostaUtente = document.getElementById('LovelaceSoluzione').value.trim().toLowerCase();
    const soluzioneCorretta = "v4,v6";
    
    if (rispostaUtente === soluzioneCorretta) {
        bootstrap.Modal.getInstance(document.getElementById('LovelaceModal')).hide();
        mostraMessaggio("Risoluzione accettata!", "Bravissimo Agente! sei pronto per la missione finale...");
        setTimeout(() => { window.location.href = "room5.html"; }, 3000);
    } else {
        document.getElementById('LovelaceSoluzione').value = "";
        document.getElementById('LovelaceSoluzione').placeholder = "Non sono le variabili che cerchiamo. Riprova!";
    }
}

