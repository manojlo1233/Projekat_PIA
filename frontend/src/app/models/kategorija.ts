import { Potkategorija } from "./potkategorija";
import { Sifra } from "./sifra";

export class Kategorija{
    preduzece: string;
    kategorija: string;
    artikli: Array<Sifra>
    potkategorije: Array<Potkategorija>
}