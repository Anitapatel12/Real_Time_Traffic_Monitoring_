import React from 'react';
import { Activity, Wifi, CheckCircle } from 'lucide-react';

function LiveStatus({ data, isConnected }) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Activity className="w-6 h-6 text-green-400" />
        <div>
          <h3 className="text-lg font-semibold text-white">System Status</h3>
          <p className="text-sm text-slate-400">Live monitoring</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Connection Status */}
        <div className={`flex items-center justify-between p-3 rounded-lg ${
          isConnected ? 'bg-green-500/20' : 'bg-red-500/20'
        }`}>
          <div className="flex items-center space-x-3">
            <Wifi className={`w-5 h-5 ${isConnected ? 'text-green-400' : 'text-red-400'}`} />
            <span className="text-white font-medium">Data Stream</span>
          </div>
          <div className={`flex items-center space-x-2 ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
            <span className="text-sm font-medium">{isConnected ? 'Live' : 'Offline'}</span>
          </div>
        </div>

        {/* Data Quality */}
        <div className="bg-slate-700/30 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Data Quality</span>
            <CheckCircle className="w-4 h-4 text-green-400" />
          </div>
          <div className="w-full bg-slate-600 rounded-full h-2">
            <div className="bg-green-400 h-2 rounded-full w-[95%]"></div>
          </div>
          <span className="text-xs text-green-400 mt-1 block">95% Accuracy</span>
        </div>

        {/* Processing Stats */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-sm">Active Zones</span>
            <span className="text-white font-semibold">{data.activeZones}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-sm">Data Points/sec</span>
            <span className="text-white font-semibold">{Math.floor(Math.random() * 500 + 200)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-sm">Last Update</span>
            <span className="text-white font-semibold">{new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveStatus;