import {Button, Card, CardHeader, Typography} from "@mui/material";
import { formatAMPM } from "renderer/utils/DateTime";
// List of imported libraries and components above


const SidebarEventFromOrgItem = ({event, onEventClick}) => {

  const date = new Date(event.eventDateTime);
  const subtitle = <ul><li>{event.Venues.venueName}</li><li>{date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + formatAMPM(date)}</li></ul>

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