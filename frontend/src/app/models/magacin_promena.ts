import { Artikal_cene_stanje } from "./artikal_cene_stanje";
import { IDMagacina } from "./identifikator";

export class Magacin_promena{
    naziv: string;
    nov_naziv:string;
    identifikator: string;
    artikli: Array<Artikal_cene_stanje>;
}