const INDIAN_CITY_DATA = {
  Mumbai: {
    zones: ['Bandra-Kurla Complex', 'Lower Parel', 'Andheri East', 'Powai', 'Worli'],
    population: 12442373,
    area: 603.4
  },
  Delhi: {
    zones: ['Connaught Place', 'Karol Bagh', 'Lajpat Nagar', 'Dwarka', 'Gurgaon'],
    population: 11007835,
    area: 1484
  },
  Bangalore: {
    zones: ['Electronic City', 'Whitefield', 'Koramangala', 'Indiranagar', 'MG Road'],
    population: 8443675,
    area: 741
  },
  Hyderabad: {
    zones: ['HITEC City', 'Banjara Hills', 'Secunderabad', 'Gachibowli', 'Jubilee Hills'],
    population: 6809970,
    area: 650
  },
  Chennai: {
    zones: ['T. Nagar', 'Anna Nagar', 'Velachery', 'OMR', 'Adyar'],
    population: 4681087,
    area: 426
  },
  Kolkata: {
    zones: ['Park Street', 'Salt Lake', 'Howrah', 'Ballygunge', 'New Town'],
    population: 4496694,
    area: 205
  },
  Pune: {
    zones: ['Hinjewadi', 'Koregaon Park', 'Baner', 'Wakad', 'Viman Nagar'],
    population: 3124458,
    area: 331.26
  },
  Ahmedabad: {
    zones: ['Satellite', 'Navrangpura', 'Vastrapur', 'Bopal', 'SG Highway'],
    population: 5633927,
    area: 464
  }
};

export function generateTrafficData(city) {
  const cityData = INDIAN_CITY_DATA[city] || INDIAN_CITY_DATA.Mumbai;
  const currentHour = new Date().getHours();
  
  // Peak hours logic for Indian cities
  const isPeakHour = (currentHour >= 8 && currentHour <= 10) || (currentHour >= 18 && currentHour <= 21);
  const isLunchHour = currentHour >= 12 && currentHour <= 14;
  
  // Base traffic calculations
  const baseSpeed = isPeakHour ? 15 + Math.random() * 15 : isLunchHour ? 25 + Math.random() * 15 : 30 + Math.random() * 20;
  const congestionMultiplier = isPeakHour ? 2.5 : isLunchHour ? 1.5 : 1.0;
  
  // Generate hourly traffic data
  const hourlyTraffic = Array.from({ length: 6 }, (_, i) => {
    const hour = (i * 3 + 6) % 24;
    const isCurrentPeak = (hour >= 8 && hour <= 10) || (hour >= 18 && hour <= 21);
    return isCurrentPeak ? 70 + Math.random() * 30 : 20 + Math.random() * 40;
  });

  // Generate hotspots
  const hotspots = [];
  if (isPeakHour || Math.random() > 0.7) {
    const numHotspots = Math.floor(Math.random() * 4) + 1;
    for (let i = 0; i < numHotspots; i++) {
      const zone = cityData.zones[Math.floor(Math.random() * cityData.zones.length)];
      const severity = Math.random() > 0.6 ? 'High' : Math.random() > 0.3 ? 'Medium' : 'Low';
      
      hotspots.push({
        location: zone,
        severity,
        delayTime: `${Math.floor(Math.random() * 25) + 5} min`,
        volume: `${Math.floor(Math.random() * 500) + 200} vehicles/hr`,
        reason: getRandomReason()
      });
    }
  }

  return {
    avgSpeed: Math.round(baseSpeed),
    speedChange: `${Math.random() > 0.5 ? '+' : '-'}${(Math.random() * 10).toFixed(1)}%`,
    congestionLevel: baseSpeed > 35 ? 'Low' : baseSpeed > 20 ? 'Medium' : 'High',
    congestionChange: isPeakHour ? '+15%' : '-5%',
    activeZones: cityData.zones.length,
    trafficDensity: Math.round(cityData.population / cityData.area * congestionMultiplier),
    densityChange: `${Math.random() > 0.5 ? '+' : '-'}${(Math.random() * 20).toFixed(1)}%`,
    avgJourneyTime: Math.round(30 * congestionMultiplier + Math.random() * 15),
    journeyTimeChange: isPeakHour ? '+25%' : '-10%',
    dataThroughput: (Math.random() * 5 + 2).toFixed(1),
    hourlyTraffic,
    hotspots,
    lastUpdated: new Date().toISOString()
  };
}

function getRandomReason() {
  const reasons = [
    'Heavy monsoon rainfall causing waterlogging',
    'Road construction and metro work ongoing',
    'Festival celebration and street gathering',
    'Vehicle breakdown blocking major lane',
    'Traffic signal malfunction at junction',
    'School/office hours peak traffic',
    'Market area congestion during business hours',
    'Cricket match at nearby stadium'
  ];
  
  return reasons[Math.floor(Math.random() * reasons.length)];
}