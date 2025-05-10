import React, { useState } from 'react';
import '../styles/weather.css';

const API_KEY = '1d761fc5cf82490ba7a181125250905';
const API_URL = `https://api.weatherapi.com/v1/current.json`;

function Weather() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [bgClass, setBgClass] = useState('default-bg');

    const fetchWeather = async (city) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}?key=${API_KEY}&q=${city}`);
            if (!response.ok) {
                throw new Error('City not found');
            }
            const data = await response.json();
            setWeather(data);
            setCity(data.location.name);
            updateBackground(data.current.condition.text);
        } catch (error) {
            setError(error.message);
            setBgClass('default-bg');
        } finally {
            setLoading(false);
        }
    };

    const fetchWeatherByCoords = async (lat, lon) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}?key=${API_KEY}&q=${lat},${lon}`);
            if (!response.ok) {
                throw new Error('Location not found');
            }
            const data = await response.json();
            setWeather(data);
            setCity(data.location.name);
            updateBackground(data.current.condition.text);
        } catch (error) {
            setError(error.message);
            setBgClass('default-bg');
        } finally {
            setLoading(false);
        }
    };

    const handleGeolocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetchWeatherByCoords(
                        position.coords.latitude,
                        position.coords.longitude
                    );
                },
                (err) => {
                    setError('Geolocation error: ' + err.message);
                }
            );
        } else {
            setError('Geolocation is not supported by your browser');
        }
    };

    const updateBackground = (condition) => {
        const conditionLower = condition.toLowerCase();
        if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
            setBgClass('sunny-bg');
        } else if (conditionLower.includes('cloud')) {
            setBgClass('cloudy-bg');
        } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
            setBgClass('rainy-bg');
        } else if (conditionLower.includes('snow') || conditionLower.includes('ice')) {
            setBgClass('snowy-bg');
        } else if (conditionLower.includes('thunder') || conditionLower.includes('storm')) {
            setBgClass('stormy-bg');
        } else {
            setBgClass('default-bg');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) {
            fetchWeather(city);
        }
    };

    return (
        <div className={`weather-app ${bgClass}`}>
            <div className="weather-glass">
                <div className="weather-container">
                    <h1 className="app-title">WeatherSphere</h1>
                    
                    <div className="search-container">
                        <form onSubmit={handleSubmit} className="search-form">
                            <div className="input-group">
                                <input
                                    type="text"
                                    value={city}
                                    placeholder="Enter city name"
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                    className="city-input"
                                />
                                <button type="submit" disabled={loading} className="search-btn">
                                    {loading ? (
                                        <span className="loader"></span>
                                    ) : (
                                        <i className="fas fa-search"></i>
                                    )}
                                </button>
                            </div>
                        </form>

                        <div className="divider">or</div>

                        <button 
                            onClick={handleGeolocation} 
                            className="geo-btn"
                            disabled={loading}
                        >
                            <i className="fas fa-location-arrow"></i>
                            Use My Location
                        </button>
                    </div>

                    {loading && (
                        <div className="weather-loading">
                            <div className="weather-icon loading"></div>
                            <p>Fetching weather data...</p>
                        </div>
                    )}

                    {error && (
                        <div className="weather-error">
                            <i className="fas fa-exclamation-triangle"></i>
                            <p>{error}</p>
                        </div>
                    )}

                    {weather && (
                        <div className="weather-card">
                            <div className="location">
                                <h2>
                                    {weather.location.name}, {weather.location.country}
                                    <span className="local-time">{weather.location.localtime.split(' ')[1]}</span>
                                </h2>
                            </div>

                            <div className="weather-main">
                                <div className="temperature">
                                    <span className="temp-value">{weather.current.temp_c}</span>
                                    <span className="temp-unit">°C</span>
                                </div>
                                <div className="weather-condition">
                                    <img 
                                        src={weather.current.condition.icon} 
                                        alt={weather.current.condition.text} 
                                        className="weather-icon"
                                    />
                                    <p>{weather.current.condition.text}</p>
                                </div>
                            </div>

                            <div className="weather-details">
                                <div className="detail-item">
                                    <i className="fas fa-wind"></i>
                                    <span>{weather.current.wind_kph} km/h</span>
                                </div>
                                <div className="detail-item">
                                    <i className="fas fa-tint"></i>
                                    <span>{weather.current.humidity}%</span>
                                </div>
                                <div className="detail-item">
                                    <i className="fas fa-compress-alt"></i>
                                    <span>{weather.current.pressure_mb} hPa</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Weather;