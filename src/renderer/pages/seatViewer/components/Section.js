import Row from "./Row";
import {Text} from "react-konva";
import {SECTION_PADDING} from "../utils/SeatViewerConsts";

const Section = ({ section, sectionIndex, offset, sectionTextOffset, sectionText, handleSeatClick }) => {
  return (
    <>
      <Text
        x={200 + SECTION_PADDING * sectionIndex}
        y={60 + sectionTextOffset}
        text={`${sectionText} ${section.data.section_id}`}
      />
      {Object.keys(section).map((key, rowIndex) => {
        if (key !== "data") {
          return (
            <Row
              key={`${section}-${rowIndex}`}
              sectionNumber={section.data.section_id}
              sectionIndex={sectionIndex}
              maxSeats={section.data.maxSeats}
              row={section[key]}
              rowLetter={key}
              rowIndex={rowIndex}
              offset={offset}
              handleSeatClick={handleSeatClick}
            />
          )
        }
      })}
    </>
  )
}

export default Section;
