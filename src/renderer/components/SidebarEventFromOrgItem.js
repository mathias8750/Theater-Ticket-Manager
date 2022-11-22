import {Button, Card, CardHeader, Typography} from "@mui/material";
import { formatAMPM } from "renderer/utils/DateTime";


const SidebarEventItem = ({event, onEventClick}) => {

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
            >Edit</Button>
          }
        />
      </Card>
    </>
  )
}

export default SidebarEventItem;