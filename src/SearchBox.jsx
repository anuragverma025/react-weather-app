import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";

export default function SearchBox({ updateInfo }) {
    // --- ZONE 1: LOGIC STARTS HERE ---
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);

    const API_URL=import.meta.env.VITE_WEATHER_API_URL;
    const API_KEY=import.meta.env.VITE_WEATHER_API_KEY;

    let getWeatherInfo = async (cityVal) => {
        try {
            console.log("Checking Env Variables:");
            console.log("URL:", API_URL); 
            console.log("Key:", API_KEY);
            console.log("Full Link:", `${API_URL}weather?q=${cityVal}&appid=${API_KEY}&units=metric`);
            let response = await fetch(`${API_URL}weather?q=${cityVal}&appid=${API_KEY}&units=metric`);
            let jsonResponse = await response.json();

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
            throw error;
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
        } catch(err) {
            setError(true);
        }       
    };
    // --- ZONE 1 ENDS HERE ---

    // --- ZONE 2: UI (HTML) STARTS HERE ---
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