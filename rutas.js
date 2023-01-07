const express = require('express')
const rutas = express.Router()

rutas.get('/usuario', (req,res)=>{
    req.getConnection((err, conn)=> {
if(err) return res.send(err)
conn.query('SELECT * FROM usuario',(err, rows) =>{
    if(err) return res.send(err)
    res.json(rows)
})

    })
})

rutas.get('/suelo', (req,res)=>{
    req.getConnection((err, conn)=> {
if(err) return res.send(err)
conn.query('SELECT humSuelo FROM planta',(err, rows) =>{
    if(err) return res.send(err)
    res.json(rows)
})

    })
})


rutas.post('/login', function(request,response){
let name = request.body.name;
let passw = request.body.passw;
if(name && passw){
request.getConnection((err,conn) =>{
conn.query('SELECT * FROM usuario where name = ? AND passw = ?', [name, passw],function(error,results,fields){
if (error) throw error;
if (results.length > 0){
console.log("Usuario encontrado")
response.send("Usuario encontrado")
}else{
console.log("No valido")
response.send("Usuario o contraseña invalidos")
}
response.end();
})
})
} else{
console.log("Invalido")
response.send("Introduzca ambos campos")
response.end()
}
})

rutas.post('/usuario', (req,res)=>{
    req.getConnection((err, conn)=> {
if(err) return res.send(err)
 conn.query('INSERT INTO usuario set ?',[req.body],(err, rows) =>{
     if(err) return res.send(err)

     res.send('Se registro con exito el usuario');
 })
 
    })
})

rutas.post('/planta', (req,res)=>{
    const date=  new Date().toISOString()
    const fecha=date.slice(0,10)
    const hora=date.slice(11,19)
    req.getConnection((err, conn)=> {
if(err) return res.send(err)
console.log(req.body )
 conn.query('INSERT INTO planta set ?',[req.body],(err, rows) =>{
     if(err) return res.send(err)

     res.send('Se registro los datos actuales de la planta');
 })
 
    })
})

rutas.get('/planta', (req,res)=>{
    req.getConnection((err, conn)=> {
if(err) return res.send(err)
conn.query('SELECT * FROM planta',(err, rows) =>{
    if(err) return res.send(err)
    res.json(rows)
})

    })
})

module.exports = rutas
