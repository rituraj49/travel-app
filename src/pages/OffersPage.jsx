import { Box, Button } from "@mui/material";
import { useAppContext } from "../context/AppContext";
import FlightOfferCard from "../components/FlightOfferCard";

function OffersPage() {
    // const { flightOffers } = useAppContext();
    const flightOffers = JSON.parse(localStorage.getItem("flightOffers"));
    return (
        <Box>
            {flightOffers.map((offer, index) => (
                <FlightOfferCard 
                    key={index} 
                    flight={offer} 
                />
            ))}
        </Box>
    );
}

export default OffersPage;