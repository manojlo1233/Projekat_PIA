import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Artikal } from '../models/artikal';
import { Artikal_prikaz_kupac } from '../models/artikal_prikac_kupac';
import { Fiskalna_kasa } from '../models/fiskalna_kasa';
import { Kupac } from '../models/kupac';
import { Magacin } from '../models/magacin';
import { Preduzece } from '../models/preduzece';
import { Preduzece_detalji } from '../models/preduzece_detalji';
import { PreduzeceService } from '../service/preduzece.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-kupac',
  templateUrl: './kupac.component.html',
  styleUrls: ['./kupac.component.css']
})
export class KupacComponent implements OnInit {

  displayedColumns: string[] = [ 'preduzece', 'objekat', 'dugme']
  displayedColumns1: string[] = [ 'nazivP', 'cena', 'proizvodjac']
  dataSource

  constructor(private userService: UserService, private router: Router, private preduzeceService: PreduzeceService) { }

  ngOnInit(): void {

    this.userService.dohvKorisnika(sessionStorage.getItem('kor_ime')).subscribe((resp: Kupac)=>{
      this.korisnik = resp
      this.preduzeceService.dohvSveArtikle().subscribe((resp: Artikal[])=>{
        this.svi_artikli = resp;   
        this.preduzeceService.dohvSvaPreduzeca().subscribe((resp: Preduzece[])=>{
          this.sva_preduzeca = resp;
          
          for ( let pred of this.sva_preduzeca){
            this.magacini_preduzeca.set(pred.kor_ime, new Array<Magacin>())
            
            this.preduzeceService.dohvDetaljePreduzece(pred.kor_ime).subscribe((resp: Preduzece_detalji)=>{
  
              let detalji = resp;
              this.detalji_preduzeca.set(pred.kor_ime, detalji);
      
              this.preduzeceService.dohvSveKase().subscribe((resp: Fiskalna_kasa[])=>{
                this.svi_objekti = resp;
                let objekti = new Array<Fiskalna_kasa>
                for ( let o1 of detalji.fis_kase){
                  for ( let o2 of this.svi_objekti){
                    if ( o1.drzava === o2.lokacija.drzava && o1.grad === o2.lokacija.grad && o1.ulicaBroj === o2.lokacija.ulicaBroj){
                      objekti.push(o2);
                      break;
                    }
                  }
                }
                this.objekti_preduzeca.set(pred.kor_ime, objekti)
      
                this.preduzeceService.dohvSveMagacine().subscribe((resp: Magacin[])=>{
                  this.svi_magacini = resp;
                  let magacini = new Array<Magacin>()
                  for ( let m2 of this.svi_magacini){
                    for ( let m1 of detalji.magacini){
                      if ( m1.identifikator === m2.identifikator){
              
                        magacini.push(m2);
                        break;
                      }
                    }
                  } 
                  this.magacini_preduzeca.set(pred.kor_ime, magacini);
  
                })
      
              })
              
            })
          }
          
        })   
      })
    })
   

  }

  predji_na_pocetnu(){
    this.router.navigate(['kupac']);
  }

  predji_na_pregled_racuna(){
    this.router.navigate(['pregled_racuna']);
  }

  korisnik: Kupac
  greska: string

  svi_artikli: Array<Artikal> = new Array<Artikal>()

  sva_preduzeca: Array<Preduzece> = new Array<Preduzece>()
  detalji_preduzeca: Map<string,Preduzece_detalji> = new Map<string,Preduzece_detalji>()

  svi_objekti: Array<Fiskalna_kasa> = new Array<Fiskalna_kasa>()
  svi_magacini: Array<Magacin> = new Array<Magacin>()

  objekti_preduzeca: Map<string, Array<Fiskalna_kasa>> = new Map<string, Array<Fiskalna_kasa>>()
  magacini_preduzeca: Map<string, Array<Magacin>> = new Map<string, Array<Magacin>>()

  pretraga_naziv: string
  pretraga_proizvodjac: string

  magacin_artikli_prikaz: Array<Artikal_prikaz_kupac> = new Array<Artikal_prikaz_kupac>();
  objekat_artikli_prikaz: Array<Artikal_prikaz_kupac> = new Array<Artikal_prikaz_kupac>()


  promeniLozinku(){
    sessionStorage.setItem('kor_ime_promena_lozinke', this.korisnik.kor_ime);
    sessionStorage.setItem('lozinka_promena_lozinke', this.korisnik.lozinka);
    sessionStorage.setItem('tip_promena_lozinke', 'kupac');
    this.router.navigate(['promenaLozinke']);
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
    
  }

  dohvMagacine(pred: Preduzece): Array<Magacin>{
    let magacini = this.magacini_preduzeca.get(pred.kor_ime);
    return this.magacini_preduzeca.get(pred.kor_ime);
  }

  dohvObjekte(pred: Preduzece): Array<Fiskalna_kasa>{
    return this.objekti_preduzeca.get(pred.kor_ime);
  }

  open_popUp(tip, naziv, preduzece){
    if ( tip === 'magacin'){
      let magacini = this.magacini_preduzeca.get(preduzece);
      for ( let m of magacini){
        if ( m.naziv === naziv){
          this.magacin_artikli_prikaz = new Array<Artikal_prikaz_kupac>();
          for ( let artikli_magacin of m.artikli){
            for ( let art of this.svi_artikli){
              if (artikli_magacin.sifra === art.sifra){
                let jedan_artikal = new Artikal_prikaz_kupac();
                jedan_artikal.cena = artikli_magacin.prodajna_cena;
                jedan_artikal.naziv = art.naziv;
                jedan_artikal.proizvodjac = art.dopunski_podaci.proizvodjac;
                this.magacin_artikli_prikaz.push(jedan_artikal);
              }
            }
          }
          this.dataSource = this.magacin_artikli_prikaz;
          sessionStorage.setItem('tip', tip);
        }
      }
     
    }
    else if (tip === 'objekat'){
      let objekti = this.objekti_preduzeca.get(preduzece);
      for ( let o of objekti){
        if ( o.naziv === naziv){
          this.objekat_artikli_prikaz = new Array<Artikal_prikaz_kupac>();
          for ( let artikli_objekat of o.artikli){
            for ( let art of this.svi_artikli){
              if (artikli_objekat.sifra === art.sifra){
                let jedan_artikal = new Artikal_prikaz_kupac();
                jedan_artikal.cena = artikli_objekat.prodajna_cena;
                jedan_artikal.naziv = art.naziv;
                jedan_artikal.proizvodjac = art.dopunski_podaci.proizvodjac;
                this.objekat_artikli_prikaz.push(jedan_artikal);
              }
            }
          }
          this.dataSource = this.objekat_artikli_prikaz;
          sessionStorage.setItem('tip', tip);
        }
      }
    
    }
    let popUp = document.getElementById("popUp");
    popUp.classList.add('open-popUp');
  }
    
  trazi_po_nazivu(event){
    let tip = sessionStorage.getItem('tip');
    if ( tip === 'magacin'){
      if ( event.target.value === '') this.dataSource = this.magacin_artikli_prikaz;
      else{
        this.dataSource = this.transform_naziv(this.magacin_artikli_prikaz, event.target.value);
     
      }
    }
    else if ( tip === 'objekat'){
      if ( event.target.value === '') this.dataSource = this.objekat_artikli_prikaz;
      else{
        this.dataSource = this.transform_naziv(this.objekat_artikli_prikaz, event.target.value);
     
      }
    }
    
  }

  trazi_po_proizvodjacu(event){
    let tip = sessionStorage.getItem('tip');
    if ( tip === 'magacin'){
      if ( event.target.value === '') this.dataSource = this.magacin_artikli_prikaz;
      else{
        this.dataSource = this.transform_proizvodjac(this.magacin_artikli_prikaz, event.target.value);
     
      }
    }
    else if ( tip === 'objekat'){
      if ( event.target.value === '') this.dataSource = this.objekat_artikli_prikaz;
      else{
        this.dataSource = this.transform_proizvodjac(this.objekat_artikli_prikaz, event.target.value);
     
      }
    }
  }

  transform_naziv(artikli_prikaz , value){
    return value ? artikli_prikaz.filter(item => item.naziv.includes(value)): artikli_prikaz;
  }

  transform_proizvodjac(artikli_prikaz , value){
    return value ? artikli_prikaz.filter(item => item.proizvodjac.includes(value)): artikli_prikaz;
  }

  close_popUp(){
    this.dataSource = null;
    let popUp = document.getElementById("popUp");
    popUp.classList.remove('open-popUp');
  }

  

}
