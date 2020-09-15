import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

import { updatePokemonCapturedStatus } from './graphQLUtils'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  pokemonIdNumber: {
    fontSize: 14,
    marginBottom: theme.spacing(4),
  },
  avatar: {
    height: theme.spacing(16),
    borderRadius: 0,
    marginBottom: theme.spacing(1),
  },
  cardActions: {
    justifyContent: 'center',
  },
}))

export function PokemonCard({ pokemon, fetchPokedexData }) {
  const classes = useStyles()

  const handleCapturedChange = async () => {
    const { errors } = await updatePokemonCapturedStatus(
      pokemon.id,
      !pokemon.captured
    )

    if (errors) {
      console.error(errors)
    }

    // Re-fetching all the data to make the top-level app aware of the data change.
    // This was especially important in getting it to remove a Pokemon from the UI
    // when the Captured filter was selected and then a previously captured Pokemon
    // was toggled to no longer be captured.
    fetchPokedexData()
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.pokemonIdNumber}
          color="textSecondary"
          gutterBottom
        >
          {pokemon.id}
        </Typography>
        <img
          alt={pokemon.name}
          src={pokemon.imgUrl}
          className={classes.avatar}
        />
        <Typography variant="h5" component="h2">
          {pokemon.name}
        </Typography>
        <Typography color="textSecondary">
          {pokemon.pokemonTypes.join(', ')}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <FormControlLabel
          control={
            <Switch
              checked={pokemon.captured}
              onChange={handleCapturedChange}
              name="captured"
              color="primary"
            />
          }
          label="Captured"
        />
      </CardActions>
    </Card>
  )
}
