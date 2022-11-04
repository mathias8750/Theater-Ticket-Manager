import {Box, Card, CardContent, CardHeader, Grid} from "@mui/material";
import CustomerHeader from "../../components/CustomerHeader";
import Playhouse from "./components/Playhouse";
import TicketSelector from "./components/TicketSelector";
import SidebarEventItem from "../../components/SidebarEventItem";
import {useEffect, useState} from "react";


const SeatViewer = ({}) => {

  const [selectedSeats, setSelectedSeats] = useState([])

  return (
    <CustomerHeader>
      <Box style={{flexGrow: 1, background: 'white', height: '100%'}}>
        <Grid container style={{padding: '10px', height: '100%'}}>

          <Grid container item md={4} direction={'column'} style={{height: '100%'}}>
            <Grid item style={{height: '15%', margin: '10px'}}>
              <Card>
                <CardHeader
                  title={'event name'}
                  subheader={'event date'}
                />
              </Card>
            </Grid>

            <Grid item style={{height: '80%'}}>
              <div style={{height: '100%', maxHeight: '800px', width: '100%', overflow: 'hidden'}}>
                <div style={{height: '100%', overflow: 'auto'}}>
                  {selectedSeats.map((seat) => {
                    console.log('hey you sup')
                    return (

                      <Card style={{margin: '10px'}}>
                        <CardHeader
                          title={`${seat.sectionType} ${seat.sectionNumber} Row ${seat.rowLetter} Seat ${seat.seatNumber}`}
                          subheader={`$${seat.price}`}
                        />
                      </Card>
                    )
                  })}
                </div>
              </div>

            </Grid>

          </Grid>

          <Grid item md={8} style={{height: '100%'}}>
            <TicketSelector selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats}/>
          </Grid>
        </Grid>
      </Box>
    </CustomerHeader>
  )
}

export default SeatViewer;