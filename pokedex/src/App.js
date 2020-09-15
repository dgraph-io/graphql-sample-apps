import React from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'

import { Filters } from './Filters'
import { PokemonCardsList } from './PokemonCardsList'
import pokemonLogo from './pokemon-logo.png'
import { fetchPokemon } from './graphQLUtils'

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },
  pokemonLogo: {
    maxWidth: '90%',
    width: 400,
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FFF',
    fontSize: 24,
    textTransform: 'uppercase',
  },
  loadingText: {
    marginTop: theme.spacing(2),
  },
}))

export default function App() {
  const classes = useStyles()

  const [pokedexData, setPokedexData] = React.useState(null)
  const [pokemonTypeFilter, setPokemonTypeFilter] = React.useState('Any')
  const [capturedFilter, setCapturedFilter] = React.useState('Any')

  const fetchPokedexData = React.useCallback(async () => {
    const { errors, data } = await fetchPokemon({
      pokemonType: pokemonTypeFilter,
      isCaptured: capturedFilter,
    })

    if (errors) {
      console.error(errors)
    }

    const result = data.queryPokemon.sort(
      (pokemonA, pokemonB) => pokemonA.id - pokemonB.id
    )

    setPokedexData(result)
  }, [pokemonTypeFilter, capturedFilter])

  React.useEffect(() => {
    fetchPokedexData()
  }, [fetchPokedexData])

  return (
    <main className={classes.root}>
      <Container>
        <img src={pokemonLogo} alt="" className={classes.pokemonLogo} />
        <Typography variant="srOnly">
          <h1>Pokémon Pokédex</h1>
        </Typography>
        {pokedexData ? (
          <>
            <Filters
              pokemonTypeFilter={pokemonTypeFilter}
              setPokemonTypeFilter={setPokemonTypeFilter}
              capturedFilter={capturedFilter}
              setCapturedFilter={setCapturedFilter}
            />
            <PokemonCardsList
              pokedexData={pokedexData}
              fetchPokedexData={fetchPokedexData}
            />
          </>
        ) : (
          <div className={classes.loadingContainer}>
            <CircularProgress color="inherit" size={60} />
            <Typography className={classes.loadingText}>Loading</Typography>
          </div>
        )}
      </Container>
    </main>
  )
}
