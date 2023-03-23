import express from 'express'
import { kategorijaController } from '../controllers/kategorijaController'

const katRouter = express.Router()

katRouter.route('/ubaciKategoriju').post(
    (req,res)=> new kategorijaController().ubaciKategoriju(req, res)
)

katRouter.route('/ubaciPotkategoriju').post(
    (req,res)=> new kategorijaController().ubaciPotkategoriju(req, res)
)

katRouter.route('/dohvSveKategorije').post(
    (req,res)=> new kategorijaController().dohvSveKategorije(req, res)
)



export default katRouter;