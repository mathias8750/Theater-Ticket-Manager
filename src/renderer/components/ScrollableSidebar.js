import {Grid, TextField} from "@mui/material";
import SidebarEventItem from "./SidebarEventItem";
import {useState} from "react";

// Scrollable sidebar of event items for the customer events screen
const ScrollableSidebar = ({ events, onEventClick }) => {

  // States for search bar input and array of searchable events
  const [searchInput, setSearchInput] = useState('')
  const [searchableEvents, setSearchableEvents] = useState(events)

  // Search events list based on input
  const searchEvents = (inputEvent) => {
    setSearchInput(inputEvent.target.value)
    if (inputEvent.target.value === '') {
      setSearchableEvents(events)
    } else {
      let tempEvents = []

      events.map((event) => {
        if ((event.eventName.toLowerCase()).includes(inputEvent.target.value.toLowerCase())) {
          tempEvents.push(event)
        }
      })

      setSearchableEvents(tempEvents)

    }
  }

  return (
    <>
      <Grid container direction={'column'} style={{height: '100%'}}>
        <Grid item style={{height: '10%'}}>
          <TextField
            id="standard-search"
            label="Search Events"
            type="search"
            variant="outlined"
            fullWidth={true}
            value={searchInput}
            onChange={searchEvents}
          />
        </Grid>

        <Grid item style={{
          height: '90%',
        }}>
          <div style={{ height: '100%', maxHeight: '800px', width: '100%', overflow: 'hidden'}}>
            <div style={{ height: '100%', overflow: 'auto'}}>
              {searchableEvents.map((event) => {
                return (
                  <SidebarEventItem event={event} onEventClick={onEventClick}/>
                )
              })}
            </div>
          </div>

        </Grid>
      </Grid>
    </>
  )
}

export default ScrollableSidebar;
