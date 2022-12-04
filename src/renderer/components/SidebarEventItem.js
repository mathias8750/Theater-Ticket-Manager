import {Button, Card, CardHeader, Typography} from "@mui/material";
import {formatAMPM} from "../utils/DateTime";

// Event item for scrollable sidebar on customer events screen
const SidebarEventItem = ({event, onEventClick}) => {

  // get event date, fill out card subtitle
  const date = new Date(event.eventDateTime);
  const subtitle = <ul><li>{event.Organizations.organizationName}</li><li>{event.Venues.venueName}</li><li>{date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + formatAMPM(date)}</li></ul>

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

export default SidebarEventItem;
