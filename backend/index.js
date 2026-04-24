const express = require('express')
const app =express()
require('dotenv').config();
const session = require('express-session'); 
const pgSession = require('connect-pg-simple')(session); 
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const port = 3000
const host = '0.0.0.0'

//Rotte
const path = require("path") //gestione directory vari OS in modo univoco
const root = path.join(__dirname,'..','frontend')
app.use(express.static(root))


//SetupSupabase
const {createClient} = require("@supabase/supabase-js");
const { table } = require('console');
const supabaseApi = 'https://xuiutjpjlidhoprcntbk.supabase.co'
const supabaseApiKey =process.env.SUPABASE_KEY;
const supabase =createClient(supabaseApi,supabaseApiKey)

//Funzioni server



// SESSIONI
const pgPool= new Pool ({
    connectionString: process.env.DATABASE_URL
})

//setup sessione 
app.use(session({
    store: new pgSession({
    pool: pgPool,
    tableName:'session'}),
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge:  1000 * 60 * 60 * 24,
        httpOnly: true
    }
    
}))

app.use(express.json());


// Registrazione
app.post("/api/register",async (req,res)=> {
    const{username,password}= req.body
    
    if(!username || !password) {
        return res.status(400).json({error:`Tutti i campi sono obbligatori` })
    }
     if(password.length <8) {
        return res.status(400).json({error:`La password deve avere almeno 8 caratteri`})
    }
    const salt=10;
    const password_hash =await bcrypt.hash(password,salt);

     try {

    const {data,error} = await supabase
            .from('User')
            .insert([
                {
                    username: username,
                    password: password_hash
                }
            ])
            .select();

    if (error) {
        if(error.code =='23505') {
            return res.status(400),json({error: "Username già esistente, inserire un altro username!"});
        }
        throw error;
    }
    
    req.session.user = {
        username: data[0].username,
        room: 1,
        inventory: []
        // va aggiunto l'avatar
    }

    return res.status(201).json({message: "Utente creato con successo", data: req.session.user})

    // va aggiunto a user,completamento,inventario


     } catch(err) {
        console.error("Errore nella registrazione: ",err);
        return res.status(500).json({errore: "Errore interno del server"});
     }
} )




//Login
app.post('/index/login', async (req,res) => {

    const {username,password} = req.body;


    const {data: user,error}= await supabase 
        .from('user')
       
        .select(`
            id,
            password
        `)
        .eq(`id`,username)
        .single();
    
    if (error || !user|| !(await bcrypt.compare(password,user.password))) {
        return res.status(401).json({error: 'Username o password errati'})
        
    }

    else {
        const { data: game, error:game_error } = await supabase
        .from('completamento')
        .select('username, room')
        .eq('username',user.id)
        .order('room', { ascending: false }) // Ordina le stanze dalla più grande (Z-A)
        .limit(1) // Prendi solo la prima riga in alto!
        .single(); // Restituisci l'oggetto singolo invece di un array

         if (game_error) {
        console.error(game_error);
        return res.status(500).json({ error: "Errore database" });
    }

         const { data: inventario, error:inventario_error } = await supabase
        .from('inventario')
        .select('*')
        .eq('username', user.id) //cerco rispetto username
        .single();

        if (inventario_error) {
        console.error(inventario_error);
        return res.status(500).json({ error: "Errore database" });
            }


        req.session.user ={
            username: user.id,
            room: game.room +1,
            inventory: inventario.taccuino
            //va aggiunto avatar  
            }
        return res.status(201).json({message: "login effettuato"})
        }
    
})




//Avvio server 
app.listen(port,host, ()=> {
    console.log(`server in esecuzione su http://localhost: ${port}`)
})