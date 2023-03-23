import express from 'express'
import FisKasaModel from '../model/fis_kasa'
export class FisKasaController{

    ubaciKasu = (req: express.Request, res: express.Response)=>{
        
        let tip = req.body.tip;
        let lokacija = req.body.lokacija;
        let naziv = req.body.naziv;
        let artikli = new Array();

        let data = new FisKasaModel({
            tip: tip,
            lokacija: lokacija,
            naziv: naziv,
            artikli: artikli
        })
        data.save((err,resp)=>{
            if (err) console.log(err)
            else res.json({'message': 'Objekat ubacen'})
        })

        
    }

    dohvKasu = (req: express.Request, res: express.Response)=>{

        let drzava = req.body.drzava;
        let grad = req.body.grad;
        let ulicaBroj = req.body.ulicaBroj;

        FisKasaModel.findOne({'lokacija.ulicaBroj': ulicaBroj, 'lokacija.grad': grad, 'lokacija.drzava': drzava}, (err,resp)=>{
            if (err) console.log(err)
            else res.json(resp)
        })
    }

    dohvSveKase = (req: express.Request, res: express.Response)=>{
        FisKasaModel.find((err,resp)=>{
            if (err) console.log(err)
            else res.json(resp)
        })
    }

    ubaciArtikal = (req: express.Request, res: express.Response)=>{
        
        let drzava = req.body.drzava;
        let grad = req.body.grad;
        let ulicaBroj = req.body.ulicaBroj;

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
        FisKasaModel.findOne({'lokacija.ulicaBroj': ulicaBroj, 'lokacija.grad': grad, 'lokacija.drzava': drzava, 'artikli.sifra': sifra}, (err,resp)=>{
            if (err) console.log(err)
            else if ( resp) res.json({'message':'postoji'})
            else{
                FisKasaModel.updateOne({'lokacija.ulicaBroj': ulicaBroj, 'lokacija.grad': grad, 'lokacija.drzava': drzava}, 
                {$push: {'artikli': data}}, (err,resp)=>{
                    if (err) console.log(err)
                    else if (resp) res.json({'message':'ok'})
                    else res.json({'message':'bad'})
                })
            }
        })
       
    }
    
    updateKasa = (req: express.Request, res: express.Response)=>{
        let drzava = req.body.drzava;
        let grad = req.body.grad;
        let ulicaBroj = req.body.ulicaBroj;
        let naziv = req.body.naziv;
        let tip = req.body.tip;

        FisKasaModel.updateOne({'lokacija.ulicaBroj': ulicaBroj, 'lokacija.grad': grad, 'lokacija.drzava': drzava},
         {$set: {'naziv': naziv, 'tip' : tip}}, (err,resp)=>{
            if (err) console.log(err)
            else res.json({'message':'magacin updated'})
        })
    }

    izmeniArtikalKasa = (req: express.Request, res: express.Response)=>{
        let drzava = req.body.drzava;
        let grad = req.body.grad;
        let ulicaBroj = req.body.ulicaBroj;

        let sifra = req.body.sifra;
        let nabavna_cena = req.body.nabavna_cena;
        let prodajna_cena = req.body.prodajna_cena;
        let stanje_lagera = req.body.stanje_lagera;
        let min_kolicina = req.body.min_kolicina;
        let max_kolicina = req.body.max_kolicina;

        FisKasaModel.updateOne({'lokacija.ulicaBroj': ulicaBroj, 'lokacija.grad': grad, 'lokacija.drzava': drzava, 'artikli.sifra': sifra},
        {$set: {
            'artikli.$.nabavna_cena': nabavna_cena,
            'artikli.$.prodajna_cena': prodajna_cena,
            'artikli.$.stanje_lagera': stanje_lagera,
            'artikli.$.min_kolicina': min_kolicina,
            'artikli.$.max_kolicina': max_kolicina
        }}, (err,resp)=>{
            if (err) console.log(err)
            else if ( resp) res.json({'message':'Артикал измењен у каси'})
            else res.json({'message':'Грешка'})
        })
    }

    izbrisiArtikalKasa = (req: express.Request, res: express.Response)=>{

        let sifra = req.body.sifra;

        FisKasaModel.updateMany({'artikli.sifra': sifra},
         {$pull: {'artikli' : {'sifra': sifra}}}, (err,resp)=>{
            if (err) console.log(err)
            else if (resp) res.json({'message':'Артикал избрисан из касе'})
            else res.json({'message':'Артикал није пронађен'})
        })

    }

}