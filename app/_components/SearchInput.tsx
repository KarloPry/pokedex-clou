"use client";
import {
  Input,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import SearchIcon from "./SearchIcon";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
export default function SearchInput({ pokeData }: { pokeData: any }) {
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = () => {
    const searchInput = document.getElementById(
      "search-input",
    ) as HTMLInputElement;
    const searchValue = searchInput.value.toLowerCase();
    const results = pokeData?.filter((poke: any) =>
      poke.name.toLowerCase().includes(searchValue),
    );
    setSearchResults(results);
  };
  return (
    <>
      <Input
        type="search"
        placeholder="Buscar"
        endContent={<SearchIcon />}
        id="search-input"
      />
      <Dropdown backdrop="blur" className="max-h-[70vh]">
        <DropdownTrigger>
          <Button color="default" onClick={handleSearch}>
            Buscar
          </Button>
        </DropdownTrigger>
        <DropdownMenu className="overflow-y-auto">
          {searchResults.map((result: any, index) => (
            <DropdownItem key={index} aria-label="search">
              <Link
                href={`/pokemon?pid=${result.id}`}
                className="flex flex-row items-center justify-around gap-4 px-10"
              >
                <Image
                  src={result.URL}
                  alt={result.name}
                  width={100}
                  height={100}
                  loading="lazy"
                />
                <p className="text-xl">{result.name}</p>
              </Link>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
