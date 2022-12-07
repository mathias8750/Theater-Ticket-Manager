// Import libraries
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemText,
    Typography
  } from "@mui/material";
  import {useNavigate} from "react-router-dom";
  import { seasonDateTimeSubheader } from "renderer/utils/DateTime";
  
  // Seat Selection sidebar
  const SeatSelectorSidebar = ({season, selectedSeats, onSelectClick}) => {
  
    const navigate = useNavigate()
  
    // Sidebar contents
    return (
      <Grid direction={'column'} container item style={{height: '100%', padding: '10px'}} md={4}>
  
        <Grid item style={{height: '95%'}}>
          <Card style={{height: '100%'}}>
            <CardHeader
              title={season.seasonName}
              subheader={seasonDateTimeSubheader(season)}
            />
  
            <Divider/>
  
            <CardContent style={{height: '100%', paddingRight: '0px'}}>
              <List
                sx={{
                  width: '100%',
                  bgcolor: 'background.paper',
                  position: 'relative',
                  overflow: 'auto',
                  height: '85%',
                  '& ul': {padding: 0},
                }}
                subheader={<li/>}
              >
                {selectedSeats.map((seat) => (
                  <>
                    <ListItem
                      key={seat.id}
                      sx={{
                        paddingLeft: '0px'
                      }}>
                      <ListItemText primary={`${seat.sectionNumber} Row ${seat.rowNumber} Seat ${seat.seatNumber}`}
                                    primaryTypographyProps={{
                                      variant: 'h5'
                                    }}
  
                      />
                    </ListItem>
                  </>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
  
        <Grid item style={{ height: '5%', paddingTop: '5px'}}>
          <Button
            style={{width: '100%', height: '100%'}}
            variant={'contained'}
            disabled={selectedSeats.length === 0}
            onClick={onSelectClick}
          >
            Select Seat
          </Button>
        </Grid>
  
      </Grid>
    )
  }
  
  export default SeatSelectorSidebar;