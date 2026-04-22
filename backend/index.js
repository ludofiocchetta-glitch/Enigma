const express = require('express')
const app =express()
require('dotenv').config();

const port = 3000
const host = '0.0.0.0'

//Rotte
const path = require("path") //gestione directory vari OS in modo univoco
const root = path.join(__dirname,'..','frontend')
app.use(express.static(root))


//SetupSupabase
const {createClient} = require("@supabase/supabase-js")
const supabaseApi = 'https://xuiutjpjlidhoprcntbk.supabase.co'
const supabaseApiKey =process.env.SUPABASE_KEY;
const supabase =createClient(supabaseApi,supabaseApiKey)

//Funzioni server



//Avvio server 
app.listen(port,host, ()=> {
    console.log(`server in esecuzione su http://localhost: ${port}`)
})