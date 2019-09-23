const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
var cors = require('cors');
var app = express();
app.use(cors());
app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({

    host : 'localhost',
    user : 'root' ,
    password : 'root',
    database : 'toydb',
    multipleStatements : true 
});

mysqlConnection.connect((err) => {
    if(!err)
    {
        console.log("connection sucessfull");
    }
    else{
        console.log("connection failed");
    }
});

app.get('/toys' , (req, res) => {
    console.log("get called");
    mysqlConnection.query('SELECT * FROM toys' , (err, rows , fields) =>{
     
        if(!err)
        {
            res.send(rows);
        }
        else{
            console.log(err);
        }
    });
});

app.post('/toy' , (req,res) => {

    mysqlConnection.query("Insert into toys(name , featured ,rating) values ('"+req.body.name+"', '"+req.body.featured+"' , '"+req.body.rating+"')" ,(err,result) =>{

         if(!err)
         {
             res.send("inserted");
         }
         else{
             console.log(err);
         }
    });
});

app.put('/toy' , (req , res) => {

    console.log("update called");
    mysqlConnection.query("UPDATE toys SET rating = ? where name = ? ",[req.body.rating,req.body.name] , (err ,results ,fields) =>
    {
        if(!err)
        {
            res.send("updated");
        }
        else{
            console.log(err);
        }
    }
    );
});


app.delete('/toy' , (req,res) => {
    console.log("delete called")
    mysqlConnection.query("DELETE FROM toys where id = ?" ,[req.body.id] , (err,results) =>
    {
        if(!err)
        {
            res.send("deleted");
        }
        else{
            console.log(err);
        }
    }
    );
});


app.listen(8000 , () => console.log("listening on 8000"));