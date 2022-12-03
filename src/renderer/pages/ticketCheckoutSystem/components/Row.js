import Seat from "./Seat";


const Row = ({ row, rowLetter, sectionNumber, rowIndex, maxSeats, sectionIndex, offset, sectionInfo }) => {
  return (
    <>
      {Object.keys(row).map((key, seatIndex) => {
        if (key !== "data") {
          // RETURNS A SEAT FOR EACH SEAT IN THE ROW
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
