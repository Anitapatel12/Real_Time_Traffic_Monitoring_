import React, { useState } from 'react';
import { Search, Radio, Activity, Database } from 'lucide-react';

const INDIAN_CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 
  'Pune', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur',
  'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad'
];

function Header({ selectedCity, onCityChange, isConnected }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredCities = INDIAN_CITIES.filter(city =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCitySelect = (city) => {
    onCityChange(city);
    setSearchQuery('');
    setShowSuggestions(false);
  };

  return (
    <header className="bg-slate-800/50 backdrop-blur-lg border-b border-slate-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Activity className="w-8 h-8 text-blue-400" />
              <div>
                <h1 className="text-xl font-bold text-white">Traffic Analytics</h1>
                <p className="text-xs text-slate-400">Real-time Big Data Monitoring</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {/* City Search */}
            <div className="relative">
              <div className="flex items-center space-x-2 bg-slate-700/50 rounded-lg px-3 py-2">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search Indian cities..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(e.target.value.length > 0);
                  }}
                  onFocus={() => setShowSuggestions(searchQuery.length > 0)}
                  className="bg-transparent text-white placeholder-slate-400 text-sm w-48 focus:outline-none"
                />
              </div>
              
              {showSuggestions && (
                <div className="absolute top-full mt-1 w-full bg-slate-800 border border-slate-600 rounded-lg shadow-xl max-h-60 overflow-y-auto z-50">
                  {filteredCities.map((city) => (
                    <button
                      key={city}
                      onClick={() => handleCitySelect(city)}
                      className="w-full text-left px-3 py-2 text-sm text-white hover:bg-slate-700 transition-colors"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Current City Display */}
            <div className="text-right">
              <p className="text-sm text-slate-400">Monitoring</p>
              <p className="text-lg font-semibold text-white">{selectedCity}</p>
            </div>

            {/* Connection Status */}
            <div className="flex items-center space-x-2">
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${
                isConnected 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>
                <Radio className={`w-3 h-3 ${isConnected ? 'animate-pulse' : ''}`} />
                <span>{isConnected ? 'Live Stream' : 'Disconnected'}</span>
              </div>
              <Database className="w-5 h-5 text-slate-400" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;