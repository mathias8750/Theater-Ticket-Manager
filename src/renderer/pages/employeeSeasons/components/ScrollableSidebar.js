import {Grid, TextField, Button} from "@mui/material";
import SidebarSeasonItem from "./SidebarSeasonItem";


const ScrollableSidebar = ({ seasons, onSeasonClick, onCreateClick }) => {

  return (
    <>
      <Grid container direction={'column'} style={{height: '100%'}}>
        <Grid item style={{
          border: '1px solid rgba(0, 0, 0, 0.05)',
          height: '75%',
        }}>
          <div style={{ height: '100%', maxHeight: '800px', width: '100%', overflow: 'hidden'}}>
            <div style={{ height: '100%', overflow: 'auto'}}>
              {seasons.map((season) => {
                return (
                  <SidebarSeasonItem season={season} onSeasonClick={onSeasonClick}/>
                )
              })}
            </div>
          </div>
        </Grid>
        <Grid item style={{height: '10%'}}>
          <Button
            color='primary'
            size='small'
            onClick={onCreateClick}
            >
              Create Season
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default ScrollableSidebar;
