import Link from "next/link";
import SearchInput from "./SearchInput";
import { PrismaClient } from "@prisma/client";

async function GetPokemon() {
  const prisma = new PrismaClient();
  const pokemon = await prisma.pokemon.findMany();
  return pokemon;
}
export default async function ButtonsAndSearch() {
  const pokemonData = await GetPokemon();
  return (
    <div className="flex gap-2">
      <Link
        href="/"
        className="rounded-md border-white border-2 hover:border-zinc-200 transition-colors px-4 md:px-10 py-2"
      >
        Inicio
      </Link>
      <Link
        href="/add"
        className="rounded-md border-white border-2 hover:border-zinc-200 transition-colors px-10 py-2"
      >
        Añadir
      </Link>
      <SearchInput pokeData={pokemonData} />
    </div>
  );
}
