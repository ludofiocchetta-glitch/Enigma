
function start() {
        document.getElementById('homepage').classList.add('d-none');
        document.getElementById('user').classList.remove('d-none');
        document.getElementById('user').classList.add('fade-in');
}

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
    document.getElementById('user').classList.add('d-none');
    document.getElementById('room1').classList.remove('d-none');
    void room1Div.offsetWidth;
    document.getElementById('room1').classList.add('fade-in-slow');
}