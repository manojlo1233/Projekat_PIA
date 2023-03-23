import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Preduzece } from '../models/preduzece';
import { Racun } from '../models/racun';
import { PreduzeceService } from '../service/preduzece.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  displayedColumns: string[] = [ 'nazivP', 'datum']
  dataSource = new MatTableDataSource()

  constructor(private userService: UserService, private router: Router, private preduzeceService: PreduzeceService) { }

  ngOnInit(): void {

    this.preduzeceService.dohvSveRacune().subscribe((resp: Racun[])=>{
      this.svi_racuni = resp;
      this.svi_racuni = this.svi_racuni.sort((rac1,rac2)=> {
        let time1 = new Date(rac1.datum.toString()).getTime();
        let time2 = new Date(rac2.datum.toString()).getTime();
        return time2 - time1;
      });
      for ( let i = 0; i < 5 && i < this.svi_racuni.length; i++){
        this.prikazani_racuni[i] = this.svi_racuni[i];
      }
      this.dataSource.data = this.prikazani_racuni;
      this.dataSource._updateChangeSubscription()
      this.preduzeceService.dohvSvaPreduzeca().subscribe((pred: Preduzece[])=>{
        this.sva_preduzeca = pred;
      })
    })
  }
  
  kor_ime: string
  lozinka: string = ''
  message: string
  
  date : Date = new Date();

  svi_racuni: Racun[] = []

  prikazani_racuni: Racun[] = []
  
  sva_preduzeca: Array<Preduzece> = new Array<Preduzece>();

 login(){
  this.message = '';
    this.userService.login(this.kor_ime, this.lozinka).subscribe((data: Preduzece)=>{
      if (data && data.tip === 'kupac'){
          sessionStorage.setItem('kor_ime', this.kor_ime);
          this.router.navigate(['kupac']);
      }
      else if( data && data.tip === 'preduzece') {
        sessionStorage.setItem('kor_ime', this.kor_ime);
          if ( data.prvi_put ) this.router.navigate(['preduzece'])
          else this.router.navigate(['preduzeceUnutra']);
      }
      else this.message = "Pogresni kredencijali ili nemate nalog";
    })
    
    
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  register(){
    sessionStorage.clear();
    this.router.navigate(['register']);
  }

  dohv_naziv_preduzeca(kor_ime){
    for ( let pred of this.sva_preduzeca){
      if ( pred.kor_ime === kor_ime) return pred.naziv;
    }
    return "invalid";
  }

  dohv_iznos_racuna(racun: Racun){
    let iznos = 0;
    for ( let stv of racun.stavke){
      iznos += stv.cena
    }
    return iznos;
  }

  dohv_porez_racuna(racun: Racun){
    let porez = 0;
    for ( let stv of racun.stavke){
      porez += stv.porez;
    }
    return porez;
  }

  promeniLozinku(){
    this.router.navigate(['promena_lozinke_login']);
  }

}
