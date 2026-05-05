require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const port = 3000;
const host = '0.0.0.0';

// Rotte
const path = require('path');
const root = path.join(__dirname, '..', 'frontend');

// Setup Supabase
const { createClient } = require('@supabase/supabase-js');
const supabaseApi = 'https://xuiutjpjlidhoprcntbk.supabase.co';
const supabaseApiKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseApi, supabaseApiKey);

// IMPORTANTE
// numeri stanze: 0 start, 1 login, 2 mission, 3 turing, 4 curie, 5 einstein, 6 lovelace,
// 7 final, 8 victory
// nel database bisogna salvare il numero di stanza giusto già incrementato in cui rimandare
// l'utente, cioè se un utente ha fatto solo il login salvo 2 per mandarlo a mission
// se letto mission e cliccato inizia missione salvo 3
// se ha risposto all'enigma finale di una stanza salvo come numero la stanza dopo seguendo
// questa numerazione, se ha risposto solo alle domande intermedie salvo il numero di
// quella stanza sempre con questa numerazione
// in pratica dopo che l'utente si è registrato sta già alla 2

// SESSIONI
const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Setup sessione
app.use(
  session({
    store: new pgSession({
      pool: pgPool,
      tableName: 'session',
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 ore
      httpOnly: true,
    },
  }),
);

app.use(express.json());

//SICUREZZA (evita l'accesso diretto alle stanze senza login)
app.use((req, res, next) => {
  if (req.path.startsWith('/pages/room') && req.path.endsWith('.html')) {

    if (!req.session || !req.session.user) {
      return res.redirect('/login');
    }

    //allineamento matematico per le stanze
    const fileIndex = req.session.user.room - 2;

    if (fileIndex >= 0 && fileIndex <= 5) {
      return res.redirect(`/index/room/${fileIndex}`);
    }else if (fileIndex === 6) {
      return res.redirect('/pages/victory.html');
    }
    return res.redirect('/login');
  }
  next();
});

app.use(express.static(root));

// REGISTRAZIONE
app.post('/api/register', async (req, res) => {
  const { username, password, avatar } = req.body;

  if (!username || !password || !avatar) {
    return res.status(400).json({ error: `Tutti i campi sono obbligatori` });
  }
  if (password.length < 8) {
    return res
      .status(400)
      .json({ error: `La password deve avere almeno 8 caratteri` });
  }

  const salt = 10;
  const password_hash = await bcrypt.hash(password, salt);

  try {
    const { data, error } = await supabase
      .from('User')
      .insert([{ id: username, password: password_hash, avatar: avatar }])
      .select();

    if (error) {
      if (error.code == '23505') {
        return res.status(400).json({error: 'Username già esistente, inserire un altro username!'});
      }
      throw error;
    }

    const { data: progress, error: progress_error } = await supabase
      .from('progress')
      .insert([{ username: username, room: 1, score: 0 }])
      .select();

    if (progress_error) throw progress_error;

    const { data: inventory, error: inventory_error } = await supabase
      .from('inventory')
      .insert([{ id: username, notebook: [] }])
      .select();

    if (inventory_error) throw inventory_error;

    req.session.user = {
      username: username,
      room: 2,
      inventory: [],
      avatar: avatar,
    };

    return res.status(201).json({ message: 'Utente creato con successo', data: req.session.user });
  } catch (err) {
    console.error('Errore nella registrazione: ', err);
    return res.status(500).json({ errore: 'Errore interno del server' });
  }
});

// LOGIN
app.post('/api/login', async (req, res) => {
  const { username, password, avatar } = req.body;
  try {
    const { data: user, error } = await supabase
      .from('User')
      .select('id, password, avatar')
      .eq('id', username)
      .single();

    if (error || !user) {
      return res.status(404).json({ error: 'Utente inesistente. Registrati!' });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Password errata' });
    }

    const { data: game, error: game_error } = await supabase
      .from('progress')
      .select('username, room')
      .eq('username', user.id)
      .limit(1)
      .single();

    if (game_error) {
      console.error('Errore progressi:', game_error);
      return res.status(500).json({ error: 'Errore database progressi' });
    }

    const { data: inventory, error: inventory_error } = await supabase
      .from('inventory')
      .select('*')
      .eq('id', user.id)
      .single();

    if (inventory_error && inventory_error.code !== 'PGRST116') {
      console.error('Errore inventario:', inventory_error);
      return res.status(500).json({ error: 'Errore database inventario' });
    }

    req.session.user = {
      username: user.id,
      room: game.room + 1, //incrementare la stanza di 1 per mandare l'utente alla stanza giusta
      inventory: inventory ? inventory.notebook : [],
      avatar: user.avatar,
    };

    return res
      .status(200)
      .json({ message: 'Login effettuato', room: req.session.user.room });
  } catch (err) {
    console.error('Errore generico nel login:', err);
    return res.status(500).json({ error: 'Errore interno del server' });
  }
});

// CONTROLLO SESSIONE
app.get('/api/me', (req, res) => {
  if (req.session.user) {
    res.json({
      username: req.session.user.username,
      room: req.session.user.room,
      avatar: req.session.user.avatar,
    });
  } else {
    res.status(401).json({ error: 'Non loggato' });
  }
});

// RESET PARTITA
app.post('/api/reset-game', async (req, res) => {
  const { username, nuovoAvatar } = req.body;
  try {
    await supabase
      .from('User')
      .update({ avatar: nuovoAvatar })
      .eq('id', username);
    await supabase
      .from('progress')
      .update({ room: 1, score: 0 })
      .eq('username', username);
    await supabase
      .from('inventory')
      .update({ notebook: [] })
      .eq('id', username);

    if (req.session.user) {
      req.session.user.avatar = nuovoAvatar;
      req.session.user.room = 2;
      req.session.user.inventory = [];
    }

    return res.status(200).json({ message: 'Partita resettata' });
  } catch (err) {
    console.error('Errore nel reset:', err);
    return res.status(500).json({ error: 'Impossibile resettare la partita' });
  }
});

// LOGOUT
app.post('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Impossibile eseguire il logout' });
    }

    res.clearCookie('connect.sid');
    return res.status(200).json({ message: 'Logout eseguito correttamente' });
  });
});

// UPDATE SCORE
app.put('/api/update-score', async (req, res) => {
  const { username, newScore } = req.body;
  try {
    const { data, error } = await supabase
      .from('progress')
      .update({ score: newScore })
      .eq('username', username);
  } catch (err) {
    console.error("Errore nell'aggiornamento del punteggio:", err);
    return res.status(500).json({ error: 'Errore interno del server' });
  }
});

//Enigma risolto
app.put('/api/room-completed', async (req, res) => {
  const { username, newRoom } = req.body;
  try {
    const { data, error } = await supabase
      .from('progress')
      .update({ room: newRoom })
      .eq('username', username);

    req.session.user.room = newRoom + 1;
    res.status(200).json({ message: 'Stanza aggiornata', newRoom: newRoom + 1 });
  } catch (err) {
    console.error("Errore nell'aggiornamento della stanza:", err);
    return res.status(500).json({ error: 'Errore interno del server' });
  }
});

//middleware per check login generale
const checkSession = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.redirect('/login');
  }
  next();
};
//middleware per stanza sbagliata
const wrongRoom = (req, res, next) => {
  const requiredroom = parseInt(req.params.numero, 10);
  const actualRoom = req.session.user.room - 2; //allineamento matematico per le stanze

  if (actualRoom === 6) {
    return res.redirect('/pages/victory.html');
  }

  if (requiredroom != actualRoom) {
    return res.redirect(`/index/room/${actualRoom}`);
  }
  next();
};

//middleware per check login
const loggedIn = (req, res, next) => {
  if (req.session && req.session.user) {
    const actualRoom = req.session.user.room - 2; //allineamento matematico per le stanze
    if(actualRoom === 6) {
      return res.redirect('/pages/victory.html');
    }
    return res.redirect(`/index/room/${actualRoom}`);
  }
  next();
};

app.get('/login', loggedIn, (req, res) => {
  res.sendFile(path.join(root, 'pages', 'login.html'));
});

// non accede a mission poichè la sessione parte dalla room 1 e lascio mission al frontrnd
app.get('/index/room/:numero', checkSession,wrongRoom, (req, res) => {
  const numeroStanza = req.params.numero;
  res.sendFile(path.join(root, 'pages', `room${numeroStanza}.html`));
});

//classifica (primi 5 utenti con punteggio più alto)

// AVVIO SERVER
app.listen(port, host, () => {
  console.log(`Server in esecuzione su http://localhost:${port}`);
});
