import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Kupac } from '../models/kupac';
import { Preduzece } from '../models/preduzece';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.kor_ime = sessionStorage.getItem('kor_ime_promena_lozinke');
    this.originalna_lozinka = sessionStorage.getItem('lozinka_promena_lozinke');
    this.tip_promene = sessionStorage.getItem('tip_promena_lozinke');
  
    let tip = sessionStorage.getItem('tip_promena_lozinke');
    if ( tip === 'kupac'){
      this.userService.dohvKorisnika(this.kor_ime).subscribe((data: Kupac)=>{
        if (data) this.korisnik = data;
        else this.greska='Greska';
      })
    }
    else{
      this.userService.dohvKorisnika(this.kor_ime).subscribe((data: Preduzece)=>{
        if (data)this.korisnik = data;
        else this.greska='Greska';
      })
    }
  }

  korisnik
  kor_ime: string
  originalna_lozinka: string = ''
  stara_lozinka: string = ''
  nova_lozinka: string = ''
  potvrda_nove: string = ''
  greska: string
  tip_promene: string

  proveri_staru(): boolean{
    if ( this.originalna_lozinka === this.stara_lozinka) return true;
    else return false;
  }

  promeni_lozinku(){
    this.userService.promeniLozinku(this.kor_ime, this.nova_lozinka).subscribe((resp)=>{
      if ( resp['message'] === "ok") {
         this.snackBar.open("Успешно промењена лозинка", "Затвори")
         this.router.navigate['preduzeceUnutra']
      }
      if ( this.tip_promene ==='kupac') this.router.navigate(["kupac"]);
      else if ( this.tip_promene === 'preduzece') this.router.navigate(["preduzeceUnutra"])
      
    });
  }

  potvrdi_novu_lozniku(){
    if ( this.potvrda_nove === this.nova_lozinka) return true;
    else return false;
  }

  nova_razlicita(): boolean{
    if ( this.nova_lozinka !== this.originalna_lozinka) return true;
    else return false;
  }

  logout(){
    if ( this.tip_promene ==='kupac') this.router.navigate(["kupac"]);
      else if ( this.tip_promene === 'preduzece') this.router.navigate(["preduzeceUnutra"])
  }

}
