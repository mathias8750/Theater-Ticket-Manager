import Seat from "./Seat";


const Row = ({ row, rowLetter, sectionNumber, rowIndex, maxSeats, sectionIndex, offset, handleSeatClick}) => {
  return (
    <>
      {Object.keys(row).map((key, seatIndex) => {
        if (key !== "data") {
          return (
            <Seat
              key={`${sectionIndex}-${rowIndex}-${seatIndex}`}
              seat={row[key]}
              seatNumber={parseInt(key)}
              row={row}
              rowLetter={rowLetter}
              maxSeats={maxSeats}
              sectionNumber={sectionNumber}
              sectionIndex={sectionIndex}
              rowIndex={rowIndex}
              seatIndex={seatIndex}
              offset={offset}
              handleSeatClick={handleSeatClick}
            />
          )
        }

      })}
    </>
  )
}

export default Row;