import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Adresa } from '../models/adresa';
import { Kupac } from '../models/kupac';
import { Preduzece } from '../models/preduzece';
import { PreduzeceService } from '../service/preduzece.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-admin-registracija',
  templateUrl: './admin-registracija.component.html',
  styleUrls: ['./admin-registracija.component.css']
})
export class AdminRegistracijaComponent implements OnInit {

  constructor(private router: Router, private preduzeceService: PreduzeceService, private snackBar: MatSnackBar,
      private userService: UserService) { }

  ngOnInit(): void {
  }

  predji_na_pregled_preduzeca(){
    this.router.navigate(['admin']);
  }

  predji_na_registraciju(){

    this.router.navigate(['admin_registracija']);
  }

  predji_na_dnevne_izvestaje(){
    this.router.navigate(['admin_pregled_izvestaj']);
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  
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

  ime_kupac: string
  prezime_kupac: string
  kor_ime_kupac: string
  lozinka_kupac: string
  telefon_kupac: number
  licna_karta: number

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
        this.snackBar.open("Предузеће је убачено", "Затвори");        
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

  register_kupac(){
    
    this.preduzeceService.ubaciKupca(this.ime_kupac, this.prezime_kupac, this.kor_ime_kupac, this.lozinka_kupac,
       this.telefon_kupac, this.licna_karta).subscribe((resp)=>{
          this.snackBar.open(resp['message'], "Затвори");
       })

  }

}
