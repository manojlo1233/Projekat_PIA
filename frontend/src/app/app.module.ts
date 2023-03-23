import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule} from '@angular/common/http';
import { RegistracijaComponent } from './registracija/registracija.component';
import { PreduzeceComponent } from './preduzece/preduzece.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { KupacComponent } from './kupac/kupac.component';
import { PreduzeceUnutraComponent } from './preduzece-unutra/preduzece-unutra.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatTabsModule } from "@angular/material/tabs";
import { PodaciComponent } from './podaci/podaci.component';
import { NaruciociComponent } from './narucioci/narucioci.component';
import { MatTableModule } from "@angular/material/table";
import { MatDividerModule } from "@angular/material/divider";
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list"; 
import { MatIconModule } from "@angular/material/icon";
import { MatRadioModule } from "@angular/material/radio";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatPaginatorModule } from "@angular/material/paginator";
import { RobeIUslugeComponent } from './robe-i-usluge/robe-i-usluge.component';
import { RasporedArtikalaComponent } from './raspored-artikala/raspored-artikala.component';
import { RasporedStolovaComponent } from './raspored-stolova/raspored-stolova.component';
import { MatSelectModule } from "@angular/material/select";
import { IzdavanjeRacunaComponent } from './izdavanje-racuna/izdavanje-racuna.component';
import { PregledIzvestajaComponent } from './pregled-izvestaja/pregled-izvestaja.component';
import { PregledRacunaComponent } from './pregled-racuna/pregled-racuna.component';
import { AdminRegistracijaComponent } from './admin-registracija/admin-registracija.component';
import { AdminDnevniIzvestajComponent } from './admin-dnevni-izvestaj/admin-dnevni-izvestaj.component';
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { PromenaLozinkeLoginComponent } from './promena-lozinke-login/promena-lozinke-login.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistracijaComponent,
    PreduzeceComponent,
    AdministratorComponent,
    WelcomeComponent,
    KupacComponent,
    PreduzeceUnutraComponent,
    PromenaLozinkeComponent,
    PodaciComponent,
    NaruciociComponent,
    RobeIUslugeComponent,
    RasporedArtikalaComponent,
    RasporedStolovaComponent,
    IzdavanjeRacunaComponent,
    PregledIzvestajaComponent,
    PregledRacunaComponent,
    AdminRegistracijaComponent,
    AdminDnevniIzvestajComponent,
    PromenaLozinkeLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,    
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    MatRadioModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSelectModule,
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
