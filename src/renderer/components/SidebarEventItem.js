import {Button, Card, CardHeader, Typography} from "@mui/material";


const SidebarEventItem = ({event, onEventClick}) => {

  return (
    <>
      <Card>
        <CardHeader
          title={event.eventName}
          subheader={event.eventDateTime}
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
