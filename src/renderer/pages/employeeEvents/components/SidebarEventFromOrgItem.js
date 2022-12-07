import {Button, Card, CardHeader, Typography} from "@mui/material";
import { formatAMPM } from "renderer/utils/DateTime";
// List of imported libraries and components above

// Function for each event in the list of events in the EmployeeEvents page
const SidebarEventFromOrgItem = ({event, onEventClick}) => {

  // Real Datetime object
  const date = new Date(event.eventDateTime);
  // Contains venue name and datetime for the event being held
  const subtitle = <ul><li>{event.Venues.venueName}</li><li>{date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + formatAMPM(date)}</li></ul>

  // Output to the screen containing the selected event information
  return (
    <>
      <Card>
        <CardHeader
          title={event.eventName}
          subheader={subtitle}
          action={
            <Button
              onClick={() => onEventClick(event)}
            >View</Button>
          }
        />
      </Card>
    </>
  )
}

export default SidebarEventFromOrgItem;