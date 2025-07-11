import { Autocomplete, Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

function TravelerForm({traveler, index, handleTravelerChange, genderOptions, documentTypes}) {
    return (
        <Box key={index} sx={{ mb: 4, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Traveler {index + 1}
            </Typography>
            <Grid container spacing={2}>
                <Grid item size={{xs: 12, sm: 6, md: 6}}>
                    <TextField
                        fullWidth
                        type="text"
                        label="First Name"
                        value={traveler.firstName}
                        onChange={handleTravelerChange(index, "firstName")}
                    />
                </Grid>
                
                <Grid item size={{xs: 12, sm: 6, md: 6}}>
                    <TextField
                        fullWidth
                        type="text"
                        label="Last Name"
                        value={traveler.lastName}
                        onChange={handleTravelerChange(index, "lastName")}
                    />
                </Grid>
                
                <Grid item size={{xs: 12, sm: 6, md: 6}}>
                    <DatePicker
                        sx={{ width: "100%" }}
                        label="Date of Birth"
                        value={traveler.dateOfBirth ? new Date(traveler.dateOfBirth) : null}
                        onChange={(date) => handleTravelerChange(index, "dateOfBirth")(date)}
                        renderInput={(params) => <TextField fullWidth {...params} />}
                    />
                </Grid>
            
                <Grid item size={{xs: 12, sm: 6, md: 6}}>
                    <TextField
                        fullWidth
                        type="email"
                        label="Email"
                        value={traveler.email}
                        onChange={handleTravelerChange(index, "email")}
                    />
                </Grid>

                <Grid item size={{xs: 12, sm: 6, md: 6}}>
                    <Box display="flex" gap={1} alignItems="center">
                    {/* <Grid container spacing={2} alignItems="center">
                        <Grid item size={{xs: 12, md: 3}}> */}
                            <Autocomplete
                                sx={{ width: "100%" }}
                                freeSolo 
                                options={["+91", "+1"]}
                                value={traveler.phoneNumber.countryCallingCode || ""}
                                onChange={(e, newVal) => handleTravelerChange(index, "phoneNumber.countryCallingCode")(e, newVal)}
                                getOptionLabel={option => String(option)}
                                renderInput={(params) => <TextField 
                                    {...params}
                                    label="Country Code"
                                    variant="outlined"
                                    fullWidth
                                    sx={{width: "120px"}}
                                    slotProps={{
                                        input: {
                                            ...params.InputProps,
                                            maxLength: 4,
                                            inputMode: "tel"
                                        }
                                    }}
                                />}
                                disableClearable
                                forcePopupIcon
                                fullWidth={true}
                            />
                            <TextField
                                fullWidth
                                sx={{ width: "100%" }}
                                type="tel"
                                label="Phone Number"
                                value={traveler.phoneNumber.number}
                                onChange={(e) => handleTravelerChange(index, "phoneNumber.number")(e, e.target.value)}
                                mr={2}
                            />
                        {/* </Grid>
                    </Grid> */}
                    </Box>
                </Grid>

                <Grid item size={{xs: 12, sm: 6, md: 6}}>
                    <FormControl fullWidth sx={{ width: "100%"}}>
                        <InputLabel id="gender">Gender</InputLabel>
                        <Select
                            value={traveler.gender}
                            labelId="gender-label"
                            id="gender-select"
                            label="Gender"
                            onChange={handleTravelerChange(index, "gender")}
                            fullWidth
                            sx={{  width: "150px"}}
                        >
                        {genderOptions.map((gender) => (
                            <MenuItem key={gender} value={gender}>
                            {gender}
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                </Grid>

                {/* <Typography variant="h6" gutterBottom>Documents</Typography> */}
                <Grid item size={{xs: 12, sm: 6, md: 6}}>
                    <FormControl fullWidth>
                        <InputLabel id="document-type">Document Type</InputLabel>
                        <Select
                            value={traveler.document.documentType}
                            labelId="document-type-label"
                            id="document-type-select"
                            label="Document Type"
                            onChange={handleTravelerChange(index, "document.documentType")}
                            fullWidth
                            sx={{  width: "150px" }}
                        >
                        {documentTypes.map((dt) => (
                            <MenuItem key={dt} value={dt}>
                            {dt}
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                </Grid>
                
                <Grid item size={{xs: 12, sm: 6, md: 6}}>
                    <TextField
                        fullWidth
                        type="text"
                        label="Birth Place"
                        value={traveler.document.birthPlace}
                        onChange={handleTravelerChange(index, "document.birthPlace")}
                    />
                </Grid>
                
                <Grid item size={{xs: 12, sm: 6, md: 6}}>
                    <TextField
                        fullWidth
                        type="text"
                        label="Issuance Location"
                        value={traveler.document.issuanceLocation}
                        onChange={handleTravelerChange(index, "document.issuanceLocation")}
                    />
                </Grid>

                <Grid item size={{xs: 12, sm: 6, md: 6}}>
                    <TextField
                        fullWidth
                        type="text"
                        placeholder="country ISO code (IN, US, etc.)"
                        label="Issuance Country"
                        value={traveler.document.issuanceCountry}
                        onChange={handleTravelerChange(index, "document.issuanceCountry")}
                    />
                </Grid>

                <Grid item size={{xs: 12, sm: 6, md: 6}}>
                    <TextField
                        fullWidth
                        type="text"
                        label="ID Number"
                        value={traveler.document.number}
                        onChange={handleTravelerChange(index, "document.number")}
                    />
                </Grid>
                
                <Grid item size={{xs: 12, sm: 6, md: 6}}>
                    <DatePicker
                        sx={{ width: "100%" }}
                        label="Issuance Date"
                        value={traveler.document.issuanceDate ? new Date(traveler.document.issuanceDate) : null}
                        onChange={(date) => handleTravelerChange(index, "document.issuanceDate")(date)}
                        renderInput={(params) => <TextField fullWidth {...params} />}
                    />
                </Grid>
                
                <Grid item size={{xs: 12, sm: 6, md: 6}}>
                    <DatePicker
                        sx={{ width: "100%" }}
                        label="Expiry Date"
                        value={traveler.document.expiryDate ? new Date(traveler.document.expiryDate) : null}
                        onChange={(date) => handleTravelerChange(index, "document.expiryDate")(date)}
                        renderInput={(params) => <TextField fullWidth {...params} />}
                    />
                </Grid>

                <Grid item size={{xs: 12, sm: 6, md: 6}}>
                    <TextField
                        fullWidth
                        type="text"
                        placeholder="country ISO code (IN, US, etc.)"
                        label="Validity Country"
                        value={traveler.document.validityCountry}
                        onChange={handleTravelerChange(index, "document.validityCountry")}
                    />
                </Grid>

                <Grid item size={{xs: 12, sm: 6, md: 6}}>
                    <TextField
                        fullWidth
                        type="text"
                        placeholder="country ISO code (IN, US, etc.)"
                        label="Nationality"
                        value={traveler.document.nationality}
                        onChange={handleTravelerChange(index, "document.nationality")}
                    />
                </Grid>
            
                {/* <Grid item size={{xs: 12, sm: 6, md: 6}}>
                    <Typography>Are you the holder of this document?</Typography>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={traveler.document.holder}
                                onChange={handleTravelerChange(index, "document.holder")}
                            />
                        }
                        label="Yes"
                    />
                </Grid> */}

                {/* <Grid item size={{xs: 12, sm: 6, md: 6}}>
                </Grid> */}
            </Grid>
            <Button sx={{ mt: 2 }} variant="contained" color="primary" type="submit">
                Create Booking
            </Button>
        </Box>
    )
}

export default TravelerForm;