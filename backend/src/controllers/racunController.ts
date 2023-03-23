import express from 'express'
import RacunModel from '../model/racun'
export class racunController{

    dohvSveOtvorene = ( req: express.Request, res: express.Response)=>{

        let preduzece = req.body.preduzece;

        RacunModel.find({'zatvoren': false, 'preduzece': preduzece}, (err,resp)=>{
            if (err) console.log(err)
            else res.json(resp)
            
        })

    }

    potvrdiRacun = ( req: express.Request, res: express.Response)=>{

        let preduzece = req.body.preduzece;
        let datum = req.body.datum;
        let stavke = req.body.stavke;
        let zatvoren = req.body.zatvoren;
        let placanje = req.body.placanje;
        let sto = req.body.sto
        let kupac = req.body.kupac;
        

        let racun = new RacunModel({
            preduzece: preduzece,
            datum: datum,
            stavke: stavke,
            zatvoren: zatvoren,
            placanje: placanje,
            sto: sto,
            kupac: kupac
            
        })

        racun.save((err,resp)=>{
            if (err) console.log(err)
            else res.json({'message':'Рачун сачуван'})
        })

    }

    dodajStavku = ( req: express.Request, res: express.Response)=>{

        let stavka = req.body.stavka;
        let preduzece = req.body.preduzece;
        let sto = req.body.sto;

        RacunModel.updateOne({'preduzece': preduzece, 'sto': sto, 'zatvoren': false}, {$push: {'stavke': stavka}},(err,resp)=>{
            if ( err) console.log(err)
            else res.json({'message': 'Успешно убачена ставка'});
        })

    }

    dodajRacunBezStavki = ( req: express.Request, res: express.Response)=>{
        
        let preduzece = req.body.preduzece;
        let sto = req.body.sto
        let kupac = req.body.kupac;
        const data = {}

        let racun = new RacunModel({
            preduzece: preduzece,
            datum: new Date(),
            stavke: new Array(),
            zatvoren: false,
            placanje: data,
            sto: sto,
            kupac: kupac
        })

        racun.save((err,resp)=>{
            if (err) console.log(err)
            else res.json({'message':'Рачун сачуван без ставки.'})
        })
    }

    potvrdiRacunUgostitelj = ( req: express.Request, res: express.Response)=>{

        let preduzece = req.body.preduzece;
        let sto = req.body.sto;
        let placanje = req.body.placanje;
        let objekat = req.body.objekat;

        RacunModel.updateOne({'preduzece': preduzece, 'sto': sto, 'zatvoren': false}, {$set: {'placanje': placanje, 'zatvoren': true,
                             'datum': new Date(), 'objekat': objekat}}, (err,resp)=>{
            if (err) console.log(err)
            else if (resp) res.json({'message':'Успешно затворен рачун угоститељ'});
            else res.json({'message':'Грешка'});
        })

    }

    dohvSveRacune = ( req: express.Request, res: express.Response)=>{

        RacunModel.find({}, (err,resp)=>{
            if (err) console.log(err)
            else res.json(resp);
        })

    }

    dohvSveRacunePreduzeca = ( req: express.Request, res: express.Response)=>{

        let preduzece = req.body.preduzece;

        RacunModel.find({'preduzece': preduzece, 'zatvoren' : true}, (err,resp)=>{
            if (err) console.log(err)
            else res.json(resp);
        })

    }

    dohvSveRacuneKupca = ( req: express.Request, res: express.Response)=>{

        let kupac = req.body.kupac;

        RacunModel.find({'preduzece': kupac, 'zatvoren' : true}, (err,resp)=>{
            if (err) console.log(err)
            else res.json(resp);
        })

    }



}