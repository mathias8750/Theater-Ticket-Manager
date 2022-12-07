import {Layer} from "react-konva";
import Section from "./Section";
import {ConcertHallBalconyLevelSection, ConcertHallStageLevelSection} from "../../../data/ConcerthallSeatMapJson";
// List of imported libraries and components above

// Function for the graphical overlay of the ConcertHall venue
const ConcertHall = ({ tickets }) => {

  // Outputs the Concert Hall venue graphical overlay with labels for each section and seat 
  return (
    <Layer>

      <Section key={'S1'} section={ConcertHallStageLevelSection['S1']} sectionIndex={0} offset={0} sectionTextOffset={0} sectionText={"Section"} sectionInfo={"S1"} />
      <Section key={'S2'} section={ConcertHallStageLevelSection['S2']} sectionIndex={1} offset={0} sectionTextOffset={0} sectionText={"Section"} sectionInfo={"S2"}/>

      <Section key={'B1'} section={ConcertHallBalconyLevelSection['B1']} sectionIndex={0} offset={350} sectionTextOffset={377} sectionText={"Balcony"} sectionInfo={"B1"}/>
      <Section key={'B2'} section={ConcertHallBalconyLevelSection['B2']} sectionIndex={1} offset={350} sectionTextOffset={377} sectionText={"Balcony"} sectionInfo={"B2"}/>
      <Section key={'B3'} section={ConcertHallBalconyLevelSection['B3']} sectionIndex={2} offset={350} sectionTextOffset={377} sectionText={"Balcony"} sectionInfo={"B3"}/>
      <Section key={'B4'} section={ConcertHallBalconyLevelSection['B4']} sectionIndex={3} offset={350} sectionTextOffset={377} sectionText={"Balcony"} sectionInfo={"B4"}/>
      <Section key={'B5'} section={ConcertHallBalconyLevelSection['B5']} sectionIndex={4} offset={350} sectionTextOffset={377} sectionText={"Balcony"} sectionInfo={"B5"}/>


    </Layer>
  )
}

// Export ConcertHall function to output to screen
export default ConcertHall;
