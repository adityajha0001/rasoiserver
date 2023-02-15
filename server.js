const express = require('express');
import { APP_PORT,DB_URL } from './config';
import router from './router'
import errorHandler from './middlewares/errorHandler';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

app.use('/api',router);



//database collection

mongoose.connect(DB_URL,{ useNewUrlParser:true , useUnifiedTopology:true });
const db = mongoose.connection;
db.on('error', console.error.bind(console,'connnection error:')) 
db.once('open', ()=>{
    console.log('DB connected...');
});
app.listen(APP_PORT,()=>console.log(`listening on port ${APP_PORT}`));