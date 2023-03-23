import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Artikal } from '../models/artikal';
import { Preduzece } from '../models/preduzece';
import { Preduzece_detalji } from '../models/preduzece_detalji';
import { Racun } from '../models/racun';
import { Stavka } from '../models/stavka';
import { PreduzeceService } from '../service/preduzece.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-pregled-izvestaja',
  templateUrl: './pregled-izvestaja.component.html',
  styleUrls: ['./pregled-izvestaja.component.css']
})
export class PregledIzvestajaComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private preduzeceService: PreduzeceService) { }

  displayedColumns: string[] = [ 'nazivO' , 'cena', 'pdv', 'dugme']
  
  dataSource = new MatTableDataSource()

  ngOnInit(): void {

    this.userService.dohvKorisnika(sessionStorage.getItem('kor_ime')).subscribe((data: Preduzece)=>{
       this.korisnik = data;  
       this.preduzeceService.dohvDetaljePreduzece(sessionStorage.getItem('kor_ime')).subscribe((data: Preduzece_detalji)=>{
        this.korisnik_detalji = data;
        this.preduzeceService.dohvSveRacunePreduzeca(sessionStorage.getItem('kor_ime')).subscribe((data: Array<Racun>)=>{
          this.svi_racuni = data;
          this.preduzeceService.dohvSveArtikle().subscribe((resp: Array<Artikal>)=>{
            this.svi_artikli = resp;
          })
        })
      })

      this.prikazan_racun = new Racun()
      this.prikazan_racun.datum = new Date()
      this.prikazan_racun.stavke = new Array<Stavka>();
      const racData = {
          licna_karta: 0,
          objekat: '',
          ime: '',
          prezime: '',
          slip_racun: 0,
          narucilac: ""
      }
      this.prikazan_racun.placanje = racData;
    });

    

   

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

  proveri_korisnika(){
    if ( this.korisnik_detalji.kategorija === 'ugostiteljski_objekat') return true;
    else return false;
  }

  logout(){
    this.router.navigate(['']);
    sessionStorage.clear();
  }

  korisnik: Preduzece
  korisnik_detalji: Preduzece_detalji

  svi_artikli: Array<Artikal> = new Array<Artikal>()

  svi_racuni: Array<Racun> = new Array<Racun>();

  datum: Date

  ukupna_suma : number = 0
  ukupan_pdv: number = 0

  prikazani_racuni: Array<Racun> = new Array<Racun>()

  prikazan_racun: Racun = new Racun();

  dnevni_pazar(){
    this.prikazani_racuni.splice(0,this.prikazani_racuni.length)
    this.ukupna_suma = 0;
    this.ukupan_pdv = 0;
    for ( let r of this.svi_racuni){
        if ( this.datum.toString() === r.datum.toString().slice(0,10) ){ 
         
          for ( let stv of r.stavke){
            this.ukupna_suma = this.ukupna_suma + stv.cena;
            this.ukupan_pdv = this.ukupan_pdv + stv.porez;
          }

          this.prikazani_racuni.push(r);
        }
    }
    this.dataSource.data = this.prikazani_racuni;
    this.dataSource._updateChangeSubscription()
    
  }

  promeniLozinku(){
    sessionStorage.setItem('kor_ime_promena_lozinke', this.korisnik.kor_ime);
    sessionStorage.setItem('lozinka_promena_lozinke', this.korisnik.lozinka);
    sessionStorage.setItem('tip_promena_lozinke', 'kupac');
    this.router.navigate(['promenaLozinke']);
  }

  dohv_cenu_racuna(racun: Racun): number{
    let cena = 0;
    for ( let stv of racun.stavke){
      cena += stv.cena;
    }
    return cena;
  }

  dohv_pdv_racuna(racun: Racun): number{
    let pdv = 0;
    for ( let stv of racun.stavke){
      pdv += stv.porez;
    }
    return pdv;
  }

  dohv_naziv_artikla(sifra){
    for ( let art of this.svi_artikli){
      if ( art.sifra === sifra) return art.naziv;
    }
    return '';
  }

  open_popUp(datum){
    for ( let r of this.svi_racuni){
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

  placeno_karticom(){
    if ( this.prikazan_racun.placanje.ime == undefined) return true;
    else return false;
  }

}
