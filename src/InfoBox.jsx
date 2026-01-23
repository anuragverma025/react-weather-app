import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import "./InfoBox.css";

// 1. IMPORT THE ICONS
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

export default function InfoBox({ Info }) {
    const INIT_URL = "https://images.unsplash.com/photo-1641970304222-b2b332808a4b?w=1000&auto=format&fit=crop&q=60";
    let COLD_URL = "https://images.unsplash.com/photo-1768063938501-07636b7286ba?w=1000&auto=format&fit=crop&q=60";
    let HOT_URL = "https://plus.unsplash.com/premium_photo-1688431299771-500da5863e91?w=1000&auto=format&fit=crop&q=60";
    let RAIN_URL = "https://media.istockphoto.com/id/1321878632/photo/cloudy-sky-over-beautiful-flood-plain-landscape.webp?a=1&b=1&s=612x612&w=0&k=20&c=IEX0DCeEeWnkakFc1jQxI0oujXoMcU-AD38SP3g08R0=";

    return (
        <div className="InfoBox">
            <div className='cardContainer'>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        sx={{ height: 140 }}
                        image={
                            Info.humidity > 80 
                                ? RAIN_URL 
                                : Info.temp > 15 
                                ? HOT_URL 
                                : COLD_URL
                        }
                        title="weather image"/>                   
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {/* 2. ADD ICON LOGIC HERE */}
                            {Info.city} {
                                Info.humidity > 80 
                                    ? <ThunderstormIcon/> 
                                    : Info.temp > 15 
                                    ? <WbSunnyIcon/> 
                                    : <AcUnitIcon/>
                            }
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }} component={"span"}>
                            <p><b>Temperature:</b> {Info.temp}&deg;C</p>
                            <p>Humidity = {Info.humidity}</p>
                            <p>Min Temp = {Info.tempMin}&deg;C</p>
                            <p>Max Temp = {Info.tempMax}&deg;C</p>
                            <p>The weather can be described as <i>{Info.weather}</i> and feels like {Info.feelslike}&deg;C</p>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}