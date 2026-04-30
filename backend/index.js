const express = require('express');
const app = express();
require('dotenv').config();
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
  })
);

app.use(express.json());

// REGISTRAZIONE
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
    
  if(!username || !password) {
      return res.status(400).json({error: `Tutti i campi sono obbligatori` });
  }
  if(password.length < 8) {
      return res.status(400).json({error: `La password deve avere almeno 8 caratteri`});
  }
  
  const salt = 10;
  const password_hash = await bcrypt.hash(password, salt);

  try {
    const { data, error } = await supabase
      .from('User')
      .insert([{ username: username, password: password_hash }])
      .select();

    if (error) {
        if(error.code == '23505') {
            return res.status(400).json({error: "Username già esistente, inserire un altro username!"});
        }
        throw error;
    }

    const { data: progress, error: progress_error } = await supabase
      .from('progress')
      .insert([{ user: username, room: 0, score: 0 }])
      .select();

    if (progress_error) throw progress_error;

    req.session.user = {
      username: data[0].username,
      room: 1,
      inventory: [],
      // va aggiunto l'avatar in futuro
    };

    return res.status(201).json({ message: 'Utente creato con successo', data: req.session.user });

  } catch (err) {
    console.error('Errore nella registrazione: ', err);
    return res.status(500).json({ errore: 'Errore interno del server' });
  }
});

// LOGIN
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const { data: user, error } = await supabase
        .from('User')
        .select('id, username, password')
        .eq('username', username)
        .single();
    
    if (error || !user) {
        return res.status(404).json({error: 'Utente inesistente. REGISTRATI!'});
    }

    if(!(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({error: 'Password errata'});
    }

    const { data: game, error: game_error } = await supabase
      .from('progress')
      .select('username, room')
      .eq('username', user.username)
      .limit(1)
      .single();

    if (game_error) {
      console.error("Errore progressi:", game_error);
      return res.status(500).json({ error: 'Errore database progressi' });
    }

    const { data: inventory, error: inventory_error } = await supabase
      .from('inventory')
      .select('*')
      .eq('username', user.username)
      .single();

    if (inventory_error && inventory_error.code !== 'PGRST116') {
      console.error("Errore inventario:", inventory_error);
      return res.status(500).json({ error: 'Errore database inventario' });
    }

    
    req.session.user = {
      username: user.username,
      room: game.room + 1,
      inventory: inventory ? inventory.notebook : [],
      // va aggiunto avatar
    };

    return res.status(200).json({ message: 'Login effettuato', room: req.session.user.room });

  } catch (err) {
    console.error("Errore generico nel login:", err);
    return res.status(500).json({ error: 'Errore interno del server' });
  }
});

// CONTROLLO SESSIONE
app.get('/api/me', (req, res) => {
    if(req.session.user){
        res.status(200).json(req.session.user);
    }else{
        res.status(401).json({error: "Non loggato"});
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
    // Da implementare
});

// AVVIO SERVER
app.listen(port, host, () => {
  console.log(`Server in esecuzione su http://localhost:${port}`);
});