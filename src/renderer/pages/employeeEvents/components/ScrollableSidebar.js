import {Grid, TextField, Button} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {OrganizationContext} from "../../../context/Context";
import SidebarEventFromOrgItem from "./SidebarEventFromOrgItem";
// List of imported libraries and components above

// Function for the scrollable sidebar containing the list of events for an organization
const ScrollableSidebar = ({ events, onEventClick, onAddClick, onEditPriceClick }) => {

  // Context for the selected organization by the user
  const {state} = useContext(OrganizationContext);

  // States used in the program with updater functions
  const [searchInput, setSearchInput] = useState('')
  const [searchableEvents, setSearchableEvents] = useState(events)

  useEffect(() => {
    setSearchableEvents(events)
  }, [events])

  // Allows the user to search via a text box for a specific event in the list of events via the event name
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
// Set the events variable containing the searched for events
      setSearchableEvents(tempEvents)

    }
  }

  // Output to the screen containing the list of events and the Add Event button to add an event to the list
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
          border: '1px solid rgba(0, 0, 0, 0.05)',
          height: '85%',
        }}>
          <div style={{ height: '100%', maxHeight: '800px', width: '100%', overflow: 'hidden'}}>
            <div style={{ height: '100%', overflow: 'auto'}}>
              {searchableEvents.map((event) => {
                if (state.selectedOrg.organizationID == event.organizationID)
                return (
                  <SidebarEventFromOrgItem event={event} onEventClick={onEventClick} />
                )
              })}
            </div>
          </div>

        </Grid>
        <Grid item style={{ height: '5%', paddingTop: '5px'}}>
          <Button
            style={{width: '100%', height: '100%'}}
            variant={'contained'}
            onClick={onAddClick}
            >
              Add Event
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default ScrollableSidebar;
