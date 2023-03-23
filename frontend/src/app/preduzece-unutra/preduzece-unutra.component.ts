import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preduzece } from '../models/preduzece';
import { Preduzece_detalji } from '../models/preduzece_detalji';
import { PreduzeceService } from '../service/preduzece.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-preduzece-unutra',
  templateUrl: './preduzece-unutra.component.html',
  styleUrls: ['./preduzece-unutra.component.css']
})
export class PreduzeceUnutraComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private preduzeceService: PreduzeceService) { }

  ngOnInit(): void {
    this.userService.dohvKorisnika(sessionStorage.getItem('kor_ime')).subscribe((data: Preduzece)=>{
      if ( data ) this.korisnik = data;
      else this.greska = "Greska"
    });

    this.preduzeceService.dohvDetaljePreduzece(sessionStorage.getItem('kor_ime')).subscribe((data: Preduzece_detalji)=>{
      this.korisnik_detalji = data;
    })

  }

  korisnik: Preduzece = new Preduzece()
  korisnik_detalji: Preduzece_detalji = new Preduzece_detalji()
  greska: string

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

  predji_na_pregled_izvestaja(){
    this.router.navigate(['pregled_izvestaja']);
  }

  promeniLozinku(){
    sessionStorage.setItem('kor_ime_promena_lozinke', this.korisnik.kor_ime);
    sessionStorage.setItem('lozinka_promena_lozinke', this.korisnik.lozinka);
    sessionStorage.setItem('tip_promena_lozinke', 'preduzece');
    this.router.navigate(['promenaLozinke']);
  }
  
  proveri_korisnika(){
    if ( this.korisnik_detalji.kategorija === 'ugostiteljski_objekat') return true;
    else return false;
  }

  predji_na_izdavanje_racuna(){
    this.router.navigate(['izdavanje_racuna']);
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }

}
