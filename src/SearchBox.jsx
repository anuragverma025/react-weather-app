import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";

export default function SearchBox({ updateInfo }) {
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);

    const API_URL = import.meta.env.VITE_WEATHER_API_URL;
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

    let getWeatherInfo = async (cityVal) => {
        try {
            console.log("Checking Env Variables:");
            console.log("URL:", API_URL); 
            console.log("Key:", API_KEY);
            
            // Note: Ensure your .env URL ends with '/weather' for this to work!
            let response = await fetch(`${API_URL}?q=${cityVal}&appid=${API_KEY}&units=metric`);
            let jsonResponse = await response.json();

            // --- FIX #1: Manual Error Check ---
            // If the API returns a 404 (City not found), we must throw an error manually.
            if (!response.ok) {
                throw new Error(jsonResponse.message);
            }

            let result = {
                city: cityVal,
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelslike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description,
            };
            console.log(result);
            return result;
        } catch(err) {
            // --- FIX #2: Throw the actual 'err', not the state 'error' ---
            throw err;
        }
    };

    let handleChange = (event) => {
        setCity(event.target.value);
    };

    let handleSubmit = async (event) => {
        try {
            event.preventDefault();
            console.log(city);
            setCity("");
            let newInfo = await getWeatherInfo(city);
            updateInfo(newInfo);
            setError(false); // Clear any previous errors on success
        } catch(err) {
            console.log("THE REAL ERROR:", err);
            setError(true);
        }       
    };

    return (
        <div className='SearchBox'>
            <form onSubmit={handleSubmit}>
                <TextField 
                    id="city" 
                    label="City Name" 
                    variant="outlined" 
                    required 
                    value={city}
                    onChange={handleChange}
                />
                <br /><br />
                <Button variant="contained" type='submit'>
                    Search
                </Button>
                {error && <p style={{color: "red"}}>No such place exists!</p>}
            </form>
        </div>
    );
}