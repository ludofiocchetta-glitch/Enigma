// STANZA MISSION
//Funzione introduzione stanza
function avviaMissione() {
    const avatarName = localStorage.getItem('avatar');
    const userName = localStorage.getItem('username');

    let nomeAvatar = '';
    let imgAvatar = '';

    if (avatarName === 'detective1') {
        nomeAvatar = 'Alan Turing';
        imgAvatar = '/assets/images/Alan Turing.png';
    } else if (avatarName === 'detective2') {
        nomeAvatar = 'Marie Curie';
        imgAvatar = '/assets/images/Marie Curie.png';
    } else if (avatarName === 'detective3') {
        nomeAvatar = 'Albert Einstein';
        imgAvatar = '/assets/images/Albert Einstein.png';
    } else if (avatarName === 'detective4') {
        nomeAvatar = 'Ada Lovelace';
        imgAvatar = '/assets/images/Ada Lovelace.png';
    }

    document.getElementById('avatarScelto').src = imgAvatar;

    const messaggio = `Benvenuto Agente ${userName}, la tua copertura sarà il profilo di ${nomeAvatar}.\nLa tua missione è vitale: dovrai infiltrarti e completare 4 stanze top-secret. Per fuggire da ciascuna, dovrai trovare gli indizi nascosti e rispondere correttamente ai quesiti scientifici. Fai in fretta, il tempo scorre e le comunicazioni potrebbero interrompersi da un momento all'altro.\nBuona fortuna.`;
    // digitazione automatica
    const boxtesto = document.getElementById('testoMacchina');
    boxtesto.style.cursor = 'pointer';
    boxtesto.onclick = function () {
        skipIntro = true;
    };
    scriviTesto(messaggio, 0);
}

// Funzione per scrittura messaggio con l'effetto macchina da scrivere

let skipIntro = false;

function scriviTesto(testo, indice) {
  const elemento = document.getElementById('testoMacchina');

  if (skipIntro) {
    elemento.innerHTML = testo.replace(/\n/g, '<br>');
    mostraBottoneFinale();
    return;
  }

  if (indice < testo.length) {
    let carattere = testo.charAt(indice);
    if (carattere === '\n') {
      document.getElementById('testoMacchina').innerHTML += '<br>';
    } else {
      document.getElementById('testoMacchina').innerHTML += carattere;
    }
    setTimeout(() => scriviTesto(testo, indice + 1), 20);
  } else {
    mostraBottoneFinale();
  }
}

//Vai alla missione
function mostraBottoneFinale() {
  document.getElementById('testoMacchina').classList.remove('cursore');
  const bottone = document.getElementById('btnEntra');
  bottone.classList.remove('d-none');
  bottone.classList.add('fade-in');
}
