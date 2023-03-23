import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Artikal } from '../models/artikal';
import { Artikal_unos } from '../models/artikal_unos';
import { Fiskalna_kasa } from '../models/fiskalna_kasa';
import { Magacin } from '../models/magacin';
import { Preduzece } from '../models/preduzece';
import { Preduzece_detalji } from '../models/preduzece_detalji';
import { PreduzeceService } from '../service/preduzece.service';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-robe-i-usluge',
  templateUrl: './robe-i-usluge.component.html',
  styleUrls: ['./robe-i-usluge.component.css']
})
export class RobeIUslugeComponent implements OnInit {

  constructor(private router: Router, private preduzeceService: PreduzeceService, private userService: UserService,
            private snackBar: MatSnackBar) { }

  displayedColumns: string[] = [ 'sifra', 'naziv', 'jedinica_mere', 'poreska_stopa', 'proizvodjac']
  displayedColumns2: string[] = [ 'sifra1', 'naziv1', 'jedinica_mere1', 'poreska_stopa1', 'proizvodjac1', 'a', 'b']
  displayedColumns3: string[] = [ 'nazivO', 'sifra','nabavna', 'prodajna', 'lager', 'min_kolicina', 'maks_kolicina', 'dodaj']
  
  dataSource1 = new MatTableDataSource()
  dataSource2 = new MatTableDataSource()
  dataSource3 = new MatTableDataSource()

  ngOnInit(): void {
    this.userService.dohvKorisnika(sessionStorage.getItem('kor_ime')).subscribe((resp: Preduzece)=>{
      this.korisnik = resp;
      this.preduzeceService.dohvDetaljePreduzece(sessionStorage.getItem('kor_ime')).subscribe((resp: Preduzece_detalji)=>{

        this.korisnik_detalji = resp;
  
        
  
        this.preduzeceService.dohvSveKase().subscribe((resp: Fiskalna_kasa[])=>{
          this.svi_objekti = resp;
          for ( let o1 of this.korisnik_detalji.fis_kase){
            for ( let o2 of this.svi_objekti){
              if ( o1.drzava === o2.lokacija.drzava && o1.grad === o2.lokacija.grad && o1.ulicaBroj === o2.lokacija.ulicaBroj){
                this.moji_objekti.push(o2);
                break;
              }
            }
          }
  
          for ( let k of this.moji_objekti){
            let artikal = new Artikal_unos();
            artikal.naziv_objekta = k.naziv;
            artikal.max_kolicina = 0;
            artikal.min_kolicina = 0;
            artikal.lager = 0;
            artikal.nabavna_cena = 0;
            artikal.prodajna_cena = 0;
            artikal.tip = 'kasa';
            artikal.lokacija = k.lokacija;
            this.novi_artikli.push(artikal);
          }     
          
          for ( let o of this.moji_objekti){
            for ( let art of o.artikli){
           
              let artikal_promena = new Artikal_unos();
              artikal_promena.lokacija = o.lokacija;
              artikal_promena.lager = art.stanje_lagera;
              artikal_promena.max_kolicina = art.max_kolicina;
              artikal_promena.min_kolicina = art.min_kolicina;
              artikal_promena.nabavna_cena = art.nabavna_cena;
              artikal_promena.naziv_objekta = o.naziv;
              artikal_promena.prodajna_cena = art.prodajna_cena;
              artikal_promena.tip = 'kasa'
              artikal_promena.sifra = art.sifra;
              this.artikli_objekata.push(artikal_promena);
            }
          }
          
          this.preduzeceService.dohvSveMagacine().subscribe((resp: Magacin[])=>{
            this.svi_magacini = resp;
            for ( let m2 of this.svi_magacini){
               for ( let m1 of this.korisnik_detalji.magacini){
                if ( m1.identifikator === m2.identifikator){
        
                  this.moji_magacini.push(m2);
                  break;
                }
              }
            }
     
      
            for ( let m of this.moji_magacini){
              let artikal = new Artikal_unos();
              artikal.naziv_objekta = m.naziv;
              artikal.max_kolicina = 0;
              artikal.min_kolicina = 0;
              artikal.lager = 0;
              artikal.nabavna_cena = 0;
              artikal.prodajna_cena = 0;
              artikal.tip = 'magacin';
              artikal.id = m.identifikator;
              this.novi_artikli.push(artikal);
            }
               
            this.dataSource2.data = this.novi_artikli;
            
            
                
                for ( let m of this.moji_magacini){
                  for ( let art of m.artikli){
                    
                    let artikal_promena = new Artikal_unos();
                    artikal_promena.id = m.identifikator;
                    artikal_promena.lager = art.stanje_lagera;
                    artikal_promena.max_kolicina = art.max_kolicina;
                    artikal_promena.min_kolicina = art.min_kolicina;
                    artikal_promena.nabavna_cena = art.nabavna_cena;
                    artikal_promena.naziv_objekta = m.naziv;
                    artikal_promena.prodajna_cena = art.prodajna_cena;
                    artikal_promena.tip = 'magacin'
                    artikal_promena.sifra = art.sifra;
                    this.artikli_objekata.push(artikal_promena);
                  }
                }
                this.dataSource3.data = this.artikli_objekata;

            this.preduzeceService.dohvSveArtikle().subscribe((resp: Artikal[])=>{
                for ( let art of resp){
                  if ( art.preduzece == this.korisnik.kor_ime) this.svi_artikli.push(art);
                }
                this.dataSource1.data = this.svi_artikli;
            })
          })
        })
      })
    })
  }

  korisnik: Preduzece = new Preduzece()
  korisnik_detalji: Preduzece_detalji = new Preduzece_detalji()

  svi_objekti: Fiskalna_kasa[] = []
  svi_magacini: Magacin[] = []

  moji_objekti: Fiskalna_kasa[] = []
  moji_magacini: Magacin[] = []

  svi_artikli: Artikal[] = []
  velicina_strane = 1;

  sifra: number = 0;
  naziv: string = ''
  jedinica_mere: string = ''
  poreska_stopa: string = ''
  tip: string = ''
  logo: string = '/assets/fff.png'

  poreklo: string = ''
  strani_naziv: string = ''
  proizvodjac: string = ''
  bar_kod: number = 0
  carinska_tarifa: string = ''
  min_zaliheP: number = 0
  max_zaliheP: number = 0
  opis: string = ''
  deklaracija: string = ''
  eko_taksa: boolean
  akcize: boolean

  novi_artikli: Artikal_unos[] = []
  

  OnPageChange(event: PageEvent){
    console.log(event);
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if ( endIndex > this.svi_artikli.length){
      endIndex = this.svi_artikli.length
    }
    this.dataSource1.data = this.svi_artikli.slice(startIndex, endIndex);
    this.dataSource1._updateChangeSubscription()
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

  korisnik_ugostitelj(){
    if ( this.korisnik_detalji.kategorija === 'ugostiteljski_objekat') return true;
    else {
      this.tip = 'invalid';
      return false;
    }
    
  }

  dodaj(element: Artikal_unos){
    if ( this.sifra <= 0 || this.naziv === '' || this.jedinica_mere === '' || this.poreska_stopa === '' || this.logo === ''
    || this.tip === '' || element.lager <= 0 || element.max_kolicina <=0 || element.min_kolicina <=0 || element.nabavna_cena <=0 ||
      element.prodajna_cena <=0) this.snackBar.open('Морате унети опште податке и све податке везане за робе и услуге.', 'Затвори');
      else if ( element.tip === 'magacin'){
        this.preduzeceService.ubaciArtikal(this.korisnik.kor_ime, this.sifra, this.naziv, this.jedinica_mere,
          this.poreska_stopa, this.tip, this.poreklo, this.strani_naziv, this.bar_kod, this.proizvodjac,
          this.carinska_tarifa, this.eko_taksa, this.akcize, this.max_zaliheP, this.min_zaliheP, this.opis,
           this.deklaracija, this.logo).subscribe((resp)=>{
            if (resp['message']=== 'ok')  {
              this.preduzeceService.ubaciArtikalMagacin(element.id, this.sifra, element.nabavna_cena, element.prodajna_cena, 
                element.lager, element.min_kolicina, element.max_kolicina).subscribe((resp)=>{
                  if (resp['message'] === 'ok') {
                    this.snackBar.open('Артикал убачен у магацин', 'Затвори')
                    this.preduzeceService.dohvSveArtikle().subscribe((resp: Artikal[])=>{
                      this.svi_artikli.splice(0,this.svi_artikli.length)
                      for ( let art of resp){
                        if ( art.preduzece == this.korisnik.kor_ime) this.svi_artikli.push(art);
                      }
        
                      this.dataSource1.data = this.svi_artikli;
                      this.dataSource1._updateChangeSubscription()
                  })
                  }
                  else if ( resp['message'] === 'postoji') this.snackBar.open('Овај артикал већ постоиј у магацину', 'Затвори')
                  else this.snackBar.open('Грешка', 'Затвори')
                })
            }
            else if (resp['message'] === 'artikal_postoji'){
              alert(element.id)
              this.preduzeceService.ubaciArtikalMagacin(element.id, this.sifra, element.nabavna_cena, element.prodajna_cena, 
                element.lager, element.min_kolicina, element.max_kolicina).subscribe((resp)=>{
                  if (resp['message'] === 'ok') {
                    this.snackBar.open('Артикал постоји и убачен у магацин', 'Затвори')
                  }
                  else if ( resp['message'] === 'postoji') this.snackBar.open('Овај артикал већ постоиј у магацину', 'Затвори')
                  else this.snackBar.open('Грешка', 'Затвори')
                })
              
            } 
            else this.snackBar.open('Грешка при убацивању артикла', 'Затвори')
           })
         
      }
      else{
        this.preduzeceService.ubaciArtikal(this.korisnik.kor_ime, this.sifra, this.naziv, this.jedinica_mere,
          this.poreska_stopa, this.tip, this.poreklo, this.strani_naziv, this.bar_kod, this.proizvodjac,
          this.carinska_tarifa, this.eko_taksa, this.akcize, this.max_zaliheP, this.min_zaliheP, this.opis,
           this.deklaracija, this.logo).subscribe((resp)=>{
            if (resp['message']=== 'ok') {
              this.preduzeceService.ubaciArtikalKasa(element.lokacija.drzava, element.lokacija.grad, element.lokacija.ulicaBroj, this.sifra,
                element.nabavna_cena, element.prodajna_cena, element.lager, element.min_kolicina, element.max_kolicina).subscribe((resp)=>{
                  if (resp['message'] === 'ok'){
                    this.snackBar.open('Артикал убачен у објекат', 'Затвори')
                    this.preduzeceService.dohvSveArtikle().subscribe((resp: Artikal[])=>{
                      this.svi_artikli.splice(0,this.svi_artikli.length)
                      for ( let art of resp){
                        if ( art.preduzece == this.korisnik.kor_ime) this.svi_artikli.push(art);
                      }
        
                      this.dataSource1.data = this.svi_artikli;
                      this.dataSource1._updateChangeSubscription()
                  })
                  }
                  else if ( resp['message'] === 'postoji') this.snackBar.open('Овај артикал већ постоиј у објекту', 'Затвори')
                  else this.snackBar.open('Грешка', 'Затвори')
                })
            }
            else if (resp['message'] === 'artikal_postoji'){
              this.preduzeceService.ubaciArtikalKasa(element.lokacija.drzava, element.lokacija.grad, element.lokacija.ulicaBroj, this.sifra,
                element.nabavna_cena, element.prodajna_cena, element.lager, element.min_kolicina, element.max_kolicina).subscribe((resp)=>{
                  if (resp['message'] === 'ok') {
                    this.snackBar.open('Артикал постоји и убачен у објекат', 'Затвори')
                  }
                  else if ( resp['message'] === 'postoji') this.snackBar.open('Овај артикал већ постоиј у објекту', 'Затвори')
                  else this.snackBar.open('Грешка', 'Затвори')
                })
            } 
            else this.snackBar.open('Грешка при убацивању артикла', 'Затвори')
           })
        
      }
  }

  proveri_korisnika(){
    if ( this.korisnik_detalji.kategorija === 'ugostiteljski_objekat') return true;
    else return false;
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  sifra_izmena: number = 0;
  naziv_izmena: string = ''
  jedinica_mere_izmena: string = ''
  poreska_stopa_izmena: string = ''
  tip_izmena: string = ''
  logo_izmena: string = ''

  poreklo_izmena: string = ''
  strani_naziv_izmena: string = ''
  proizvodjac_izmena: string = ''
  bar_kod_izmena: number = 0
  carinska_tarifa_izmena: string = ''
  min_zaliheP_izmena: number = 0
  max_zaliheP_izmena: number = 0
  opis_izmena: string = ''
  deklaracija_izmena: string = ''
  eko_taksa_izmena: boolean
  akcize_izmena: boolean

  artikli_objekata: Artikal_unos[] = []

  onFileSelected_izmena(){
    const inputNode: any = document.querySelector('#file');
  
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.logo_izmena = e.target.result;
      };
  
      reader.readAsDataURL(inputNode.files[0]);
    }
  }

  pretrazi_artikal(){

    this.preduzeceService.dohvArtikal(this.korisnik.kor_ime, this.sifra_izmena).subscribe((resp: Artikal)=>{
      if ( resp) {
        let artikal = resp;
        this.naziv_izmena = artikal.naziv;
        this.jedinica_mere_izmena = artikal.jedinica_mere;
        this.poreska_stopa_izmena = artikal.poreska_stopa;
        this.tip_izmena = artikal.tip;
        this.logo_izmena = artikal.slika;
        this.poreklo_izmena = artikal.dopunski_podaci.zemlja_porekla;
        this.strani_naziv_izmena = artikal.dopunski_podaci.strani_naziv;
        this.bar_kod_izmena = artikal.dopunski_podaci.barkod;
        this.proizvodjac_izmena = artikal.dopunski_podaci.proizvodjac;
        this.carinska_tarifa_izmena = artikal.dopunski_podaci.carinska_tarifa;
        this.eko_taksa_izmena = artikal.dopunski_podaci.eko_taksa;
        this.akcize_izmena = artikal.dopunski_podaci.akcize;
        this.min_zaliheP_izmena = artikal.dopunski_podaci.min_zaliheP;
        this.max_zaliheP_izmena = artikal.dopunski_podaci.max_zaliheP;
        this.opis_izmena = artikal.dopunski_podaci.opis;
        this.deklaracija_izmena = artikal.dopunski_podaci.deklaracija;
      }
      else {
        this.snackBar.open("Тражени артикал не постоји", "Затвори")
        return;
      }

    })
  
  }

  izmeni_artikal(){
    this.preduzeceService.izmeniArtikal(this.korisnik.kor_ime, this.sifra_izmena, this.naziv_izmena, this.jedinica_mere_izmena,
      this.poreska_stopa_izmena,this.tip_izmena,this.poreklo_izmena,this.strani_naziv_izmena,this.bar_kod_izmena,this.proizvodjac_izmena,
      this.carinska_tarifa_izmena,this.eko_taksa_izmena,this.akcize_izmena,this.min_zaliheP_izmena,this.max_zaliheP_izmena,this.opis_izmena,
      this.deklaracija_izmena,this.sifra_izmena).subscribe((resp)=>{
        this.snackBar.open(resp['message'], "Затвори");
        this.preduzeceService.dohvSveArtikle().subscribe((resp:Artikal[])=>{
          this.svi_artikli.splice(0,this.svi_artikli.length)
          for ( let art of resp){
            if ( art.preduzece == this.korisnik.kor_ime) this.svi_artikli.push(art);
          }
          this.dataSource1.data = this.svi_artikli;
          this.dataSource1._updateChangeSubscription()
        })
      })
  }
  
  izmeni_artikal_objekat(element: Artikal_unos){
    this.preduzeceService.izmeniArtikalObjekat(element).subscribe((resp)=>{
      this.snackBar.open(resp['message'], "Затвори")
    })
  }

  sifra_brisanje: number = 0

  obrisi_artikal(){
    this.preduzeceService.izbrisiArtikal(this.korisnik.kor_ime, this.sifra_brisanje).subscribe((resp)=>{
      if (resp['message'] === 'Артикал је избрисан'){
        this.preduzeceService.izbrisiArtikalKasa(this.sifra_brisanje).subscribe((resp)=>{
          if ( resp['message']==='Артикал избрисан из касе'){
            this.preduzeceService.izbrisiArtikalMagacin(this.sifra_brisanje).subscribe((resp)=>{
              this.snackBar.open(resp['message'], "Затвори")
              window.location.reload()
            })
          }
        })
      }
      else this.snackBar.open(resp['message'], "Затвори")
    })
  }

}
