import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const pokemonTypes = [
  'Bug',
  'Dark',
  'Dragon',
  'Electric',
  'Fairy',
  'Fighting',
  'Fire',
  'Flying',
  'Ghost',
  'Grass',
  'Ground',
  'Ice',
  'Normal',
  'Poison',
  'Psychic',
  'Rock',
  'Steel',
  'Water',
]

const useStyles = makeStyles((theme) => ({
  optionsContainer: {
    background: '#FFF',
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    borderRadius: 4,
    marginBottom: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    width: 300,
    maxWidth: '100%',
    background: '#FFF',
  },
}))

export function Filters({
  pokemonTypeFilter,
  setPokemonTypeFilter,
  capturedFilter,
  setCapturedFilter,
}) {
  const classes = useStyles()

  const handlePokemonTypeChange = (event) => {
    setPokemonTypeFilter(event.target.value)
  }

  const handleCapturedChange = (event) => {
    setCapturedFilter(event.target.value)
  }

  return (
    <Paper variant="outlined" className={classes.optionsContainer}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel>Type</InputLabel>
        <Select
          value={pokemonTypeFilter}
          onChange={handlePokemonTypeChange}
          label="Type"
        >
          <MenuItem value="Any">Any</MenuItem>
          {pokemonTypes.map((type) => (
            <MenuItem value={type} key={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel>Captured</InputLabel>
        <Select
          value={capturedFilter}
          onChange={handleCapturedChange}
          label="Captured"
        >
          <MenuItem value="Any">Any</MenuItem>
          <MenuItem value="Captured">Captured</MenuItem>
          <MenuItem value="Not Captured">Not Captured</MenuItem>
        </Select>
      </FormControl>
    </Paper>
  )
}
