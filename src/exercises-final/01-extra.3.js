// Simple Data-fetching
// 💯 Use utils

// http://localhost:3000/isolated/exercises-final/01-extra.3

import React from 'react'
import fetchPokemon from '../fetch-pokemon'
import {
  ErrorBoundary,
  PokemonInfoFallback,
  createResource,
  PokemonDataView,
} from '../utils'

// By default, all fetches are mocked so we can control the time easily.
// You can adjust the fetch time with this:
// window.FETCH_TIME = 3000
// If you want to make an actual network call for the pokemon
// then uncomment the following line
// window.fetch.restoreOriginalFetch()
// Note that by doing this, the FETCH_TIME will no longer be considered
// and if you want to slow things down you should use the Network tab
// in your developer tools to throttle your network to something like "Slow 3G"

let pokemonResource = createResource(() => fetchPokemon('pikachu'))

function Pokemon() {
  const pokemon = pokemonResource.read()
  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}

function App() {
  return (
    <div className="pokemon-info">
      <ErrorBoundary>
        <React.Suspense fallback={<PokemonInfoFallback name="Pikachu" />}>
          <Pokemon />
        </React.Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default App
