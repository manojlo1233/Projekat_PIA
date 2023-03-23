import express from 'express'
import KatModel from "../model/kategorija";

export class kategorijaController{
   
    ubaciKategoriju = (req: express.Request, res: express.Response)=>{
        let preduzece = req.body.preduzece;
        let kategorija = req.body.kategorija;
        
        KatModel.findOne({'kategorija': kategorija, 'preduzece': preduzece}, (err,resp)=>{
            if (err) console.log(err)
            else if (resp) res.json({'message': 'Kategorija postoji'})
            else{
                let kat = new KatModel({
                    preduzece: preduzece,
                    kategorija: kategorija,
                    potkategorije: new Array()
                })
        
                kat.save((err,resp)=>{
                    if (err) console.log(err)
                    else res.json({'message':'Kategorija ubacena'})
                })
            }
        })
       
        
    }

    ubaciPotkategoriju = (req: express.Request, res: express.Response)=>{
        let preduzece = req.body.preduzece;
        let kategorija = req.body.kategorija;
        let potkategorija = req.body.potkategorija;

        KatModel.findOne({'kategorija': kategorija, 'preduzece': preduzece }, (err,resp)=>{
            if (err) console.log(err)
            else if (resp){
                const pot = {
                    potkategorija: potkategorija,
                }
                KatModel.findOne({'kategorija': kategorija, 'preduzece': preduzece, 'potkategorije.potkategorija' : potkategorija}, (err,resp)=>{
                    if (err) console.log(err)
                    else if ( resp) res.json({'message':'Potkategorija postoji'})
                    else{
                        KatModel.updateOne({'kategorija': kategorija, 'preduzece': preduzece}, {$push: {'potkategorije': pot}}, (err,resp)=>{
                            if (err) console.log(err)
                            else res.json({'message':'Potkategorija ubacena'})
                        })
                    }
                })
                
            }
            else{
                let kat = new KatModel({
                    preduzece: preduzece,
                    kategorija: kategorija,
                   
                    potkategorije: new Array()
                })
        
                kat.save((err,resp)=>{
                    if (err) console.log(err)
                    else {
                        const pot = {
                            potkategorija: potkategorija,
                           
                        }
                        KatModel.updateOne({'kategorija': kategorija, 'preduzece': preduzece}, {$push: {'potkategorije': pot}}, (err,resp)=>{
                            if (err) console.log(err)
                            else res.json({'message':'Kategorija i potkategorija ubacena'})
                        })
                    }
                })
            }
        })
    }

    dohvSveKategorije = (req: express.Request, res: express.Response)=>{
        let preduzece = req.body.preduzece;

        KatModel.find({'preduzece': preduzece}, (err,resp)=>{
            if (err) console.log(err)
            else res.json(resp);
        })
    }
    
}