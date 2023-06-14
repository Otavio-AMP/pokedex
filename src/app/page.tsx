import './styles/types.css'
import Image from "next/image";
import Link from "next/link";

async function getData(id: Number) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  if (!res.ok) {
    throw Error('pokeAPI falhou')
  }

  const data = await res.json();

  return data;
}

export default async function Home() {
  let pokeArray = [];
  for(let id = 1; id <= 25; id++){
    let pokeAPI = await getData(id);
    pokeArray.push(pokeAPI)
  }
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between wrap">
      <header className="flex flex-row items-center justify-between w-full h-8 px-10 mb-10">
        <h1>
          Pokedex
        </h1>
        <input type="text" />
      </header>
      <ul className="flex flex-row flex-wrap items-center justify-center w-100% h-100% gap-1.5 mb-5">
        {pokeArray.map((pokemon: any) => {
          return <li className="flex flex-col w-1/6 h-500 border border-zinc-500 rounded-md pb-3 bg-white">
                  <div className="flex flex-col items-center justify-between w-500 h-200 gap-25">
                    <span>{'#' + pokemon.id}</span>
                    <Image src={pokemon.sprites.front_default} width={150} height={50} alt="pokemon sprite"/>
                    <Link href={`/pokemon`}>{pokemon.name.toUpperCase()}</Link>
                    <div className="flex flex-row items-center justify-center gap-4 w-full">
                      {pokemon.types.map((object: any)=> {
                        return <span className={`type `+ object.type.name}>{object.type.name.toUpperCase()}</span>
                              })
                      }
                    </div>
                  </div>
                </li>
            }
          )
        }
      </ul> 
    </main>
  )
}
