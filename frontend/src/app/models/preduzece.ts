import { Adresa } from "./adresa";
import { Narucilac } from "./narucilac";

export class Preduzece{
    ime : string;
    prezime: string;
    kor_ime : string;
    lozinka: string;
    telefon :string;
    naziv : string;
    adresa: Adresa;
    PIB: number;
    maticni_broj: number;
    e_mail: string;
    logo: string;
    prihvaceno: boolean;
    prvi_put: boolean;
    tip: string;
    narucioci: Array<Narucilac>;
}

