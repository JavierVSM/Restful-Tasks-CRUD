const express = require ('express');
const mongoose = require ('mongoose');
const path = require( 'path' );
const cors = require( 'cors' );
const {AppRouter} = require( './server/routes/appRouter' );

require( './server/config/database' );
const app = express ();

app.use(cors());
app.use(express.static(path.join(__dirname, "/client/static")));
app.use(express.urlencoded({extendend:true}) );
app.use(express.json());

app.set('views', __dirname+ '/client/views');
app.set ('view engine', 'ejs');

app.use('/', AppRouter);

app.listen (8080, function (){
    console.log ("The user server is running on 8080")
});