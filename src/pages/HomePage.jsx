import React, { useEffect, useState } from 'react'
import { Autocomplete, Box, Button, CircularProgress, FormControl, Grid, InputLabel, List, ListItem, ListItemText, MenuItem, Select, TextField, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers';
import axiosInstance from '../config/axiosConfig';
import LocationAutocomplete from '../components/LocationAutocomplete';
import { convertToQueryParams } from '../utils/helper';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const {
        searchParams, 
        setSearchParams,
        fromLoading,
        setFromLoading,
        fromInput,
        setFromInput,
        fromSuggestions,
        setFromSuggestions,
        toLoading,
        setToLoading,
        toInput,
        setToInput,
        toSuggestions,
        setToSuggestions,
        flightOffers,
        setFlightOffers,
        flightClasses
    } = useAppContext();
   
    const navigate = useNavigate();
    
    const [shouldSearchFrom, setShouldSearchFrom] = useState(false);
    const [shouldSearchTo, setShouldSearchTo] = useState(false);
    
    const handleChange = (field) => (event) => {
        setSearchParams({
            ...searchParams,
            [field]: event.target.value ?? event
        });
    }

    const handleFromInputChange = (event, newVal, reason) => {
        if(reason === "clear") {
            setShouldSearchFrom(false);
            setFromInput("");
            setFromSuggestions([]);
            return;
        }
        if(reason === 'input') {
            setShouldSearchFrom(true);
            setFromInput(newVal);
        } else {
            setShouldSearchFrom(false);
        }

        // if(reason === "selectOption") {
        //     setShouldSearch(false);
        // }
        if(newVal?.length === 0) {
            setFromSuggestions([]);
        }
    }
    
    const handleToInputChange = (event, newVal, reason) => {
        if(reason === "clear") {
            setShouldSearchTo(false);
            setToInput("");
            setToSuggestions([]);
            return;
        }
        if(reason === 'input') {
            setShouldSearchTo(true);
            setToInput(newVal);
        } else {
            setShouldSearchTo(false);
        }
        if(newVal.length === 0) {
            setToSuggestions([]);
        }
    }

    const fetchSuggestions = async (type, keyword) => {
        try {
            setFromLoading(true);
            const response = await axiosInstance.get(`/locations/search?keyword=${keyword}`);
            console.log(response);
            // setFromSuggestions(response.data.flatMap(loc => loc.groupData || []));
            const suggestions = response.data.flatMap(entry => {
                return entry.groupData.length > 0 ?  [entry, ...entry.groupData] : [entry];
            });
            
            // setFromSuggestions(suggestions);
            if(type === "from") setFromSuggestions(suggestions);
            
            if(type === "to") setToSuggestions(suggestions);
        } catch (error) {
            console.error(error);
        } finally {
            setFromLoading(false);
            setShouldSearchFrom(false);
            setShouldSearchTo(false);
        }
    }

    const handleLocationChange = (location, type) => {
        setSearchParams({
            ...searchParams,
            [type]: location.iata
        });
        if(type === "from") setFromInput(location.name + " " + location.iata);
        if(type === "to") setToInput(location.name + " " + location.iata);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(searchParams);
        const fromDate = searchParams.departureDate.split("T")[0];
        const amadeusData = {
            originLocationCode: searchParams.from,
            destinationLocationCode: searchParams.to,
            departureDate: fromDate,
            adults: searchParams.adults,
            children: searchParams.children,
            infants: searchParams.infants,
            travelClass: searchParams.flightClass.toUpperCase(),
            currencyCode: "USD",
            max: 20
        }
        if(searchParams.returnDate) {
            amadeusData.returnDate = searchParams.returnDate.split("T")[0];
        }
        const queryParams = convertToQueryParams(amadeusData);
        // console.log(queryParams)
        try {
            const response = await axiosInstance.get(`/flights/search?${queryParams}`);
            console.log(response);
            if(response.status === 200) {
                setFlightOffers(response.data);
                // localStorage.setItem("flightOffers", JSON.stringify(response.data));
                setTimeout(() => {
                    navigate("/offers");
                }, 500);
            }
        } catch (error) {
            console.error('error while  fetching  offers', error);
        }
    }

    useEffect(() => {
        if(!shouldSearchFrom || fromInput.length < 3) return;
        const timeout = setTimeout(() => {
            fetchSuggestions("from", fromInput)
        }, 500);

        return () => clearTimeout(timeout);
    }, [fromInput, shouldSearchFrom]);

    useEffect(() => {
        if(!shouldSearchTo || toInput.length < 3) return;

        const timeout = setTimeout(() => {
            fetchSuggestions("to", toInput)
        }, 500);

        return () => clearTimeout(timeout);
    }, [toInput, shouldSearchTo]);

    return (
        <Box>
            <Button onClick={()=>console.log(searchParams)}>formDta</Button>
            <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                        <LocationAutocomplete 
                            options={fromSuggestions}
                            onChange={(e, newVal) => newVal && handleLocationChange(newVal, "from")}
                            onInputChange={handleFromInputChange}
                            inputValue={fromInput}
                            value={fromSuggestions.find(option => 
                                option.iata === searchParams.from) || null}
                            loading={fromLoading}
                            inputLabel={"From"}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <LocationAutocomplete 
                            options={toSuggestions}
                            onChange={(e, newVal) => newVal && handleLocationChange(newVal, "to")}
                            onInputChange={handleToInputChange}
                            inputValue={toInput}
                            value={toSuggestions.find(option => 
                                option.iata === searchParams.to) || null}
                            loading={toLoading}
                            inputLabel={"To"}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Passengers"
                            inputProps={{ min: 1 }}
                            value={searchParams.passengers}
                            onChange={handleChange("passengers")}
                        />
                        </Grid>

                    <Grid item xs={12} sm={6} md={4} sx={{ }}>
                        <FormControl fullWidth>
                            <InputLabel id="flight-class-label">Flight Class</InputLabel>
                            <Select
                                value={searchParams.flightClass}
                                labelId="flight-class-label"
                                id="flight-class-select"
                                label="Flight Class"
                                onChange={handleChange("flightClass")}
                                fullWidth
                                sx={{  width: "150px"}}
                            >
                            {flightClasses.map((fc) => (
                                <MenuItem key={fc} value={fc}>
                                {fc}
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <DatePicker
                            label="Departure Date"
                            value={searchParams.departureDate ? new Date(searchParams.departureDate) : null}
                            onChange={(date) => handleChange("departureDate")({ target: { value: date.toISOString() } })}
                            renderInput={(params) => <TextField fullWidth {...params} />}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <DatePicker
                            label="Return Date"
                            value={searchParams.returnDate ? new Date(searchParams.returnDate) : null}
                            onChange={(date) => handleChange("returnDate")({ target: { value: date.toISOString() } })}
                            renderInput={(params) => <TextField fullWidth {...params} />}
                        />
                    </Grid>

                    <Grid item xs={12} >
                        <Button variant="contained" color="primary" type="submit">
                            Search Flights
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default HomePage;