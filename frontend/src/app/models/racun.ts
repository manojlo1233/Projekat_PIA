import { Stavka } from "./stavka";

export class Racun{
    preduzece: string;
    datum: Date;
    stavke: Array<Stavka>;
    zatvoren: boolean;
    placanje: {
        licna_karta: number;
        objekat: string;
        ime: string;
        prezime: string;
        slip_racun: number;
        narucilac: string;
    }
    sto: number;
    kupac: string;
}