import {Layer} from "react-konva";
import Section from "./Section";

const ConcertHall = ({ tickets }) => {

  return (
    <Layer>

      <Section key={'S1'} section={tickets.stage['S1']} sectionIndex={0} offset={0} sectionTextOffset={0} sectionText={"Section"} sectionInfo={"S1"} />
      <Section key={'S2'} section={tickets.stage['S2']} sectionIndex={1} offset={0} sectionTextOffset={0} sectionText={"Section"} sectionInfo={"S2"}/>

      <Section key={'B1'} section={tickets.balcony['B1']} sectionIndex={0} offset={350} sectionTextOffset={377} sectionText={"Balcony"} sectionInfo={"B1"}/>
      <Section key={'B2'} section={tickets.balcony['B2']} sectionIndex={1} offset={350} sectionTextOffset={377} sectionText={"Balcony"} sectionInfo={"B2"}/>
      <Section key={'B3'} section={tickets.balcony['B3']} sectionIndex={2} offset={350} sectionTextOffset={377} sectionText={"Balcony"} sectionInfo={"B3"}/>
      <Section key={'B4'} section={tickets.balcony['B4']} sectionIndex={3} offset={350} sectionTextOffset={377} sectionText={"Balcony"} sectionInfo={"B4"}/>
      <Section key={'B5'} section={tickets.balcony['B5']} sectionIndex={4} offset={350} sectionTextOffset={377} sectionText={"Balcony"} sectionInfo={"B5"}/>


    </Layer>
  )
}

export default ConcertHall;
