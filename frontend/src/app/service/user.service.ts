import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Preduzece } from '../models/preduzece';
import { Preduzece_detalji } from '../models/preduzece_detalji';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private uri='http://localhost:4000'

  login(kor_ime, lozinka){
    const data = {
      kor_ime: kor_ime,
      lozinka: lozinka
    }
    return this.http.post(`${this.uri}/user/login`, data);
  }

  dohvSveBanke(){
    return this.http.get(`${this.uri}/preduzece/dohvSveBanke`);
  }

  ubaciPreduzece(pred: Preduzece){

    const data={
        drzava : pred.adresa.drzava,
        grad : pred.adresa.grad,
        postanski_broj : pred.adresa.postanski_broj,
        ulica_broj : pred.adresa.ulica_broj,

        PIB : pred.PIB,
        mail : pred.e_mail,
        ime : pred.ime,
        prezime : pred.prezime,
        kor_ime : pred.kor_ime,
        image : pred.logo,
        lozinka : pred.lozinka,
        maticni_broj : pred.maticni_broj,
        naziv : pred.naziv,
        prihvaceno : pred.prihvaceno,
        telefon : pred.telefon,
        tip: pred.tip
    }
    return this.http.post(`${this.uri}/preduzece/ubaciPreduzece`, data);
  }

  ubaciDetaljePreduzeca(detalji: Preduzece_detalji){
    const data = {
      vlasnik: detalji.vlasnik,
      kategorija: detalji.kategorija,
      sifre_delatnosti: detalji.sifre_delatnosti,
      PDV: detalji.PDV,
      ziro_racuni: detalji.ziro_racuni,
      broj_magacina: detalji.broj_magacina,
      magacini: detalji.magacini,
      broj_fis_kasa: detalji.broj_fis_kasa,
      fis_kase: detalji.fis_kase,
    }
    return this.http.post(`${this.uri}/preduzece/ubaciDetaljePreduzeca`, data);
  }

  updatePrviPutPreduzece(kor_ime){
    const data = {
      kor_ime: kor_ime
    }

    return this.http.post(`${this.uri}/preduzece/updatePrviPutPreduzece`, data)

  }

  promeniLozinku(kor_ime, nova_lozinka){
    const data = {
      kor_ime: kor_ime,
      nova_lozinka: nova_lozinka
    }
    return this.http.post(`${this.uri}/user/promeniLozinku`, data)
  }

  dohvKorisnika(kor_ime){
    const data = {
      kor_ime: kor_ime
    }
    return this.http.post(`${this.uri}/user/dohvKorisnika`, data)
  }

  proveriPreduzece(kor_ime, mail){
    const data = {
      kor_ime: kor_ime,
      mail: mail
    }
    return this.http.post(`${this.uri}/user/proveriPreduzece`, data)
  }

  proveriKupca(kor_ime, broj_licne){
    const data = {
      kor_ime: kor_ime,
      broj_licne: broj_licne
    }
    return this.http.post(`${this.uri}/user/proveriKupca`, data)
  }

}
