import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Artikal } from '../models/artikal';
import { Artikal_cene_stanje } from '../models/artikal_cene_stanje';
import { Banka } from '../models/banka';
import { Fiskalna_kasa } from '../models/fiskalna_kasa';
import { Fiskalna_kasa_promena } from '../models/fiskalna_kasa_promena';
import { Lokacija } from '../models/lokacija';
import { Magacin } from '../models/magacin';
import { Magacin_promena } from '../models/magacin_promena';
import { Preduzece } from '../models/preduzece';
import { Preduzece_detalji } from '../models/preduzece_detalji';
import { Sifra } from '../models/sifra';
import { Sifra_promena } from '../models/sifra_promena';
import { Ziro_racun } from '../models/ziro_racun';
import { Ziro_racun_promena } from '../models/ziro_racun_promena';
import { PreduzeceService } from '../service/preduzece.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-podaci',
  templateUrl: './podaci.component.html',
  styleUrls: ['./podaci.component.css']
})
export class PodaciComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private preduzeceService: PreduzeceService,
      private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    let kor_ime = sessionStorage.getItem('kor_ime');
    this.userService.dohvKorisnika(kor_ime).subscribe((data: Preduzece)=>{
      this.korisnik = data;
    })
   
    this.preduzeceService.dohvDetaljePreduzece(kor_ime).subscribe((data: Preduzece_detalji)=>{
      this.korisnik_detalji = data;
      for ( let s of this.korisnik_detalji.sifre_delatnosti){
        this.izmeni_sifre.set(s.broj, false);
      }
      for ( let i = 0; i < this.korisnik_detalji.sifre_delatnosti.length; i++){
        let sifraP = new Sifra_promena();
        sifraP.broj = this.korisnik_detalji.sifre_delatnosti[i].broj;
        sifraP.nov_broj = -1;
        this.sifre_lista.push(sifraP);
      }
      
      for ( let z of this.korisnik_detalji.ziro_racuni){
        let ziroP = new Ziro_racun_promena();
        ziroP.banka = z.banka;
        ziroP.broj = z.broj;
        ziroP.nov_broj = "";
        ziroP.nova_banka = "";
        this.ziro_racuni.push(ziroP);
        this.izmena_ziro_racuni.set(z.broj, false);
      }

      for ( let m of this.korisnik_detalji.magacini){
        let magacinP = new Magacin_promena();
        this.preduzeceService.dohvMagacin(m.identifikator).subscribe((data: Magacin)=>{
          
          magacinP.identifikator = data.identifikator;
          magacinP.naziv = data.naziv
          magacinP.nov_naziv = "";
          magacinP.artikli = data.artikli;
         
          this.magacini.push(magacinP);
        
          this.izmena_magacini.set(m.identifikator, false);
        })
       
        
      }

      for ( let k of this.korisnik_detalji.fis_kase){
        this.preduzeceService.dohvKasu(k).subscribe((data: Fiskalna_kasa)=>{
          var kasaP = new Fiskalna_kasa_promena();
          kasaP.tip = data.tip
          kasaP.lokacija = new Lokacija();
          kasaP.lokacija.drzava = data.lokacija.drzava;
          kasaP.lokacija.grad = data.lokacija.grad;
          kasaP.lokacija.ulicaBroj = data.lokacija.ulicaBroj;
          kasaP.nov_tip = "";
          kasaP.naziv = data.naziv;
          kasaP.artikli = new Array<Artikal_cene_stanje>();
          kasaP.nov_naziv = "";
          this.fiskalne_kase.push(kasaP);
          this.izmena_kase.set(this.dohvIdentifikatorKase(kasaP.lokacija), false);
        })
        
      }
    })

    this.userService.dohvSveBanke().subscribe((data: Banka[])=>{
      this.sveBanke = data;
    })


  }

  predji_na_podatke(){
    this.router.navigate(['podaci']);
  }

  predji_na_pocetnu(){
    this.router.navigate(['preduzeceUnutra']);
  }

  predji_na_narucioce(){
    this.router.navigate(['narucioci']);
  }

  predji_na_robe_i_usluge(){
    this.router.navigate(['robe_i_usluge']);
  }

  predji_na_raspored(){
    this.router.navigate(['raspored_artikala']);
  }
  
  predji_na_stolove(){
    this.router.navigate(['raspored_stolova']);
  }

  predji_na_izdavanje_racuna(){
    this.router.navigate(['izdavanje_racuna'])
  }

  predji_na_pregled_izvestaja(){
    this.router.navigate(['pregled_izvestaja']);
  }

  promeniLozinku(){
    sessionStorage.setItem('kor_ime_promena_lozinke', this.korisnik.kor_ime);
    sessionStorage.setItem('lozinka_promena_lozinke', this.korisnik.lozinka);
    sessionStorage.setItem('tip_promena_lozinke', 'kupac');
    this.router.navigate(['promenaLozinke']);
  }

  korisnik: Preduzece 
  korisnik_detalji: Preduzece_detalji 

  izmeni_kategoriju: boolean = false;
  nova_kategorija: string = ''

  izmeni_sifre: Map<number,boolean> = new Map<number,boolean>()
  sifre_lista: Array<Sifra_promena> = new Array<Sifra_promena>()

  izmeni_pdv: boolean = false
  nov_pdv: boolean = undefined

  sveBanke: Banka[] = []
  
  ziro_racuni: Array<Ziro_racun_promena> = new Array<Ziro_racun_promena>()
  izmena_ziro_racuni: Map<string,boolean> = new Map<string,boolean>()
  
  magacini: Array<Magacin_promena> = new Array<Magacin_promena>()
  izmena_magacini: Map<string,boolean> = new Map<string,boolean>()

  fiskalne_kase: Array<Fiskalna_kasa_promena> = new Array<Fiskalna_kasa_promena>()
  izmena_kase: Map<string,boolean> = new Map<string,boolean>()

  izmena_ime: boolean = false;
  novo_ime: string = ''

  izmena_prezime: boolean = false;
  novo_prezime: string = ''

  izmena_mail: boolean = false
  nov_mail: string = ''

  izmena_telefon: boolean = false
  nov_telefon: string = ''

  izmeniPDV(){
    if ( this.izmeni_pdv ) this.izmeni_pdv = false;
    else this.izmeni_pdv = true;
  }

  izmeniKategoriju(){
    if ( this.izmeni_kategoriju) this.izmeni_kategoriju = false;
    else this.izmeni_kategoriju = true;
  }

  izmeniSifru(sifra){
    if ( this.izmeni_sifre.get(sifra)) {
      for ( let s of this.sifre_lista){
        if ( s.broj === sifra) s.nov_broj = -1;
      }
      this.izmeni_sifre.set(sifra,false);
    }
    else this.izmeni_sifre.set(sifra,true);
  }

  menjaoSifru(sifra){
    return this.izmeni_sifre.get(sifra);
  }
  
  detaljiPDV(){
    if ( this.korisnik_detalji.PDV) return "DA";
    else return "NE";
  }

  detaljiKat(){
    if ( this.korisnik_detalji.kategorija == 'prodavnica') return "Prodavnica";
    else return "Ugostiteljski objekat"
  }

  dohvIdentifikatorKase(l : Lokacija): string{
    return "" + l.drzava + "" + l.grad + "" + l.ulicaBroj;
  }

  proveri_korisnika(){
    if ( this.korisnik_detalji.kategorija === 'ugostiteljski_objekat') return true;
    else return false;
  }
 
  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  proveri_ziro(ziro_racun: Ziro_racun){
    return this.izmena_ziro_racuni.get(ziro_racun.broj);
  }
  
  izmeni_ziro(ziro_racun: Ziro_racun){
    if ( this.izmena_ziro_racuni.get(ziro_racun.broj)) {
      for( let ziro of this.ziro_racuni){
          ziro.nov_broj = '';
          ziro.nova_banka = '';
      }
      this.izmena_ziro_racuni.set(ziro_racun.broj, false);
    }
    else this.izmena_ziro_racuni.set(ziro_racun.broj, true);
  }

  proveri_magacin(magacin: Magacin){
    return this.izmena_magacini.get(magacin.identifikator);
  }

  izmeni_magacin(magacin: Magacin){
    if ( this.izmena_magacini.get(magacin.identifikator)){
      for ( let mag of this.magacini){
        mag.nov_naziv = ''
      }
      this.izmena_magacini.set(magacin.identifikator, false)
    }
    else this.izmena_magacini.set(magacin.identifikator, true)
  }

  proveri_kasu(kasa: Fiskalna_kasa){
    return this.izmena_kase.get(this.dohvIdentifikatorKase(kasa.lokacija));
  }

  izmeni_kasu(kasa: Fiskalna_kasa){
    if ( this.izmena_kase.get(this.dohvIdentifikatorKase(kasa.lokacija))){
      for ( let obj of this.fiskalne_kase){
        obj.nov_naziv = ''
        obj.nov_tip = ''
      }
      this.izmena_kase.set(this.dohvIdentifikatorKase(kasa.lokacija), false)
    }
    else this.izmena_kase.set(this.dohvIdentifikatorKase(kasa.lokacija), true)
  }

  proveri_ime(){
    return this.izmena_ime;
  }

  izmeni_ime(){
    if ( this.izmena_ime === false){
      this.novo_ime = '';
      this.izmena_ime = true;
    }
    else this.izmena_ime = false
  }

  proveri_prezime(){
    return this.izmena_prezime;
  }

  izmeni_prezime(){
    if ( this.izmena_prezime === false){
      this.novo_prezime = '';
      this.izmena_prezime = true;
    }
    else this.izmena_prezime = false
  }

  proveri_mail(){
    return this.izmena_mail;
  }

  izmeni_mail(){
    if ( this.izmena_mail === false){
      this.nov_mail = '';
      this.izmena_mail = true;
    }
    else this.izmena_mail = false
  }

  proveri_telefon(){
    return this.izmena_telefon;
  }

  izmeni_telefon(){
    if ( this.izmena_telefon === false){
      this.nov_telefon = '';
      this.izmena_telefon = true;
    }
    else this.izmena_telefon = false
  }

  sacuvaj_izmene(){

    if ( this.izmeni_kategoriju == false && this.izmeni_pdv == false && this.izmena_ime == false && this.izmena_prezime == false
      && this.izmena_telefon == false && this.izmena_mail == false){
      let broj_izmena_sifara = this.sifre_lista.length;
      for( let sifr of this.sifre_lista) if ( this.izmeni_sifre.get(sifr.broj) === false ) broj_izmena_sifara--;
      if ( broj_izmena_sifara === 0) {
        let broj_izmena_racuna = this.ziro_racuni.length;
        for ( let ziro of this.ziro_racuni) if ( this.izmena_ziro_racuni.get(ziro.broj) === false) broj_izmena_racuna--
        if ( broj_izmena_racuna === 0){
          let broj_izmena_magacina = this.magacini.length;
            for( let mag of this.magacini) if ( this.izmena_magacini.get(mag.identifikator) === false) broj_izmena_magacina--;
            if ( broj_izmena_magacina === 0){
              let broj_izmena_kasa = this.fiskalne_kase.length
              for ( let fis of this.fiskalne_kase) if (this.izmena_kase.get(this.dohvIdentifikatorKase(fis.lokacija)) === false) broj_izmena_kasa--;
              if ( broj_izmena_kasa === 0){
                this.snackBar.open("Није досло до измена", "Затвори")
                return;
              } 
              
            }  
          
        }
      }
    }

    if ( this.izmeni_kategoriju == true && this.nova_kategorija === '') {
      this.snackBar.open("Нисте унели све податке", "Затвори");
      return;
    }

    if ( this.izmeni_pdv == true && this.nov_pdv == undefined) {
      this.snackBar.open("Нисте унели све податке", "Затвори");
      return;
    }

    for ( let sifr of this.sifre_lista){
      if ( this.izmeni_sifre.get(sifr.broj) && sifr.nov_broj <= 0){
        this.snackBar.open("Нисте унели све податке", "Затвори");
        return;
      }   
    }

    for ( let ziro of this.ziro_racuni){
      if ( this.izmena_ziro_racuni.get(ziro.broj) && (ziro.nov_broj === '' || ziro.nova_banka === '')){
        this.snackBar.open("Нисте унели све податке", "Затвори");
        return;
      }
    }

    for ( let mag of this.magacini){
      if ( this.izmena_magacini.get(mag.identifikator) && (mag.nov_naziv === '')){
        this.snackBar.open("Нисте унели све податке", "Затвори");
        return;
      }
    }

    for ( let fis of this.fiskalne_kase){
      if ( this.izmena_kase.get(this.dohvIdentifikatorKase(fis.lokacija)) && ( fis.nov_naziv === '' || fis.nov_tip === '')){
        this.snackBar.open("Нисте унели све податке", "Затвори");
        return;
      }
    }

    if ( this.izmena_ime == true && this.novo_ime === '') {
      this.snackBar.open("Нисте унели све податке", "Затвори");
      return;
    }

    if ( this.izmena_prezime == true && this.novo_prezime === ''){
      this.snackBar.open("Нисте унели све податке", "Затвори");
      return;
    }

    if ( this.izmena_mail == true && this.nov_mail === ''){
      this.snackBar.open("Нисте унели све податке", "Затвори");
      return;
    }

    if ( this.izmena_telefon == true && this.nov_telefon === ''){
      this.snackBar.open("Нисте унели све податке", "Затвори");
      return;
    }

    let novi_detalji: Preduzece_detalji = new Preduzece_detalji();
    novi_detalji.vlasnik = this.korisnik.kor_ime;

    if ( this.izmeni_kategoriju) {
      novi_detalji.kategorija = this.nova_kategorija;
    }
    else{
      novi_detalji.kategorija = this.korisnik_detalji.kategorija;
    } 

    let nove_sifre = new Array<Sifra>()
    for ( let sifr of this.korisnik_detalji.sifre_delatnosti){
      if ( this.izmeni_sifre.get(sifr.broj)){
        for ( let sifr_promene of this.sifre_lista){
          if ( sifr.broj === sifr_promene.broj) {
            let nova_sifra = new Sifra();
            nova_sifra.broj = sifr_promene.nov_broj;
            nove_sifre.push(nova_sifra);
            break;
          }
        }
      }
      else{
        nove_sifre.push(sifr);
      }
    }

    novi_detalji.sifre_delatnosti = nove_sifre;

    if ( this.izmeni_pdv) novi_detalji.PDV = this.nov_pdv;
    else novi_detalji.PDV = this.korisnik_detalji.PDV;

    let novi_ziro_racuni = new Array<Ziro_racun>()
    for ( let ziro of this.korisnik_detalji.ziro_racuni){
      if ( this.izmena_ziro_racuni.get(ziro.broj)){
        for ( let ziro_promena of this.ziro_racuni){
          if ( ziro.broj === ziro_promena.broj) {
            let nov_ziro = new Ziro_racun();
            nov_ziro.broj = ziro_promena.nov_broj;
            nov_ziro.banka = ziro_promena.nova_banka;
            novi_ziro_racuni.push(nov_ziro);
            break;
          }
        }
      }
      else{
        novi_ziro_racuni.push(ziro);
      }
    }

    novi_detalji.ziro_racuni = novi_ziro_racuni;

    let novi_magacini = new Array<Magacin>()
    for ( let mag of this.korisnik_detalji.magacini){
      if ( this.izmena_magacini.get(mag.identifikator)){
        for ( let mag_promena of  this.magacini){
          if ( mag_promena.identifikator === mag.identifikator){
            let nov_mag = new Magacin();
            nov_mag.artikli = mag_promena.artikli;
            nov_mag.identifikator = mag_promena.identifikator;
            nov_mag.naziv = mag_promena.nov_naziv;
            novi_magacini.push(nov_mag)
            break;
          }
        }
      }
     
    }

    for ( let mag of novi_magacini){
        this.preduzeceService.updateMagacin(mag.identifikator,mag.naziv).subscribe((resp)=>{
          this.console();
        });
    }
  

    let nove_kase = new Array<Fiskalna_kasa>()
    for ( let fis of this.fiskalne_kase){
      if ( this.izmena_kase.get(this.dohvIdentifikatorKase(fis.lokacija))){
        let nova_fis = new Fiskalna_kasa();
        nova_fis.artikli = fis.artikli;
        nova_fis.lokacija = fis.lokacija;
        nova_fis.naziv = fis.nov_naziv;
        nova_fis.tip = fis.nov_tip;
        nove_kase.push(nova_fis);
        break;
      }
     
    }

    for ( let fis of nove_kase){
      this.preduzeceService.updateKasa(fis.lokacija.drzava, fis.lokacija.grad, fis.lokacija.ulicaBroj, fis.naziv, fis.tip).subscribe((resp)=>{
        this.console();
      })
    }

    novi_detalji.magacini = this.korisnik_detalji.magacini;
    novi_detalji.broj_magacina = this.korisnik_detalji.broj_magacina;

    novi_detalji.broj_fis_kasa = this.korisnik_detalji.broj_fis_kasa;
    novi_detalji.fis_kase = this.korisnik_detalji.fis_kase;


    this.preduzeceService.obrisiPreduzeceDetalji(novi_detalji.vlasnik).subscribe((resp)=>{
      if ( resp['message'] === 'obrisano'){
        this.userService.ubaciDetaljePreduzeca(novi_detalji).subscribe((resp)=>{
          if ( resp['message'] === 'ok'){
            this.snackBar.open("Детаљи предузећа обновљени", "Затвори")
            let nov_korisnik = new Preduzece();

            nov_korisnik.PIB = this.korisnik.PIB;
            nov_korisnik.adresa = this.korisnik.adresa;
            nov_korisnik.logo = this.korisnik.logo;
            nov_korisnik.lozinka = this.korisnik.lozinka;
            nov_korisnik.maticni_broj = this.korisnik.maticni_broj;
            nov_korisnik.narucioci = this.korisnik.narucioci;
            nov_korisnik.naziv = this.korisnik.naziv;
            nov_korisnik.tip = this.korisnik.tip;
            nov_korisnik.prvi_put = this.korisnik.prvi_put;
            nov_korisnik.prihvaceno = this.korisnik.prihvaceno;
            nov_korisnik.kor_ime = this.korisnik.kor_ime;
         
            if ( this.izmena_ime == false && this.izmena_prezime == false && this.izmena_telefon == false && this.izmena_mail == false){
              window.location.reload();
              return;
            }
            if ( this.izmena_ime == true) {
              nov_korisnik.ime = this.novo_ime;
            }
            else nov_korisnik.ime = this.korisnik.ime
        
            if ( this.izmena_prezime == true){
              nov_korisnik.prezime = this.novo_prezime
            }
            else nov_korisnik.prezime = this.korisnik.prezime
        
            if ( this.izmena_mail == true){
              nov_korisnik.e_mail = this.nov_mail;
            }
            else nov_korisnik.e_mail = this.korisnik.e_mail
        
            if ( this.izmena_telefon == true){
              nov_korisnik.telefon = this.nov_telefon;
            }
            else nov_korisnik.telefon = this.korisnik.telefon

            this.preduzeceService.updatePreduzece(nov_korisnik.kor_ime, nov_korisnik.ime, nov_korisnik.prezime, nov_korisnik.telefon,
              nov_korisnik.e_mail).subscribe((resp)=>{
                if ( resp['message'] === 'pred updated'){
                  window.location.reload();
                  return;
                }
              })
            
          }
        })
      }
    })

   

  }  

  console(){
    console.log("working");
  }
    
}
