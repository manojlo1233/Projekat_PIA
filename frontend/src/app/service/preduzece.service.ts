import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Magacin } from '../models/magacin';
import { Fiskalna_kasa } from '../models/fiskalna_kasa';
import { Lokacija } from '../models/lokacija';
import { Racun } from '../models/racun';
import { Artikal_unos } from '../models/artikal_unos';
@Injectable({
  providedIn: 'root'
})
export class PreduzeceService {

  constructor(private http: HttpClient) { }

  private uri='http://localhost:4000'
  
  dohvDetaljePreduzece(kor_ime){
    const data = {
      kor_ime: kor_ime
    }
    return this.http.post(`${this.uri}/preduzece/dohvDetaljePreduzece`, data)
  }

  ubaciNarucioca(kor_ime_vlasnika, kor_ime_narucioca, broj_dana_placanja, procenat_rabata){
    const data = {
      kor_ime_vlasnika: kor_ime_vlasnika,
      kor_ime_narucioca: kor_ime_narucioca,
      broj_dana_placanja: broj_dana_placanja,
      procenat_rabata: procenat_rabata
    }
    return this.http.post(`${this.uri}/preduzece/ubaciNarucioca`, data)
  }

  dohvSvaPreduzeca(){
    return this.http.get(`${this.uri}/preduzece/dohvSvaPreduzeca`)
  }

  dohvSveArtikle(){
    return this.http.get(`${this.uri}/preduzece/dohvSveArtikle`)
  }

  ubaciMagacin(magacin: Magacin){
    const data = {
      identifikator: magacin.identifikator,
      naziv: magacin.naziv,
    }
    return this.http.post(`${this.uri}/magacin/ubaciMagacin`, data)
  }

  ubaciKasu(kasa: Fiskalna_kasa){
    const data = {
      tip: kasa.tip,
      lokacija: kasa.lokacija,
      naziv: kasa.naziv
    }
    return this.http.post(`${this.uri}/kasa/ubaciKasu`, data)
  }
  
  dohvMagacin(id: string){
    const data = {
      id : id
    }
    return this.http.post(`${this.uri}/magacin/dohvMagacin`, data)
  }
  
  dohvKasu(lokacija: Lokacija){
    const data = {
      drzava: lokacija.drzava,
      grad: lokacija.grad,
      ulicaBroj: lokacija.ulicaBroj
    }
    return this.http.post(`${this.uri}/kasa/dohvKasu`, data)
  }

  dohvSveMagacine(){
    return this.http.get(`${this.uri}/magacin/dohvSveMagacine`);
  }

  dohvSveKase(){
    return this.http.get(`${this.uri}/kasa/dohvSveKase`);
  }

  ubaciArtikalMagacin(id: string, sifra, nabavna, prodajna, lager, min_kolicina, max_kolicina){
    const data = {
        id: id,
        sifra: sifra,
        nabavna: nabavna,
        prodajna: prodajna,
        lager: lager,
        min_kolicina: min_kolicina,
        max_kolicina: max_kolicina
    }

    return this.http.post(`${this.uri}/magacin/ubaciArtikal`, data);
  }

  ubaciArtikalKasa(drzava, grad, ulicaBroj, sifra, nabavna, prodajna, lager, min_kolicina, max_kolicina){
    const data = {
        drzava: drzava,
        grad: grad,
        ulicaBroj: ulicaBroj,
        sifra: sifra,
        nabavna: nabavna,
        prodajna: prodajna,
        lager: lager,
        min_kolicina: min_kolicina,
        max_kolicina: max_kolicina
    }

    return this.http.post(`${this.uri}/kasa/ubaciArtikal`, data);
  }

  ubaciArtikal(preduzece, sifra, naziv, jedinica_mere, poreska_stopa, tip, zemlja_porekla, strani_naziv, barkod, proizvodjac,
      carinska_tarifa, eko_taksa, akcize, min_zaliheP, max_zaliheP, opis, deklaracija, slika){
        
        let data = {
          preduzece : preduzece,
          sifra : sifra,
          naziv : naziv,
          jedinica_mere : jedinica_mere,
          poreska_stopa : poreska_stopa,
          tip : tip,
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
          deklaracija: deklaracija,
          slika: slika
        }

        return this.http.post(`${this.uri}/artikal/ubaciArtikal`, data);

  }
  
  ubaciKategoriju(kategorija, preduzece){
    const data = {
      preduzece: preduzece,
      kategorija: kategorija
    }
    return this.http.post(`${this.uri}/kat/ubaciKategoriju`, data);
  }

  ubaciPotKategoriju(kategorija, potkategorija, preduzece){
    const data = {
      preduzece: preduzece,
      kategorija : kategorija,
      potkategorija: potkategorija
    }
    return this.http.post(`${this.uri}/kat/ubaciPotKategoriju`, data);

  }

  dohvSveKategorije(preduzece){
    const data = {
      preduzece: preduzece
    }
    return this.http.post(`${this.uri}/kat/dohvSveKategorije`, data);
  }

  dodajArtikluKategoriju(sifra, kategorija, potkategorija){
    const data = {
      sifra: sifra,
      kategorija: kategorija,
      potkategorija: potkategorija
    }
    return this.http.post(`${this.uri}/artikal/dodajKategoriju`, data);
  }

  dohvRasporedObjekta(preduzece, lokacija: Lokacija){
      const data = {
        preduzece: preduzece,
        drzava: lokacija.drzava,
        grad: lokacija.grad,
        ulicaBroj: lokacija.ulicaBroj
      }
      return this.http.post(`${this.uri}/preduzece/dohvRasporedObjekta`, data);
  }
  
  dohvSveOtvoreneRacune(preduzece){
    const data = {
      preduzece: preduzece
    }
    return this.http.post(`${this.uri}/racun/dohvSveOtvorene`, data);
  }

  potvrdiRacun(racun: Racun, data){
   
      const data1 = {
        preduzece: racun.preduzece,
        datum: racun.datum,
        stavke: racun.stavke,
        zatvoren: racun.zatvoren,
        placanje: data,
        sto: racun.sto,
        kupac: racun.kupac
      }
      return this.http.post(`${this.uri}/racun/potvrdiRacun`, data1); 
  }

  dodajStavku(stavka,preduzece,sto){
    const data = {
      stavka: stavka,
      preduzece: preduzece,
      sto: sto
    }
    return this.http.post(`${this.uri}/racun/dodajStavku`, data); 
  }
  dodajRacunBezStavki(preduzece, sto, kupac ){
    const data = {
      preduzece: preduzece,
      sto: sto,
      kupac: kupac
    }
    return this.http.post(`${this.uri}/racun/dodajRacunBezStavki`, data); 
  }

  potvrdiRacunUgostitelj(preduzece, sto, data){
      const data1 = {
        preduzece: preduzece,
        sto: sto,
        placanje: data,
        objekat : data.objekat
      }
      return this.http.post(`${this.uri}/racun/potvrdiRacunUgostitelj`, data1); 
  }

  dohvSveRacune(){
    return this.http.get(`${this.uri}/racun/dohvSveRacune`); 
  }

  dohvSveRacunePreduzeca(preduzece){
    const data={
      preduzece: preduzece
    }
    return this.http.post(`${this.uri}/racun/dohvSveRacunePreduzeca`,data);
  }

  prihvatiPreduzece(kor_ime){
    const data = {
      kor_ime: kor_ime
    }
    return this.http.post(`${this.uri}/preduzece/prihvatiPreduzece`,data);
  }

  deaktivirajPreduzece(kor_ime){
    const data = {
      kor_ime: kor_ime
    }
    return this.http.post(`${this.uri}/preduzece/deaktivirajPreduzece`,data);
  }

  ubaciKupca(ime, prezime, kor_ime, lozinka, telefon, broj_licne){
    const data = {
      ime : ime,
      prezime: prezime,
      kor_ime: kor_ime,
      lozinka: lozinka,
      telefon: telefon,
      broj_licne: broj_licne
    }
    return this.http.post(`${this.uri}/user/ubaciKupca`,data);
  }

  obrisiPreduzeceDetalji(vlasnik){
    const data = {
      vlasnik: vlasnik
    }
    return this.http.post(`${this.uri}/preduzece/obrisiPreduzeceDetalji`,data);
  }

  updatePreduzece(kor_ime, ime, prezime, telefon, mail){
    const data = {
      kor_ime: kor_ime,
      ime: ime,
      prezime: prezime,
      telefon: telefon,
      mail: mail
    }
    return this.http.post(`${this.uri}/preduzece/updatePreduzece`,data);
  }

  updateKasa(drzava, grad, ulicaBroj, naziv, tip){
    const data = {
      drzava: drzava,
      grad: grad,
      ulicaBroj: ulicaBroj,
      naziv: naziv,
      tip: tip
    }
    return this.http.post(`${this.uri}/kasa/updateKasa`,data);
  }

  updateMagacin(id, naziv){
    const data = {
      id: id,
      naziv: naziv
    }
    return this.http.post(`${this.uri}/magacin/updateMagacin`,data);
  }

  dohvArtikal(preduzece, sifra){
    const data = {
      preduzece: preduzece,
      sifra: sifra
    }
    return this.http.post(`${this.uri}/artikal/dohvArtikal`,data);
  }

  izmeniArtikal(preduzece, sifra, naziv, jedinica_mere, poreska_stopa, tip, zemlja_porekla, strani_naziv, barkod, proizvodjac,
    carinska_tarifa, eko_taksa, akcize, min_zaliheP, max_zaliheP, opis, deklaracija, slika){
      let data = {
        preduzece : preduzece,
        sifra : sifra,
        naziv : naziv,
        jedinica_mere : jedinica_mere,
        poreska_stopa : poreska_stopa,
        tip : tip,
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
        deklaracija: deklaracija,
        slika: slika
      }

      return this.http.post(`${this.uri}/artikal/izmeniArtikal`, data);
  }

  izmeniArtikalObjekat(element: Artikal_unos){
    if ( element.tip === 'magacin'){
      const data = {
        identifikator: element.id,
        sifra: element.sifra,
        nabavna_cena: element.nabavna_cena,
        prodajna_cena: element.prodajna_cena,
        stanje_lagera: element.lager,
        min_kolicina: element.min_kolicina,
        max_kolicina: element.max_kolicina
      }
      return this.http.post(`${this.uri}/magacin/izmeniArtikalMagacin`, data);
    }
    else{
      const data ={
        drzava: element.lokacija.drzava,
        grad: element.lokacija.grad,
        ulicaBroj: element.lokacija.ulicaBroj,
        sifra: element.sifra,
        nabavna_cena: element.nabavna_cena,
        prodajna_cena: element.prodajna_cena,
        stanje_lagera: element.lager,
        min_kolicina: element.min_kolicina,
        max_kolicina: element.max_kolicina
      }
      return this.http.post(`${this.uri}/kasa/izmeniArtikalKasa`, data);
    }
    
  }

  izbrisiArtikalMagacin(sifra){
    const data = {
      sifra: sifra
    }
    return this.http.post(`${this.uri}/magacin/izbrisiArtikalMagacin`, data);
  }

  izbrisiArtikalKasa(sifra){
    const data = {
      sifra: sifra
    }
    return this.http.post(`${this.uri}/kasa/izbrisiArtikalKasa`, data);
  }

  izbrisiArtikal(preduzece,sifra){
    const data = {
      preduzece: preduzece,
      sifra: sifra
    }
    return this.http.post(`${this.uri}/artikal/izbrisiArtikal`, data);
  }
}
