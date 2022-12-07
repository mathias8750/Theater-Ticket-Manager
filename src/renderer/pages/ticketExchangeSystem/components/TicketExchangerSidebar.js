import {
  Autocomplete,
  Button,
  Card, CardContent,
  CardHeader, Divider,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select, TextField
} from "@mui/material";
import {useContext, useState} from "react";
import supabase from "../../../utils/Supabase";
import {useQuery} from "@tanstack/react-query";
import {OrganizationContext} from "../../../context/Context";
import SelectedSeatList from "../../../components/SelectedSeatList";


const TicketExchangerSidebar = ({tickets, originalEvent, selectedEvent, setSelectedEvent, selectedSeats, setSelectedSeats, setOpen}) => {


  const [events, setEvents] = useState([])

  const {state: organizationState} = useContext(OrganizationContext)

  const fetchEvents = async () => {

    const {data: events} = await supabase
      .from('Events')
      .select('*')
      .eq('organizationID', organizationState.selectedOrg.organizationID)

    return events;
  }

  const {status, error} = useQuery(['exchangerEvents'], fetchEvents, {
    onSuccess: (data) => {
      setEvents(data)
    }
  })

  const handleEventChange = (event, value) => {
    setSelectedSeats([])
    setSelectedEvent(value)
  }

  return (
    <Grid direction={'column'} container item style={{height: '100%', padding: '10px'}} md={4}>
      <Grid item style={{height: '40%'}}>
       <SelectedSeatList selectedSeats={tickets} event={originalEvent}/>
      </Grid>

      <Grid item style={{ height: '10%'}}>
        <div style={{ height: '10%'}}/>

        <FormControl fullWidth>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={events}
            getOptionLabel={event => event.eventName}
            value={selectedEvent}
            onChange={handleEventChange}
            sx={{ width: '100%'}}
            renderInput={(params) => <TextField {...params} label="Event" />}
          />
        </FormControl>
      </Grid>

      <Grid item style={{ height: '45%'}}>
        <Card style={{height: '100%'}}>
          <CardHeader
            title={selectedEvent ? selectedEvent.eventName : ""}
            subheader={selectedEvent ? selectedEvent.eventDateTime : ""}
          />

          <Divider/>

          <CardContent style={{height: '100%', paddingRight: '0px'}}>
            <List
              sx={{
                width: '100%',
                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'auto',
                height: '70%',
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

      </Grid>

      <Grid item style={{ height: '5%'}}>
        <div style={{ height: '10%'}}/>
        <Button
          style={{width: '100%', height: '90%'}}
          variant={'contained'}
          disabled={selectedSeats.length === 0}
          onClick={() => {
            setOpen(true)
          }}
        >
          Exchange
        </Button>
      </Grid>
    </Grid>
  )
}

export default TicketExchangerSidebar
