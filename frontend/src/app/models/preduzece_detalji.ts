import { IDMagacina } from "./identifikator";
import { Lokacija } from "./lokacija";
import { Sifra } from "./sifra";
import { Ziro_racun } from "./ziro_racun";

export class Preduzece_detalji{
    vlasnik: string;
    kategorija: string;
    sifre_delatnosti: Array<Sifra>;
    PDV: boolean;
    ziro_racuni: Array<Ziro_racun>;
    broj_magacina: number;
    magacini: Array<IDMagacina>
    broj_fis_kasa: number;
    fis_kase: Array<Lokacija>
}