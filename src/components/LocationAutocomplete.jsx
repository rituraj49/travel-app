import { Autocomplete, CircularProgress } from "@mui/material";
import { TextField } from "@mui/material";

function LocationAutocomplete({
    options,
    onChange,
    onInputChange,
    inputValue,
    value,
    loading,
    inputLabel
}) {
    return (
         <Autocomplete
            fullWidth
            freeSolo
            sx={{width:"200px"}}
            options={options}
            // groupBy={(option) => <Typography variant="subtitle1">{option.city}</Typography>}
            getOptionLabel={(option) => 
                !option ? "" 
                : typeof option === "string" ? option 
                : `${option?.name} ${option?.iata}`
            }
            filterOptions={(x) => x}
            inputValue={inputValue}
            onInputChange={onInputChange}
            onChange={onChange}
            value={value}
            // renderOption={(props, option) => (
            //     <li {...props} key={option.iata}>
            //         {option.name} ({option.iata})  {`${option.city && `- ${option.city}`}`}, {option.countryCode}
            //     </li>
            //     )}
            renderOption={(props, option) => (
                // <li {...props}>
                //   {option.name} ({option.iata}) - {option.city}, {option.countryCode}
                // </li>
                <li {...props} style={{ 
                        paddingLeft: option.groupData ? '8px' : '32px',
                        fontWeight: (option.subType === "CITY" || option.groupData && option.groupData.length > 0) ? 'bold' : 'normal'
                    }}>
                    {option.name} ({option.iata}) {option?.city && `- ${option.city}`}, {option.countryCode}
                </li>
            )}
            renderInput={(params) => (
                <TextField {...params} 
                    label={inputLabel}
                    required
                    slotProps={{
                        input: {
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                {loading ? <CircularProgress size={20} /> : null}
                                {params.InputProps.endAdornment}
                                </>
                            ),
                        }
                    }}         
                />
            )}
        />
    );
}

export default LocationAutocomplete;