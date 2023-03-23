import { Lokacija } from "./lokacija";
import { Sto } from "./sto";

export class Raspored{
    preduzece: string;
    objekat: Lokacija;
    sala: Array<Sto>;
    basta: Array<Sto>;
}