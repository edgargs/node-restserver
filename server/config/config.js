
process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

process.env.CADUCIDAD_TOKEN = 60*60*24*30;
process.env.SEED = process.env.SEED || 'secret';

//BBDD
let urlDB;
if(process.env.NODE_ENV === 'dev') {
    //urlDB = 'mongodb://localhost:27017/cafe';
    urlDB = 'mongodb+srv://cluster0-d0dpp.mongodb.net/node-db?retryWrites=true';
} else {
    urlDB = 'mongodb+srv://cluster0-d0dpp.mongodb.net/node-db?retryWrites=true';
}

process.env.URLDB = urlDB;
