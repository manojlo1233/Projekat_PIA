import { Lokacija } from "./lokacija";

export class Artikal_unos{
    naziv_objekta: string;
    nabavna_cena: number;
    prodajna_cena: number;
    lager: number;
    min_kolicina: number;
    max_kolicina: number;
    tip: string;
    id: string;
    lokacija: Lokacija;
    sifra: number;
}