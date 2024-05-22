import { PrismaClient } from "@prisma/client";
import CardsAndFilter from "./_components/CardsAndFilter";
async function getPokemonData() {
  const prisma = new PrismaClient();
  const pokemon = await prisma.pokemon.findMany();
  return pokemon;
}
export default async function Home({ searchParams }: { searchParams: any }) {
  console.log(searchParams);
  const pokeData = await getPokemonData();
  return (
    <main>
      {/* Implement a filter to only display pokemon of certain type */}

      <CardsAndFilter pokeData={pokeData} />
    </main>
  );
}
