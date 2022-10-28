import Section from "./Section";
import {useState} from "react";
import {PlayhouseLoges, PlayhouseSections} from "../../../data/PlayhouseSeatMapJson";

const StageSections = ({sections, handleSeatClick}) => {
  return (
    <>
      {Object.keys(sections).map((key, sectionIndex) => {
        return (
          <Section
            key={sectionIndex}
            sectionIndex={sectionIndex}
            section={sections[key]}
            offset={0}
            sectionTextOffset={0}
            sectionText={"Section"}
            handleSeatClick={handleSeatClick}
          />
        )
      })}
    </>
  )
}


const LogeSections = ({loges, handleSeatClick}) => {
  return (
    <>
      {Object.keys(loges).map((key, sectionIndex) => {
        return (
          <Section
            key={sectionIndex}
            sectionIndex={sectionIndex}
            section={loges[key]}
            offset={150}
            sectionTextOffset={160}
            sectionText={"Loge"}
            handleSeatClick={handleSeatClick}
          />
        )
      })}
    </>
  )
}


const Playhouse = ({ tickets, selectedSeats, setSelectedSeats }) => {

  const [sectionsSeatMap, setSectionsSeatMap] = useState(PlayhouseSections)
  const [logesSeatMap, setLogesSeatMap] = useState(PlayhouseLoges)

  const selectSectionSeat = (selected, seat, seatKey, rowKey, sectionIndex, sectionNumber) => {
    let sectionKey = sectionIndex + 1

    let tempSeat = {
      id: `Section-${sectionNumber}-${rowKey}-${seatKey}`,
      price: seat.price,
      disabled: seat.disabled,
      sectionNumber: sectionNumber,
      sectionKey: sectionKey,
      rowLetter: rowKey,
      seatNumber: seatKey,
      sectionType: 'Section'
    }
    let tempSelectedSeats = [...selectedSeats];

    if (selected) {

      tempSelectedSeats = tempSelectedSeats.filter((element) => {
        if (element.id !== tempSeat.id) {
          return element
        }
      })

    } else {
      tempSelectedSeats.push(tempSeat)
    }

    setSelectedSeats(tempSelectedSeats)


    setSectionsSeatMap({
      ...sectionsSeatMap,
      [sectionKey]: {
        ...sectionsSeatMap[sectionKey],
        [rowKey]: {
          ...sectionsSeatMap[sectionKey][rowKey],
          [seatKey]: {
            ...sectionsSeatMap[sectionKey][rowKey][seatKey],
            selected: !selected
          }
        }
      }
    })
  }


  const selectLogeSeat = (selected, seat, seatKey, rowKey, sectionIndex, sectionNumber) => {
    let sectionKey = sectionIndex + 1

    let tempSeat = {
      id: `Loge-${sectionNumber}-${rowKey}-${seatKey}`,
      price: seat.price,
      disabled: seat.disabled,
      sectionNumber: sectionNumber,
      sectionKey: sectionKey,
      rowLetter: rowKey,
      seatNumber: seatKey,
      sectionType: 'Loge'
    }
    let tempSelectedSeats = [...selectedSeats];

    if (selected) {

      tempSelectedSeats = tempSelectedSeats.filter((element) => {
        if (element.id !== tempSeat.id) {
          return element
        }
      })

    } else {
      tempSelectedSeats.push(tempSeat)
    }

    setSelectedSeats(tempSelectedSeats)

    setLogesSeatMap({
      ...logesSeatMap,
      [sectionKey]: {
        ...logesSeatMap[sectionKey],
        [rowKey]: {
          ...logesSeatMap[sectionKey][rowKey],
          [seatKey]: {
            ...logesSeatMap[sectionKey][rowKey][seatKey],
            selected: !selected
          }
        }
      }
    })
  }

  return (
    <>
      <StageSections handleSeatClick={selectSectionSeat} sections={sectionsSeatMap}/>
      <LogeSections handleSeatClick={selectLogeSeat} loges={logesSeatMap}/>
    </>
  )
}

export default Playhouse;