import {Layer} from "react-konva";
import Section from "./Section";


const Playhouse = ({tickets}) => {

  return (
    <Layer key={'playhouse'}>

      {/* Section Sections */}
      <Section key={'S4'} section={tickets.section['S4']} sectionIndex={0} offset={0} sectionTextOffset={0} sectionText={"Section"} sectionInfo={'S4'}/>
      <Section key={'S3'} section={tickets.section['S3']} sectionIndex={1} offset={0} sectionTextOffset={0} sectionText={"Section"} sectionInfo={'S3'}/>
      <Section key={'S2'} section={tickets.section['S2']} sectionIndex={2} offset={0} sectionTextOffset={0} sectionText={"Section"} sectionInfo={'S2'}/>
      <Section key={'S1'} section={tickets.section['S1']} sectionIndex={3} offset={0} sectionTextOffset={0} sectionText={"Section"} sectionInfo={'S1'}/>

      {/* Loge Sections */}
      <Section key={'L4'} section={tickets.loge['L4']} sectionIndex={0} offset={150} sectionTextOffset={160} sectionText={"Loge"} sectionInfo={'L4'}/>
      <Section key={'L3'} section={tickets.loge['L3']} sectionIndex={1} offset={150} sectionTextOffset={160} sectionText={"Loge"} sectionInfo={'L3'}/>
      <Section key={'L2'} section={tickets.loge['L2']} sectionIndex={2} offset={150} sectionTextOffset={160} sectionText={"Loge"} sectionInfo={'L2'}/>
      <Section key={'L1'} section={tickets.loge['L1']} sectionIndex={3} offset={150} sectionTextOffset={160} sectionText={"Loge"} sectionInfo={'L1'}/>

    </Layer>
  )
}

export default Playhouse;
