import Image from "next/image";

export default function PokedexLogo() {
  return (
    <div className="flex items-center gap-2">
      <Image src="/pokedex-logo.svg" alt="Pokedex" width={70} height={70} />
      <p className="text-red-600 font-bold text-lg">Pokédex</p>
    </div>
  );
}
