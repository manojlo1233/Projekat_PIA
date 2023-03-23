import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Artikal } from '../models/artikal';
import { Artikal_cene_stanje } from '../models/artikal_cene_stanje';
import { Fiskalna_kasa } from '../models/fiskalna_kasa';
import { Lokacija } from '../models/lokacija';
import { Magacin } from '../models/magacin';
import { Preduzece } from '../models/preduzece';
import { Preduzece_detalji } from '../models/preduzece_detalji';
import { Racun } from '../models/racun';
import { Raspored } from '../models/raspored';
import { Stavka } from '../models/stavka';
import { Sto } from '../models/sto';
import { PreduzeceService } from '../service/preduzece.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-izdavanje-racuna',
  templateUrl: './izdavanje-racuna.component.html',
  styleUrls: ['./izdavanje-racuna.component.css']
})
export class IzdavanjeRacunaComponent implements OnInit {

  displayedColumns: string[] = [ 'nazivP', 'nazivM', 'cena', 'dugme']
  displayedColumns2: string[] = [ 'narucilac', 'broj_dana_placanja', 'procenat_rabata', 'dugme']
  displayedColumns3: string[] = [ 'nazivP', 'nazivO', 'cena', 'dugme']
  displayedColumns4: string[] = [ 'nazivO', 'nazivP', 'cena', 'sto', 'dugme']

  dataSource2

  constructor(private router: Router, private userService: UserService, private preduzeceService: PreduzeceService,
      private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.kor_ime_vlasnika = sessionStorage.getItem('kor_ime');
    
    this.userService.dohvKorisnika(sessionStorage.getItem('kor_ime')).subscribe((resp: Preduzece)=>{
      this.korisnik = resp;

      this.dataSource2 = this.korisnik.narucioci;

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
          for ( let o of this.moji_objekti){
            this.otvoren_racun.set(o.naziv, false);
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
              this.otvoren_racun.set(m.naziv, false);
            }
          

            this.preduzeceService.dohvSveArtikle().subscribe((resp: Artikal[])=>{
                for ( let art of resp){
                  if ( art.preduzece == this.korisnik.kor_ime) this.svi_artikli.push(art);
                } 
            })
  
          })
  
        })
        
      })
      
    })
    this.preduzeceService.dohvSveOtvoreneRacune(this.korisnik.kor_ime).subscribe((resp: Racun[])=>{
      this.svi_otvoreni_racuni = resp;
     
    })

    
    this.ucitan_raspored.objekat = new Lokacija()   
    
  }

  kor_ime_vlasnika: string
  korisnik: Preduzece
  korisnik_detalji: Preduzece_detalji

  svi_objekti: Array<Fiskalna_kasa> = new Array<Fiskalna_kasa>()
  moji_objekti: Array<Fiskalna_kasa> = new Array<Fiskalna_kasa>()

  svi_magacini: Array<Magacin> = new Array<Magacin>()
  moji_magacini: Array<Magacin> = new Array<Magacin>()

  svi_artikli: Array<Artikal> = new Array<Artikal>()
  artikli_prikazanog_objekta: Array<Artikal_cene_stanje> = new Array<Artikal_cene_stanje>()

  prostor: string = ''
  objekat: string = ''

  canvas
  context

  ucitani_stolovi : Array<Sto> = new Array<Sto>() 
  ucitani_zauzeti_stolovi: Array<Sto> = new Array<Sto>()

  ucitan_raspored: Raspored = new Raspored()

  svi_otvoreni_racuni = Array<Racun>()
  
  kolicina_magacin: number

  otvoren_racun: Map<string,boolean> = new Map<string,boolean>();
  nov_racun: Map<string, Racun> = new Map<string,Racun>();

  otvoren_racun_sto: Map<number, boolean>= new Map<number, boolean>()
  nov_racun_sto: Map<number, Racun> = new Map<number, Racun>()

  nacin_kupovine: string;
  kupac: string;

  //kes
  gotovina_vrednost: number = 0;
  kusur_kes: number = 0;
  licna_karta_kes: number = 0;
  //cek
  ime_kupac: string = ''
  prezime_kupac: string = '';
  licna_karta_cek: number = 0
  //kartica
  licna_karta_kartica: number = 0
  broj_slip_racuna: number = 0
  //verman
  narucioc_kor_ime: string = ''


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

  proveri_korisnika(){
    if ( this.korisnik_detalji === undefined){
      this.preduzeceService.dohvDetaljePreduzece(sessionStorage.getItem('kor_ime')).subscribe((resp: Preduzece_detalji)=>{
        this.korisnik_detalji = resp;
        if ( this.korisnik_detalji.kategorija === 'ugostiteljski_objekat') return true;
        else return false;
      })
    }
    else{
      if ( this.korisnik_detalji.kategorija === 'ugostiteljski_objekat') return true;
      else return false;
    }
    return false;
  }

  promeniLozinku(){
    sessionStorage.setItem('kor_ime_promena_lozinke', this.korisnik.kor_ime);
    sessionStorage.setItem('lozinka_promena_lozinke', this.korisnik.lozinka);
    sessionStorage.setItem('tip_promena_lozinke', 'kupac');
    this.router.navigate(['promenaLozinke']);
  }
 
  ucitaj_prostor(){
    this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
    this.context = this.canvas.getContext("2d");
    this.ucitani_stolovi.splice(0,this.ucitani_stolovi.length);
    this.ucitani_zauzeti_stolovi.splice(0,this.ucitani_zauzeti_stolovi.length);

    this.ucitaj_artikle_objekta(this.objekat); // ucitavamo artikle trenutno izabranog objekta

    this.preduzeceService.dohvSveOtvoreneRacune(this.korisnik.kor_ime).subscribe((resp: Racun[])=>{
      this.svi_otvoreni_racuni = resp;
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
                
                this.ucitani_stolovi.push(r); // ucitavamo stolove u niz
                this.otvoren_racun_sto.set(r.id, false); // postavljamo automatski da svi nemaju otvoren racun na njih

                if ( r.krug === false){
                  this.context.fillStyle = "#000";
                  this.context.fillRect(r.x_poz, r.y_poz, r.x_duzina, r.y_duzina);
                  this.context.strokeStyle = "#FF0000";
                  this.context.strokeRect(r.x_poz,r.y_poz, r.x_duzina, r.y_duzina);   
                  this.context.textAlign = "center";
                  this.context.textBaseline = "middle";
                  this.context.font = "20px Georgia";
                  let preskoci = false;

                  for ( let racuni of this.svi_otvoreni_racuni){
                    if ( racuni.sto == r.id){
                      this.ucitani_zauzeti_stolovi.push(r); // ucitavamo zauzete stolove u niz
                      this.otvoren_racun_sto.set(r.id, true); // ispravljamo da sto ima otvoren racun
                      this.context.fillStyle = "#fff";
                      this.context.fillText('ZAUZETO', (r.x_poz + r.x_duzina/2), (r.y_poz + r.y_duzina/2));
                      preskoci = true;
                      break;
                    }
                  }
                  if ( !preskoci){
                    this.context.fillStyle = "#fff";
                    this.context.fillText(r.id, r.x_poz + r.x_duzina/2, r.y_poz + r.y_duzina/2);
                  }
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
                  let preskoci = false;

                  for ( let racuni of this.svi_otvoreni_racuni){
                    if ( racuni.sto == r.id){
                      this.ucitani_zauzeti_stolovi.push(r); // ucitavamo zauzete stolove u niz
                      this.otvoren_racun_sto.set(r.id, true); // ispravljamo da sto ima otvoren racun
                      this.context.fillStyle = "#fff";
                      this.context.fillText('ZAUZETO', (r.x_poz + r.x_duzina/2), (r.y_poz + r.y_duzina/2));
                      preskoci = true;
                      break;
                    }
                  }
                  if ( !preskoci){
                    this.context.fillStyle = "#fff";
                    this.context.fillText(r.id, r.x_poz + r.x_duzina/2, r.y_poz + r.y_duzina/2);
                  }
  
                }
              }
            }
            else{
              for ( let r of this.ucitan_raspored.basta){
                
                this.ucitani_stolovi.push(r); // ucitavamo stolove u niz
                this.otvoren_racun_sto.set(r.id, false); // postavljamo automatski da svi nemaju otvoren racun na njih

                if ( r.krug === false){
                this.context.fillStyle = "#000";
                this.context.fillRect(r.x_poz, r.y_poz, r.x_duzina, r.y_duzina);
                this.context.strokeStyle = "#FF0000";
                this.context.strokeRect(r.x_poz,r.y_poz, r.x_duzina, r.y_duzina);   
                this.context.textAlign = "center";
                this.context.textBaseline = "middle";
                this.context.font = "20px Georgia";

                let preskoci = false;

                for ( let racuni of this.svi_otvoreni_racuni){
                  if ( racuni.sto == r.id){
                    this.ucitani_zauzeti_stolovi.push(r); // ucitavamo zauzete stolove u niz
                    this.otvoren_racun_sto.set(r.id, true); // ispravljamo da sto ima otvoren racun
                    this.context.fillStyle = "#fff";
                    this.context.fillText('ZAUZETO', (r.x_poz + r.x_duzina/2), (r.y_poz + r.y_duzina/2));
                    preskoci = true;
                    break;
                  }
                }
                if ( !preskoci){
                  this.context.fillStyle = "#fff";
                  this.context.fillText(r.id, r.x_poz + r.x_duzina/2, r.y_poz + r.y_duzina/2);
                }
                
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
                  let preskoci = false;

                  for ( let racuni of this.svi_otvoreni_racuni){
                    if ( racuni.sto == r.id){
                      this.ucitani_zauzeti_stolovi.push(r); // ucitavamo zauzete stolove u niz
                      this.otvoren_racun_sto.set(r.id, true); // ispravljamo da sto ima otvoren racun
                      this.context.fillStyle = "#fff";
                      this.context.fillText('ZAUZETO', (r.x_poz + r.x_duzina/2), (r.y_poz + r.y_duzina/2));
                      preskoci = true;
                      break;
                    }
                  }
                  if ( !preskoci){
                    this.context.fillStyle = "#fff";
                    this.context.fillText(r.id, r.x_poz + r.x_duzina/2, r.y_poz + r.y_duzina/2);
                  }
  
                }
  
              }
            }
          })
        }
      }
    })
    
    
      
  }

  nadji_moj_magacin(sifra){
    for ( let m of this.moji_magacini){
      for ( let art of m.artikli){
        if ( sifra === art.sifra) return m.naziv;
      }
    }
    return 'not Found'
  }

  nadji_naziv_artikla(sifra){
    for ( let svi of this.svi_artikli){
      if ( svi.sifra == sifra) return svi.naziv;
    }
    return 'not Found'
  }

 

  dodaj_stavku(magacin: string, sifra: number, prodajna_cena: number){
    
    sessionStorage.setItem("sifra_artikla", "" + sifra);
    if (this.korisnik_detalji.PDV) sessionStorage.setItem("prodajna_cena", ""+ prodajna_cena);
    else sessionStorage.setItem("prodajna_cena", ""+ 1);
    sessionStorage.setItem('magacin', magacin);
    for ( let a of this.svi_artikli){
      if ( a.sifra === sifra){
        sessionStorage.setItem("porez", a.poreska_stopa);
        break;
      }
    }
    this.open_popUp();
  }

  otvori_racun(magacin){
    this.otvoren_racun.set(magacin, true);
    
    let nov_racun = new Racun();
    nov_racun.sto = -1;
    nov_racun.kupac = "pera";
    nov_racun.preduzece = this.korisnik.kor_ime;
    nov_racun.zatvoren = true;
    nov_racun.stavke = new Array<Stavka>();
    this.nov_racun.set(magacin, nov_racun);
  }

  zatvori_racun(magacin){
    this.otvoren_racun.set(magacin, false);
  }

  proveri_racun(magacin){
    return this.otvoren_racun.get(magacin);
  }

  izdaj_racun(magacin){
    this.zatvori_racun(magacin);
    sessionStorage.setItem('magacin', magacin);
    this.open_popUp1();
  }

  open_popUp(){
    let popUp = document.getElementById("popUp");
    popUp.classList.add('open-popUp');
  }

  close_popUp(){
    let popUp = document.getElementById("popUp");
    popUp.classList.remove('open-popUp');
  }

  unesi_stavku(){

    let stavke = this.nov_racun.get(sessionStorage.getItem('magacin')).stavke;
    for ( let i =0 ; i < stavke.length; i++){
      if ( stavke[i].sifra === Number.parseInt(sessionStorage.getItem("sifra_artikla"))){
          let stavka = stavke[i];
          stavke.splice(i,i+1);
          let prodajna_cena = Number.parseInt(sessionStorage.getItem("prodajna_cena"));
          let poreska_stopa = Number.parseInt(sessionStorage.getItem("porez"));
          stavka.cena = stavka.cena + this.kolicina_magacin*prodajna_cena;
          stavka.porez = stavka.cena * poreska_stopa/100;
          stavke.push(stavka);
          this.kolicina_magacin = 0;
          this.snackBar.open("Додата количина артикла", "Затвори");
          this.close_popUp();
          return;
      }
     
    }
      let stavka = new Stavka();
      let prodajna_cena = Number.parseInt(sessionStorage.getItem("prodajna_cena"));
      let sifra = Number.parseInt(sessionStorage.getItem("sifra_artikla"));
      let poreska_stopa = Number.parseInt(sessionStorage.getItem("porez"));
      stavka.sifra = sifra;
      stavka.kolicina = this.kolicina_magacin;
      stavka.cena = prodajna_cena* this.kolicina_magacin;
      stavka.porez = stavka.cena * poreska_stopa/100;
      let racun = this.nov_racun.get(sessionStorage.getItem('magacin'));
      racun.stavke.push(stavka);
      this.nov_racun.set(sessionStorage.getItem('magacin'), racun);
      this.kolicina_magacin = 0;
      this.snackBar.open("Ставка унета", "Затвори");
      this.close_popUp();
    
    
  }

  open_popUp1(){
    let popUp = document.getElementById("popUp1");
    popUp.classList.add('open-popUp');
  }

  close_popUp1(){
    let popUp = document.getElementById("popUp1");
    this.nacin_kupovine = '';
    popUp.classList.remove('open-popUp');
  }

  potvrdi_izdavanje(){
    
    if ( this.nacin_kupovine === 'gotovina'){
      let racun = this.nov_racun.get(sessionStorage.getItem('magacin'));
      racun.datum = new Date();
      if ( this.gotovina_vrednost <= 0 || this.licna_karta_kes <= 0) {
        this.snackBar.open('Нисте унели све податке', "Затвори");
        return
      }
      const data = {
        gotovina: this.gotovina_vrednost,
        licna_karta: this.licna_karta_kes,
        objekat: sessionStorage.getItem('magacin')
      }
      this.preduzeceService.potvrdiRacun(racun, data).subscribe((resp)=>{
        this.snackBar.open(resp['message'], "Затвори");
       
      })
    }
    else if( this.nacin_kupovine === 'cek'){
      if ( this.ime_kupac === '' || this.prezime_kupac === '' || this.licna_karta_cek <= 0) {
        this.snackBar.open('Нисте унели све податке', "Затвори");
        return
      }
      let racun = this.nov_racun.get(sessionStorage.getItem('magacin'));
      racun.datum = new Date();
      const data = {
        ime: this.ime_kupac,
        prezime: this.prezime_kupac,
        licna_karta: this.licna_karta_cek,
        objekat: sessionStorage.getItem('magacin')
      }
      this.preduzeceService.potvrdiRacun(racun, data).subscribe((resp)=>{
        this.snackBar.open(resp['message'], "Затвори");
       
      })
    }
    else if( this.nacin_kupovine === 'kartica'){
      if ( this.broj_slip_racuna <= 0 || this.licna_karta_kartica <= 0) {
        this.snackBar.open('Нисте унели све податке', "Затвори");
        return
      }
      let racun = this.nov_racun.get(sessionStorage.getItem('magacin'));
      racun.datum = new Date();
      const data = {
        licna_karta: this.licna_karta_kartica,
        slip_racun: this.broj_slip_racuna,
        objekat: sessionStorage.getItem('magacin')
      }
      this.preduzeceService.potvrdiRacun(racun, data).subscribe((resp)=>{
        this.snackBar.open(resp['message'], "Затвори");
   
      })
    }
    else if( this.nacin_kupovine === 'virman'){
      if ( this.narucioc_kor_ime === '') {
        this.snackBar.open('Нисте унели све податке', "Затвори");
        return
      }
      let racun = this.nov_racun.get(sessionStorage.getItem('magacin'));
      racun.datum = new Date();
      const data = {
        narucilac: this.narucioc_kor_ime,
        objekat: sessionStorage.getItem('magacin')
      }
      this.preduzeceService.potvrdiRacun(racun, data).subscribe((resp)=>{
        this.snackBar.open(resp['message'], "Затвори");
      })
    }

    this.close_popUp1();

  }

  close_popUp2(){
    let popUp = document.getElementById("popUp1");
    this.nacin_kupovine = '';
    popUp.classList.remove('open-popUp');
    this.otvoren_racun.set(sessionStorage.getItem('magacin'), true);
    
  }


  //STOLOVI

  ucitaj_artikle_objekta(objekat){
    for (let i = 0; i < this.artikli_prikazanog_objekta.length + 5; i++) this.artikli_prikazanog_objekta.pop();
    for ( let art of this.svi_artikli){
      for ( let objekti of this.moji_objekti){
        if ( objekti.naziv === objekat){
          for (let objArt of objekti.artikli){
            if (objArt.sifra === art.sifra) this.artikli_prikazanog_objekta.push(objArt);
          }
        }
      }
    }
  }

  otvori_racun_sto(id){
    this.otvoren_racun_sto.set(id, true);
    
    let nov_racun = new Racun();
    nov_racun.sto = id;
    nov_racun.kupac = "pera";
    nov_racun.preduzece = this.korisnik.kor_ime;
    nov_racun.zatvoren = false;
    nov_racun.stavke = new Array<Stavka>();
    this.nov_racun_sto.set(id, nov_racun);
    this.preduzeceService.dodajRacunBezStavki(this.korisnik.kor_ime,id,nov_racun.kupac).subscribe((resp)=>{
      this.snackBar.open(resp['message'], "Затвори");
      this.ucitaj_prostor();
    }); 
  }

  proveri_racun_sto(id){
    return this.otvoren_racun_sto.get(id);
  }

  dodaj_stavku_sto(sifra, prodajna_cena, id){
    sessionStorage.setItem("sifra_artikla", "" + sifra);
    if (this.korisnik_detalji.PDV) sessionStorage.setItem("prodajna_cena", ""+ prodajna_cena);
    else sessionStorage.setItem("prodajna_cena", ""+ 1);
    sessionStorage.setItem('id', "" + id);
    for ( let a of this.svi_artikli){
      if ( a.sifra === sifra){
        sessionStorage.setItem("porez", a.poreska_stopa);
        break;
      }
    }
    this.open_popUp3();
  }

  unesi_stavku_sto(){
    let id_stola = Number.parseInt(sessionStorage.getItem("id"));
    let stavka = new Stavka();
    let prodajna_cena = Number.parseInt(sessionStorage.getItem("prodajna_cena"));
    let sifra = Number.parseInt(sessionStorage.getItem("sifra_artikla"));
    let poreska_stopa = Number.parseInt(sessionStorage.getItem("porez"));
    stavka.sifra = sifra;
    stavka.kolicina = this.kolicina_magacin;
    stavka.cena = prodajna_cena* this.kolicina_magacin;
    stavka.porez = stavka.cena * poreska_stopa/100;
    this.kolicina_magacin = 0;
    this.preduzeceService.dodajStavku(stavka, this.korisnik.kor_ime, id_stola).subscribe((resp)=>{
      this.snackBar.open(resp['message'], "Заузето");
      this.close_popUp3();
      return;
    })
  
  }

  open_popUp3(){
    let popUp = document.getElementById("popUp3");
    popUp.classList.add('open-popUp');
  }

  close_popUp3(){
    let popUp = document.getElementById("popUp3");
    popUp.classList.remove('open-popUp');
  }

  izdaj_racun_sto(id:number){
    this.narucioc_kor_ime = '';
    this.gotovina_vrednost = 0;
    this.licna_karta_kes = 0;
    this.ime_kupac = '';
    this.prezime_kupac = '';
    this.licna_karta_cek = 0;
    this.broj_slip_racuna = 0;
    this.licna_karta_kartica = 0;
    this.zatvori_racun(id);
    sessionStorage.setItem('id', "" + id);
    this.open_popUp4();
  }

  potvrdi_izdavanje_sto(){
    
    if ( this.nacin_kupovine === 'gotovina'){
     let id_stola = Number.parseInt(sessionStorage.getItem('id'));
      const data = {
        gotovina: this.gotovina_vrednost,
        licna_karta: this.licna_karta_kes,
        objekat : this.objekat
      }
   
      this.preduzeceService.potvrdiRacunUgostitelj(this.korisnik.kor_ime, id_stola, data).subscribe((resp)=>{
        this.snackBar.open(resp['message'], "Затвори");
        this.ucitaj_prostor();
      })
    }
    else if( this.nacin_kupovine === 'cek'){
      let id_stola = Number.parseInt(sessionStorage.getItem('id'));
      const data = {
        ime_kupac: this.ime_kupac,
        prezime_kupac: this.prezime_kupac,
        licna_karta_cek: this.licna_karta_cek,
        objekat : this.objekat
      }
      this.preduzeceService.potvrdiRacunUgostitelj(this.korisnik.kor_ime, id_stola, data).subscribe((resp)=>{
        this.snackBar.open(resp['message'], "Затвори");
        this.ucitaj_prostor();
      })
    }
    else if( this.nacin_kupovine === 'kartica'){
      let id_stola = Number.parseInt(sessionStorage.getItem('id'));
      const data = {
        licna_karta: this.licna_karta_kartica,
        slip_racun: this.broj_slip_racuna,
        objekat : this.objekat
      }
      this.preduzeceService.potvrdiRacunUgostitelj(this.korisnik.kor_ime, id_stola, data).subscribe((resp)=>{
        this.snackBar.open(resp['message'], "Затвори");
        this.ucitaj_prostor();
      })
    }
    else if( this.nacin_kupovine === 'virman'){
      let id_stola = Number.parseInt(sessionStorage.getItem('id'));
      alert(this.narucioc_kor_ime)
      const data = {
        narucilac: this.narucioc_kor_ime,
        objekat : this.objekat
      }
      this.preduzeceService.potvrdiRacunUgostitelj(this.korisnik.kor_ime, id_stola, data).subscribe((resp)=>{
        this.snackBar.open(resp['message'], "Затвори");
        this.ucitaj_prostor();
      })
    }
    this.nacin_kupovine = '';
    this.narucioc_kor_ime = '';
    this.close_popUp4();

  }

  open_popUp4(){
    let popUp = document.getElementById("popUp4");
    popUp.classList.add('open-popUp');
  }

  close_popUp4(){
    let popUp = document.getElementById("popUp4");
    this.nacin_kupovine = '';
    this.narucioc_kor_ime = '';
    popUp.classList.remove('open-popUp');
  }

  postavi_narucilaca(narucilac){
    this.narucioc_kor_ime = narucilac;
    this.snackBar.open("Наручилац постављен", "Затвори");
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }

}
