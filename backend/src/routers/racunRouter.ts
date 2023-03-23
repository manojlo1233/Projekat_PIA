import express from 'express'
import { racunController } from '../controllers/racunController';

const racunRouter = express.Router();

racunRouter.route('/dohvSveOtvorene').post(
    (req,res)=> new racunController().dohvSveOtvorene(req,res)
)

racunRouter.route('/potvrdiRacun').post(
    (req,res)=> new racunController().potvrdiRacun(req,res)
)

racunRouter.route('/dodajStavku').post(
    (req,res)=> new racunController().dodajStavku(req,res)
)

racunRouter.route('/dodajRacunBezStavki').post(
    (req,res)=> new racunController().dodajRacunBezStavki(req,res)
)

racunRouter.route('/potvrdiRacunUgostitelj').post(
    (req,res)=> new racunController().potvrdiRacunUgostitelj(req,res)
)

racunRouter.route('/dohvSveRacune').get(
    (req,res)=> new racunController().dohvSveRacune(req,res)
)

racunRouter.route('/dohvSveRacunePreduzeca').post(
    (req,res)=> new racunController().dohvSveRacunePreduzeca(req,res)
)


export default racunRouter;