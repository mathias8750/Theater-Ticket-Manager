import {Typography} from "@mui/material";

const CustomerEvent = ({event}) => {


  return (
    <>
      <div>
        <Typography>{event.eventName}</Typography>
      </div>

      <div>
        <Typography>{event.eventDateTime}</Typography>
      </div>

      <div>
        <Typography>{event.venueID}</Typography>
      </div>
    </>
  )
}

export default CustomerEvent;
