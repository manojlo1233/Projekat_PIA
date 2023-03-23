import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Artikal_cene_stanje } from '../models/artikal_cene_stanje';
import { Banka } from '../models/banka';
import { Fiskalna_kasa } from '../models/fiskalna_kasa';
import { IDMagacina } from '../models/identifikator';
import { Lokacija } from '../models/lokacija';
import { Magacin } from '../models/magacin';
import { Preduzece_detalji } from '../models/preduzece_detalji';
import { Sifra } from '../models/sifra';
import { Ziro_racun } from '../models/ziro_racun';
import { PreduzeceService } from '../service/preduzece.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-preduzece',
  templateUrl: './preduzece.component.html',
  styleUrls: ['./preduzece.component.css']
})
export class PreduzeceComponent implements OnInit {

  constructor(private userService: UserService, private router : Router, private preduzeceService: PreduzeceService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userService.dohvSveBanke().subscribe((data: Banka[])=>{
      this.sveBanke = data;
    })
    const form1 = <HTMLFormElement>document.getElementById('sifra_form');
    form1.addEventListener('submit', function handleSubmit(event){
      event.preventDefault();
      
      form1.reset();
    })
    const form2 = <HTMLFormElement>document.getElementById('ziro_form');
    form2.addEventListener('submit', function handleSubmit(event){
      event.preventDefault();
      form2.reset();
    })
    const form3 = <HTMLFormElement>document.getElementById('mag_form');
    form3.addEventListener('submit', function handleSubmit(event){
      event.preventDefault();
      form3.reset();
    })
    const form4 = <HTMLFormElement>document.getElementById('kasa_form');
    form4.addEventListener('submit', function handleSubmit(event){
      event.preventDefault();
      form4.reset();
    })
  }

  tipPreduzeca: string = ''

  sifra: number;
  sifreDelatnosti: Array<number> = new Array()

  pdv: boolean = false;

  ziro_racun: string = ''
  ziro_racuni: Array<string> = new Array()

  banka: string = ''
  bankeRacuna: Map<string,string> = new Map<string,string>()
  sveBanke: Banka[] = []

  brojMagacina: number = 1
  magacin: string
  id_magacina: string;
  magacini: Array<Magacin> = new Array()
  magacin_poruka: string = 'Dodajte dovoljan broj magacina'
  magacin_provera: number = -1;

  brojKasa: number = 1
  drzava: string = ''
  grad: string = ''
  ulica_broj: string = ''
  tipKase: string = ''
  naziv_kase: string
  fiskalne_kase: Array<Fiskalna_kasa> = new Array()
  kasa_poruka: string = 'Dodajte dovoljan broj fiskalnih kasa'
  kasa_provera: number = -1;

  detalji_ubaceni: string


  dodajSifru(){
    if ( this.sifreDelatnosti.indexOf(this.sifra) != -1) {
      this.snackBar.open("Ова шифра је већ унета", "Затвори");
      return;
    }
    if ( this.sifra <= 0){
      this.snackBar.open("Морате унети правилну шифру", "Затвори");
      return;
    }
    if ( this.sifra > 0 ){
        this.sifreDelatnosti.push(this.sifra);
      }
    this.sifra = -1;
  }

 

  obrisiSifre(){
    for ( let i = this.sifreDelatnosti.length; i > 0; i--){
      this.sifreDelatnosti.pop();
    }
  }

  dodajZiro_racun(){
    if (this.ziro_racuni.indexOf(this.ziro_racun) !== -1){
      this.snackBar.open("Већ сте унели овај жиро рачун", "Затвори");
      return
    }
    this.bankeRacuna.set(this.ziro_racun, this.banka);
    this.ziro_racuni.push(this.ziro_racun);
  }

  obrisiZiro_racune(){
    for ( let i = this.ziro_racuni.length; i > 0; i--){
      this.ziro_racuni.pop();
    }    
  }

  
  dodaj_magacin(){
    
    if (this.magacin_provera === -1) this.magacin_provera = this.brojMagacina;
    if ( this.magacin_provera > 0){
      var novi_magacin: Magacin = new Magacin()
      novi_magacin.naziv = this.magacin;
      novi_magacin.identifikator = this.id_magacina;
      novi_magacin.artikli = new Array<Artikal_cene_stanje>();
      this.preduzeceService.ubaciMagacin(novi_magacin).subscribe((resp)=>{
          console.log('ubacio')
      });
      this.magacini.push(novi_magacin);
      this.magacin_provera = this.magacin_provera - 1;
     
    }
    else this.snackBar.open("Унели сте довоља број магацина", "Затвори");
  }

  obrisi_magacin(){
    this.magacin_provera = -1;
    this.snackBar.open('Додајте довољан број магацина', "Затвори");
    for ( let i = this.magacini.length; i > 0; i--){
      this.magacini.pop();
    }
  }

  dodaj_kasu(){
    
    if (this.kasa_provera === -1) this.kasa_provera = this.brojKasa;
    if ( this.kasa_provera > 0){
      var nova_kasa: Fiskalna_kasa = new Fiskalna_kasa()
      nova_kasa.tip = this.tipKase;
      nova_kasa.lokacija = new Lokacija();
      nova_kasa.lokacija.drzava = this.drzava;
      nova_kasa.lokacija.grad = this.grad;
      nova_kasa.lokacija.ulicaBroj = this.ulica_broj;
      nova_kasa.naziv = this.naziv_kase;
      nova_kasa.artikli = new Array<Artikal_cene_stanje>();
      this.preduzeceService.ubaciKasu(nova_kasa).subscribe((resp)=>{
        console.log('ubacena kasa')
      });
      nova_kasa.naziv = this.naziv_kase;
      
      this.fiskalne_kase.push(nova_kasa);
      this.kasa_provera = this.kasa_provera - 1;
    }
    else this.snackBar.open("Унели сте довољан број објеката", "Затвори");
  }

  obrisi_kase(){
    this.kasa_provera = -1;
    this.snackBar.open("Унесите довољан број објеката", "Затвори");
    for ( let i = this.fiskalne_kase.length; i > 0; i--){
      this.fiskalne_kase.pop();
    }
  }

  zavrsi(){
    
    var novi_detalji: Preduzece_detalji = new Preduzece_detalji();
    novi_detalji.vlasnik = sessionStorage.getItem('kor_ime');
    novi_detalji.kategorija = this.tipPreduzeca;
    novi_detalji.sifre_delatnosti = new Array<Sifra>();

    for ( let i = 0; i < this.sifreDelatnosti.length; i++){
      let nova_sifra: Sifra = new Sifra();
      nova_sifra.broj = this.sifreDelatnosti[i];
      novi_detalji.sifre_delatnosti.push(nova_sifra);
    }

    novi_detalji.PDV = this.pdv;
    novi_detalji.ziro_racuni = new Array<Ziro_racun>();

    for ( let i = 0; i < this.ziro_racuni.length; i++){
      let nov_ziro_racun: Ziro_racun = new Ziro_racun();
      nov_ziro_racun.broj = this.ziro_racuni[i];
      nov_ziro_racun.banka = this.bankeRacuna.get(this.ziro_racuni[i]);
      novi_detalji.ziro_racuni.push(nov_ziro_racun);
    }

    novi_detalji.broj_magacina = this.brojMagacina;
    novi_detalji.magacini = new Array<IDMagacina>();

    for ( let i = 0; i < this.magacini.length; i++){
      let ident = new IDMagacina();
      ident.identifikator = this.magacini[i].identifikator;
      novi_detalji.magacini.push(ident);
    }
  
    novi_detalji.broj_fis_kasa = this.brojKasa;
    novi_detalji.fis_kase = new Array<Lokacija>();

    for ( let i = 0; i < this.fiskalne_kase.length; i++){
      novi_detalji.fis_kase.push(this.fiskalne_kase[i].lokacija);
    }

    this.userService.ubaciDetaljePreduzeca(novi_detalji).subscribe((resp)=>{
        if (resp['message'] === 'ok') {
          this.detalji_ubaceni = 'Ubaceno';
          this.userService.updatePrviPutPreduzece(novi_detalji.vlasnik).subscribe((resp)=>{
            if (resp['message'] === 'updated') this.router.navigate(['preduzeceUnutra']);
            else this.router.navigate(['']);
          })
        }
        else this.detalji_ubaceni = 'Nije ubaceno';
    })

  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
    
  proveri(){
    if ( this.sifreDelatnosti.length > 0 && this.magacini.length > 0  && this.fiskalne_kase.length > 0 && this.ziro_racuni.length > 0
      && this.tipPreduzeca != '') return true;
      else return false;
  }
 
}
