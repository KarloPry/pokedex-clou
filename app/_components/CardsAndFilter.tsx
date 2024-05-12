"use client";
import Link from "next/link";
import Image from "next/image";
import {
  Accordion,
  Checkbox,
  CheckboxGroup,
  AccordionItem,
} from "@nextui-org/react";
import PokemonType from "./PokemonType";
import { useState } from "react";
function PokemonCard(pokemon: any) {
  return (
    <Link
      className={`flex flex-col rounded-md bg-red-50 w-fit select-none group`}
      style={{ backgroundColor: pokemon.MainColor }}
      href={`/pokemon?pid=${pokemon.id}`}
    >
      <Image
        src={pokemon.URL}
        draggable={false}
        width={280}
        height={280}
        alt={pokemon.name}
      />
      <div className="px-4 flex flex-col gap-2 py-2">
        <h2 className="text-2xl">{pokemon.name}</h2>
        <p className="text-white">id: {pokemon.id}</p>
        <PokemonType type={pokemon.type} />
      </div>
    </Link>
  );
}
export default function CardsAndFilter({ pokeData }: { pokeData: any }) {
  const [filterOptions, setFilterOptions] = useState([
    "WATER",
    "FIRE",
    "PSYCHIC",
    "ICE",
    "FAIRY",
    "ROCK",
    "GROUND",
    "BUG",
    "POISON",
    "FIGHTING",
    "NORMAL",
    "DRAGON",
    "ELECTRIC",
    "GHOST",
    "GRASS",
  ]);
  const [filterVal, setFilterVal] = useState(filterOptions);

  return (
    <>
      <section className="flex flex-wrap justify-center w-full px-20 py-4 bg-gray-100">
        <Accordion>
          <AccordionItem value="1" title="Filtrar por tipo">
            <CheckboxGroup
              value={filterVal}
              onChange={(val) => {
                setFilterVal(val);
              }}
              orientation="horizontal"
              className="gap-8 text-lg"
            >
              {filterOptions.map((type) => {
                return (
                  <Checkbox key={type} value={type} size="md" color="success">
                    <PokemonType type={type} />
                  </Checkbox>
                );
              })}
            </CheckboxGroup>
          </AccordionItem>
        </Accordion>
      </section>
      <section className="flex flex-wrap px-20 bg-white justify-around gap-y-8 py-10">
        {pokeData
          .filter((pokemon: any) => {
            return filterVal.includes(pokemon.type.trim());
          })
          .map((pokemon: any) => {
            return <PokemonCard key={pokemon.id} {...pokemon} />;
          })}
      </section>
    </>
  );
}
