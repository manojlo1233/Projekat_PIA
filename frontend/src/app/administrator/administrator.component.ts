import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Adresa } from '../models/adresa';
import { Narucilac } from '../models/narucilac';
import { Preduzece } from '../models/preduzece';
import { PreduzeceService } from '../service/preduzece.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {

  displayedColumns: string[] = [ 'ime', 'prezime', 'kor_ime', 'lozinka', 'prihavceno', 'dugmeP', 'dugmeD']
  dataSource = new MatTableDataSource()

  constructor(private router: Router, private userService: UserService, private preduzeceService: PreduzeceService,
      private snacBar: MatSnackBar) { }

  ngOnInit(): void {
    this.preduzeceService.dohvSvaPreduzeca().subscribe((resp: Preduzece[])=>{
      this.sva_preduzeca = resp;
      this.dataSource.data = this.sva_preduzeca;
      this.dataSource._updateChangeSubscription();
      this.prikazano_preduzece.adresa = new Adresa();
      this.prikazano_preduzece.narucioci = new Array<Narucilac>()
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

  prikazano_preduzece: Preduzece = new Preduzece();

  open_popUp(kor_ime){
    for ( let pred of this.sva_preduzeca){
      if ( pred.kor_ime === kor_ime) this.prikazano_preduzece = pred;
    }
    let popUp = document.getElementById("popUp");
    popUp.classList.add('open-popUp');
  }

  close_popUp(){
    let popUp = document.getElementById("popUp");
    popUp.classList.remove('open-popUp');
  }

  prihvati_preduzece(kor_ime){
    this.preduzeceService.prihvatiPreduzece(kor_ime).subscribe((resp)=>{
      for ( let pred of this.sva_preduzeca){
        if ( pred.kor_ime === kor_ime) {
          pred.prihvaceno = true;
          this.dataSource.data = this.sva_preduzeca;
          this.dataSource._updateChangeSubscription();
        }
      }
      this.snacBar.open(resp['message'], "Затвори")
    })
  }

  deaktiviraj_preduzece(kor_ime){
    this.preduzeceService.deaktivirajPreduzece(kor_ime).subscribe((resp)=>{
      for ( let pred of this.sva_preduzeca){
        if ( pred.kor_ime === kor_ime) {
          pred.prihvaceno = false;
          this.dataSource.data = this.sva_preduzeca;
          this.dataSource._updateChangeSubscription();
        }
      }
      this.snacBar.open(resp['message'], "Затвори")
    })
  }

  dohv_ime_preduzeca(kor_ime){
    for ( let pred of this.sva_preduzeca){
      if ( pred.kor_ime === kor_ime) return pred.naziv;
    }
    return "Грешка"
  }

}
