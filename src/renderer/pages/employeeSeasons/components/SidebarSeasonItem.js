// Import libraries
import {Button, Card, CardHeader, Typography} from "@mui/material";
import { seasonDateTimeSubheader } from "renderer/utils/DateTime";

// Season item
const SidebarSeasonItem = ({season, onSeasonClick}) => {
  // Season item content
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
