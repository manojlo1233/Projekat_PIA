import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDnevniIzvestajComponent } from './admin-dnevni-izvestaj/admin-dnevni-izvestaj.component';
import { AdminRegistracijaComponent } from './admin-registracija/admin-registracija.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { IzdavanjeRacunaComponent } from './izdavanje-racuna/izdavanje-racuna.component';
import { KupacComponent } from './kupac/kupac.component';
import { LoginComponent } from './login/login.component';
import { NaruciociComponent } from './narucioci/narucioci.component';
import { PodaciComponent } from './podaci/podaci.component';
import { PreduzeceUnutraComponent } from './preduzece-unutra/preduzece-unutra.component';
import { PreduzeceComponent } from './preduzece/preduzece.component';
import { PregledIzvestajaComponent } from './pregled-izvestaja/pregled-izvestaja.component';
import { PregledRacunaComponent } from './pregled-racuna/pregled-racuna.component';
import { PromenaLozinkeLoginComponent } from './promena-lozinke-login/promena-lozinke-login.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { RasporedArtikalaComponent } from './raspored-artikala/raspored-artikala.component';
import { RasporedStolovaComponent } from './raspored-stolova/raspored-stolova.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { RobeIUslugeComponent } from './robe-i-usluge/robe-i-usluge.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path:"", component: WelcomeComponent},
  {path:"login", component: LoginComponent},
  {path:"register", component: RegistracijaComponent},
  {path:"preduzece", component: PreduzeceComponent},
  {path:"preduzeceUnutra", component: PreduzeceUnutraComponent},
  {path:"kupac", component: KupacComponent},
  {path:"promenaLozinke", component: PromenaLozinkeComponent},
  {path:"podaci", component: PodaciComponent},
  {path:"narucioci", component: NaruciociComponent},
  {path:"robe_i_usluge", component: RobeIUslugeComponent},
  {path:"raspored_artikala", component: RasporedArtikalaComponent},
  {path:"raspored_stolova", component: RasporedStolovaComponent},
  {path:"izdavanje_racuna", component: IzdavanjeRacunaComponent},
  {path: "pregled_izvestaja", component: PregledIzvestajaComponent},
  {path: "pregled_racuna", component: PregledRacunaComponent},
  {path: "admin", component: AdministratorComponent},
  {path: "admin_pregled_izvestaj", component: AdminDnevniIzvestajComponent},
  {path: "admin_registracija", component: AdminRegistracijaComponent},
  {path: "promena_lozinke_login", component: PromenaLozinkeLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
