function getColors(type: any = "NORMAL") {
  switch (type?.type.trim()) {
    case "NORMAL":
      return { bgColor: "#E0E3E4", textColor: "#000000", text: "Normal" };
    case "GRASS":
      return { bgColor: "#3DA225", textColor: "#FFFFFF", text: "Planta" };
    case "FIRE":
      return { bgColor: "#E72324", textColor: "#FFFFFF", text: "Fuego" };
    case "WATER":
      return { bgColor: "#2681F0", textColor: "#FFFFFF", text: "Agua" };
    case "BUG":
      return { bgColor: "#A3CF4F", textColor: "#000000", text: "Bicho" };
    case "POISON":
      return { bgColor: "#B47BCA", textColor: "#FFFFFF", text: "Veneno" };
    case "ELECTRIC":
      return { bgColor: "#EED735", textColor: "#000000", text: "Eléctrico" };
    case "FAIRY":
      return { bgColor: "#F690B2", textColor: "#FFFFFF", text: "Hada" };
    case "GROUND":
      return { bgColor: "#92501C", textColor: "#FFFFFF", text: "Tierra" };
    case "PSYCHIC":
      return { bgColor: "#F03F7A", textColor: "#FFFFFF", text: "Psíquico" };
    case "ROCK":
      return { bgColor: "#A38D20", textColor: "#FFFFFF", text: "Roca" };
    case "FIGHTING":
      return { bgColor: "#F58400", textColor: "#FFFFFF", text: "Lucha" };
    case "ICE":
      return { bgColor: "#6DD3F5", textColor: "#000000", text: "Hielo" };
    case "DRAGON":
      return { bgColor: "#0C69C8", textColor: "#FFFFFF", text: "Dragón" };
    case "GHOST":
      return { bgColor: "#6F599C", textColor: "#FFFFFF", text: "Fantasma" };
    default:
      return { bgColor: "#E0E3E4", textColor: "#000000", text: "Not found" };
  }
}

export default function PokemonType(type: any) {
  const colors = getColors(type);
  return (
    <div
      className="rounded-md flex w-fit items-center h-fit py-2 px-4 select-none"
      style={{ backgroundColor: colors?.bgColor, color: colors?.textColor }}
    >
      <p>{colors?.text}</p>
    </div>
  );
}
