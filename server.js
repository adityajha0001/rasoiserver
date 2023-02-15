const express = require('express');
import { APP_PORT } from './config';
import router from './router'
import errorHandler from './middlewares/errorHandler';

const app = express();
app.use(express.json());

app.use('/api',router);



app.listen(APP_PORT,()=>console.log(`listening on port ${APP_PORT}`));