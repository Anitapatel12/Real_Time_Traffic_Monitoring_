import React, { useEffect, useRef } from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';

function TrafficChart({ data, city }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && data) {
      // Simple animated bars using CSS
      const bars = chartRef.current.querySelectorAll('.chart-bar');
      bars.forEach((bar, index) => {
        const height = data.hourlyTraffic[index] || 0;
        bar.style.height = `${height}%`;
      });
    }
  }, [data]);

  const hours = ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'];
  const currentHour = new Date().getHours();
  const currentIndex = hours.findIndex((_, i) => (i * 3 + 6) <= currentHour && currentHour < ((i + 1) * 3 + 6));

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <BarChart3 className="w-6 h-6 text-blue-400" />
          <div>
            <h3 className="text-lg font-semibold text-white">Traffic Flow Analysis</h3>
            <p className="text-sm text-slate-400">Real-time congestion patterns - {city}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-green-400">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-medium">Live Data</span>
        </div>
      </div>

      <div ref={chartRef} className="relative h-64">
        <div className="absolute inset-0 flex items-end justify-between space-x-2 px-4">
          {hours.map((hour, index) => (
            <div key={hour} className="flex-1 flex flex-col items-center">
              <div className="w-full bg-slate-700/30 rounded-t-lg relative overflow-hidden">
                <div 
                  className={`chart-bar w-full rounded-t-lg transition-all duration-1000 ease-out ${
                    index === currentIndex 
                      ? 'bg-gradient-to-t from-blue-600 to-blue-400' 
                      : 'bg-gradient-to-t from-slate-600 to-slate-500'
                  }`}
                  style={{ 
                    height: '0%',
                    minHeight: '4px'
                  }}
                ></div>
              </div>
              <p className={`text-xs mt-2 ${index === currentIndex ? 'text-blue-400 font-medium' : 'text-slate-400'}`}>
                {hour}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            <span className="text-slate-400">Current Hour</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-slate-500 rounded-full"></div>
            <span className="text-slate-400">Historical</span>
          </div>
        </div>
        <span className="text-slate-400">Updated {new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  );
}

export default TrafficChart;