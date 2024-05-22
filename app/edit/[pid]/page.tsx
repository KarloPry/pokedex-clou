"use client";
import PokemonType from "@/app/_components/PokemonType";
import { Button, Slider, Spinner, Image } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditPage() {
  const { pid } = useParams();
  const [statsValues, setStatsValues] = useState({
    id: 0,
    name: "",
    URL: "",
    HP: 1,
    Total: 1,
    Attack: 1,
    Defense: 1,
    Sp_Atk: 1,
    Sp_Def: 1,
    Speed: 1,
    MainColor: "",
    type: "",
  });
  const [isloading, setIsLoading] = useState(true);
  const [defaultValues, setDefaultValues] = useState({
    id: 0,
    name: "",
    URL: "",
    HP: 1,
    Total: 1,
    Attack: 1,
    Defense: 1,
    Sp_Atk: 1,
    Sp_Def: 1,
    Speed: 1,
    MainColor: "",
    type: "",
  });
  const saveChanges = () => {
    fetch(`/api/pokemon?pid=${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(statsValues),
    });
    router.push("/pokemon?pid=" + pid);
  };
  const deletePokemon = () => {
    fetch(`/api/pokemon?pid=${pid}`, {
      method: "DELETE",
    });
    router.push("/");
  };
  const router = useRouter();
  useEffect(() => {
    async function getPokemon() {
      const res = await fetch(`/api/pokemon?pid=${pid}`);
      const data = await res.json();
      if (res.ok) {
        setStatsValues(data.pokemon);
        setDefaultValues(data.pokemon);
        setIsLoading(false);
      }
    }
    getPokemon();
  }, []);
  return (
    <div
      className="w-screen"
      style={{ backgroundColor: statsValues.MainColor }}
    >
      <div className={`flex py-10`}>
        {!isloading && (
          <>
            <style>
              {`
              .slider .h-full {
                background-color: ${statsValues.MainColor};
              }
              .slider .border-s-primary{
                border-left: 15px solid ${statsValues.MainColor};
              }
              .h-full .absolute .bg-primary{
                border-radius: 100px 100px 100px 100px;
              }
              `}
            </style>
            <div className="w-1/2 px-10 bg-white py-4 bg-opacity-65 flex flex-col gap-4 rounded-md mx-10">
              <PokemonType type={statsValues.type} />
              <Slider
                defaultValue={statsValues.HP}
                value={statsValues.HP}
                maxValue={255}
                minValue={1}
                classNames={{ track: "bg-white" }}
                className="slider"
                step={1}
                size="lg"
                label="HP"
                onChange={(value) => {
                  const val = parseInt(value.toString());
                  setStatsValues({ ...statsValues, HP: val });
                }}
              />
              <Slider
                defaultValue={statsValues.Attack}
                maxValue={255}
                value={statsValues.Attack}
                classNames={{ track: "bg-white" }}
                minValue={1}
                className="slider"
                size="lg"
                step={1}
                label="Ataque"
                onChange={(value) => {
                  const val = parseInt(value.toString());
                  setStatsValues({ ...statsValues, Attack: val });
                }}
              />
              <Slider
                defaultValue={statsValues.Defense}
                maxValue={255}
                value={statsValues.Defense}
                minValue={1}
                className="slider"
                classNames={{ track: "bg-white" }}
                size="lg"
                step={1}
                label="Defensa"
                onChange={(value) => {
                  const val = parseInt(value.toString());
                  setStatsValues({ ...statsValues, Defense: val });
                }}
              />
              <Slider
                defaultValue={statsValues.Sp_Atk}
                value={statsValues.Sp_Atk}
                maxValue={255}
                minValue={1}
                classNames={{ track: "bg-white" }}
                className="slider"
                size="lg"
                step={1}
                label="Ataque Especial"
                onChange={(value) => {
                  const val = parseInt(value.toString());
                  setStatsValues({ ...statsValues, Sp_Atk: val });
                }}
              />
              <Slider
                defaultValue={statsValues.Sp_Def}
                value={statsValues.Sp_Def}
                maxValue={255}
                minValue={1}
                size="lg"
                classNames={{ track: "bg-white" }}
                className="slider"
                step={1}
                label="Defensa Especial"
                onChange={(value) => {
                  const val = parseInt(value.toString());
                  setStatsValues({ ...statsValues, Sp_Def: val });
                }}
              />
              <Slider
                defaultValue={statsValues.Speed}
                value={statsValues.Speed}
                maxValue={255}
                minValue={1}
                size="lg"
                step={1}
                classNames={{ track: "bg-white" }}
                className="slider"
                label="Velocidad"
                onChange={(value) => {
                  const val = parseInt(value.toString());
                  setStatsValues({ ...statsValues, Speed: val });
                }}
              />
              <h1 className="text-xl">
                Total:{" "}
                {statsValues.HP +
                  statsValues.Attack +
                  statsValues.Defense +
                  statsValues.Sp_Atk +
                  statsValues.Sp_Def +
                  statsValues.Speed}
              </h1>
              <div className="flex justify-around">
                <Button color="success" onClick={saveChanges}>
                  Guardar Cambios
                </Button>
                <Button color="danger" onClick={deletePokemon}>
                  Eliminar Pokemon
                </Button>
                <Button
                  color="default"
                  onClick={() => {
                    //Reload the page
                    setStatsValues(defaultValues);
                  }}
                >
                  Restaurar valores
                </Button>
              </div>
            </div>
            <div className="w-1/2 flex flex-col items-center justify-center">
              <Image
                src={statsValues.URL}
                width={450}
                height={450}
                alt={statsValues.name}
              />
            </div>
          </>
        )}
        {isloading && (
          <section className="grid w-screen h-[90vh] bg-blue-50">
            <Spinner size="lg" className="scale-150" />
          </section>
        )}
      </div>
    </div>
  );
}
