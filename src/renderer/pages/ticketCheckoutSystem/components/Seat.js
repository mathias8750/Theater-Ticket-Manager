import {Rect, Text} from "react-konva";
import {
  RECT_X_MARGIN,
  RECT_X_PADDING,
  RECT_Y_MARGIN,
  RECT_Y_PADDING,
  SEAT_SIZE,
  SECTION_PADDING
} from "../utils/SeatViewerConsts";
import {useContext, useState} from "react";
import {TicketViewerContext} from "./TicketViewer";

function calculateSeatNumberTextXMargin(seatNumber) {
  if (seatNumber < 10) {
    return 103.5
  } else {
    return 102
  }
}

const Seat = ({seat, seatNumber, maxSeats, rowLetter, sectionNumber, sectionIndex, rowIndex, seatIndex, offset}) => {

  let {onSeatClick} = useContext(TicketViewerContext)

  const [selected, setSelected] = useState(false)

  let rectX;
  let textX;
  if (sectionNumber === 4) {
    rectX = RECT_X_MARGIN + SECTION_PADDING - 87 + RECT_X_PADDING * (maxSeats - 1 - seatIndex)
    textX = calculateSeatNumberTextXMargin(seatNumber) + SECTION_PADDING - 87 + RECT_X_PADDING * (maxSeats - 1 - seatIndex)
  } else if (sectionNumber === 3) {
    rectX = RECT_X_MARGIN + SECTION_PADDING * sectionIndex + RECT_X_PADDING * (maxSeats - 1 - seatIndex)
    textX = calculateSeatNumberTextXMargin(seatNumber) + SECTION_PADDING * sectionIndex + RECT_X_PADDING * (maxSeats - 1 - seatIndex)
  } else {
    rectX = RECT_X_MARGIN + SECTION_PADDING * sectionIndex + RECT_X_PADDING * seatIndex
    textX = calculateSeatNumberTextXMargin(seatNumber) + SECTION_PADDING * sectionIndex + RECT_X_PADDING * seatIndex
  }

  function setFill(reserved, selected) {
    if (selected) {
      return ('blue')
    } else if (reserved) {
      return ('gray')
    } else {
      return ('lightblue')
    }
  }

  return (
    <div
      onClick={() => {
        if (!seat.soldBool) {
          onSeatClick(seat, selected)
          setSelected(!selected)
        }
      }
      }
    >
      <Rect
        x={rectX}
        y={offset + RECT_Y_MARGIN + RECT_Y_PADDING * rowIndex}
        width={SEAT_SIZE}
        height={SEAT_SIZE}
        fill={setFill(seat.soldBool, selected)}
      />

      <Text
        text={seatNumber}
        x={textX}
        y={offset + 103 + 12 * rowIndex}
        fontSize={5}
      >
      </Text>
    </div>
  )
}

export default Seat;
