import { Artikal_cene_stanje } from "./artikal_cene_stanje";
import { Lokacija } from "./lokacija";

export class Fiskalna_kasa_promena{
    tip: string;
    lokacija: Lokacija;
    naziv: string;
    artikli: Array<Artikal_cene_stanje>
    nov_tip: string;
    nov_naziv: string;
}