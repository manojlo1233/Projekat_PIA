import express from 'express'
import { userController } from '../controllers/userController';

const userRouter = express.Router();

userRouter.route('/login').post(
    (req,res)=> new userController().login(req,res)
)

userRouter.route('/dohvKorisnika').post(
    (req,res)=> new userController().dohvKorisnika(req,res)
)

userRouter.route('/promeniLozinku').post(
    (req,res)=> new userController().promeniLozinku(req,res)
)

userRouter.route('/ubaciKupca').post(
    (req,res)=> new userController().ubaciKupca(req,res)
)

userRouter.route('/proveriKupca').post(
    (req,res)=> new userController().proveriKupca(req,res)
)

userRouter.route('/proveriPreduzece').post(
    (req,res)=> new userController().proveriPreduzece(req,res)
)

export default userRouter;