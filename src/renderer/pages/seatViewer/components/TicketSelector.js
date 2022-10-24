import {useEffect, useRef, useState} from "react";
import {Layer, Stage} from "react-konva";
import Playhouse from "./Playhouse";


const TicketSelector = ({ event, tickets, selectedSeats, setSelectedSeats }) => {

  const containerRef = useRef(null)

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

  const [stageSize, setStageSize] = useState({
    width: 1000,
    height: 1000,
  });

  useEffect(() => {
    if (containerRef.current.offsetWidth !== stageSize.width || containerRef.current.offsetHeight !== stageSize.height) {
      setStageSize({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight
      });
    }
  });

  return (
    <div
      style={{ height: '100%', width: '100%' }}
      ref={containerRef}
    >
      <Stage
        width={stageSize.width}
        height={stageSize.height}
        onWheel={handleWheel}
        scaleX={stage.scale}
        scaleY={stage.scale}
        draggable={true}
        x={stage.x}
        y={stage.y}

      >
        <Layer>
          <Playhouse selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats}/>
        </Layer>
      </Stage>
    </div>
  )
}

export default TicketSelector;
