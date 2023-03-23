import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Adresa } from '../models/adresa';
import { Preduzece } from '../models/preduzece';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

  }

  ime: string
  prezime: string
  kor_ime: string
  lozinka: string = ''
  potvrda_lozinke: string = ''
  telefon: string
  mail: string
  naziv: string
  drzava: string
  grad: string
  postanski_broj: string
  ulica_broj: string
  PIB: number
  maticni_broj: number
  image: string = ''


  //Poruke
  zauzeto_kor_ime: string
  zauzeta_mail_adresa: string

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.image = e.target.result;
      };
  
      reader.readAsDataURL(inputNode.files[0]);
    }
  }

  register(){
    var nova_adresa : Adresa = new Adresa();
    nova_adresa.drzava = this.drzava;
    nova_adresa.grad = this.grad;
    nova_adresa.postanski_broj = this.postanski_broj;
    nova_adresa.ulica_broj = this.ulica_broj;

    var Nova_registracija : Preduzece = new Preduzece();
    Nova_registracija.PIB = this.PIB;
    Nova_registracija.adresa = nova_adresa;
    Nova_registracija.e_mail = this.mail;
    Nova_registracija.ime = this.ime;
    Nova_registracija.prezime = this.prezime;
    Nova_registracija.kor_ime = this.kor_ime;
    Nova_registracija.logo = this.image;
    Nova_registracija.lozinka = this.lozinka;
    Nova_registracija.maticni_broj = this.maticni_broj;
    Nova_registracija.naziv = this.naziv;
    Nova_registracija.prihvaceno = false;
    Nova_registracija.telefon = this.telefon;
    Nova_registracija.tip = 'preduzece';
    Nova_registracija.prvi_put = true;

    this.userService.ubaciPreduzece(Nova_registracija).subscribe((resp)=>{
      if ( resp['message'] === 'ok') {
        sessionStorage.setItem('vlasnik', this.kor_ime);
        this.router.navigate(['']);
      }
      else if ( resp['message'] === 'Korisnicko ime je zauzeto.') this.zauzeto_kor_ime = 'Korisnicko ime je zauzeto.';
      else this.zauzeto_kor_ime = 'E-mail adresa je vec iskoriscena.';
    })

  }

  proveriLozinke(): boolean{

    if ( this.lozinka === '' || this.potvrda_lozinke === '') return false;
    if ( this.lozinka === this.potvrda_lozinke) return true;
    else return false;
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }


}
