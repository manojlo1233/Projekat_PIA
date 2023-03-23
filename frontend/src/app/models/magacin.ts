import { Artikal_cene_stanje } from "./artikal_cene_stanje";
import { IDMagacina } from "./identifikator";

export class Magacin{
    identifikator: string;
    naziv: string;
    artikli: Array<Artikal_cene_stanje>;
}