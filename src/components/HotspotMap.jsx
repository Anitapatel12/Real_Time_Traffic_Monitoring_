import React from 'react';
import { MapPin, AlertCircle, Navigation, Clock, Car, TrendingUp } from 'lucide-react';

function HotspotMap({ data, city }) {
  const hotspots = data.hotspots || [];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return {
        bg: 'bg-red-500/20 border-red-500/40',
        text: 'text-red-400',
        icon: 'text-red-400',
        pulse: 'bg-red-400'
      };
      case 'Medium': return {
        bg: 'bg-yellow-500/20 border-yellow-500/40',
        text: 'text-yellow-400',
        icon: 'text-yellow-400',
        pulse: 'bg-yellow-400'
      };
      default: return {
        bg: 'bg-green-500/20 border-green-500/40',
        text: 'text-green-400',
        icon: 'text-green-400',
        pulse: 'bg-green-400'
      };
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-red-500/20 rounded-xl">
            <Navigation className="w-8 h-8 text-red-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Live Congestion Monitor</h2>
            <p className="text-slate-400 text-lg">Real-time traffic hotspots in {city}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
            <span className="text-red-400 font-semibold text-lg">{hotspots.length} Active Alerts</span>
          </div>
          <p className="text-slate-400 text-sm">Updated {new Date().toLocaleTimeString()}</p>
        </div>
      </div>

      {hotspots.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {hotspots.map((hotspot, index) => {
            const colors = getSeverityColor(hotspot.severity);
            return (
              <div key={index} className={`${colors.bg} border-2 ${colors.bg.split(' ')[1]} rounded-2xl p-6 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-slate-800/50`}>
                      <MapPin className={`w-6 h-6 ${colors.icon}`} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">{hotspot.location}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className={`w-2 h-2 rounded-full ${colors.pulse} animate-pulse`}></div>
                        <span className={`text-sm font-medium ${colors.text}`}>{hotspot.severity} Congestion</span>
                      </div>
                    </div>
                  </div>
                  <AlertCircle className={`w-6 h-6 ${colors.icon} animate-pulse`} />
                </div>
                
                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-800/30 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className="text-xs text-slate-400 uppercase tracking-wide">Delay Time</span>
                    </div>
                    <p className="text-white font-bold text-lg">{hotspot.delayTime}</p>
                  </div>
                  <div className="bg-slate-800/30 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Car className="w-4 h-4 text-slate-400" />
                      <span className="text-xs text-slate-400 uppercase tracking-wide">Volume</span>
                    </div>
                    <p className="text-white font-bold text-lg">{hotspot.volume}</p>
                  </div>
                </div>
                
                {/* Reason */}
                <div className="bg-slate-800/30 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-slate-400" />
                    <span className="text-xs text-slate-400 uppercase tracking-wide">Cause</span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{hotspot.reason}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="bg-green-500/20 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <Navigation className="w-12 h-12 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">All Clear!</h3>
          <p className="text-slate-400 text-lg">No active congestion hotspots detected in {city}</p>
          <p className="text-slate-500 mt-2">Traffic is flowing smoothly across all monitored zones</p>
        </div>
      )}
    </div>
  );
}

export default HotspotMap;