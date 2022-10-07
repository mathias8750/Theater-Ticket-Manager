import {Button, Card, CardHeader, Typography} from "@mui/material";


const SidebarEventItem = ({ event }) => {

  return (
    <>
      <Card>
        <CardHeader
          title={event.name}
          subheader={event.date}
          action={<Button>View</Button>}
        />
      </Card>
    </>
  )
}

export default SidebarEventItem;
