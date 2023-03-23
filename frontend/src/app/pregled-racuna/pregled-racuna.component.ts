import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Artikal } from '../models/artikal';
import { Fiskalna_kasa } from '../models/fiskalna_kasa';
import { Grafik } from '../models/grafik';
import { Kupac } from '../models/kupac';
import { Magacin } from '../models/magacin';
import { Preduzece } from '../models/preduzece';
import { Racun } from '../models/racun';
import { Stavka } from '../models/stavka';
import { PreduzeceService } from '../service/preduzece.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-pregled-racuna',
  templateUrl: './pregled-racuna.component.html',
  styleUrls: ['./pregled-racuna.component.css']
})
export class PregledRacunaComponent implements OnInit {

  displayedColumns: string[] = [ 'nazivP', 'nazivO', 'iznos', 'nacin_placanja', 'pregled']
  
  dataSource = new MatTableDataSource()

  constructor(private router: Router, private userService: UserService, private preduzeceService: PreduzeceService) { }

  ngOnInit(): void {

    this.userService.dohvKorisnika(sessionStorage.getItem('kor_ime')).subscribe((resp: Kupac)=>{
      this.korisnik = resp;
      this.preduzeceService.dohvSvaPreduzeca().subscribe((resp: Preduzece[])=>{
        this.sva_preduzeca = resp;
        this.preduzeceService.dohvSveRacune().subscribe((resp: Racun[])=>{
          this.svi_racuni = resp;
          for ( let r of resp){
            if ( r.placanje != undefined){
              if (r.placanje.licna_karta == this.korisnik.broj_licne) this.moji_racuni.push(r);
            }
           
          }
          
          this.dataSource.data = this.moji_racuni
          this.dataSource._updateChangeSubscription();

          this.napravi_trosak_meseci();
          this.napravi_trosak_dani();
          this.preduzeceService.dohvSveArtikle().subscribe((resp: Artikal[])=>{
            this.svi_artikli = resp;
          })
          this.prikazan_racun = new Racun()
          this.prikazan_racun.datum = new Date()
          this.prikazan_racun.stavke = new Array<Stavka>();
          const data = {
              licna_karta: 0,
              objekat: '',
              ime: '',
              prezime: '',
              slip_racun: 0,
              narucilac: ""
          }
          this.prikazan_racun.placanje = data;
        })
      })
    })
   
    
    

  }

  predji_na_pocetnu(){
    this.router.navigate(['kupac']);
  }

  predji_na_pregled_racuna(){
    this.router.navigate(['narucioci']);
  }

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

  korisnik: Kupac = new Kupac()

  sva_preduzeca: Array<Preduzece> = new Array<Preduzece>()

  svi_racuni: Array<Racun> = new Array<Racun>()
  moji_racuni: Array<Racun> = new Array<Racun>()

  svi_artikli: Array<Artikal> = new Array<Artikal>()

  licna_karta: string

  prikazan_racun: Racun

  pregled: string = 'meseci'

  dohv_licnu_kartu(){
    return this.korisnik.broj_licne;
  }

  dohv_naziv_preduzeca(preduzece){
    for ( let p of this.sva_preduzeca){
      if ( p.kor_ime === preduzece) return p.naziv;
    }
    return "Предузеће није нађено"
  }

  dohv_cenu_racuna(stavke: Array<Stavka>): number{
    let iznos = 0;
    for ( let s of stavke){
      iznos += s.cena;
    }
    return iznos;
  }

  dohv_nacin_placanja(placanje){
    if ( placanje.ime == undefined) return "Плаћено картицом"
    else if ( placanje.ime != undefined) return "Плаћено чеком"
    else return "Плаћено"
  }

  placeno_karticom(){
    if ( this.prikazan_racun.placanje.ime == undefined) return true;
    else return false;
  }

  dohv_naziv_artikla(sifra){
    for ( let art of this.svi_artikli){
      if ( art.sifra === sifra) return art.naziv;
    }
    return '';
  }

  open_popUp(datum){
    for ( let r of this.moji_racuni){
      if ( datum === r.datum) this.prikazan_racun = r;
    }
    
    let popUp = document.getElementById("popUp");
    popUp.classList.add('open-popUp');
  }

  close_popUp(){
    let popUp = document.getElementById("popUp");
    popUp.classList.remove('open-popUp');
  }

  dohv_datum(datum: Date){
    
    return datum.toString().slice(0,10);
  }

  saleData1 = []
  dummyList1 = []

  saleData2 = []
  dummyList2 = []

  napravi_trosak_meseci(){
    this.saleData1 = null;
   
    let name: string;
    let value: number = 0;
    for ( let i = 1; i < 13; i++){
      value = 0;
      name = "" + i + "." + new Date().getFullYear()
      for( let rac of this.moji_racuni){
        if ( i === new Date(rac.datum.toString()).getMonth() + 1){
          value += this.dohv_cenu_racuna(rac.stavke);
        }
      }
      const data = {
        name: name,
        value: value,
      }
      this.dummyList1.push(data);
    }
    
    this.saleData1 = this.dummyList1;

  }

  napravi_trosak_dani(){
    this.saleData2 = null;
    
    let name: string;
    let value: number = 0;

    let max_day = 0;
    for ( let rac of this.moji_racuni){
      if ( max_day < Number.parseInt(new Date(rac.datum.toString()).toISOString().slice(8,10))) 
      max_day = Number.parseInt(new Date(rac.datum.toString()).toISOString().slice(8,10))
    }
    max_day = Number.parseInt(new Date().toISOString().slice(8,10));
    let month = new Date().getMonth()
    let year = new Date().getFullYear()
    
    for ( let i = 1 ; i <=  max_day; i++){
      value = 0;
      name = "" + i + "." + (month + 1) + "." + year;
      for( let rac of this.moji_racuni){
        if ( i === Number.parseInt(new Date(rac.datum.toString()).toISOString().slice(8,10)) && 
        month === new Date(rac.datum.toString()).getMonth()){
          value += this.dohv_cenu_racuna(rac.stavke);
        }
      }
      const data = {
        name: name,
        value: value,
      }
      this.dummyList2.push(data);
    }
    this.saleData2 = this.dummyList2;
  }

 
  
}
