// Simple Data-fetching

// http://localhost:3000/isolated/exercises/01

import React, {Suspense} from 'react'
import fetchPokemon from '../fetch-pokemon'
import {PokemonDataView, ErrorBoundary, PokemonInfoFallback} from '../utils'

function createResource(asyncfn) {
  let result
  let error
  let promise = asyncfn()
    .then(r => (result = r))
    .catch(e => (error = e))

  return {
    read() {
      if (error) {
        throw error
      }
      if (!result) {
        throw promise
      }
      return result
    },
  }
}

const pokemonResource = createResource(() => fetchPokemon('pikachu'))

function PokemonInfo() {
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
        <Suspense fallback={<PokemonInfoFallback name="pikachu" />}>
          <PokemonInfo />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

/*
🦉 Elaboration & Feedback
After the instruction, copy the URL below into your browser and fill out the form:
http://ws.kcd.im/?ws=Concurrent%20React&e=Simple%20Data-fetching&em=
*/

////////////////////////////////////////////////////////////////////
//                                                                //
//                 Don't make changes below here.                 //
// But do look at it to see how your code is intended to be used. //
//                                                                //
////////////////////////////////////////////////////////////////////

export default App
