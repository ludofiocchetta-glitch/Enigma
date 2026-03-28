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
    
    if (avatarname === "detective1") {
        window.location.href = "room1.html";
    } else if (avatarname === "detective2") {
        window.location.href = "room2.html";
    } else if (avatarname === "detective3") {
        window.location.href = "room3.html";
    } else if (avatarname === "detective4") {
        window.location.href = "room4.html";
    }
    
}

// Questo "ascolta" ogni volta che l'utente digita qualcosa nel rettangolo
document.getElementById('inputname').addEventListener('input', function() {
    // Appena scrive una lettera, togliamo il bordo rosso
    this.classList.remove('is-invalid');
    this.placeholder = ""; // Resettiamo anche il testo sfumato
});

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

function mostraAtmosfera() {
    mostraMessaggio("Mappamondo", "Non c'è tempo per viaggiare, Agente. La minaccia è qui in Europa...");
}

function mostraIndizio() {
    mostraMessaggio("Schedario Chiuso", "Ho trovato un appunto nascosto: la data cruciale è nascosta dietro la parola CYPHER.");
}

function mostraScatoloni() {
    mostraMessaggio("Scatoloni Polverosi", "Scartoffie, vecchi cavi elettrici e... una tazza di tè mezza vuota. Niente di utile per decifrare Enigma.");
}

function apriEnigmaFinale() {
    document.getElementById('codiceSoluzione').value = "";
    document.getElementById('codiceSoluzione').placeholder = "????";
    var mioModal = new bootstrap.Modal(document.getElementById('enigmaModal'));
    mioModal.show();
}

function controllaEnigma() {
    const rispostaUtente = document.getElementById('codiceSoluzione').value;
    const soluzioneCorretta = "1940";
    
    if (rispostaUtente === soluzioneCorretta) {
        bootstrap.Modal.getInstance(document.getElementById('enigmaModal')).hide();
        mostraMessaggio("Codice Accettato!", "Bravo Agente! La porta si è sbloccata. Preparati a scappare...");
        setTimeout(() => { window.location.href = "room2.html"; }, 3000);
    } else {
        document.getElementById('codiceSoluzione').value = "";
        document.getElementById('codiceSoluzione').placeholder = "ERRATO. Riprova!";
    }
}

