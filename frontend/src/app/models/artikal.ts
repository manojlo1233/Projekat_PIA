import { Dopunski_artikal } from "./dopunski_artikal";
import { Kategorija } from "./kategorija";

export class Artikal{
    preduzece: string;
    sifra: number;
    naziv: string;
    jedinica_mere: string;
    poreska_stopa: string;
    tip: string;
    dopunski_podaci: Dopunski_artikal;
    ima_kategoriju: boolean
    kategorija: {
        ime: string,
        nadKategorija: string
    }
    slika: string;
}