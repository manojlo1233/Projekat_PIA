import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Admin_izvestaj } from '../models/admin_dnevni_izvestaj';
import { Preduzece } from '../models/preduzece';
import { Racun } from '../models/racun';
import { PreduzeceService } from '../service/preduzece.service';

@Component({
  selector: 'app-admin-dnevni-izvestaj',
  templateUrl: './admin-dnevni-izvestaj.component.html',
  styleUrls: ['./admin-dnevni-izvestaj.component.css']
})
export class AdminDnevniIzvestajComponent implements OnInit {

  displayedColumns: string[] = [ 'nazivP', 'pib', 'ukupan_pazar', 'ukupan_pdv', 'datum']
  dataSource = new MatTableDataSource()
  
  constructor(private router: Router, private preduzeceService: PreduzeceService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.preduzeceService.dohvSvaPreduzeca().subscribe((pred: Preduzece[])=>{
      this.sva_preduzeca = pred;
    })
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

  sva_preduzeca: Array<Preduzece> = new Array<Preduzece>()

  izabrana_preduzeca: Array<Admin_izvestaj> = new Array<Admin_izvestaj>();

  naziv_preduzeca: string = ''
  pib_preduzeca: number = 0
  datum_od: string 
  datum_do: string 

  pretrazi(){
  
    this.izabrana_preduzeca.splice(0,this.izabrana_preduzeca.length);

    let datumDo = new Date(this.datum_do);
    let datumOd = new Date(this.datum_od);

    if ( datumDo.getTime() < datumOd.getTime()) {
      this.snackBar.open("Морате правилно унети датуме", "Затвори");
      return;
    }

    if ( this.naziv_preduzeca !== '' && this.pib_preduzeca !== 0){
     
      for ( let pred of this.sva_preduzeca){
        if ( pred.naziv === this.naziv_preduzeca && pred.PIB == this.pib_preduzeca){
         
          this.preduzeceService.dohvSveRacunePreduzeca(pred.kor_ime).subscribe((resp: Racun[])=>{
           
            for ( let i = 0 ; i <= (datumDo.getTime()-datumOd.getTime())/1000/60/60/24 ; i++){
              let nov_podatak = new Admin_izvestaj();
              nov_podatak.preduzece = pred.naziv;
              nov_podatak.pib = pred.PIB;
              let datum : Date = new Date(datumOd.getTime() + 1000*60*60*24*i);
              nov_podatak.dan = datum.toISOString().slice(0,10);
              let ukupna_suma = 0;
              let ukupan_pdv = 0;
                for ( let r of resp){
                    if ( datum.toISOString().slice(0,10) === r.datum.toString().slice(0,10) ){ 
                      for ( let stv of r.stavke){
                        ukupna_suma = ukupna_suma + stv.cena;
                        ukupan_pdv = ukupan_pdv + stv.porez;
                      }
                    }
                }
              nov_podatak.dnevni_pazar = ukupna_suma;
              nov_podatak.pdv = ukupan_pdv;
              this.izabrana_preduzeca.push(nov_podatak);
            }
            
            this.dataSource.data = this.izabrana_preduzeca;
            this.dataSource._updateChangeSubscription();
           
          })
   
        }
        else {
          this.dataSource.data = this.izabrana_preduzeca;
            this.dataSource._updateChangeSubscription();
        }
      }
    }
    else if ( this.naziv_preduzeca === '' && this.pib_preduzeca !== 0){
     
      for ( let pred of this.sva_preduzeca){
        if ( pred.PIB === this.pib_preduzeca){
         
          this.preduzeceService.dohvSveRacunePreduzeca(pred.kor_ime).subscribe((resp: Racun[])=>{
           
            for ( let i = 0 ; i <= (datumDo.getTime()-datumOd.getTime())/1000/60/60/24 ; i++){
              let nov_podatak = new Admin_izvestaj();
              nov_podatak.preduzece = pred.naziv;
              nov_podatak.pib = pred.PIB;
              let datum : Date = new Date(datumOd.getTime() + 1000*60*60*24*i);
              nov_podatak.dan = datum.toISOString().slice(0,10);
              let ukupna_suma = 0;
              let ukupan_pdv = 0;
                for ( let r of resp){
                    if ( datum.toISOString().slice(0,10) === r.datum.toString().slice(0,10) ){ 
                      for ( let stv of r.stavke){
                        ukupna_suma = ukupna_suma + stv.cena;
                        ukupan_pdv = ukupan_pdv + stv.porez;
                      }
                    }
                }
              nov_podatak.dnevni_pazar = ukupna_suma;
              nov_podatak.pdv = ukupan_pdv;
              this.izabrana_preduzeca.push(nov_podatak);
            }
            
            this.dataSource.data = this.izabrana_preduzeca;
            this.dataSource._updateChangeSubscription();
           
          })
 
        }
        else {
          this.dataSource.data = this.izabrana_preduzeca;
            this.dataSource._updateChangeSubscription();
        }
      }
    }
    else if ( this.naziv_preduzeca !== '' && this.pib_preduzeca === 0){
     
      for ( let pred of this.sva_preduzeca){
        if ( pred.naziv === this.naziv_preduzeca){
         
          this.preduzeceService.dohvSveRacunePreduzeca(pred.kor_ime).subscribe((resp: Racun[])=>{
           
            for ( let i = 0 ; i <= (datumDo.getTime()-datumOd.getTime())/1000/60/60/24 ; i++){
              let nov_podatak = new Admin_izvestaj();
              nov_podatak.preduzece = pred.naziv;
              nov_podatak.pib = pred.PIB;
              let datum : Date = new Date(datumOd.getTime() + 1000*60*60*24*i);
              nov_podatak.dan = datum.toISOString().slice(0,10);
              let ukupna_suma = 0;
              let ukupan_pdv = 0;
                for ( let r of resp){
                    if ( datum.toISOString().slice(0,10) === r.datum.toString().slice(0,10) ){ 
                      for ( let stv of r.stavke){
                        ukupna_suma = ukupna_suma + stv.cena;
                        ukupan_pdv = ukupan_pdv + stv.porez;
                      }
                    }
                }
              nov_podatak.dnevni_pazar = ukupna_suma;
              nov_podatak.pdv = ukupan_pdv;
              this.izabrana_preduzeca.push(nov_podatak);
            }
            
            this.dataSource.data = this.izabrana_preduzeca;
            this.dataSource._updateChangeSubscription();
           
          })
 
        }
        else {
          this.dataSource.data = this.izabrana_preduzeca;
            this.dataSource._updateChangeSubscription();
        }
      }
    }
    else if ( this.naziv_preduzeca === '' && this.pib_preduzeca === 0){
     
      for ( let pred of this.sva_preduzeca){

        this.preduzeceService.dohvSveRacunePreduzeca(pred.kor_ime).subscribe((resp: Racun[])=>{
          
          for ( let i = 0 ; i <= (datumDo.getTime()-datumOd.getTime())/1000/60/60/24 ; i++){
            let nov_podatak = new Admin_izvestaj();
            nov_podatak.preduzece = pred.naziv;
            nov_podatak.pib = pred.PIB;
            let datum : Date = new Date(datumOd.getTime() + 1000*60*60*24*i);
            nov_podatak.dan = datum.toISOString().slice(0,10);
            let ukupna_suma = 0;
            let ukupan_pdv = 0;
              for ( let r of resp){
                  if ( datum.toISOString().slice(0,10) === r.datum.toString().slice(0,10) ){ 
                    for ( let stv of r.stavke){
                      ukupna_suma = ukupna_suma + stv.cena;
                      ukupan_pdv = ukupan_pdv + stv.porez;
                    }
                  }
              }
            nov_podatak.dnevni_pazar = ukupna_suma;
            nov_podatak.pdv = ukupan_pdv;
            this.izabrana_preduzeca.push(nov_podatak);
          }
          
          this.dataSource.data = this.izabrana_preduzeca;
          this.dataSource._updateChangeSubscription();
          
        })
         
      }
    }  
      
    this.naziv_preduzeca = '';
    this.pib_preduzeca = 0;
  }

}
