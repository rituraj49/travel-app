import { Autocomplete, Box, Button, Card, Checkbox, Chip, Divider, FormControl, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
// import { AddCircleIcon, RemoveCircleIcon } from "@mui/icons-material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useState } from "react";
import axiosInstance from "../config/axiosConfig";
import FlightOfferCard from "../components/FlightOfferCard";
import { parseISO, format } from 'date-fns';
import FlightOrderSummary from "../components/FlightOrderSummary";
import TravelerForm from "../components/TravelerForm";

function BookingPage() {
    // const {selectedFlightOffer} = useAppContext();
    const selectedFlightOffer = JSON.parse(localStorage.getItem("selectedOffer"));
    const {travelers, setTravelers} = useAppContext();
    const [phoneNumber, setPhoneNumber] = useState({
        countryCode: "",
        phone: ""
    });
    // const travelers = selectedFlightOffer.
    const documentTypes = ["PASSPORT", "VISA", "GREEN_CARD"];

    const navigate = useNavigate();

    const handleTravelerChange = (index, field) => (e, newVal) => {
        const newTravelers = [...travelers];
        if(field.includes("phoneNumber.")) {
            const phoneField = field.split(".")[1];
            console.log({phoneField, val: newVal, e: e.target.value})
            newTravelers[index] = {
                ...newTravelers[index],
                phoneNumber: {
                    ...newTravelers[index].phoneNumber,
                    [phoneField]: newVal
                }
            }
        } else if(field.includes("document.")) {
            const docField = field.split(".")[1];
            if(docField === "issuanceDate" || docField === "expiryDate") {
                const date = e.toISOString().split("T")[0];
                newTravelers[index] = {
                    ...newTravelers[index],
                    document: {
                        ...newTravelers[index].document,
                        [docField]: date
                    }
                }
            } else if(docField === "holder") {
                newTravelers[index] = {
                    ...newTravelers[index],
                    document: {
                        ...newTravelers[index].document,
                        [docField]: newVal
                    }
                }
            } else {
                newTravelers[index] = {
                    ...newTravelers[index],
                    document: {
                        ...newTravelers[index].document,
                        [docField]: e.target.value
                    }
                }
            }
        } else if (field === "dateOfBirth") {
            const date = e.toISOString().split("T")[0];
            newTravelers[index] = {
                ...newTravelers[index],
                [field]: date
            }
        } else {
            newTravelers[index] ={
                ...newTravelers[index],
                [field]: e.target.value
            }
        }

        setTravelers(newTravelers);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const bookingData = {
            flightOffer: selectedFlightOffer.pricingAdditionalInfo,
            travelers: travelers.map((traveler, index) => ({
                // console.log('travlr phone: ', traveler.phoneNumber)
                id: index + 1,
                firstName: traveler.firstName,
                lastName: traveler.lastName,
                dateOfBirth: traveler.dateOfBirth,
                gender: traveler.gender,
                email: traveler.email,
                phones: [
                    {
                        deviceType: 'MOBILE',
                        countryCalingCode: traveler.phoneNumber.countryCallingCode,
                        number: traveler.phoneNumber.number
                    }
                ],
                documents: [ {...traveler.document, holder: true} ]
            }))
        }
        console.log(bookingData)
        const response = await axiosInstance.post("/booking/flight-order", bookingData);
        console.log(response);
    }

    const genderOptions = ["MALE", "FEMALE", "OTHER"];
    return (
        <>
            <Grid container spacing={2}>
                <Grid item size={{xs:12, md:8}}>
                    <Box component="form" onSubmit={handleSubmit}>
                        {
                            travelers.map((traveler, index) => (
                                <TravelerForm 
                                    key={index}
                                    traveler={traveler} 
                                    index={index} 
                                    handleTravelerChange={handleTravelerChange} 
                                    genderOptions={genderOptions}
                                    documentTypes={documentTypes}
                                />
                            ))
                        }
                    </Box>
                </Grid>
                <Grid item size={{xs:12, md:4}}>
                    <FlightOrderSummary />
                </Grid>
            </Grid>
        </>
    );
}

export default BookingPage;