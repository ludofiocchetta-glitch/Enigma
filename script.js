function go() {
    const nome=document.getElementById('inputname').value;
    const avatar=document.querySelector('input[name="avatar"]:checked').value;
    if (nome.trim()==="") {
        alert("Insert name\n");
        return;
    }
    localStorage.setItem('username',nome);
    localStorage.setItem('avatar',avatar);
    console.log("Data saved"+nome+avatar+"\n");
    window.location.href = "room1.html";
}

function mostraAtmosfera() {
    alert("Non c'è tempo per viaggiare, Agente. La minaccia è qui in Europa...");
}

function mostraIndizio() {
    alert("Ho trovato un appunto nascosto: la data cruciale è nascosta dietro la parola CYPHER.\n");
}

function apriEnigmaFinale() {
    document.getElementById('codiceSoluzione').value = "";
    var mioModal = new bootstrap.Modal(document.getElementById('enigmaModal'));
    mioModal.show();
}

function controllaEnigma() {
    const rispostaUtente = document.getElementById('codiceSoluzione').value;
    const soluzioneCorretta = "1940"; 
    
    if (rispostaUtente === soluzioneCorretta) {
        alert("Codice Accettato! Stai scappando verso la Room 2...");
        bootstrap.Modal.getInstance(document.getElementById('enigmaModal')).hide();
        
        // trasporto alla Room 2
        // window.location.href = "room2.html"; 
    } else {
        alert("Codice Errato, Agente. Riprova!");
        document.getElementById('codiceSoluzione').value = ""; 
    }
}

function mostraScatoloni() {
    alert("Scartoffie, vecchi cavi elettrici e... una tazza di tè mezza vuota. Niente di utile per decifrare Enigma.");
}