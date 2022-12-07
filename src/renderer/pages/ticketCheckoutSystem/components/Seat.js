import {Group, Rect, Text} from "react-konva";
import {
  RECT_X_MARGIN,
  RECT_X_PADDING,
  RECT_Y_MARGIN,
  RECT_Y_PADDING,
  SEAT_SIZE,
  SECTION_PADDING
} from "../utils/SeatViewerConsts";
import {useContext, useEffect, useState} from "react";
import {TicketViewerContext} from "./TicketViewer";

function calculateSeatNumberTextXMargin(seatNumber) {
  if (seatNumber < 10) {
    return 103.5
  } else {
    return 102
  }
}

const Seat = ({
                seat,
                seatNumber,
                maxSeats,
                rowLength,
                rowLetter,
                sectionNumber,
                sectionIndex,
                rowIndex,
                seatIndex,
                offset,
                sectionInfo
              }) => {

  // GETS NECESSARY FUNCTIONS AND ARRAYS FROM THE CONTEXT
  let {updateSelectedSeats, maxSelectableSeats, selectedSeats, venue} = useContext(TicketViewerContext)

  const [selected, setSelected] = useState(false)


  let rectX;
  let textX;
  // IF PLAYHOUSE
  if (venue === 2) {
    // SECTION 3 AND 4 NEED TO BE FLIPPED
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
  } else {
    // IF CONCERT HALL
    if (sectionInfo === 'S1') {
      rectX = 340 - RECT_X_PADDING * (rowLength - seatIndex)
      textX = 340 - RECT_X_PADDING * (rowLength - seatIndex) + calculateSeatNumberTextXMargin(seatNumber) - 100
    } else if (sectionInfo === 'S2') {
      rectX = 350 + RECT_X_PADDING * seatIndex
      textX = 350 + RECT_X_PADDING * seatIndex + calculateSeatNumberTextXMargin(seatNumber) - 100
    } else if (sectionInfo === 'B1') {
      rectX = 80 - RECT_X_PADDING * (rowLength - seatIndex)
      textX = 80 - RECT_X_PADDING * (rowLength - seatIndex) + calculateSeatNumberTextXMargin(seatNumber) - 100
    } else if (sectionInfo === 'B2') {
      rectX = 250 - RECT_X_PADDING * (rowLength - seatIndex)
      textX = 250 - RECT_X_PADDING * (rowLength - seatIndex) + calculateSeatNumberTextXMargin(seatNumber) - 100
    } else if (sectionInfo === 'B3') {
      if (rowIndex !== 12) {
        rectX = 430 - RECT_X_PADDING * (rowLength - seatIndex)
        textX = 430 - RECT_X_PADDING * (rowLength - seatIndex) + calculateSeatNumberTextXMargin(seatNumber) - 100
      } else {
        // ROW 12 NEEDS SPECIFIC DATA
        rectX = 430 - RECT_X_PADDING * (14 - seatIndex)
        textX = 430 - RECT_X_PADDING * (14 - seatIndex) + calculateSeatNumberTextXMargin(seatNumber) - 100
      }
    } else if (sectionInfo === 'B4') {
      rectX = 620 - RECT_X_PADDING * (rowLength - seatIndex)
      textX = 620 - RECT_X_PADDING * (rowLength - seatIndex) + calculateSeatNumberTextXMargin(seatNumber) - 100
    } else if (sectionInfo === 'B5') {
      rectX = 725 - RECT_X_PADDING * (rowLength - seatIndex)
      textX = 725 - RECT_X_PADDING * (rowLength - seatIndex) + calculateSeatNumberTextXMargin(seatNumber) - 100

    }
  }

  // SETS THE FILL COLOR OF THE SEAT
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
          // IF THE TICKETS ARRAY FAILED, THIS MAKES SURE THE CORRECT DATA IS SHOWN
          if (seat.sectionNumber === undefined) {
            seat.sectionNumber = sectionInfo
            seat.rowNumber = rowLetter
            seat.seatNumber =  seatNumber
          }
          updateSelectedSeats(seat, selected)

          if (selected) {
            setSelected(false)
          } else {
            if (selectedSeats.length < maxSelectableSeats) {
              setSelected(true)
            }
          }
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
        perfectDrawEnabled={false}
        listening={seat.soldBool}
      />

      <Text
        text={seatNumber}
        x={textX}
        y={offset + 103 + 12 * rowIndex}
        fontSize={5}
        perfectDrawEnabled={false}
      />

    </div>
  )
}

export default Seat;
