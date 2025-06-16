import React from 'react';
import MetricsGrid from './MetricsGrid.jsx';
import TrafficChart from './TrafficChart.jsx';
import HotspotMap from './HotspotMap.jsx';
import LiveStatus from './LiveStatus.jsx';

function Dashboard({ city, data, isConnected }) {
  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading traffic data for {city}...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-6 space-y-6">
      {/* Metrics Overview */}
      <MetricsGrid data={data} isConnected={isConnected} />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Traffic Chart */}
        <div className="lg:col-span-3">
          <TrafficChart data={data} city={city} />
        </div>
        
        {/* Live Status */}
        <LiveStatus data={data} isConnected={isConnected} />
      </div>
      
      {/* Congestion Hotspots - Main Focus */}
      <HotspotMap data={data} city={city} />
    </main>
  );
}

export default Dashboard;