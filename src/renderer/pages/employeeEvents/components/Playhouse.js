import {Layer} from "react-konva";
import Section from "./Section";
// List of imported libraries and components above


const Playhouse = ({tickets}) => {

  return (
    <Layer key={'playhouse'}>

      {/* Section Sections */}
      <Section key={'S4'} section={tickets.section['S4']} sectionIndex={0} offset={0} sectionTextOffset={0} sectionText={"Section"} />
      <Section key={'S3'} section={tickets.section['S3']} sectionIndex={1} offset={0} sectionTextOffset={0} sectionText={"Section"} />
      <Section key={'S2'} section={tickets.section['S2']} sectionIndex={2} offset={0} sectionTextOffset={0} sectionText={"Section"} />
      <Section key={'S1'} section={tickets.section['S1']} sectionIndex={3} offset={0} sectionTextOffset={0} sectionText={"Section"} />

      {/* Loge Sections */}
      <Section key={'L4'} section={tickets.loge['L4']} sectionIndex={0} offset={150} sectionTextOffset={160} sectionText={"Loge"} />
      <Section key={'L3'} section={tickets.loge['L3']} sectionIndex={1} offset={150} sectionTextOffset={160} sectionText={"Loge"} />
      <Section key={'L2'} section={tickets.loge['L2']} sectionIndex={2} offset={150} sectionTextOffset={160} sectionText={"Loge"} />
      <Section key={'L1'} section={tickets.loge['L1']} sectionIndex={3} offset={150} sectionTextOffset={160} sectionText={"Loge"} />

    </Layer>
  )
}

export default Playhouse;
