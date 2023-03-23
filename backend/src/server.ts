import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import userRouter from './routers/userRouter';
import preduzeceRouter from './routers/preduzeceRouter'
import magacinRouter from './routers/magacinRouter';
import kasaRouter from './routers/kasaRouter';
import artikalRouter from './routers/artikalRouter';
import katRouter from './routers/katRouter';
import racunRouter from './routers/racunRouter';


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/PIAProjekat')
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log("db.connected")
})
const router = express.Router()
router.use('/preduzece', preduzeceRouter)
router.use('/user', userRouter)
router.use('/magacin', magacinRouter)
router.use('/kasa', kasaRouter)
router.use('/artikal', artikalRouter)
router.use('/kat', katRouter)
router.use('/racun', racunRouter)

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));