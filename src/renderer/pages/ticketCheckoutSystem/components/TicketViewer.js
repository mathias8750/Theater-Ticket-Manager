import {Card, CardContent} from "@mui/material";
import {Layer, Stage} from "react-konva";
import {createContext, useEffect, useRef, useState} from "react";
import CivicCenter from "./CivicCenter";
import Playhouse from "./Playhouse";

export const TicketViewerContext = createContext({})

const TicketViewer = ({ venue, tickets, onSeatClick }) => {

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
    width: 500,
    height: 500,
  });

  useEffect(() => {
    if (containerRef.current.offsetWidth !== stageSize.width || containerRef.current.offsetHeight !== stageSize.height) {
      setStageSize({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight
      });
    }
  }, [containerRef]);


  return (
    <TicketViewerContext.Provider
      value={{ onSeatClick: onSeatClick }}
    >
      <Card style={{ height: '100%', margin: '10px'}}>
        <CardContent style={{ height: '100%', padding: '0px'}} ref={containerRef}>
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
            {venue === 2 ? <Playhouse tickets={tickets}/> : <CivicCenter/>}
          </Stage>
        </CardContent>
      </Card>
    </TicketViewerContext.Provider>

  )
}

export default TicketViewer;
