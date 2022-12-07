import Seat from "./Seat";
// List of imported libraries and components above

// Outputs the row of seats in each venue according to number of seats 
const Row = ({ row, rowLetter, sectionNumber, rowIndex, maxSeats, sectionIndex, offset, sectionInfo }) => {
  return (
    <>
      {Object.keys(row).map((key, seatIndex) => {
        if (key !== "data") {
          return (
            <Seat
              sectionInfo={sectionInfo}
              key={`${sectionIndex}-${rowIndex}-${seatIndex}`}
              seat={row[key]}
              seatNumber={parseInt(key)}
              row={row}
              rowLength={Object.keys(row).length}
              rowLetter={rowLetter}
              maxSeats={maxSeats}
              sectionNumber={sectionNumber}
              sectionIndex={sectionIndex}
              rowIndex={rowIndex}
              seatIndex={seatIndex}
              offset={offset}
            />
          )
        }

      })}
    </>
  )
}

export default Row;
