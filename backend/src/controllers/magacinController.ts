import express from 'express'
import MagacinModel from '../model/magacin'
export class MagacinController{

    ubaciMagacin = (req: express.Request, res: express.Response)=>{
        
        let identifikator = req.body.identifikator;
        let naziv = req.body.naziv;

        MagacinModel.findOne({'identifikator': identifikator, 'naziv': naziv}, (err,resp)=>{
            if (err) console.log(err)
            else if (resp) res.json({'message': 'Magacin vec postoji'})
            else {
                let data = new MagacinModel({
                    identifikator: identifikator,
                    naziv: naziv,
                    artikli: new Array()
                })
                data.save((err,resp)=>{
                    if (err) console.log(err)
                    else res.json({'message':'Magacin sacuvan'})
                })
            }            
        })
    }

    dohvMagacin = (req: express.Request, res: express.Response)=>{

        let identifikator = req.body.id;

        MagacinModel.findOne({'identifikator': identifikator}, (err,resp)=>{
            if (err) console.log(err)
            else res.json(resp)
        })
    }

    dohvSveMagacine = (req: express.Request, res: express.Response)=>{
        MagacinModel.find((err,resp)=>{
            if (err) console.log(err)
            else res.json(resp)
        })
    }

    ubaciArtikal = (req: express.Request, res: express.Response)=>{
        
        let id = req.body.id;

        let sifra = req.body.sifra;
        let nabavna = req.body.nabavna;
        let prodajna = req.body.prodajna;
        let lager = req.body.lager;
        let min_kolicina = req.body.min_kolicina;
        let max_kolicina = req.body.max_kolicina;

        let data = {
            sifra: sifra,
            nabavna_cena: nabavna,
            prodajna_cena: prodajna,
            stanje_lagera: lager,
            min_kolicina: min_kolicina,
            max_kolicina: max_kolicina
        }
        MagacinModel.findOne({'identifikator' : id, 'artikli.sifra' : sifra}, (err,resp)=>{
            if (err) console.log(err)
            else if ( resp) res.json({'message':'postoji'})
            else{
                MagacinModel.updateOne({'identifikator': id}, {$push: {'artikli': data}}, (err,resp)=>{
                    if (err) console.log(err);
                    else if (resp) res.json({'message':'ok'})
                    else res.json({'message':'bad'})
                })
            }
        })
       

    }

    updateMagacin = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
        let naziv = req.body.naziv;

        MagacinModel.updateOne({'identifikator': id}, {$set: {'naziv': naziv}}, (err,resp)=>{
            if (err) console.log(err)
            else res.json({'message':'magacin updated'})
        })
    }

    izmeniArtikalMagacin = (req: express.Request, res: express.Response)=>{
        let identifikator = req.body.identifikator;
        let sifra = req.body.sifra;
        let nabavna_cena = req.body.nabavna_cena;
        let prodajna_cena = req.body.prodajna_cena;
        let stanje_lagera = req.body.stanje_lagera;
        let min_kolicina = req.body.min_kolicina;
        let max_kolicina = req.body.max_kolicina;

        MagacinModel.updateOne({'identifikator': identifikator, 'artikli.sifra' : sifra}, {$set: {
            'artikli.$.nabavna_cena': nabavna_cena,
            'artikli.$.prodajna_cena': prodajna_cena,
            'artikli.$.stanje_lagera': stanje_lagera,
            'artikli.$.min_kolicina': min_kolicina,
            'artikli.$.max_kolicina': max_kolicina
        }}, (err,resp)=>{
            if (err) console.log(err)
            else if ( resp) res.json({'message':'Артикал измењен у магацину'})
            else res.json({'message':'Грешка'})
        })
        
    }

    izbrisiArtikalMagacin = (req: express.Request, res: express.Response)=>{

        let sifra = req.body.sifra;

        MagacinModel.updateMany({'artikli.sifra': sifra},
        {$pull: {'artikli' : {'sifra': sifra}}}, (err,resp)=>{
           if (err) console.log(err)
           else if (resp) res.json({'message':'Артикал избрисан из касе'})
           else res.json({'message':'Артикал није пронађен'})
       })

    }

}