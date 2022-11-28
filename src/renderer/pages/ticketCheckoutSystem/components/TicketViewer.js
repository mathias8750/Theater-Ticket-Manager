import {Card, CardContent} from "@mui/material";
import {Layer, Stage} from "react-konva";
import {createContext, useEffect, useRef, useState} from "react";
import ConcertHall from "./ConcertHall";
import Playhouse from "./Playhouse";
import {PlayhouseLoges, PlayhouseSections} from "../../../data/PlayhouseSeatMapJson";
import {ConcertHallBalconyLevelSection, ConcertHallStageLevelSection} from "../../../data/ConcerthallSeatMapJson";

export const TicketViewerContext = createContext({})

const TicketViewer = ({venue, tickets, onSeatClick, selectedSeats, setSelectedSeats, maxSeats}) => {

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

    const updateSelectedSeats = (seat, selected) => {

        let tempSelectedSeats = [...selectedSeats];

        if (selected) {

            tempSelectedSeats = tempSelectedSeats.filter((element) => {
                if (element.ticketID !== seat.ticketID) {
                    return element
                }
            })

        } else {
            if (tempSelectedSeats.length < maxSeats) {
                tempSelectedSeats.push(seat)
            }
        }

        setSelectedSeats(tempSelectedSeats)
    }


    function playhouseConvert(tickets) {
        let tempSectionTickets = PlayhouseSections
        let tempLogeTickets = PlayhouseLoges

        tickets.map((ticket) => {
            let tempTicket = {
                ...ticket,
            }

            if (ticket.sectionNumber.startsWith("S")) {
                tempSectionTickets[ticket.sectionNumber][ticket.rowNumber][ticket.seatNumber] = tempTicket
            } else if (ticket.sectionNumber.startsWith("L")) {
                tempLogeTickets[ticket.sectionNumber][ticket.rowNumber][ticket.seatNumber] = tempTicket
            }
        })

        return {section: tempSectionTickets, loge: tempLogeTickets};
    }

    function concertHallConvert(tickets) {
        let tempStageTickets = ConcertHallStageLevelSection
        let tempBalconyTickets = ConcertHallBalconyLevelSection

        console.log(tickets)

        tickets.map((ticket) => {
            let tempTicket = {
                ...ticket,
            }

            if (ticket.sectionNumber.startsWith("S")) {
                tempStageTickets[ticket.sectionNumber][ticket.rowNumber][ticket.seatNumber] = tempTicket
            } else if (ticket.sectionNumber.startsWith("B")) {
                tempBalconyTickets[ticket.sectionNumber][ticket.rowNumber][ticket.seatNumber] = tempTicket
            }
        })

        return {stage: tempStageTickets, balcony: tempBalconyTickets}
    }

    return (
        <TicketViewerContext.Provider
            value={{
                updateSelectedSeats: updateSelectedSeats,
                selectedSeats: selectedSeats,
                maxSelectableSeats: maxSeats,
                venue: venue
            }}
        >
            <Card style={{height: '100%', margin: '10px'}}>
                <CardContent style={{height: '100%', padding: '0px'}} ref={containerRef}>
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
                        {venue === 2 ? <Playhouse tickets={playhouseConvert(tickets)}/> :
                            <ConcertHall tickets={concertHallConvert(tickets)}/>}
                    </Stage>
                </CardContent>
            </Card>
        </TicketViewerContext.Provider>

    )
}

export default TicketViewer;
