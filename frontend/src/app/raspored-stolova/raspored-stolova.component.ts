import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Fiskalna_kasa } from '../models/fiskalna_kasa';
import { Lokacija } from '../models/lokacija';
import { Preduzece } from '../models/preduzece';
import { Preduzece_detalji } from '../models/preduzece_detalji';
import { Raspored } from '../models/raspored';
import { Sto } from '../models/sto';
import { PreduzeceService } from '../service/preduzece.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-raspored-stolova',
  templateUrl: './raspored-stolova.component.html',
  styleUrls: ['./raspored-stolova.component.css']
})
export class RasporedStolovaComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private preduzeceService: PreduzeceService,
          private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userService.dohvKorisnika(sessionStorage.getItem('kor_ime')).subscribe((resp: Preduzece)=>{
      this.korisnik = resp;
      this.preduzeceService.dohvDetaljePreduzece(sessionStorage.getItem('kor_ime')).subscribe((resp: Preduzece_detalji)=>{
        this.korisnik_detalji = resp;
        this.preduzeceService.dohvSveKase().subscribe((resp: Fiskalna_kasa[])=>{
         
          this.svi_objekti = resp;
          for ( let k of this.korisnik_detalji.fis_kase){
            this.preduzeceService.dohvKasu(k).subscribe((data: Fiskalna_kasa)=>{
                this.moji_objekti.push(data);
            })
          }
        })
        
      })
  
      this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
      this.context = this.canvas.getContext("2d");
      this.ucitan_raspored.objekat = new Lokacija()
      
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

  proveri_korisnika(){
    if ( this.korisnik_detalji.kategorija === 'ugostiteljski_objekat') return true;
    else return false;
  }

  predji_na_izdavanje_racuna(){
    this.router.navigate(['izdavanje_racuna'])
  }

  predji_na_pregled_izvestaja(){
    this.router.navigate(['pregled_izvestaja']);
  }

  korisnik: Preduzece;
  korisnik_detalji: Preduzece_detalji;

  svi_objekti: Array<Fiskalna_kasa> = new Array<Fiskalna_kasa>()
  moji_objekti: Array<Fiskalna_kasa> = new Array<Fiskalna_kasa>()

  prostor: string = ''
  objekat: string = ''

  velicina: number
  tip: string

  canvas
  context


  ucitani_stolovi : Array<Sto> = new Array<Sto>() 
  ucitan_raspored: Raspored = new Raspored()

  ucitaj_prostor(){
    if ( this.objekat === '') {
      this.snackBar.open("Морате унети име објекта", "Затвори");
      return;
    }
    if ( this.prostor === ''){
      this.snackBar.open("Морате изабрати простор", "Затвори");
      return;
    }
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    for ( let o of this.moji_objekti){
     
      if ( this.objekat === o.naziv){
        
        this.preduzeceService.dohvRasporedObjekta(this.korisnik.kor_ime, o.lokacija).subscribe((resp: Raspored)=>{
          this.ucitan_raspored = resp;
         
          if ( this.prostor === 'sala'){
            for ( let r of this.ucitan_raspored.sala){
            
              if ( r.krug === false){
              this.context.fillStyle = "#000";
              this.context.fillRect(r.x_poz, r.y_poz, r.x_duzina, r.y_duzina);
              this.context.strokeStyle = "#FF0000";
              this.context.strokeRect(r.x_poz,r.y_poz, r.x_duzina, r.y_duzina);   
              this.context.textAlign = "center";
              this.context.textBaseline = "middle";
              this.context.font = "20px Georgia";
              this.context.fillStyle = "#fff";
              this.context.fillText(r.id, (r.x_poz + r.x_duzina/2), (r.y_poz + r.y_duzina/2));
              }
              else{
                this.context.beginPath();
                this.context.fillStyle = "#000";
                this.context.arc((r.x_poz + r.x_duzina/2), (r.y_poz + r.y_duzina/2), r.x_duzina/2 , 0, Math.PI*2, false);
                this.context.fill();
                this.context.strokeStyle = "#FF0000";
                this.context.stroke();
                this.context.closePath();

                this.context.textAlign = "center";
                this.context.textBaseline = "middle";
                this.context.font = "20px Georgia";
                this.context.fillStyle = "#fff";
                this.context.fillText(r.id, (r.x_poz + r.x_duzina/2), (r.y_poz + r.y_duzina/2));

              }
            }
          }
          else{
            for ( let r of this.ucitan_raspored.basta){
            
              if ( r.krug === false){
              this.context.fillStyle = "#000";
              this.context.fillRect(r.x_poz, r.y_poz, r.x_duzina, r.y_duzina);
              this.context.strokeStyle = "#FF0000";
              this.context.strokeRect(r.x_poz,r.y_poz, r.x_duzina, r.y_duzina);   
              this.context.textAlign = "center";
              this.context.textBaseline = "middle";
              this.context.font = "20px Georgia";
              this.context.fillStyle = "#fff";
              this.context.fillText(r.id, r.x_poz + r.x_duzina/2, r.y_poz + r.y_duzina/2);
              }
              else{
                this.context.beginPath();
                this.context.fillStyle = "#000";
                this.context.arc(r.x_poz + r.x_duzina/2, r.y_poz + r.y_duzina/2, r.x_duzina/2, 0, Math.PI*2, false);
                this.context.fill();
                this.context.strokeStyle = "#FF0000";
                this.context.stroke();
                this.context.closePath();

                this.context.textAlign = "center";
                this.context.textBaseline = "middle";
                this.context.font = "20px Georgia";
                this.context.fillStyle = "#fff";
                this.context.fillText(r.id, r.x_poz + r.x_duzina/2, r.y_poz + r.y_duzina/2);

              }
                

            }
          }
        })
      }
    }
      
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  promeniLozinku(){
    sessionStorage.setItem('kor_ime_promena_lozinke', this.korisnik.kor_ime);
    sessionStorage.setItem('lozinka_promena_lozinke', this.korisnik.lozinka);
    sessionStorage.setItem('tip_promena_lozinke', 'kupac');
    this.router.navigate(['promenaLozinke']);
  }
}
