import {Grid, TextField, Button} from "@mui/material";
import SidebarSeasonItem from "./SidebarSeasonItem";
import {useEffect, useState} from "react";

// Sidebar component to display seasons on employee seasons screen
const ScrollableSidebar = ({seasons, onSeasonClick, onCreateClick}) => {

  // use states for search functionality
  const [searchInput, setSearchInput] = useState('')
  const [searchableSeasons, setSearchableSeasons] = useState(seasons)

  // update searchable seasons when seasons are updated
  useEffect(() => {
    setSearchableSeasons(seasons)
  }, [seasons])

  // function to search seasons and update list with valid records
  const searchSeasons = (inputSeason) => {
    setSearchInput(inputSeason.target.value)
    if (inputSeason.target.value === '') {
      setSearchableSeasons(seasons)
    } else {
      let tempSeasons = []

      seasons.map((season) => {
        if ((season.seasonName.toLowerCase()).includes(inputSeason.target.value.toLowerCase())) {
          tempSeasons.push(season)
        }
      })

      setSearchableSeasons(tempSeasons)
    }
  }

  // return components to display
  return (
    <>
      <Grid container direction={'column'} style={{height: '100%'}}>

        <Grid item style={{height: '10%'}}>
          <TextField
            id="standard-search"
            label="Search Seasons"
            type="search"
            variant="outlined"
            fullWidth={true}
            value={searchInput}
            onChange={searchSeasons}
          />
        </Grid>

        <Grid item style={{
          border: '1px solid rgba(0, 0, 0, 0.05)',
          height: '85%',
        }}>
          <div style={{height: '100%', maxHeight: '800px', width: '100%', overflow: 'hidden'}}>
            <div style={{height: '100%', overflow: 'auto'}}>
              {searchableSeasons.map((season) => {
                return (
                  <SidebarSeasonItem season={season} onSeasonClick={onSeasonClick}/>
                )
              })}
            </div>
          </div>
        </Grid>

        <Grid item style={{ height: '5%', paddingTop: '5px'}}>
          <Button
            style={{width: '100%', height: '100%'}}
            variant={'contained'}
            onClick={onCreateClick}
          >
            Create Season
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default ScrollableSidebar;
