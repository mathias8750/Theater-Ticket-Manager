import {Button, Card, CardHeader} from "@mui/material";

const RecommendedSeats = ({seats, onSeatsClick}) => {

    let seats_str = 'Seat(s): ';
    for (let i = 0; i < seats.result.length; i++) {
      seats_str = seats_str + seats.result[i].seatNumber + ', ';
    }
    seats_str = seats_str.substring(0, seats_str.length - 2)
    const subtitle = <ul><li>{'Row: ' + seats.result[0]?.rowNumber}</li><li>{seats_str}</li></ul>

    return (
        <>
        <Card>
        <CardHeader
          title={'Section: ' + seats.section}
          subheader={subtitle}
          action={
            <Button
              onClick={() => onSeatsClick(seats)}
            >Purchase Seats</Button>
          }
        />
      </Card>
        </>
    )
}

export default RecommendedSeats;
