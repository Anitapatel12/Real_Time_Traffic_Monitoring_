import React from 'react';
import { Gauge, MapPin, AlertTriangle, TrendingUp, Clock, Users } from 'lucide-react';

function MetricsGrid({ data, isConnected }) {
  const metrics = [
    {
      title: 'Average Speed',
      value: `${data.avgSpeed} km/h`,
      change: data.speedChange,
      icon: Gauge,
      color: data.avgSpeed > 40 ? 'text-green-400' : data.avgSpeed > 20 ? 'text-yellow-400' : 'text-red-400',
      bgColor: data.avgSpeed > 40 ? 'bg-green-500/10 border-green-500/20' : data.avgSpeed > 20 ? 'bg-yellow-500/10 border-yellow-500/20' : 'bg-red-500/10 border-red-500/20'
    },
    {
      title: 'Congestion Level',
      value: data.congestionLevel,
      change: data.congestionChange,
      icon: AlertTriangle,
      color: data.congestionLevel === 'Low' ? 'text-green-400' : data.congestionLevel === 'Medium' ? 'text-yellow-400' : 'text-red-400',
      bgColor: data.congestionLevel === 'Low' ? 'bg-green-500/10 border-green-500/20' : data.congestionLevel === 'Medium' ? 'bg-yellow-500/10 border-yellow-500/20' : 'bg-red-500/10 border-red-500/20'
    },
    {
      title: 'Active Zones',
      value: data.activeZones,
      change: '+12%',
      icon: MapPin,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10 border-blue-500/20'
    },
    {
      title: 'Traffic Density',
      value: `${data.trafficDensity}/km²`,
      change: data.densityChange,
      icon: Users,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10 border-purple-500/20'
    },
    {
      title: 'Avg Journey Time',
      value: `${data.avgJourneyTime} min`,
      change: data.journeyTimeChange,
      icon: Clock,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10 border-orange-500/20'
    },
    {
      title: 'Peak Hour Impact',
      value: `${Math.floor(Math.random() * 40 + 20)}%`,
      change: '+8.3%',
      icon: TrendingUp,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10 border-cyan-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {metrics.map((metric, index) => (
        <div key={index} className={`${metric.bgColor} border backdrop-blur-sm rounded-xl p-5 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}>
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl bg-slate-800/30`}>
              <metric.icon className={`w-6 h-6 ${metric.color}`} />
            </div>
            {isConnected && (
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            )}
          </div>
          
          <div>
            <p className="text-sm text-slate-400 mb-2 font-medium">{metric.title}</p>
            <p className="text-2xl font-bold text-white mb-2">{metric.value}</p>
            <p className={`text-sm font-medium ${metric.change?.startsWith('+') ? 'text-green-400' : metric.change?.startsWith('-') ? 'text-red-400' : 'text-slate-400'}`}>
              {metric.change}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MetricsGrid;