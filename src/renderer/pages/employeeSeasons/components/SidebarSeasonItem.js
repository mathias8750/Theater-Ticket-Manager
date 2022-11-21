import {Button, Card, CardHeader, Typography} from "@mui/material";
import { seasonDateTimeSubheader } from "renderer/utils/DateTime";


const SidebarSeasonItem = ({season, onSeasonClick}) => {

  return (
    <>
      <Card>
        <CardHeader
          title={season.seasonName}
          subheader={seasonDateTimeSubheader(season)}
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
