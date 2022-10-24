import {Circle, Layer, Line, Rect, Stage, Text} from "react-konva";
import seatData from '../data/PlayhouseSeatMap.json'
import {useCallback, useState} from "react";
import Section from "../pages/seatViewer/components/Section";
import {PlayhouseLoges, PlayhouseSections} from "../data/PlayhouseSeatMapJson";

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


const PlayhouseTicketSelector = ({}) => {

  const [sectionsSeatMap, setSectionsSeatMap] = useState(PlayhouseSections)
  const [logesSeatMap, setLogesSeatMap] = useState(PlayhouseLoges)

  const selectSectionSeat = (selected, seat, seatKey, rowKey, sectionIndex, sectionNumber) => {
    let sectionKey = sectionIndex + 1

    if (selected) {
      console.log('unselecting seat', seatKey, rowKey, sectionNumber)
    } else {
      console.log('selecting seat', seatKey, rowKey, sectionNumber)
    }

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

    if (selected) {
      console.log('unselecting seat', seatKey, rowKey, sectionNumber)
    } else {
      console.log('selecting seat', seatKey, rowKey, sectionNumber)
    }

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

  const [stage, setStage] = useState({
    scale: 1,
    x: 0,
    y: 0
  });

  const handleWheel = (e) => {
    e.evt.preventDefault();

    const scaleBy = 1.5;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
    };

    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

    setStage({
      scale: newScale,
      x: (stage.getPointerPosition().x / newScale - mousePointTo.x) * newScale,
      y: (stage.getPointerPosition().y / newScale - mousePointTo.y) * newScale
    });
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onWheel={handleWheel}
      scaleX={stage.scale}
      scaleY={stage.scale}
      draggable={true}
      x={stage.x}
      y={stage.y}

    >
      <Layer>
        <StageSections handleSeatClick={selectSectionSeat} sections={sectionsSeatMap}/>
        <LogeSections handleSeatClick={selectLogeSeat} loges={logesSeatMap}/>

      </Layer>
    </Stage>
  )
}

export default PlayhouseTicketSelector;
