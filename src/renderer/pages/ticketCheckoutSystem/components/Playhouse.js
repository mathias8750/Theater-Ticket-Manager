import {Layer} from "react-konva";
import {useEffect, useState} from "react";
import {PlayhouseLoges, PlayhouseSections} from "../../../data/PlayhouseSeatMapJson";
import Section from "./Section";


const Playhouse = ({tickets}) => {

  const [sectionTickets, setSectionTickets] = useState(PlayhouseSections)
  const [logeTickets, setLogeTickets] = useState(PlayhouseLoges)

  useEffect(() => {

    let tempSectionTickets = PlayhouseSections
    let tempLogeTickets = PlayhouseLoges

    console.log(tickets[0])

    tickets.map((ticket) => {
      let tempTicket = {
        ticketID: ticket.ticketID,
        selected: ticket.selected,
        disabled: false,
        price: ticket.priceValue,
        reserved: ticket.soldBool,
        seatNumber: ticket.seatNumber,
        rowLetter: ticket.rowNumber,
        sectionNumber: ticket.sectionNumber,
      }

      if (ticket.sectionNumber.startsWith("S")) {
        tempSectionTickets[ticket.sectionNumber][ticket.rowNumber][ticket.seatNumber] = tempTicket
      } else if (ticket.sectionNumber.startsWith("L")) {
        tempLogeTickets[ticket.sectionNumber][ticket.rowNumber][ticket.seatNumber] = tempTicket
      }
    })

    setSectionTickets(tempSectionTickets)
    setLogeTickets(tempLogeTickets)

  }, [tickets])

  return (
    <Layer>

      {/* Section Sections */}
      <Section key={'S4'} section={sectionTickets['S4']} sectionIndex={0} offset={0} sectionTextOffset={0} sectionText={"Section"} />
      <Section key={'S3'} section={sectionTickets['S3']} sectionIndex={1} offset={0} sectionTextOffset={0} sectionText={"Section"} />
      <Section key={'S2'} section={sectionTickets['S2']} sectionIndex={2} offset={0} sectionTextOffset={0} sectionText={"Section"} />
      <Section key={'S1'} section={sectionTickets['S1']} sectionIndex={3} offset={0} sectionTextOffset={0} sectionText={"Section"} />

      {/* Loge Sections */}
      <Section key={'L4'} section={logeTickets['L4']} sectionIndex={0} offset={150} sectionTextOffset={160} sectionText={"Loge"} />
      <Section key={'L3'} section={logeTickets['L3']} sectionIndex={1} offset={150} sectionTextOffset={160} sectionText={"Loge"} />
      <Section key={'L2'} section={logeTickets['L2']} sectionIndex={2} offset={150} sectionTextOffset={160} sectionText={"Loge"} />
      <Section key={'L1'} section={logeTickets['L1']} sectionIndex={3} offset={150} sectionTextOffset={160} sectionText={"Loge"} />

    </Layer>
  )
}

export default Playhouse;
