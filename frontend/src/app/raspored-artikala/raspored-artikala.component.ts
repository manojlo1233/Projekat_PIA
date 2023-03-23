import { Component, OnInit, PipeTransform } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Artikal } from '../models/artikal';
import { Fiskalna_kasa } from '../models/fiskalna_kasa';
import { Kategorija } from '../models/kategorija';
import { Magacin } from '../models/magacin';
import { Potkategorija } from '../models/potkategorija';
import { Preduzece } from '../models/preduzece';
import { Preduzece_detalji } from '../models/preduzece_detalji';
import { Sifra } from '../models/sifra';
import { PreduzeceService } from '../service/preduzece.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-raspored-artikala',
  templateUrl: './raspored-artikala.component.html',
  styleUrls: ['./raspored-artikala.component.css']
})
export class RasporedArtikalaComponent implements OnInit, PipeTransform {

  displayedColumns: string[] = [ 'sifra', 'naziv', 'jedinica_mere', 'poreska_stopa', 'proizvodjac', 'dodaj']
  dataSource

  constructor(private router: Router, private snackBar: MatSnackBar, private userService:UserService, 
      private preduzeceService: PreduzeceService) { }

  ngOnInit(): void {
    this.userService.dohvKorisnika(sessionStorage.getItem('kor_ime')).subscribe((resp: Preduzece)=>{
      this.korisnik = resp;
      this.preduzeceService.dohvSveKategorije(this.korisnik.kor_ime).subscribe((resp: Kategorija[])=>{
        this.sve_kategorije = resp;
      })
    })
    
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
          this.preduzeceService.dohvSveArtikle().subscribe((resp: Artikal[])=>{
              for ( let art of resp){
                if ( art.preduzece === this.korisnik_detalji.vlasnik) this.svi_artikli.push(art);
              }
              this.dataSource = this.svi_artikli;

              
          })

        })

      })
      
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
  

  korisnik: Preduzece
  korisnik_detalji: Preduzece_detalji

  svi_objekti: Fiskalna_kasa[] = []
  svi_magacini: Magacin[] = []

  moji_objekti: Fiskalna_kasa[] = []
  moji_magacini: Magacin[] = []

  svi_artikli: Artikal[] = []
  trazeni_artikli: Artikal[] = []

  kategorija: string = ''
  potkategorija: string = ''

  sve_kategorije: Array<Kategorija> = new Array();

  dodaj_kategorija: string;
  dodaj_potkategorija: string;

  pretraga: string

  unesi(){
    if ( this.kategorija !== '' && this.potkategorija === '' && this.sve_kategorije.length == 0){
      let kat = new Kategorija();
      kat.kategorija = this.kategorija;
      kat.artikli = new Array<Sifra>();
      kat.potkategorije = new Array<Potkategorija>();
      this.preduzeceService.ubaciKategoriju(this.kategorija,this.korisnik.kor_ime).subscribe((resp)=>{
        if ( resp['message'] === 'Kategorija ubacena') this.snackBar.open('Категорија унета', "Затвори");
      })
      this.sve_kategorije.push(kat);
    }

    if ( this.kategorija !== '' && this.potkategorija === '' && this.sve_kategorije.length != 0){
      for ( let k of this.sve_kategorije){
        if (k.kategorija === this.kategorija){
          this.snackBar.open("Ова категорија је већ унета.", "Затвори");
          return;
        }
      }   
      let kat = new Kategorija();
      kat.kategorija = this.kategorija;
      kat.artikli = new Array<Sifra>();
      kat.potkategorije = new Array<Potkategorija>();
      this.preduzeceService.ubaciKategoriju(this.kategorija, this.korisnik.kor_ime).subscribe((resp)=>{
        if ( resp['message'] === 'Kategorija ubacena') this.snackBar.open('Категорија унета', "Затвори");
      })
      this.sve_kategorije.push(kat);
    }

    if ( this.kategorija !== '' && this.potkategorija !== '' && this.sve_kategorije.length == 0){
      let kat = new Kategorija();
      kat.kategorija = this.kategorija;
      kat.artikli = new Array<Sifra>();
      kat.potkategorije = new Array<Potkategorija>();
      let potKat = new Potkategorija();
      potKat.potkategorija = this.potkategorija;
      potKat.artikli = new Array<Sifra>();
      kat.potkategorije.push(potKat);
      this.preduzeceService.ubaciPotKategoriju(this.kategorija, this.potkategorija,this.korisnik.kor_ime).subscribe((resp)=>{
        this.snackBar.open(resp['message'], "Затвори");
      })
      this.sve_kategorije.push(kat);
     
      
    }

    if ( this.kategorija !== '' && this.potkategorija !== '' && this.sve_kategorije.length != 0){
      for ( let k of this.sve_kategorije){
        if (k.kategorija === this.kategorija){
          for ( let p of k.potkategorije){
            if ( p.potkategorija === this.potkategorija){
              this.snackBar.open("Ова поткатегорија је већ унета.", "Затвори");
              return;
            }
          }
          let potKat = new Potkategorija();
          potKat.potkategorija = this.potkategorija;
          potKat.artikli = new Array<Sifra>();
          k.potkategorije.push(potKat);
          this.preduzeceService.ubaciPotKategoriju(this.kategorija, this.potkategorija, this.korisnik.kor_ime).subscribe((resp)=>{
            this.snackBar.open(resp['message'], "Затвори");
          })
          return;
        }
      } 
      let kat = new Kategorija();
      kat.kategorija = this.kategorija;
      kat.artikli = new Array<Sifra>();
      kat.potkategorije = new Array<Potkategorija>();
      let potKat = new Potkategorija();
      potKat.potkategorija = this.potkategorija;
      potKat.artikli = new Array<Sifra>();
      kat.potkategorije.push(potKat);
      this.sve_kategorije.push(kat);
      this.preduzeceService.ubaciPotKategoriju(this.kategorija, this.potkategorija, this.korisnik.kor_ime).subscribe((resp)=>{
        this.snackBar.open(resp['message'], "Затвори");
      })
    }

  }
  open_popUp(){
    let popUp = document.getElementById("popUp");
    popUp.classList.add('open-popUp');
  }

  close_popUp(){
    let popUp = document.getElementById("popUp");
    popUp.classList.remove('open-popUp');
  }

 

  dodajKat(kat: Kategorija){
    this.dodaj_kategorija = kat.kategorija;
    this.dodaj_potkategorija = '';
    this.open_popUp();
  }

  dodajPot(kat: Kategorija, pot: Potkategorija){
    this.dodaj_kategorija = kat.kategorija;
    this.dodaj_potkategorija = pot.potkategorija
    this.open_popUp();
  }

  pretrazi(){
    for ( let i = 0; i< this.trazeni_artikli.length; i++) this.trazeni_artikli.pop();

    for ( let a of this.svi_artikli){
      if ( a.naziv === this.pretraga){
        this.trazeni_artikli.push(a);
      }
    }
    this.dataSource = this.trazeni_artikli;
  }

  ponisti_pretragu(){
    this.dataSource = this.svi_artikli;
    for ( let i = 0; i< this.trazeni_artikli.length; i++) this.trazeni_artikli.pop();
  }

  dodaj_artikal(sifra){
    this.preduzeceService.dodajArtikluKategoriju(sifra,this.dodaj_kategorija, this.dodaj_potkategorija).subscribe((resp)=>{
      this.snackBar.open(resp['message'], "Затвори")
    })
  }

  onSearchChange(event){
    if ( event.target.value === '') this.dataSource = this.svi_artikli;
    else{
      this.dataSource = this.transform(this.svi_artikli, event.target.value);
     
    }
  }

  transform(svi_artikli , value){
    return value ? svi_artikli.filter(item => item.naziv.includes(value)): svi_artikli;
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
