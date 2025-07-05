import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppContextProvider = ({children}) => {
    const [searchParams, setSearchParams] = useState({
            from: "",
            to: "",
            flightClass: "",
            departureDate: null,
            returnDate: null,
            adults: 1,
            children: 0,
            infants: 0
        });
    
        const flightClasses = ["Economy", "Premium_Economy", "Business", "First"];

    const [fromLoading, setFromLoading] = useState(false)
    const [fromInput, setFromInput] = useState("");
    const [fromSuggestions, setFromSuggestions] = useState([]);
    
    const [toLoading, setToLoading] = useState(false)
    const [toInput, setToInput] = useState("");
    const [toSuggestions, setToSuggestions] = useState([]);
    
    const [flightOffers, setFlightOffers] = useState([]);

    return (
        <AppContext.Provider value={{
            searchParams, 
            setSearchParams, 
            flightClasses,
            fromLoading, setFromLoading, fromInput, setFromInput, fromSuggestions, setFromSuggestions, 
            toLoading, setToLoading, toInput, setToInput, toSuggestions, setToSuggestions, 
            flightOffers, setFlightOffers
        }}>
            {children}
        </AppContext.Provider>
    )
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if(!context) {
        throw new Error("useAppContext must be used within an AppContextProvider");
    }
    return context;
}