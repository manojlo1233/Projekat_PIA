import express from 'express'
import PreduzeceModel from '../model/preduzece'
import KupacModel from '../model/kupac'

export class userController{

    login = (req: express.Request, res: express.Response)=>{
        
        let kor_ime = req.body.kor_ime;
        let lozinka = req.body.lozinka;
    
        KupacModel.findOne({'kor_ime' : kor_ime, 'lozinka': lozinka}, (err, user)=>{
                if (err) console.log(err)
                else if (user) res.json(user)
                else{
                    PreduzeceModel.findOne({'kor_ime' : kor_ime, 'lozinka': lozinka}, (err, user)=>{
                    if (err) console.log(err)
                    else res.json(user)
                })
            }
        })
        
    }

    dohvKorisnika = (req: express.Request, res: express.Response)=>{
        
        let kor_ime = req.body.kor_ime;
    
        KupacModel.findOne({'kor_ime' : kor_ime}, (err, user)=>{
                if (err) console.log(err)
                else if (user) res.json(user)
                else{
                    PreduzeceModel.findOne({'kor_ime' : kor_ime}, (err, user)=>{
                    if (err) console.log(err)
                    else res.json(user)
                })
            }
        })
        
    }

    promeniLozinku = (req: express.Request, res: express.Response)=>{
        
        let kor_ime = req.body.kor_ime;
        let nova_lozinka = req.body.nova_lozinka;
    
        KupacModel.findOne({'kor_ime' : kor_ime}, (err, user)=>{
                if (err) console.log(err)
                else if (user) {
                   KupacModel.updateOne({'kor_ime': kor_ime}, {$set: {'lozinka': nova_lozinka}}, (err, resp)=>{
                        if(err) console.log(err)
                        else if (resp) res.json({'message':'ok'})
                        else res.json({'message':'error'})
                   })
                }
                else{
                    PreduzeceModel.findOne({'kor_ime' : kor_ime}, (err, user)=>{
                    if (err) console.log(err)
                    else if (user){
                        PreduzeceModel.updateOne({'kor_ime': kor_ime}, {$set: {'lozinka': nova_lozinka}}, (err, resp)=>{
                            if(err) console.log(err)
                            else if (resp) res.json({'message':'ok'})
                            else res.json({'message':'error'})
                       })
                    }
                })
            }
        })
        
    }

    ubaciKupca = (req: express.Request, res: express.Response)=>{
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let kor_ime = req.body.kor_ime;
        let lozinka = req.body.lozinka;
        let telefon = req.body.telefon;
        let broj_licne = req.body.broj_licne;
        let tip = 'kupac';

        KupacModel.findOne({'kor_ime': kor_ime}, (err,resp)=>{
            if (err) console.log(err)
            else if (resp) res.json({'message':'Купац са унетим корисничким именом постоји'})
            else{
                KupacModel.findOne({'broj_licne': broj_licne}, (err,resp)=>{
                    if (err) console.log(err)
                    else if (resp) res.json({'message': 'Купац са унетом личном картом постоји'})
                    else{
                        let kupac = new KupacModel({
                            ime : ime,
                            prezime: prezime,
                            kor_ime: kor_ime,
                            lozinka: lozinka,
                            telefon: telefon,
                            broj_licne: broj_licne,
                            tip: tip
                        })
                        kupac.save((err,resp)=>{
                            if (err) console.log(err)
                            else res.json({'message':'Купац успешно убачен'})
                        })
                    }
                })
            }
        })
        
        
    }

    proveriKupca = (req:express.Request, res: express.Response)=>{

        let kor_ime = req.body.kor_ime;
        let broj_licne = req.body.broj_licne
        let tip = "kupac"

        KupacModel.findOne({'kor_ime': kor_ime, 'broj_licne': broj_licne, 'tip': tip}, (err,resp)=>{
            if (err) console.log(err)
            else if (resp) res.json({'message': 'korisnik pronadjen'})
            else res.json({'message': 'korisnik nije pronadjen'})
        })

    }

    proveriPreduzece = (req:express.Request, res: express.Response)=>{

        let kor_ime = req.body.kor_ime;
        let mail = req.body.mail
        let tip = 'preduzece'

        PreduzeceModel.findOne({'kor_ime': kor_ime, 'e_mail': mail, 'tip': tip}, (err,resp)=>{
            if (err) console.log(err)
            else if (resp) res.json({'message': 'korisnik pronadjen'})
            else res.json({'message': 'korisnik nije pronadjen'})
        })

    }

}