import express from 'express'
import RasporedModel from "../model/raspored";

export class RasporedController{

    dohvRasporedObjekta = (req: express.Request, res: express.Response)=>{

        let preduzece = req.body.preduzece;
        let drzava = req.body.drzava;
        let grad = req.body.grad;
        let ulicaBroj = req.body.ulicaBroj;

        RasporedModel.findOne({'preduzece':preduzece, 'objekat.drzava': drzava,'objekat.grad': grad, 'objekat.ulicaBroj': ulicaBroj },
                (err,resp)=>{
                    if (err) console.log(err)
                    else res.json(resp);
        })

    }

}