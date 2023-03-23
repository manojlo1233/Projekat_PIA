import express from 'express'
import { FisKasaController } from '../controllers/fis_kaseController'


const kasaRouter = express.Router()

kasaRouter.route('/ubaciKasu').post(
    (req,res)=> new FisKasaController().ubaciKasu(req, res)
)

kasaRouter.route('/dohvKasu').post(
    (req,res)=> new FisKasaController().dohvKasu(req, res)
)

kasaRouter.route('/dohvSveKase').get(
    (req,res)=> new FisKasaController().dohvSveKase(req, res)
)

kasaRouter.route('/ubaciArtikal').post(
    (req,res)=> new FisKasaController().ubaciArtikal(req, res)
)

kasaRouter.route('/updateKasa').post(
    (req,res)=> new FisKasaController().updateKasa(req, res)
)

kasaRouter.route('/izmeniArtikalKasa').post(
    (req,res)=> new FisKasaController().izmeniArtikalKasa(req, res)
)

kasaRouter.route('/izbrisiArtikalKasa').post(
    (req,res)=> new FisKasaController().izbrisiArtikalKasa(req, res)
)

export default kasaRouter;