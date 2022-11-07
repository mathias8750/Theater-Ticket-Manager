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


const TicketSelectorSidebar = ({event, selectedSeats}) => {

  const navigate = useNavigate()

  return (
    <Grid direction={'column'} container item style={{height: '100%', padding: '10px'}} md={4}>

      <Grid item style={{height: '95%'}}>
        <Card style={{height: '100%'}}>
          <CardHeader
            title={event.eventName}
            subheader={event.eventDateTime}
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
                    <ListItemText primary={`${seat.sectionNumber} Row ${seat.rowLetter} Seat ${seat.seatNumber}`}
                                  secondary={`$${seat.price}`}
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
      </Grid>

      <Grid item style={{ height: '5%', paddingTop: '5px'}}>
        <Button
          style={{width: '100%', height: '100%'}}
          variant={'contained'}
          disabled={selectedSeats.length === 0}
          onClick={() => {
            navigate("/customer/events/checkout", {state: selectedSeats})
          }}
        >
          Checkout
        </Button>
      </Grid>

    </Grid>
  )
}

export default TicketSelectorSidebar;
