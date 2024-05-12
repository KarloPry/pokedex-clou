import { PrismaClient } from "@prisma/client";
import PokemonType from "../_components/PokemonType";
import { Button, Image } from "@nextui-org/react";
import StatsProgress from "./_component/StatsProgress";
import Link from "next/link";

async function getPokemonData(pid: any) {
  const prisma = new PrismaClient();
  const pidParsed = parseInt(pid);
  const pokemon = await prisma.pokemon.findUnique({
    where: {
      id: pidParsed,
    },
  });
  return pokemon;
}
export default async function PokemonPage({
  searchParams,
}: {
  searchParams: { pid: number };
}) {
  const pokemonData = await getPokemonData(searchParams.pid);
  const type = pokemonData?.type;
  const picture = pokemonData?.URL || "";
  const name = pokemonData?.name || "";
  return (
    <main
      style={{ backgroundColor: pokemonData?.MainColor }}
      className="flex py-4"
    >
      <style>
        {`
    #progress .h-full {
      background-color: ${pokemonData?.MainColor};
    }
  `}
      </style>
      <div className="flex w-screen max-h-screen overflow-hidden p-4">
        <div className="w-1/2 flex flex-col">
          <h1 className="text-5xl text-center">{pokemonData?.name}</h1>
          <div className="flex justify-around items-center py-8">
            <h2 className="text-white text-3xl">N° {pokemonData?.id}</h2>
            <PokemonType type={type} />
            <Link href="/edit/[pid]" as={`/edit/${pokemonData?.id}`}>
              <Button
                fullWidth={false}
                size="lg"
                color="primary"
                className="my-2"
              >
                Editar
              </Button>
            </Link>
          </div>
          <div className="rounded-md bg-white bg-opacity-65 py-4">
            <div className="px-8">
              <StatsProgress value={pokemonData?.HP} category="HP" />
              <StatsProgress value={pokemonData?.Attack} category="Ataque" />
              <StatsProgress value={pokemonData?.Defense} category="Defensa" />
              <StatsProgress
                value={pokemonData?.Sp_Atk}
                category="Ataque especial"
              />
              <StatsProgress
                value={pokemonData?.Sp_Def}
                category="Defensa Especial"
              />
              <StatsProgress value={pokemonData?.Speed} category="Velocidad" />
            </div>
          </div>
        </div>
        <div className="w-1/2 flex flex-col items-center justify-center">
          <Image
            src={picture}
            width={520}
            height={520}
            alt={name}
            className="drop-shadow-2xl  shadow-black"
          />
        </div>
      </div>
    </main>
  );
}
