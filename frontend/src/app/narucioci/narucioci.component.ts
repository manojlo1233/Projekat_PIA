import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Adresa } from '../models/adresa';
import { Preduzece } from '../models/preduzece';
import { Preduzece_detalji } from '../models/preduzece_detalji';
import { PreduzeceService } from '../service/preduzece.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-narucioci',
  templateUrl: './narucioci.component.html',
  styleUrls: ['./narucioci.component.css']
})
export class NaruciociComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private snackBar: MatSnackBar,
              private preduzeceService: PreduzeceService) { }

  ngOnInit(): void {
    this.kor_ime_vlasnika = sessionStorage.getItem('kor_ime');
    
    this.userService.dohvKorisnika(this.kor_ime_vlasnika).subscribe((data: Preduzece)=>{
      this.korisnik = data;
    })

    this.preduzeceService.dohvDetaljePreduzece(this.kor_ime_vlasnika).subscribe((data: Preduzece_detalji)=>{
      this.korisnik_detalji = data;
    })

    this.preduzeceService.dohvSvaPreduzeca().subscribe((data: Preduzece[])=>{
      this.sva_preduzeca = data;
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

  kor_ime_vlasnika: string
  korisnik: Preduzece
  korisnik_detalji: Preduzece_detalji

  ime: string
  prezime: string
  kor_ime: string
  lozinka: string
  telefon: string
  naziv_pred: string
  mail: string
  drzava: string
  grad: string
  post_broj: string
  ulica_broj: string
  maticni: number
  PIB: number
  logo: string = ''
  zauzeto: string
  broj_dana: number
  rabat: number

  trazi_PIB: number

  sva_preduzeca: Preduzece[] = []
  preduzeca_pretraga: Preduzece[] = []

  br_dana: number
  rabat2: number

  register(){
    var nova_adresa : Adresa = new Adresa();
    nova_adresa.drzava = this.drzava;
    nova_adresa.grad = this.grad;
    nova_adresa.postanski_broj = this.post_broj;
    nova_adresa.ulica_broj = this.ulica_broj;

    var Nova_registracija : Preduzece = new Preduzece();
    Nova_registracija.PIB = this.PIB;
    Nova_registracija.adresa = nova_adresa;
    Nova_registracija.e_mail = this.mail;
    Nova_registracija.ime = this.ime;
    Nova_registracija.prezime = this.prezime;
    Nova_registracija.kor_ime = this.kor_ime;
    Nova_registracija.logo = this.logo;
    Nova_registracija.lozinka = this.lozinka;
    Nova_registracija.maticni_broj = this.maticni;
    Nova_registracija.naziv = this.naziv_pred;
    Nova_registracija.prihvaceno = false;
    Nova_registracija.telefon = this.telefon;
    Nova_registracija.tip = 'preduzece';
    Nova_registracija.prvi_put = true;

    this.userService.ubaciPreduzece(Nova_registracija).subscribe((resp)=>{
      if ( resp['message'] === 'ok'){
        this.preduzeceService.ubaciNarucioca(this.kor_ime_vlasnika, this.kor_ime, this.broj_dana, this.rabat).subscribe((resp)=>{
          this.snackBar.open(resp['message'], 'Затвори');
        })
        
      }
      else if ( resp['message'] === 'Korisnicko ime je zauzeto.') {
        this.zauzeto = 'Korisnicko ime je zauzeto.';
        this.snackBar.open(this.zauzeto, 'Затвори');
      }
      else {
        this.zauzeto = 'E-mail adresa je vec iskoriscena.';
        this.snackBar.open(this.zauzeto, 'Затвори');
      }
    })

  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
  
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.logo = e.target.result;
      };
  
      reader.readAsDataURL(inputNode.files[0]);
    }
  }

  pretraga(){
    this.preduzeca_pretraga.splice(0,this.preduzeca_pretraga.length);
    for ( let p of this.sva_preduzeca){
      if ( p.PIB === this.trazi_PIB && p.PIB !== this.korisnik.PIB) {
        let unutra = false;
        for ( let n of this.korisnik.narucioci){
          if ( p.kor_ime === n.narucilac) unutra = true;           
        }
        if (!unutra) this.preduzeca_pretraga.push(p);
      }
    }
    
  }

  postavi(ime_narucioca){

    this.preduzeceService.ubaciNarucioca(this.kor_ime_vlasnika, ime_narucioca, this.br_dana, this.rabat2).subscribe((resp)=>{
        this.snackBar.open(resp['message'], 'Затвори');
    })

  }

  proveri_korisnika(){
    if ( this.korisnik_detalji.kategorija === 'ugostiteljski_objekat') return true;
    else return false;
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }



}
