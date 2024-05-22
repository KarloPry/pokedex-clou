import PokedexLogo from "./PokedexLogo";
import ButtonsAndSearch from "./ButtonsAndSearch";
export default function Navbar() {
  return (
    <>
      <nav className="flex sticky z-20 top-0 justify-between bg-white shadow-lg px-6 py-2 items-center">
        <PokedexLogo />
        <ButtonsAndSearch />
      </nav>
    </>
  );
}
