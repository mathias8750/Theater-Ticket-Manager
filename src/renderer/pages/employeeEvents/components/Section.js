import Row from "./Row";
import {Text} from "react-konva";
import {SECTION_PADDING} from "../utils/SeatViewerConsts";
// List of imported libraries and components above

const Section = ({ section, sectionIndex, offset, sectionTextOffset, sectionText, sectionInfo }) => {

  let x = 200 + SECTION_PADDING * sectionIndex
  if (sectionInfo === 'B1') {
    x = SECTION_PADDING * sectionIndex
  } else if (sectionInfo === 'B2') {
    x = SECTION_PADDING * sectionIndex - 75

  } else if (sectionInfo === 'B3') {
    x = SECTION_PADDING * sectionIndex - 140

  } else if (sectionInfo === 'B4') {
    x = SECTION_PADDING * sectionIndex - 170

  } else if (sectionInfo === 'B5') {
    x = SECTION_PADDING * sectionIndex - 270

  }

  return (
    <>
      <Text
        x={x}
        y={60 + sectionTextOffset}
        text={`${sectionText} ${section.data.section_id}`}
      />
      {Object.keys(section).map((key, rowIndex) => {

        if (key !== "data") {
          return (
            <Row
              key={`${section}-${rowIndex}`}
              sectionInfo={sectionInfo}
              sectionNumber={section.data.section_id}
              sectionIndex={sectionIndex}
              maxSeats={section.data.maxSeats}
              row={section[key]}
              rowLetter={key}
              rowIndex={rowIndex}
              offset={offset}
            />
          )
        }
      })}
    </>
  )
}

export default Section;
