import express from 'express'
import { MagacinController } from '../controllers/magacinController';

const magacinRouter = express.Router();

magacinRouter.route('/ubaciMagacin').post(
    (req,res)=> new MagacinController().ubaciMagacin(req,res)
)

magacinRouter.route('/dohvMagacin').post(
    (req,res)=> new MagacinController().dohvMagacin(req,res)
)

magacinRouter.route('/dohvSveMagacine').get(
    (req,res)=> new MagacinController().dohvSveMagacine(req,res)
)

magacinRouter.route('/ubaciArtikal').post(
    (req,res)=> new MagacinController().ubaciArtikal(req, res)
)

magacinRouter.route('/updateMagacin').post(
    (req,res)=> new MagacinController().updateMagacin(req, res)
)

magacinRouter.route('/izmeniArtikalMagacin').post(
    (req,res)=> new MagacinController().izmeniArtikalMagacin(req, res)
)

magacinRouter.route('/izbrisiArtikalMagacin').post(
    (req,res)=> new MagacinController().izbrisiArtikalMagacin(req, res)
)

export default magacinRouter;