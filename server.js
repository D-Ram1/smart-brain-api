// const supabase = require('@supabase/supabase-js')
const express = require('express');
const bodyParser = require('body-parser'); 
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// const SUPABASE_URL = 'https://poctsikqqmbbhdrizsxw.supabase.co'
// const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvY3RzaWtxcW1iYmhkcml6c3h3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyMDUwMTksImV4cCI6MTk4Mzc4MTAxOX0.YHALq8B3hgvF1smcIsvhEsaH4A7PbIuhRYWHWilG6pA'
// const { createClient } = supabase;
// const supabasedb = createClient(SUPABASE_URL, SUPABASE_KEY)

// async function test() {

// const { data: login, error } = await supabase.from('login').select('*')

// }

const db = knex({
  client: 'pg',
  connection : {
    host : '',
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
  }
});

const app = express();

app.use(cors())
app.use(express.json()); 
app.get('/', (req, res)=> { res.send(db.users) })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, ()=> {
  console.log(`App is running on port ${process.env.PORT}.`);
})
