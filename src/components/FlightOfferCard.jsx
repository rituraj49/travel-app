import { Box, Card, CardContent, Chip, Stack, Typography, Divider, Accordion, AccordionSummary, AccordionDetails, Button } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import ConnectingAirportsIcon from "@mui/icons-material/ConnectingAirports";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

function FlightOfferCard({flight}) {
    const trip = flight.trips[0];
    // const flight = offer.flights[0];
    const {selectedFlightOffer, setSelectedFlightOffer} = useAppContext();
  
    const navigate = useNavigate();
   
    const handleBookNow = (flight) => {
        setSelectedFlightOffer(flight);
        localStorage.setItem("selectedOffer", JSON.stringify(flight));
        navigate("/booking");
    }
    return (
        <div>
            <Card sx={{ maxWidth: 800, margin: "auto", mt: 3, boxShadow: 3 }}>
                <CardContent>
                    {/* Top Info */}
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" color="primary">
                        {trip.from} → {trip.to}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {/* {flight.oneWay ? "One-way" : "Round-trip"} */}
                        One-way
                    </Typography>
                    </Box>

                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" spacing={2} mt={0.5} mb={1.5}>
                            <Chip label={`${trip.stops} stop${trip.stops > 1 ? "s" : ""}`} />
                            <Chip label={`Duration: ${trip.totalFlightDuration}`} />
                            <Chip label={`Layovers: ${trip.totalLayoverDuration}`} />
                        </Stack>
                        <Chip 
                            component={"button"}
                            onClick={()=>handleBookNow(flight)} 
                            label={`Book now`} 
                            color="primary" sx={{mb: 1.5}} 
                        />
                        {/* <Button variant="contained" color="primary" sx={{borderRadius: 10}}>Book Now</Button> */}
                    </Box>

                    <Divider />

                    {/* Flight Legs */}
                    <Accordion sx={{ mt: 2, boxShadow: 'none', '&:before': { display: 'none' } }}>
                        <AccordionSummary 
                            expandIcon={<ExpandMoreIcon />}
                            sx={{ px: 0, py: 1, borderBottom: '1px solid #ccc'}}
                        >
                            <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 'bold'}}>
                                Flight Details
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {trip.legs.map((leg) => (
                                <Box key={leg.legNo} mb={2}>
                                <Typography variant="subtitle2" gutterBottom>
                                    {leg.operatingCarrierCode} {leg.flightNumber}
                                </Typography>
                                <Stack direction="row" spacing={3} alignItems="center">
                                    <FlightTakeoffIcon color="action" />
                                    <Box>
                                    <Typography>{leg.departureAirport} (Terminal {leg.departureTerminal})</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {new Date(leg.departureDateTime).toLocaleString()}
                                    </Typography>
                                    </Box>

                                <Stack direction="column" spacing={0} alignItems="center">
                                    <ConnectingAirportsIcon color="disabled" />
                                    <Typography variant="caption">{leg.duration}</Typography>
                                </Stack>
                                    <FlightLandIcon color="action" />
                                    <Box>
                                    <Typography>{leg.arrivalAirport} (Terminal {leg.arrivalTerminal})</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {new Date(leg.arrivalDateTime).toLocaleString()}
                                    </Typography>
                                    </Box>
                                </Stack>

                                {leg.layoverAfter && (
                                    <Typography color="text.secondary">
                                    {leg.layoverAfter} layover in {leg.arrivalAirport}
                                    </Typography>
                                )}
                                <Divider variant="middle" sx={{ mt: 2 }} />
                                </Box>
                            ))}
                        </AccordionDetails>
                    </Accordion>

                    {/* Pricing */}
                    <Box mt={2} display="flex" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">
                            Seats Available: {flight.seatsAvailable}
                        </Typography>
                        <Box textAlign="right">
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold'}}>
                                Price: {flight.currencyCode} {flight.totalPrice}
                            </Typography>
                            {/* <Typography variant="body2" color="text.secondary">
                            Base: {flight.basePrice} {flight.currencyCode}
                            </Typography> */}
                        </Box>
                    </Box>
                </CardContent>
                </Card>
        </div>
    );
}

export default FlightOfferCard;