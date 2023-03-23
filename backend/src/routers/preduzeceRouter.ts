import express from 'express'
import { RasporedController } from '../controllers/rasporedController';
import { PreduzeceController } from '../controllers/preduzeceController';

const preduzeceRouter = express.Router();

preduzeceRouter.route('/dohvSveBanke').get(
    (req,res)=> new PreduzeceController().dohvSveBanke(req,res)
)

preduzeceRouter.route('/ubaciPreduzece').post(
    (req,res)=> new PreduzeceController().ubaciPreduzece(req,res)
)

preduzeceRouter.route('/ubaciDetaljePreduzeca').post(
    (req,res)=> new PreduzeceController().ubaciDetaljePreduzeca(req,res)
)

preduzeceRouter.route('/updatePrviPutPreduzece').post(
    (req,res)=> new PreduzeceController().updatePrviPutPreduzece(req,res)
)

preduzeceRouter.route('/dohvDetaljePreduzece').post(
    (req,res)=> new PreduzeceController().dohvDetaljePreduzece(req,res)
)

preduzeceRouter.route('/ubaciNarucioca').post(
    (req,res)=> new PreduzeceController().ubaciNarucioca(req,res)
)

preduzeceRouter.route('/dohvSvaPreduzeca').get(
    (req,res)=> new PreduzeceController().dohvSvaPreduzeca(req,res)
)

preduzeceRouter.route('/dohvSveArtikle').get(
    (req,res)=> new PreduzeceController().dohvSveArtikle(req,res)
)

preduzeceRouter.route('/dohvRasporedObjekta').post(
    (req,res)=> new RasporedController().dohvRasporedObjekta(req,res)
)

preduzeceRouter.route('/prihvatiPreduzece').post(
    (req,res)=> new PreduzeceController().prihvatiPreduzece(req,res)
)

preduzeceRouter.route('/deaktivirajPreduzece').post(
    (req,res)=> new PreduzeceController().deaktivirajPreduzece(req,res)
)

preduzeceRouter.route('/obrisiPreduzeceDetalji').post(
    (req,res)=> new PreduzeceController().obrisiPreduzeceDetalji(req,res)
)

preduzeceRouter.route('/updatePreduzece').post(
    (req,res)=> new PreduzeceController().updatePreduzece(req,res)
)
export default preduzeceRouter;