function go() {
    const inputname=document.getElementById('inputname');
    const inputpassword=document.getElementById('inputpassword');

    const nome=inputname.value;
    const password=inputpassword.value;
    const avatar=document.querySelector('input[name="avatar"]:checked').value;

    inputname.classList.remove('is-invalid');
    inputpassword.classList.remove('is-invalid');

    if (nome.trim() === "") {
        inputname.classList.add('is-invalid');
        inputname.placeholder = "Campo obbligatorio!";
        return;
    }

    const specialCharRegex = /[!@#$%&*.?_]/;

    if (password.trim()==="") {
        inputpassword.classList.add('is-invalid');
        inputpassword.value="";
        inputpassword.placeholder = "Campo obbligatorio!";
        return;
    }
    
    else if (password.length < 8) {
        inputpassword.classList.add('is-invalid');
        inputpassword.value="";
        inputpassword.placeholder = "Minimo 8 caratteri";
        return;
    }

    else if (!specialCharRegex.test(password)) {
        inputpassword.classList.add('is-invalid');
        inputpassword.value="";
        inputpassword.placeholder = "Minimo 1 carattere speciale !@#$%&*.?_";
        return;
    }

    localStorage.setItem('username',nome);
    localStorage.setItem('avatar',avatar);
    localStorage.setItem('password',password);
    console.log("Data saved"+nome+avatar+password+"\n");
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
    if (document.getElementById('testoMacchina5')) {
        document.getElementById('testoMacchina5').classList.add('cursore'); 
        inizioStanzaF();
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
    var mioModalInfo = bootstrap.Modal.getOrCreateInstance(document.getElementById('infoModal'));
    mioModalInfo.show();
}

//funzioni per il taccuino
function aggiungiAlTaccuino(stanza,oggetto,contenuto,tipo) {
    let taccuino=JSON.parse(localStorage.getItem('taccuinoAgente')) || [];
    taccuino.push({stanza: stanza,oggetto: oggetto,contenuto: contenuto,tipo: tipo});
    localStorage.setItem('taccuinoAgente',JSON.stringify(taccuino));
}

function pulisciTaccuino() {
    let taccuino = JSON.parse(localStorage.getItem('taccuinoAgente')) || [];
    // Filtra e mantieni solo gli elementi che hanno tipo "finale"
    taccuino = taccuino.filter(nota => nota.tipo === "finale");
    localStorage.setItem('taccuinoAgente', JSON.stringify(taccuino));
}

function apriTaccuino() {
    let taccuino = JSON.parse(localStorage.getItem('taccuinoAgente')) || [];
    let testo = "";
    
    if (taccuino.length == 0) {
        testo = "Agente, questo è il tuo taccuino personale. Risolvi gli enigmi per raccogliere indizi.";
    } else {
        taccuino.forEach(nota => {
            if (nota.tipo === "finale") {
                testo += `${nota.stanza} - ${nota.contenuto}\n\n`;
            } else {
                testo += `${nota.stanza}-${nota.oggetto}: ${nota.contenuto}\n\n`;
            }
        });
    }
    mostraMessaggio("Taccuino agente", testo);
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
    document.getElementById('room1').classList.remove('blocco-interazione')
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
    serranda:false,
    cappello:false,
    scatoloni:false
};

function mostraAtmosferaTuring() {
    mostraMessaggio("Mappamondo", "I messaggi attraversano il continente… ma vengono compresi solo in un luogo. \n Non cercare lontano Agente.");
    oggettiEsplorati.mappamondo=true;
}

function mostraIndizioTuring() {
    mostraMessaggio("Serranda", "Ci sei quasi, hai trovato un appunto segreto appeso qui: Le parole più importanti non sono scritte per intero.\n B_MBE");
    oggettiEsplorati.serranda=true;
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
    if (risposta==="enigma") {
        bootstrap.Modal.getInstance(document.getElementById('enigmaModal')).hide();
        mostraMessaggio("Accettato", "Geniale! hai decifrato il codice sulla lavagna. \n Puoi continuare a cercare.");
        enigmiRisolti.lavagna=true;
        const modalEnigma=document.getElementById('lavagnaT');
        if (modalEnigma) {
            modalEnigma.style.pointerEvents="none";
            modalEnigma.style.opacity=0.5;
        }
        aggiungiAlTaccuino("room1","lavagna","GPKIOC corrisponde a enigma","provvisorio");// Aggiungi la classe per far partire l'animazione
        /* animazione taccuino */
        const avatar = document.getElementById('avatarid');
        avatar.classList.add('taccuino-aggiornato');
        setTimeout(() => {
            avatar.classList.remove('taccuino-aggiornato');
        }, 1200);
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
    if (risposta==="turing") {
        bootstrap.Modal.getInstance(document.getElementById('enigmaModal')).hide();
        mostraMessaggio("Accettato", "Fantastico! hai capito il significato nascosto del numero. \n Continua la tua esplorazione.");
        enigmiRisolti.telefono=true;
        const modalEnigma=document.getElementById('telefonoT');
        if (modalEnigma) {
            modalEnigma.style.pointerEvents="none";
            modalEnigma.style.opacity=0.5;
        }
        aggiungiAlTaccuino("room1","telefono","20-21-18-9-14-7 corrisponde a Turing","provvisorio");
        const avatar = document.getElementById('avatarid');
        avatar.classList.add('taccuino-aggiornato');
        setTimeout(() => {
            avatar.classList.remove('taccuino-aggiornato');
        }, 1200);
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
    && oggettiEsplorati.cappello && oggettiEsplorati.scatoloni && oggettiEsplorati.serranda) {
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
        const modalEnigma=document.getElementById('macchinaT');
        if (modalEnigma) {
            modalEnigma.style.pointerEvents="none";
            modalEnigma.style.opacity=0.5;
        }
        pulisciTaccuino();
        aggiungiAlTaccuino("room1","codice","Hai ottenuto questo numero: 20", "finale");
        const avatar = document.getElementById('avatarid');
        avatar.classList.add('taccuino-aggiornato');
        setTimeout(() => {
            avatar.classList.remove('taccuino-aggiornato');
        }, 1200);
        setTimeout(() => { window.location.href = "room2.html"; }, 2500);
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
    document.getElementById('room2').classList.remove('blocco-interazione')
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
    if (risposta==="bilanciare") {
        bootstrap.Modal.getInstance(document.getElementById('CurieModal')).hide();
        mostraMessaggio("Accettato", "Ottimo! hai capito le equazioni chimiche. \n Puoi continuare a cercare.");
        enigmiRisoltiC.bilancia=true;
        const modalEnigma=document.getElementById('bilanciaC');
        if (modalEnigma) {
            modalEnigma.style.pointerEvents="none";
            modalEnigma.style.opacity=0.5;
        }
        const avatar = document.getElementById('avatarid');
        avatar.classList.add('taccuino-aggiornato');
        setTimeout(() => {
            avatar.classList.remove('taccuino-aggiornato');
        }, 1200);
        aggiungiAlTaccuino("room2","bilancia","Un'equazione chimica va bilanciata","provvisorio");
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
    apriModalC("Pozioni", "Qual è il nome della legge che afferma che la materia non si crea né si distrugge?",
        "Inserisci il nome della legge: ","Controlla",controllaPozioni,false);
        document.getElementById('CurieSoluzione').placeholder = "?????????";
}

function controllaPozioni() {
    const risposta=document.getElementById('CurieSoluzione').value.trim().toLowerCase();
    if (risposta==="lavoisier" || risposta==="legge di lavoisier") {
        bootstrap.Modal.getInstance(document.getElementById('CurieModal')).hide();
        mostraMessaggio("Accettato", "Bravissimo! hai decifrato il principio. \n Continua la tua missione.");
        enigmiRisoltiC.pozioni=true;
        const modalEnigma=document.getElementById('pozioniC');
        if (modalEnigma) {
            modalEnigma.style.pointerEvents="none";
            modalEnigma.style.opacity=0.5;
        }
        const avatar = document.getElementById('avatarid');
        avatar.classList.add('taccuino-aggiornato');
        setTimeout(() => {
            avatar.classList.remove('taccuino-aggiornato');
        }, 1200);
        aggiungiAlTaccuino("room2","pozioni","La legge di Lavoisier afferma che la materia non si crea nè si distrugge","provvisorio");
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
        const modalEnigma=document.getElementById('lavagnaC');
        if (modalEnigma) {
            modalEnigma.style.pointerEvents="none";
            modalEnigma.style.opacity=0.5;
        }
        pulisciTaccuino();
        aggiungiAlTaccuino("room2","codice","Hai ottenuto questo numero: 3414", "finale");
        const avatar = document.getElementById('avatarid');
        avatar.classList.add('taccuino-aggiornato');
        setTimeout(() => {
            avatar.classList.remove('taccuino-aggiornato');
        }, 1200);
        setTimeout(() => { window.location.href = "room3.html"; }, 2500);
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
    document.getElementById('room3').classList.remove('blocco-interazione')
    const avatar=document.getElementById('avatarcontenitore3');
    avatar.classList.remove('d-none');
    avatar.classList.add('fade-in');
}

let oggettiEsploratiE= {
    ritratto:false,
    tavolo:false,
    cassetti:false,
    luna:false

};

let enigmiRisoltiE= {
    mappamondo:false,
    mobile:false
};

let countMobile=0;
let countMappamondo=0;

function mostraTavolo() {
    mostraMessaggio("Tavolo", "Tra gli appunti c'è una frase: “Massa ed energia sono la stessa cosa, in forme diverse.”");
    oggettiEsploratiE.tavolo=true;
}

function mostraAtmosferaEinstein() {
    mostraMessaggio("Cassettiera", "Nei cassetti c'è un foglio con una formula:\n E = ? · c² \n Accanto qualcuno ha annotato:“Manca una sola lettera”");
    oggettiEsploratiE.cassetti=true;
}

function mostraIndizioEinstein() {
    mostraMessaggio("Ritratto", "Un uomo dai capelli spettinati ti osserva dalla cornice.\n Sotto è inciso: \n“La fantasia è più importante della conoscenza.”");
    oggettiEsploratiE.ritratto=true;
}

function mostraLuna() {
    mostraMessaggio("Quadro","Ciò che sembra vero per uno, può non esserlo per un altro.");
    oggettiEsploratiE.luna=true;
}

function apriModalE(titolo, descrizione, richiesta, testoBottone, funzioneControllo, usaPlaceholder) {
    document.getElementById('modalTitleE').innerText = titolo;
    document.getElementById('descrizioneE').innerText = descrizione;
    document.getElementById('richiestaE').innerText = richiesta;
    
    let inputField = document.getElementById('EinsteinSoluzione');
    inputField.value = "";
    inputField.placeholder = usaPlaceholder ? "?=??" : "";
    let btnConferma = document.getElementById('btnConfermaE');
    btnConferma.innerText = testoBottone;
    btnConferma.onclick = funzioneControllo;

    var mioModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('EinsteinModal'));
    mioModal.show();
}

function mostraMobile() {
    apriModalE("Mobile", "Quali due grandezze sono relative?",
        "Inserisci le grandezze: ","Controlla",controllaMobile,false);
        document.getElementById('EinsteinSoluzione').placeholder = "?????? e ?????";
}

function controllaMobile() {
    const risposta=document.getElementById('EinsteinSoluzione').value.trim().toLowerCase();
    if (risposta==="spazio e tempo" || risposta==="tempo e spazio") {
        bootstrap.Modal.getInstance(document.getElementById('EinsteinModal')).hide();
        mostraMessaggio("Accettato", "Fortissimo! hai capito quali sono le grandezze. \n Puoi continuare la tua ricerca.");
        enigmiRisoltiE.mobile=true;
        const modalEnigma=document.getElementById('mobileE');
        if (modalEnigma) {
            modalEnigma.style.pointerEvents="none";
            modalEnigma.style.opacity=0.5;
        }
        aggiungiAlTaccuino("room3","mobile","Lo spazio e il tempo sono relativi","provvisorio");
        const avatar = document.getElementById('avatarid');
        avatar.classList.add('taccuino-aggiornato');
        setTimeout(() => {
            avatar.classList.remove('taccuino-aggiornato');
        }, 1200);
    } else {
        countMobile++;
        if (countMobile==2) {
            document.getElementById('EinsteinSoluzione').value = "";
            document.getElementById('EinsteinSoluzione').placeholder = "Indizio: formano un unico concetto";
        }
        else if (countMobile>=3) {
            document.getElementById('EinsteinSoluzione').value = "";
            document.getElementById('EinsteinSoluzione').placeholder = "Indizio: sono legate alla velocità";
        }
        else {
            document.getElementById('EinsteinSoluzione').value = "";
            document.getElementById('EinsteinSoluzione').placeholder = "Riprova";
        }
    }
}

function mostraMappamondoE() {
    apriModalE("Mobile", "Come si chiama il punto di vista da cui osservi un fenomeno?",
    "Inserisci la risposta: ","Controlla",controllaMappamondoE,false);
    document.getElementById('EinsteinSoluzione').placeholder = "???????????";
}

function controllaMappamondoE() {
    const risposta=document.getElementById('EinsteinSoluzione').value.trim().toLowerCase();
    if (risposta==="riferimento" || risposta==="sistema di riferimento") {
        bootstrap.Modal.getInstance(document.getElementById('EinsteinModal')).hide();
        mostraMessaggio("Accettato", "Perfetto, sai tutto sui sistemi di riferimento! \n Continua ad esplorare.");
        enigmiRisoltiE.mappamondo=true;
        const modalEnigma=document.getElementById('mappamondoE');
        if (modalEnigma) {
            modalEnigma.style.pointerEvents="none";
            modalEnigma.style.opacity=0.5;
        }
        aggiungiAlTaccuino("room3","mappamondo","Il punto da cui osservi in fisica è il punto di riferimento","provvisorio");
        const avatar = document.getElementById('avatarid');
        avatar.classList.add('taccuino-aggiornato');
        setTimeout(() => {
            avatar.classList.remove('taccuino-aggiornato');
        }, 1200);
    } else {
        countMappamondo++;
        if (countMappamondo==2) {
            document.getElementById('EinsteinSoluzione').value = "";
            document.getElementById('EinsteinSoluzione').placeholder = "Indizio: un esempio classico è il treno";
        }
        else if (countMappamondo>=3) {
            document.getElementById('EinsteinSoluzione').value = "";
            document.getElementById('EinsteinSoluzione').placeholder = "Indizio: sistema di...";
        }
        else {
            document.getElementById('EinsteinSoluzione').value = "";
            document.getElementById('EinsteinSoluzione').placeholder = "Riprova";
        }
    }
}

function apriEnigmaEinstein() {
    if (enigmiRisoltiE.mappamondo && enigmiRisoltiE.mobile && oggettiEsploratiE.cassetti && oggettiEsploratiE.tavolo 
        && oggettiEsploratiE.ritratto && oggettiEsploratiE.luna) {
        apriModalE("Formula trovata","Agente, sulla lavagna un po' cancellata è scritta la formula scoperta da Einstein che ha rivoluzionato la fisica. \n Completala tu per aprire il passaggio. \n E=...",
            "Inserisci la formula completa","Risolvi l'equazione",controllaEinstein,true);
    }
    else {
        mostraMessaggio("Accesso Negato", "Agente, non sei ancora pronto per la risoluzione finale. Ispeziona e risolvi tutti gli oggetti nella stanza.");
        return;
    }
}

function controllaEinstein() {
    const rispostaUtente = document.getElementById('EinsteinSoluzione').value.trim().toLowerCase();
    const soluzioneCorretta = "e=mc^2";
    if (rispostaUtente === soluzioneCorretta) {
        bootstrap.Modal.getInstance(document.getElementById('EinsteinModal')).hide();
        mostraMessaggio("Formula corretta!", "Bravissimo Agente! \n Il passaggio segreto si sta aprendo, puoi continuare la tua missione...");
        const modalEnigma=document.getElementById('lavagnaE');
        if (modalEnigma) {
            modalEnigma.style.pointerEvents="none";
            modalEnigma.style.opacity=0.5;
        }
        pulisciTaccuino();
        aggiungiAlTaccuino("room3","codice","Hai ottenuto questo numero: 2", "finale");
        const avatar = document.getElementById('avatarid');
        avatar.classList.add('taccuino-aggiornato');
        setTimeout(() => {
            avatar.classList.remove('taccuino-aggiornato');
        }, 1200);
        setTimeout(() => { window.location.href = "room4.html"; }, 2500);
    } else {
        document.getElementById('EinsteinSoluzione').value = "";
        document.getElementById('EinsteinSoluzione').placeholder = "Non è questa la formula che cerchiamo,riprova!";
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
    document.getElementById('room4').classList.remove('blocco-interazione')
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
    if (risposta==="13,21,34") {
        bootstrap.Modal.getInstance(document.getElementById('LovelaceModal')).hide();
        mostraMessaggio("Accettato", "Geniale! hai decifrato la sequenza. \n Puoi continuare a cercare.");
        enigmiRisoltiL.orologio=true;
        const modalEnigma=document.getElementById('orologioL');
        if (modalEnigma) {
            modalEnigma.style.pointerEvents="none";
            modalEnigma.style.opacity=0.5;
        }
        aggiungiAlTaccuino("room4","orologio","La sequenza di Fibonacci continua con 13,21,34","provvisorio");
        const avatar = document.getElementById('avatarid');
        avatar.classList.add('taccuino-aggiornato');
        setTimeout(() => {
            avatar.classList.remove('taccuino-aggiornato');
        }, 1200);
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
    if (risposta==="algoritmo") {
        bootstrap.Modal.getInstance(document.getElementById('LovelaceModal')).hide();
        mostraMessaggio("Accettato", "Perfetto! hai capito il libro. \n Continua la tua esplorazione.");
        enigmiRisoltiL.libri=true;
        const modalEnigma=document.getElementById('libriL');
        if (modalEnigma) {
            modalEnigma.style.pointerEvents="none";
            modalEnigma.style.opacity=0.5;
        }
        aggiungiAlTaccuino("room4","libri","L'algoritmo è una sequenza di istruzioni ordinate","provvisorio");
        const avatar = document.getElementById('avatarid');
        avatar.classList.add('taccuino-aggiornato');
        setTimeout(() => {
            avatar.classList.remove('taccuino-aggiornato');
        }, 1200);
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
        apriModalL("Algoritmo trovato","Agente, hai trovato il libro di Ada Lovelace con il suo algoritmo Note G, ma una variabile sembra sbagliata. Correggila! \n V1 = 1,V2 = 2,V3 = n,V4 = V2*V3,V5 = V4-V1,V6 = V4+V1,V7 = V5/V4",
        "Inserisci la variabile sbagliata e poi quella coretta nella forma Vx,Vy:", "Risolvi l'algoritmo", controllaLovelace,true);
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
        const modalEnigma=document.getElementById('appuntiL');
        if (modalEnigma) {
            modalEnigma.style.pointerEvents="none";
            modalEnigma.style.opacity=0.5;
        }
        pulisciTaccuino();
        aggiungiAlTaccuino("room4","codice","Hai ottenuto questo numero: 46", "finale");
        const avatar = document.getElementById('avatarid');
        avatar.classList.add('taccuino-aggiornato');
        setTimeout(() => {
            avatar.classList.remove('taccuino-aggiornato');
        }, 1200);
        setTimeout(() => { window.location.href = "room5.html"; }, 2500);
    } else {
        document.getElementById('LovelaceSoluzione').value = "";
        document.getElementById('LovelaceSoluzione').placeholder = "Non sono le variabili che cerchiamo. Riprova!";
    }
}

//room5
function inizioStanzaF() {
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
        messaggio=`${nomeAvatar} Sei arrivato all’ultima fase. \nLe quattro stanze non erano casuali, ogni ambiente era un test. Ogni mente -Alan Turing, Marie Curie, Albert Einstein, Ada Lovelace — ti ha fornito gli strumenti necessari. 
        Non troverai nuove informazioni qui, solo connessioni. I dati che ti servono li hai già raccolti, ora devi dimostrare di saperli usare.
        Analizza ciò che hai visto, controlla i tuoi appunti, ricostruisci il percorso e individua il codice.
        La missione si conclude qui. \nLa via d’uscita è già nelle tue mani...`
    }
    else {
        messaggio=`${nomeAvatar} Sei arrivata all’ultima fase. \nLe quattro stanze non erano casuali, ogni ambiente era un test. Ogni mente -Alan Turing, Marie Curie, Albert Einstein, Ada Lovelace — ti ha fornito gli strumenti necessari. 
        Non troverai nuove informazioni qui, solo connessioni. I dati che ti servono li hai già raccolti, ora devi dimostrare di saperli usare.
        Analizza ciò che hai visto, controlla i tuoi appunti, ricostruisci il percorso e individua il codice.
        La missione si conclude qui. \nLa via d’uscita è già nelle tue mani...`
    }
    // digitazione automatica
    const boxtesto = document.getElementById('testoMacchina5');
    boxtesto.style.cursor = "pointer";
    boxtesto.onclick = function() {
        skipIntro = true;
    }
    scriviTestoF(messaggio, 0);

}

function scriviTestoF(testo, indice) {
    const elemento = document.getElementById('testoMacchina5');

    if (skipIntro) {
        elemento.innerHTML = testo.replace(/\n/g, "<br>");
        mostraBottoneFinaleF();
        return;
    }

    if (indice < testo.length) {
        let carattere = testo.charAt(indice);
        if (carattere === '\n') {
            document.getElementById('testoMacchina5').innerHTML += "<br>";
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
    document.getElementById('room5').classList.remove('blocco-interazione')
    const avatar=document.getElementById('avatarcontenitore5');
    avatar.classList.remove('d-none');
    avatar.classList.add('fade-in');
}

let oggettiEsploratiF= {
    uomo:false
};

let enigmiRisoltiF= {
    muro:false
};

let countMuro=0;

function mostraIndizioUomo() {
    mostraMessaggio("Mandante", "Finalmente, sapevo che saresti arrivato fin qui!\n Hai attraversato grandi menti… ma non hai ancora finito, la conoscenza non serve a nulla se non sai collegarla.\n Hai dimostrato di saper osservare, analizzare, dedurre, ora non ti resta che un ultimo passo. \nIl codice che cerci non è nascosto qui, è dentro ciò che hai già fatto.\nSolo chi comprende l’insieme può andare oltre.");
    oggettiEsploratiF.uomo=true;
}

function apriModalF(titolo, descrizione, richiesta, testoBottone, funzioneControllo, usaPlaceholder) {
    document.getElementById('modalTitleF').innerText = titolo;
    document.getElementById('descrizioneF').innerText = descrizione;
    document.getElementById('richiestaF').innerText = richiesta;
    
    let inputField = document.getElementById('FinalSoluzione');
    inputField.value = "";
    inputField.placeholder = usaPlaceholder ? "??????" : "";
    let btnConferma = document.getElementById('btnConfermaF');
    btnConferma.innerText = testoBottone;
    btnConferma.onclick = funzioneControllo;

    var mioModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('FinalModal'));
    mioModal.show();
}

function mostraMuro() {
    apriModalF("Intrecci", "Agente, il mandante vuole sapere qual è il linguaggio che avevano in comune tutte le stanze.","Inserisci la soluzione","Controlla", controllaMuro, true);
}

function controllaMuro() {
    const risposta=document.getElementById('FinalSoluzione').value.trim().toLowerCase()
    if (risposta==="logica") {
        bootstrap.Modal.getInstance(document.getElementById('FinalModal')).hide();
        mostraMessaggio("Accettato", "Agente bravissimo, hai capito il modo di ragionare.");
        enigmiRisoltiF.muro=true;
        const modalEnigma=document.getElementById('muroF');
        if (modalEnigma) {
            modalEnigma.style.pointerEvents="none";
            modalEnigma.style.opacity=0.5;
        }
        const avatar = document.getElementById('avatarid');
        avatar.classList.add('taccuino-aggiornato');
        setTimeout(() => {
            avatar.classList.remove('taccuino-aggiornato');
        }, 1200);
        localStorage.clear()
    } else {
        countMuro++;
        if (countMuro==2) {
            document.getElementById('FinalSoluzione').value = "";
            document.getElementById('FinalSoluzione').placeholder = "fondamentale per l'AI";
        }
        else if (countMuro>=3) {
            document.getElementById('FinalSoluzione').value = "";
            document.getElementById('FinalSoluzione').placeholder = "lo è quella del primo ordine";
        }
        else {
            document.getElementById('FinalSoluzione').value = "";
            document.getElementById('FinalSoluzione').placeholder = "Pensaci bene, è un linguaggio formale";
        }
    }
}

// Gestione Audio e Volume
document.addEventListener('DOMContentLoaded', function() {
    const bgMusic = document.getElementById('bgMusic');
    const volumeSlider = document.getElementById('volumeSlider');
    const musicBtn = document.querySelector('.btn-music-game');
    if (bgMusic && volumeSlider && musicBtn) {
        bgMusic.volume = volumeSlider.value;
        volumeSlider.addEventListener('input', function() {
            bgMusic.volume = this.value;
        });
        const startMusic = () => {
            if (bgMusic.paused) {
                bgMusic.play().then(() => {
                    console.log("Musica avviata con successo!");
                    document.removeEventListener('click', startMusic);
                    document.removeEventListener('keydown', startMusic);
                }).catch(error => {
                    console.log("Autoplay bloccato, in attesa di interazione:", error);
                });
            }
        };
        startMusic();
        document.addEventListener('click', startMusic);
        document.addEventListener('keydown',startMusic);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const bgMusic = document.getElementById('bgMusic');
    const volumeSlider = document.getElementById('volumeSlider');
    const musicBtn = document.querySelector('.btn-music-gameT');
    if (bgMusic && volumeSlider && musicBtn) {
        bgMusic.volume = volumeSlider.value;
        volumeSlider.addEventListener('input', function() {
            bgMusic.volume = this.value;
        });
        const startMusic = () => {
            if (bgMusic.paused) {
                bgMusic.play().then(() => {
                    console.log("Musica avviata con successo!");
                    document.removeEventListener('click', startMusic);
                    document.removeEventListener('keydown', startMusic);
                }).catch(error => {
                    console.log("Autoplay bloccato, in attesa di interazione:", error);
                });
            }
        };
        startMusic();
        document.addEventListener('click', startMusic);
        document.addEventListener('keydown',startMusic);
    }
});

//tasto invio
document.addEventListener('keydown', function(event) {
    if(event.key == 'Enter'){
        const openModal = document.querySelector('.modal.show')
        if(openModal){
            event.preventDefault();

            const confirmButton = openModal.querySelector('[id^="btnConferma"]')
            const closeButton = openModal.querySelector('.modal-footer [data-bs-dismiss="modal"]')

            if(confirmButton){
                confirmButton.click();
            }else if(closeButton){
                closeButton.click();
            }
        }
    }
});