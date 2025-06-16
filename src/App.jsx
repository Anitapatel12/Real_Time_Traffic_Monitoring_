import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Dashboard from './components/Dashboard.jsx';
import { generateTrafficData } from './utils/dataGenerator.js';

function App() {
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [trafficData, setTrafficData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Simulate WebSocket connection for real-time data streaming
    setIsConnected(true);
    
    const simulateDataStream = () => {
      const data = generateTrafficData(selectedCity);
      setTrafficData(data);
    };

    // Initial data load
    simulateDataStream();

    // Simulate real-time updates every 3 seconds
    const interval = setInterval(simulateDataStream, 3000);

    return () => {
      clearInterval(interval);
      setIsConnected(false);
    };
  }, [selectedCity]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header 
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
        isConnected={isConnected}
      />
      <Dashboard 
        city={selectedCity}
        data={trafficData}
        isConnected={isConnected}
      />
    </div>
  );
}

export default App;