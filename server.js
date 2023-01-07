const express = require('express')
const mysql = require('mysql');
const myconn = require('express-myconnection')
const app = express();
const cors=require('cors')

const rutas = require('./rutas')
app.set('port', 3002)
const db = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Nintendo64',
    database: 'prueba'
}

app.use(myconn(mysql, db, 'single'))
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(cors({
    origin:'*'
}))


app.use('/api', rutas)
app.get('/', (req,res)=>{
    res.send('Api para PlantIoT');
})


app.listen(app.get('port'),() =>{
 console.log('server running | port ',app.get('port'))
})
