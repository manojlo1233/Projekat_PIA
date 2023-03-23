import { Artikal_cene_stanje } from "./artikal_cene_stanje";
import { Lokacija } from "./lokacija";

export class Fiskalna_kasa{
    tip: string;
    lokacija: Lokacija;
    artikli: Array<Artikal_cene_stanje>;
    naziv: string;
}