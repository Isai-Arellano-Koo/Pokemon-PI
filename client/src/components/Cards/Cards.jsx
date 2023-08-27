import Card from "../Card/Card"

const Cards = ({pokemons}) => {
  return (
    <div>
        {pokemons?.map(pokemon => {
            return (
                <Card 
                    key={pokemon.id}
                    image={pokemon.image}
                    name={pokemon.name}
                    types={pokemon.types}
                />
            )
        })}
    </div>
  )
}

export default Cards