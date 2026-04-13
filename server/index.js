const express = require('express')
const app =express()

const port = 3000
const host = '0.0.0.0'

//Rotte
const path = require("path") //gestione directory vari OS in modo univoco
const root = path.join(__dirname,'..','public')
app.use(express.static(root))


//SetupSupabase
const {createClient} = require("@supabase/supabase-js")
const supabaseApi = 'https://iblnubgcuixwisofranz.supabase.co'
const supabaseApiKey = 'sb_publishable_KsiaMEm63i8xkGs-r829yA_YYII_mKb'
const supabase =createClient(supabaseApi,supabaseApiKey)

//Funzioni server



//Avvio server 
app.listen(port,host, ()=> {
    console.log(`server in esecuzione su http://localhost: ${port}`)
})