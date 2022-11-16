import {Button, Card, CardHeader, Typography} from "@mui/material";
import { formatAMPM } from "renderer/utils/DateTime";


const SidebarSeasonItem = ({season, onSeasonClick}) => {

  //const date = new Date(event.eventDateTime);
  //const subtitle = <ul><li>{event.Organizations.organizationName}</li><li>{date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + formatAMPM(date)}</li></ul>
  const subtitle = season.startDate + " to " +  season.endDate

  return (
    <>
      <Card>
        <CardHeader
          title={season.seasonName}
          subheader={subtitle}
          action={
            <Button
              onClick={() => onSeasonClick(season)}
            >View</Button>
          }
        />
      </Card>
    </>
  )
}

export default SidebarSeasonItem;
