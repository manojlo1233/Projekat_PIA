import express from 'express'
import PreduzeceModel from '../model/preduzece'
import BankaModel from '../model/banka'
import DetaljiModel from '../model/detalji_preduzeca'
import ArtikalModel from '../model/artikal'


export class PreduzeceController{

    dohvSveBanke = ( req: express.Request, res: express.Response)=>{
        BankaModel.find({}, (err,resp)=>{
            if (err) console.log(err)
            else res.json(resp)
        })
    }

    ubaciPreduzece = ( req: express.Request, res: express.Response)=>{

        let drzava = req.body.drzava;
        let grad = req.body.grad;
        let postanski_broj = req.body.postanski_broj;
        let ulica_broj = req.body.ulica_broj;

        let PIB = req.body.PIB;
        let e_mail = req.body.mail;
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let kor_ime = req.body.kor_ime;
        let logo = req.body.image;
        let lozinka = req.body.lozinka;
        let maticni_broj = req.body.maticni_broj;
        let naziv = req.body.naziv;
        let prihvaceno = req.body.prihvaceno;
        let telefon = req.body.telefon;
        let tip = req.body.tip;

        PreduzeceModel.findOne({'kor_ime': kor_ime}, (err, resp)=>{
            if (err) console.log(err)
            else if (resp){
                res.json({'message':'Korisnicko ime je zauzeto.'});
            }
            else{
                PreduzeceModel.findOne({'e_mail' : e_mail}, (err, resp)=>{
                    if (err) console.log(err)
                    else if (resp){
                        res.json({'message':'E-mail adresa je vec iskoriscena.'});
                    }
                    else{
                        const adresa = {
                            drzava: drzava,
                            grad: grad,
                            postanski_broj: postanski_broj,
                            ulica_broj: ulica_broj
                        }
                        let data = new PreduzeceModel({
                            ime: ime,
                            prezime: prezime,
                            kor_ime: kor_ime,
                            lozinka: lozinka,
                            telefon: telefon,
                            e_mail: e_mail,
                            naziv: naziv,
                            PIB: PIB,
                            maticni_broj: maticni_broj,
                            logo: logo,
                            prihvaceno: prihvaceno,
                            adresa: adresa,
                            prvi_put: true,
                            tip: tip,
                            narucilac: new Array()
                        })
                        data.save((err,resp)=>{
                            if (err) console.log(err)
                            else res.json({'message': 'ok'})
                        })
                    }
                })
            }
        })
        
    }

    ubaciDetaljePreduzeca = ( req: express.Request, res: express.Response)=>{

        const data = new DetaljiModel({
            vlasnik: req.body.vlasnik,
            kategorija: req.body.kategorija,
            sifre_delatnosti: req.body.sifre_delatnosti,
            PDV: req.body.PDV,
            ziro_racuni: req.body.ziro_racuni,
            broj_magacina: req.body.broj_magacina,
            magacini: req.body.magacini,
            broj_fis_kasa: req.body.broj_fis_kasa,
            fis_kase: req.body.fis_kase,
        })
        data.save((err,resp)=>{
            if (err) console.log(err)
            else res.json({'message' : 'ok'})
        })
        
    }

    updatePrviPutPreduzece = (req : express.Request, res: express.Response) =>{
        let kor_ime = req.body.kor_ime;
        let update = false;
        PreduzeceModel.updateOne({'kor_ime' : kor_ime}, {$set: {'prvi_put': update}}, (err,resp)=>{
            if (err) console.log(err);
            else if (resp) res.json({'message' : 'updated'})
            else res.json({'message' : 'failed'})         
        })
    }

    dohvDetaljePreduzece = ( req: express.Request, res: express.Response)=>{
        let kor_ime = req.body.kor_ime;
    
        DetaljiModel.findOne({'vlasnik' : kor_ime}, (err, user)=>{
                if (err) console.log(err)
                else if (user) res.json(user)
                else res.json({'message': 'error'})
        })
    }

    ubaciNarucioca = ( req: express.Request, res: express.Response)=>{

        let broj_dana_placanja = req.body.broj_dana_placanja;
        let procenat_rabata = req.body.procenat_rabata;
        let kor_ime_vlasnik = req.body.kor_ime_vlasnika;
        let kor_ime_narucilac = req.body.kor_ime_narucioca;

        const data = {
            broj_dana_placanja: broj_dana_placanja,
            procenat_rabata : procenat_rabata,
            narucilac : kor_ime_narucilac
        }
        PreduzeceModel.findOne({'kor_ime': kor_ime_vlasnik, 'narucioci.narucilac': kor_ime_narucilac}, (err,resp)=>{
            if (err) console.log(err)
            else if (resp) res.json({'message': 'Предузеће које сте изабрали је већ наручилац.'})
            else PreduzeceModel.updateOne({'kor_ime': kor_ime_vlasnik}, {$push: {'narucioci': data}}, (err,resp)=>{
                if (err) console.log(err)
                else res.json({'message':'Наручилац је додат.'})
            })
        })
        
        
    }

    dohvSvaPreduzeca = ( req: express.Request, res: express.Response)=>{
     
        PreduzeceModel.find({'tip': 'preduzece'},(err,resp)=>{
            if (err) console.log(err)
            else res.json(resp);
        })

    }

    dohvSveArtikle = ( req: express.Request, res: express.Response)=>{
     
        ArtikalModel.find({},(err,resp)=>{
            if (err) console.log(err)
            else res.json(resp);
        })

    }

    prihvatiPreduzece = ( req: express.Request, res: express.Response)=>{

        let kor_ime = req.body.kor_ime;

        PreduzeceModel.updateOne({'kor_ime': kor_ime}, {$set: {'prihvaceno': true}}, (err,resp)=>{
            if (err) console.log(err)
            else res.json({'message':'Предузеће прихваћено'})
        })

    }

    deaktivirajPreduzece = ( req: express.Request, res: express.Response)=>{
        let kor_ime = req.body.kor_ime
        PreduzeceModel.updateOne({'kor_ime': kor_ime}, {$set: {'prihvaceno': false}}, (err,resp)=>{
            if (err) console.log(err)
            else res.json({'message':'Предузеће деактивирано'})
        })

    }

    obrisiPreduzeceDetalji = (req: express.Request, res: express.Response)=>{
        let vlasnik = req.body.vlasnik;

        DetaljiModel.findOneAndRemove({'vlasnik' : vlasnik}, (err,resp)=>{
            if ( err) console.log(err)
            else res.json({'message': 'obrisano'})
        })
    }

    updatePreduzece = (req: express.Request, res: express.Response)=>{
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let telefon = req.body.telefon;
        let mail = req.body.mail;
        let kor_ime = req.body.kor_ime

        PreduzeceModel.updateOne({'kor_ime': kor_ime}, {$set: {'ime': ime, 'prezime': prezime, 'telefon': telefon, 'e_mail': mail}},
        (err,resp)=>{
            if (err) console.log(err)
            else res.json({'message':'pred updated'})
        })
    }

}