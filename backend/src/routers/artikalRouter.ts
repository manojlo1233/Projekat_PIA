import express from 'express'
import { ArtikalController } from '../controllers/artikalController';

const artikalRouter = express.Router()

artikalRouter.route('/ubaciArtikal').post(
    (req,res)=> new ArtikalController().ubaciArtikal(req, res)
)

artikalRouter.route('/dodajKategoriju').post(
    (req,res)=> new ArtikalController().dodajKategoriju(req, res)
)

artikalRouter.route('/dohvArtikal').post(
    (req,res)=> new ArtikalController().dohvArtikal(req, res)
)

artikalRouter.route('/izmeniArtikal').post(
    (req,res)=> new ArtikalController().izmeniArtikal(req, res)
)

artikalRouter.route('/izbrisiArtikal').post(
    (req,res)=> new ArtikalController().izbrisiArtikal(req, res)
)

export default artikalRouter;

