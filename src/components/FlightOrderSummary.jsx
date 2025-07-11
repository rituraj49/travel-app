import { Box, Button, Card, Chip, Divider, Stack, Typography } from "@mui/material";
import { parseISO, format } from 'date-fns';
import { useAppContext } from "../context/AppContext";

function FlightOrderSummary() {
    // const {selectedFlightOffer} = useAppContext();
    // const selectedFlightOffer = JSON.parse(localStorage.getItem("selectedOffer"));
    const {travelers, selectedFlightOffer, setTravelers} = useAppContext();
    return (
         <Box > 
            <Typography variant="h6" color="primary">
                Summary
            </Typography>
            <Divider />
            <Typography variant="subtitle1" color="textSecondary">
                Tickets for : {travelers.length} traveler{travelers.length > 1 ? "s" : ""}
            </Typography>
            {
                selectedFlightOffer.trips.map((trip, index) => {
                    const depDateTime = trip.legs[0].departureDateTime;
                    const depDate = parseISO(depDateTime);
                    const depDay = format(depDate, "EEE");
                    const depTime = format(depDate, "hh:mm a");
                    const arrDateTime = trip.legs[0].arrivalDateTime;
                    const arrDate = parseISO(arrDateTime);
                    const arrDay = format(arrDate, "EEE");
                    const arrTime = format(arrDate, "hh:mm a");

                    return <Card variant="elevation" sx={{ pb: 1 }}>
                        <Typography variant="h6" color="primary">
                            {trip.from} to {trip.to}
                        </Typography>
                        <Typography variant="subtitle1" fontWeight="bold" color="textSecondary">
                            {/* {depDate.toLocaleDateString()} */}
                            Departs {depDay}, {format(depDate, "dd MMM")}
                        </Typography>
                        <Typography variant="subtitle1">
                            {depTime} - {arrTime} ({trip.totalFlightDuration})
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Arrives {arrDay}, {format(arrDate, "dd MMM")}
                        </Typography>
                        {trip.stops > 0 && (
                            <Box mt={1}>
                                <Typography variant="subtitle1" fontWeight="bold" color="textSecondary" gutterBottom>
                                    {trip.stops} stop{trip.stops > 1 ? "s" : ""}
                                </Typography>

                                <Stack direction="column" spacing={1} flexWrap="wrap">
                                {trip.legs.map((leg, index) => (
                                    <>
                                        {/* <Stack direction="row" spacing={1}> */}
                                        {leg.layoverAfter && (
                                            <Chip
                                                key={index}
                                                label={`${leg.layoverAfter} in ${leg.arrivalAirport}`}
                                                color="success"
                                                size="small"
                                                variant="outlined"
                                            />
                                        )}
                                        <Box>
                                            <Typography variant="subtitle1" fontWeight="bold" color="textSecondary">
                                                {leg.operatingCarrierCode} {leg.aircraftCode}
                                            </Typography>
                                            </Box>
                                        {/* </Stack> */}
                                    </>
                                )
                                )}
                                </Stack>
                            </Box>
                        )}
                    </Card>
                })
            }
            <Box>
                <Typography variant="subtitle1" fontWeight="bold" color="primary">
                    Your price summary:
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Base Price: {selectedFlightOffer.basePrice}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Total Price: {selectedFlightOffer.totalPrice}
                </Typography>
                {/* {
                    travelers.map(traveler => {
                        return (
                            <Box>
                                <Typography>
                                    Total Price: {traveler.totalPrice}
                                </Typography>
                            </Box>
                        )
                    })
                } */}
            </Box>
        </Box>
    )
}

export default FlightOrderSummary;