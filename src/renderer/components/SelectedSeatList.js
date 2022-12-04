import {Card, CardContent, CardHeader, Divider, List, ListItem, ListItemText} from "@mui/material";
import {formatAMPM} from "../utils/DateTime";

// List of selected seats for seating chart sidebar
const SelectedSeatList = ({event, selectedSeats}) => {

  // get event date object
  const date = new Date(event.eventDateTime)

  return (
    <Card style={{height: '100%'}}>
      <CardHeader
        title={event.eventName}
        subheader={date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + formatAMPM(date)}
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
                <ListItemText
                  primary={`${seat.sectionNumber} Row ${seat.rowNumber} Seat ${seat.seatNumber}`}
                  secondary={`$${seat.priceValue}`}
                  primaryTypographyProps={{
                    variant: 'h5'
                  }}
                  secondaryTypographyProps={{
                    variant: 'h6'
                  }}
                />
              </ListItem>
            </>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}

export default SelectedSeatList;
