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
app.use(express.static(root));

// Setup Supabase
const { createClient } = require('@supabase/supabase-js');
const supabaseApi = 'https://xuiutjpjlidhoprcntbk.supabase.co';
const supabaseApiKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseApi, supabaseApiKey);

// IMPORTANTE
// numeri stanze: start e login niente, 0 mission, 1 turing, 2 curie, 3 einstein, 4 lovelace,
// 5 final, 6 victory.
// il database incrementa salva la stanza completata e incrementa il numero per mandarti a
// quella che devi fare

// SESSIONI
const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL,
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
        return res.status(400).json({
          error: 'Username già esistente, inserire un altro username!',
        });
      }
      throw error;
    }

    const { data: progress, error: progress_error } = await supabase
      .from('progress')
      .insert([{ username: username, room: 0, score: 0 }])
      .select();

    if (progress_error) throw progress_error;

    const { data: inventory, error: inventory_error } = await supabase
      .from('inventory')
      .insert([{ id: username, notebook: [] }])
      .select();

    if (inventory_error) throw inventory_error;

    const { data: leaderboard_entry, error: leaderboard_error } = await supabase
      .from('Leaderboard')
      .insert([{ user: username, score: 0 }])
      .select();

    if (leaderboard_error) throw leaderboard_error;

    req.session.user = {
      username: data[0].id,
      room: 0,
      inventory: [],
      avatar: avatar,
    };

    return res
      .status(201)
      .json({ message: 'Utente creato con successo', data: req.session.user });
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
      room: game.room + 1, //ricordiamoci di incrementare la stanza di 1 per mandare l'utente alla stanza giusta
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
      .update({ room: 0, score: 0 })
      .eq('username', username);
    await supabase
      .from('inventory')
      .update({ notebook: [] })
      .eq('id', username);

    if (req.session.user) {
      req.session.user.avatar = nuovoAvatar;
      req.session.user.room = 0;
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

//taccuino
app.put('api/update-notebook', async (req, res) => {
  const username = req.session.user.username;
  const { notebook, note } = req.body;
  try {
    const { data: room, error: room_error } = await supabase
      .from('room')
      .select('name')
      .eq('id', req.session.user.room);
    if (room_error) {
      console.error('Errore nel recupero della stanza:', room_error);
      return res.status(500).json({ error: 'Errore interno del server' });
    }
    const { data: text, error: text_error } = await supabase
      .from('notes')
      .select('text')
      .eq('id', note);

    if (text_error) {
      console.error('Errore nel recupero della nota:', text_error);
      return res.status(500).json({ error: 'Errore interno del server' });
    }

    const NewNotebook = [...notebook, { stanza: room, testo: text }]; //aggiungere le altre cose nel caso
    const { data, error } = await supabase
      .from('inventory')
      .update({ notebook: NewNotebook })
      .eq('id', username);
  } catch (err) {
    console.error("Errore nell'aggiornamento del taccuino:", err);
    return res.status(500).json({ error: 'Errore interno del server' });
  }
});

//Enigma risolto
app.put('/api/room-completed', async (req, res) => {
  const username = req.session.user.username;
  const { newRoom } = req.body;
  try {
    const { data, error } = await supabase
      .from('progress')
      .update({ room: newRoom })
      .eq('username', username);

    req.session.user.room = newRoom + 1;
    res
      .status(200)
      .json({ message: 'Stanza aggiornata', newRoom: newRoom + 1 });
  } catch (err) {
    console.error("Errore nell'aggiornamento della stanza:", err);
    return res.status(500).json({ error: 'Errore interno del server' });
  }
});

// aggiornamento e rivelazione classifica
app.put('/api/leaderboard', async (req, res) => {
  const username = req.session.user.username;
  const { final_score } = req.body;
  try {
    const { data, error } = await supabase
      .from('Leaderboard')
      .update({ score: final_score })
      .eq('user', username);

    const { data: leaderboard, error: leaderboard_error } = await supabase
      .from('Leaderboard')
      .select('*')
      .order('score', { ascending: false })
      .limit(5);

    if (leaderboard_error) {
      console.error('Errore nel recupero della classifica:', leaderboard_error);
      return res.status(500).json({ error: 'Errore interno del server' });
    }

    return res
      .status(200)
      .json({ message: 'Classifica aggiornata', leaderboard: leaderboard });
  } catch (err) {
    console.error("Errore nell'aggiornamento della classifica:", err);
    return res.status(500).json({ error: 'Errore interno del server' });
  }
});

//middleware per utente che bara o non loggato
const wrongRoom = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.redirect('/login');
  }
  const requiredroom = parseInt(req.params.numero, 10);
  if (req.session.user.room !== requiredroom) {
    return res.redirect(`/index/room/${req.session.user.room}`);
  }
  next();
};

app.get('/login', (req, res) => {
  res.sendFile(path.join(root, 'pages', 'login.html'));
});

// indirizzamento stanze
app.get('/index/room/:numero', wrongRoom, (req, res) => {
  const numeroStanza = req.params.numero;
  res.sendFile(path.join(root, 'pages', `room${numeroStanza}.html`));
});

//rotta base: mostra la pagina di inizio
app.get('/', (req, res) => {
  res.sendFile(path.join(root, 'index.html'));
});

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// IMPORTANTE
// DA FARE
//taccuino da capire
//mette nel campo del db lo score che gli dà il frontend fatto
// aggiornare numero stanza dopo che l'utente risponde all'enigma finale
//classifica (primi 5 utenti con punteggio più alto) fatto

// AVVIO SERVER
app.listen(port, host, () => {
  console.log(`Server in esecuzione su http://localhost:${port}`);
});
