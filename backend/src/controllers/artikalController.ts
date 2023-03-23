import express, { Response } from 'express'
import ArtikalModel from '../model/artikal'

export class ArtikalController{

    ubaciArtikal = (req: express.Request, res: express.Response)=>{
        let preduzece = req.body.preduzece;
        let sifra = req.body.sifra;
        let naziv = req.body.naziv;
        let jedinica_mere = req.body.jedinica_mere;
        let poreska_stopa = req.body.poreska_stopa;
        let tip = req.body.tip;

        let zemlja_porekla = req.body.zemlja_porekla;
        let strani_naziv = req.body.strani_naziv;
        let barkod = req.body.barkod;
        let proizvodjac = req.body.proizvodjac;
        let carinska_tarifa = req.body.carinska_tarifa;
        let eko_taksa = req.body.eko_taksa;
        let akcize = req.body.akcize;
        let max_zaliheP = req.body.max_zaliheP;
        let min_zaliheP = req.body.min_zaliheP;
        let opis = req.body.opis;
        let deklaracija = req.body.deklaracija;

        let slika = req.body.slika;
               
        
        let dopunski = {
            zemlja_porekla : zemlja_porekla,
            strani_naziv: strani_naziv,
            barkod : barkod,
            proizvodjac: proizvodjac,
            carinska_tarifa: carinska_tarifa,
            eko_taksa : eko_taksa,
            akcize: akcize,
            min_zaliheP: min_zaliheP,
            max_zaliheP: max_zaliheP,
            opis : opis,
            deklaracija: deklaracija
        }

        ArtikalModel.findOne({'sifra': sifra},(err,resp)=>{
            if (err) console.log(err)
            else if (resp)res.json({'message':'artikal_postoji'})
            else {
                let data = new ArtikalModel({
                    preduzece : preduzece,
                    sifra : sifra,
                    naziv : naziv,
                    jedinica_mere : jedinica_mere,
                    poreska_stopa : poreska_stopa,
                    tip : tip,
                    dopunski_podaci: dopunski,
                    slika: slika,
                    kategorija: new Object(),
                    ima_kategoriju: false
                })
        
                data.save((err,resp)=>{
                    if (err) console.log(err)
                    else res.json({'message':'ok'})
                })
            }
        })
        
    }

    dodajKategoriju = (req: express.Request, res: express.Response)=>{
        let sifra = req.body.sifra;
        let kategorija = req.body.kategorija;
        let potkategorija = req.body.potkategorija;


        ArtikalModel.findOne({'sifra': sifra, 'ima_kategoriju': true}, (err,resp)=>{
            if (err) console.log(err)
            else if(resp) res.json({'message':'Артиклу је већ додељена категорија'})
            else{
                if ( potkategorija === ''){
                    let data = {
                        ime : kategorija,
                        nadKategorija: ''
                    }
                    ArtikalModel.updateOne({'sifra': sifra}, {$set: {'kategorija':data, 'ima_kategoriju': true}}, (err,resp)=>{
                        if (err) console.log(err)
                        else res.json({'message':'Артиклу је додељена категорија'})
                    })
                }
                else{
                    let data = {
                        ime : potkategorija,
                        nadKategorija: kategorija
                    }
                    ArtikalModel.updateOne({'sifra': sifra}, {$set: {'kategorija':data, 'ima_kategoriju': true}}, (err,resp)=>{
                        if (err) console.log(err)
                        else res.json({'message':'Артиклу јe додељена категорија'})
                    })
                }
            }
        })
       
    }   

    dohvArtikal = (req: express.Request, res: Response)=>{
        let sifra = req.body.sifra;
        let preduzece = req.body.preduzece;

        ArtikalModel.findOne({'preduzece': preduzece, 'sifra': sifra}, (err,resp)=>{
            if (err) console.log(err)
            else res.json(resp)
        })
    }

    izmeniArtikal = (req: express.Request, res: Response)=>{
        let preduzece = req.body.preduzece;
        let sifra = req.body.sifra;
        let naziv = req.body.naziv;
        let jedinica_mere = req.body.jedinica_mere;
        let poreska_stopa = req.body.poreska_stopa;
        let tip = req.body.tip;

        let zemlja_porekla = req.body.zemlja_porekla;
        let strani_naziv = req.body.strani_naziv;
        let barkod = req.body.barkod;
        let proizvodjac = req.body.proizvodjac;
        let carinska_tarifa = req.body.carinska_tarifa;
        let eko_taksa = req.body.eko_taksa;
        let akcize = req.body.akcize;
        let max_zaliheP = req.body.max_zaliheP;
        let min_zaliheP = req.body.min_zaliheP;
        let opis = req.body.opis;
        let deklaracija = req.body.deklaracija;

        let slika = req.body.slika;
               
        
        let dopunski = {
            zemlja_porekla : zemlja_porekla,
            strani_naziv: strani_naziv,
            barkod : barkod,
            proizvodjac: proizvodjac,
            carinska_tarifa: carinska_tarifa,
            eko_taksa : eko_taksa,
            akcize: akcize,
            min_zaliheP: min_zaliheP,
            max_zaliheP: max_zaliheP,
            opis : opis,
            deklaracija: deklaracija
        }

        ArtikalModel.updateOne({'preduzece': preduzece, 'sifra': sifra}, {$set: {
            'naziv': naziv,
            'jedinica_mere': jedinica_mere,
            'poreska_stopa': poreska_stopa,
            'tip': tip,
            'dopunski_podaci': dopunski,
            'slika': slika
        }}, (err,resp)=>{
            if (err) console.log(err)
            else if (resp) res.json({'message':'Артикал измењен'})
            else res.json({'message':'Артикал није пронађен'})
        })
    }

    izbrisiArtikal = (req: express.Request, res: Response)=>{

        let preduzece = req.body.preduzece;
        let sifra = req.body.sifra;

        ArtikalModel.findOneAndRemove({'preduzece': preduzece, 'sifra': sifra}, (err,resp)=>{
            if (err) console.log(err)
            else if (resp) res.json({'message':'Артикал је избрисан'})
            else res.json({'message':'Артикал није пронађен'})
        })

    }
}