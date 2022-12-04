import {
  Button,
  Grid,
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import SelectedSeatList from "../../../components/SelectedSeatList";


const TicketSelectorSidebar = ({event, selectedSeats}) => {

  const navigate = useNavigate()

  return (
    <Grid direction={'column'} container item style={{height: '100%', padding: '10px'}} md={4}>

      <Grid item style={{height: '95%'}}>
        <SelectedSeatList event={event} selectedSeats={selectedSeats}/>
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
