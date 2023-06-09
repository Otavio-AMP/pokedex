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
  for(let id = 1; id < 13; id++){
    let pokeAPI = await getData(id);
    pokeArray.push(pokeAPI)
  }
  

  return (
    <main className="flex min-h-screen flex-row items-center justify-between wrap">
      <ul className="flex flex-row flex-wrap items-center justify-center w-100% h-100% gap-px">
        {pokeArray.map((pokemon: any) => {
          return <li className="flex flex-col w-1/6 h-500 border border-zinc-900 rounded-md">
                  <div className="flex flex-col items-center justify-between w-500 h-200 gap-25">
                  <Image src={pokemon.sprites.front_default} width={150} height={50} alt="pokemon sprite"/>
                  <Link href={`/pokemon`}>{pokemon.name}</Link>
                  <div className="flex flex-row items-center justify-center gap-4 w-full">
                    {pokemon.types.map((object: any)=> {
                      return <span className={object.type.name}>{object.type.name}</span>
                            })
                    }
                  </div> 
                  </div>
                </li>
        })}
      </ul> 
    </main>
  )
}
