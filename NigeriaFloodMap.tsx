import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { AlertTriangle, Users, MapPin, TrendingUp, Clock } from "lucide-react";

// Nigerian states data with flood risk levels and population data
const nigerianStates = [
  { id: 'niger', name: 'Niger', population: 5556200, riskLevel: 'high', currentRisk: 85, alerts: 3, lat: 9.0817, lng: 6.7218 },
  { id: 'lagos', name: 'Lagos', population: 14862000, riskLevel: 'medium', currentRisk: 45, alerts: 1, lat: 6.5244, lng: 3.3792 },
  { id: 'kano', name: 'Kano', population: 13076892, riskLevel: 'low', currentRisk: 20, alerts: 0, lat: 11.9948, lng: 8.5272 },
  { id: 'kaduna', name: 'Kaduna', population: 8252366, riskLevel: 'medium', currentRisk: 55, alerts: 2, lat: 10.5105, lng: 7.4165 },
  { id: 'katsina', name: 'Katsina', population: 7831319, riskLevel: 'medium', currentRisk: 40, alerts: 1, lat: 12.9908, lng: 7.6018 },
  { id: 'oyo', name: 'Oyo', population: 7840864, riskLevel: 'low', currentRisk: 25, alerts: 0, lat: 8.0000, lng: 4.0000 },
  { id: 'rivers', name: 'Rivers', population: 7303924, riskLevel: 'high', currentRisk: 78, alerts: 4, lat: 4.8156, lng: 6.9778 },
  { id: 'bauchi', name: 'Bauchi', population: 6537314, riskLevel: 'medium', currentRisk: 50, alerts: 1, lat: 10.3158, lng: 9.8442 },
  { id: 'jigawa', name: 'Jigawa', population: 5838819, riskLevel: 'low', currentRisk: 30, alerts: 0, lat: 12.2200, lng: 9.3500 },
  { id: 'benue', name: 'Benue', population: 5741815, riskLevel: 'high', currentRisk: 72, alerts: 3, lat: 7.3333, lng: 8.7500 },
  { id: 'anambra', name: 'Anambra', population: 5527809, riskLevel: 'medium', currentRisk: 38, alerts: 1, lat: 6.2103, lng: 6.9810 },
  { id: 'borno', name: 'Borno', population: 5860183, riskLevel: 'low', currentRisk: 15, alerts: 0, lat: 11.8333, lng: 13.1500 },
  { id: 'delta', name: 'Delta', population: 5663362, riskLevel: 'high', currentRisk: 68, alerts: 2, lat: 5.8900, lng: 5.6800 },
  { id: 'imo', name: 'Imo', population: 5408756, riskLevel: 'medium', currentRisk: 42, alerts: 1, lat: 5.5720, lng: 7.0588 },
  { id: 'akwa-ibom', name: 'Akwa Ibom', population: 5482177, riskLevel: 'high', currentRisk: 65, alerts: 2, lat: 5.0077, lng: 7.8536 },
  { id: 'ogun', name: 'Ogun', population: 5217716, riskLevel: 'medium', currentRisk: 35, alerts: 1, lat: 7.1608, lng: 3.3500 },
  { id: 'kebbi', name: 'Kebbi', population: 4440052, riskLevel: 'medium', currentRisk: 45, alerts: 2, lat: 12.4500, lng: 4.2000 },
  { id: 'ondo', name: 'Ondo', population: 4671700, riskLevel: 'low', currentRisk: 28, alerts: 0, lat: 7.2500, lng: 5.2000 },
  { id: 'osun', name: 'Osun', population: 4705589, riskLevel: 'low', currentRisk: 22, alerts: 0, lat: 7.5629, lng: 4.5200 },
  { id: 'kogi', name: 'Kogi', population: 4473490, riskLevel: 'high', currentRisk: 70, alerts: 3, lat: 7.8000, lng: 6.7000 },
  { id: 'zamfara', name: 'Zamfara', population: 4515427, riskLevel: 'medium', currentRisk: 38, alerts: 1, lat: 12.1700, lng: 6.2400 },
  { id: 'enugu', name: 'Enugu', population: 4411119, riskLevel: 'low', currentRisk: 25, alerts: 0, lat: 6.5244, lng: 7.5112 },
  { id: 'sokoto', name: 'Sokoto', population: 4998090, riskLevel: 'low', currentRisk: 18, alerts: 0, lat: 13.0627, lng: 5.2433 },
  { id: 'kwara', name: 'Kwara', population: 3192893, riskLevel: 'medium', currentRisk: 48, alerts: 2, lat: 8.9700, lng: 4.5400 },
  { id: 'plateau', name: 'Plateau', population: 4200000, riskLevel: 'medium', currentRisk: 52, alerts: 2, lat: 9.2182, lng: 9.5179 },
  { id: 'adamawa', name: 'Adamawa', population: 4248436, riskLevel: 'low', currentRisk: 30, alerts: 0, lat: 9.3265, lng: 12.3984 },
  { id: 'cross-river', name: 'Cross River', population: 3737517, riskLevel: 'high', currentRisk: 63, alerts: 2, lat: 5.9631, lng: 8.3273 },
  { id: 'abia', name: 'Abia', population: 3727347, riskLevel: 'medium', currentRisk: 44, alerts: 1, lat: 5.4164, lng: 7.3911 },
  { id: 'edo', name: 'Edo', population: 4235595, riskLevel: 'medium', currentRisk: 41, alerts: 1, lat: 6.3350, lng: 5.6037 },
  { id: 'taraba', name: 'Taraba', population: 2300736, riskLevel: 'medium', currentRisk: 46, alerts: 1, lat: 8.0000, lng: 10.0000 },
  { id: 'gombe', name: 'Gombe', population: 3256558, riskLevel: 'low', currentRisk: 26, alerts: 0, lat: 10.2897, lng: 11.1689 },
  { id: 'yobe', name: 'Yobe', population: 2757000, riskLevel: 'low', currentRisk: 19, alerts: 0, lat: 12.2950, lng: 11.9660 },
  { id: 'ekiti', name: 'Ekiti', population: 3270798, riskLevel: 'low', currentRisk: 23, alerts: 0, lat: 7.7319, lng: 5.3106 },
  { id: 'bayelsa', name: 'Bayelsa', population: 2277961, riskLevel: 'high', currentRisk: 82, alerts: 4, lat: 4.7719, lng: 6.0699 },
  { id: 'nasarawa', name: 'Nasarawa', population: 2523395, riskLevel: 'medium', currentRisk: 49, alerts: 2, lat: 8.5200, lng: 8.3100 },
  { id: 'ebonyi', name: 'Ebonyi', population: 2176947, riskLevel: 'low', currentRisk: 27, alerts: 0, lat: 6.2649, lng: 8.0137 },
  { id: 'fct', name: 'FCT Abuja', population: 3564126, riskLevel: 'medium', currentRisk: 44, alerts: 1, lat: 9.0579, lng: 7.4951 }
];

interface NigeriaFloodMapProps {
  onStateSelect?: (state: typeof nigerianStates[0]) => void;
}

export function NigeriaFloodMap({ onStateSelect }: NigeriaFloodMapProps) {
  const [selectedState, setSelectedState] = useState<string | null>('niger');
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  const getRiskColor = (riskLevel: string, currentRisk: number) => {
    if (riskLevel === 'high' || currentRisk >= 70) return 'bg-red-500';
    if (riskLevel === 'medium' || currentRisk >= 40) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getRiskBadgeColor = (riskLevel: string) => {
    if (riskLevel === 'high') return 'bg-red-100 text-red-800';
    if (riskLevel === 'medium') return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const selectedStateData = selectedState ? nigerianStates.find(s => s.id === selectedState) : null;
  const totalPopulationAtRisk = nigerianStates.reduce((acc, state) => {
    if (state.riskLevel === 'high') return acc + state.population;
    if (state.riskLevel === 'medium') return acc + Math.floor(state.population * 0.3);
    return acc;
  }, 0);

  const handleStateClick = (state: typeof nigerianStates[0]) => {
    setSelectedState(state.id);
    onStateSelect?.(state);
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <div>
              <p className="text-sm text-gray-600">High Risk States</p>
              <p className="text-2xl text-red-600">{nigerianStates.filter(s => s.riskLevel === 'high').length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Population at Risk</p>
              <p className="text-2xl text-blue-600">{(totalPopulationAtRisk / 1000000).toFixed(1)}M</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-orange-600" />
            <div>
              <p className="text-sm text-gray-600">Active Alerts</p>
              <p className="text-2xl text-orange-600">{nigerianStates.reduce((acc, s) => acc + s.alerts, 0)}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">States Monitored</p>
              <p className="text-2xl text-green-600">{nigerianStates.length}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Nigeria Map Section */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Nigeria Flood Risk Map
              </CardTitle>
              <div className="flex space-x-2">
                <Button
                  variant={viewMode === 'map' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('map')}
                >
                  Map View
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  List View
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {viewMode === 'map' ? (
              <div className="relative">
                {/* Nigeria SVG Map */}
                <div className="bg-gray-50 rounded-lg p-4 min-h-[500px] relative overflow-hidden">
                  <svg 
                    viewBox="0 0 800 600" 
                    className="w-full h-full"
                    style={{ minHeight: '500px' }}
                  >
                    {/* Nigeria Map Background */}
                    <rect width="800" height="600" fill="#f8fafc" />
                    
                    {/* Nigeria Border Outline */}
                    <path
                      d="M150,150 L650,150 L650,450 L150,450 Z"
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="2"
                    />
                    
                    {/* High Risk States (Red) */}
                    {nigerianStates.filter(state => state.riskLevel === 'high').map((state, index) => {
                      const x = 200 + (index % 4) * 120;
                      const y = 180 + Math.floor(index / 4) * 80;
                      return (
                        <g key={state.id}>
                          <rect
                            x={x}
                            y={y}
                            width="100"
                            height="60"
                            rx="8"
                            fill={selectedState === state.id ? "#dc2626" : "#ef4444"}
                            stroke={selectedState === state.id ? "#991b1b" : "#dc2626"}
                            strokeWidth={selectedState === state.id ? "3" : "2"}
                            className="cursor-pointer transition-all duration-200 hover:brightness-110"
                            onClick={() => handleStateClick(state)}
                          />
                          {/* Flood Risk Indicator */}
                          <circle
                            cx={x + 85}
                            cy={y + 15}
                            r="8"
                            fill="#fca5a5"
                            className="animate-pulse"
                          />
                          <text
                            x={x + 50}
                            y={y + 35}
                            textAnchor="middle"
                            className="text-xs fill-white font-medium"
                            style={{ fontSize: '11px' }}
                          >
                            {state.name}
                          </text>
                          <text
                            x={x + 50}
                            y={y + 50}
                            textAnchor="middle"
                            className="text-xs fill-white"
                            style={{ fontSize: '9px' }}
                          >
                            {state.currentRisk}% Risk
                          </text>
                        </g>
                      );
                    })}
                    
                    {/* Medium Risk States (Yellow) */}
                    {nigerianStates.filter(state => state.riskLevel === 'medium').map((state, index) => {
                      const x = 180 + (index % 5) * 100;
                      const y = 320 + Math.floor(index / 5) * 70;
                      return (
                        <g key={state.id}>
                          <rect
                            x={x}
                            y={y}
                            width="85"
                            height="50"
                            rx="6"
                            fill={selectedState === state.id ? "#d97706" : "#f59e0b"}
                            stroke={selectedState === state.id ? "#92400e" : "#d97706"}
                            strokeWidth={selectedState === state.id ? "3" : "2"}
                            className="cursor-pointer transition-all duration-200 hover:brightness-110"
                            onClick={() => handleStateClick(state)}
                          />
                          {/* Warning Indicator */}
                          <polygon
                            points={`${x + 70},${y + 10} ${x + 80},${y + 25} ${x + 60},${y + 25}`}
                            fill="#fbbf24"
                            className="animate-pulse"
                          />
                          <text
                            x={x + 42.5}
                            y={y + 30}
                            textAnchor="middle"
                            className="text-xs fill-white font-medium"
                            style={{ fontSize: '10px' }}
                          >
                            {state.name}
                          </text>
                          <text
                            x={x + 42.5}
                            y={y + 43}
                            textAnchor="middle"
                            className="text-xs fill-white"
                            style={{ fontSize: '8px' }}
                          >
                            {state.currentRisk}%
                          </text>
                        </g>
                      );
                    })}
                    
                    {/* Low Risk States (Green) */}
                    {nigerianStates.filter(state => state.riskLevel === 'low').map((state, index) => {
                      const x = 200 + (index % 6) * 80;
                      const y = 450 + Math.floor(index / 6) * 50;
                      return (
                        <g key={state.id}>
                          <rect
                            x={x}
                            y={y}
                            width="70"
                            height="40"
                            rx="5"
                            fill={selectedState === state.id ? "#15803d" : "#22c55e"}
                            stroke={selectedState === state.id ? "#14532d" : "#15803d"}
                            strokeWidth={selectedState === state.id ? "3" : "2"}
                            className="cursor-pointer transition-all duration-200 hover:brightness-110"
                            onClick={() => handleStateClick(state)}
                          />
                          <text
                            x={x + 35}
                            y={x > 500 ? y + 20 : y + 25}
                            textAnchor="middle"
                            className="text-xs fill-white font-medium"
                            style={{ fontSize: '9px' }}
                          >
                            {state.name}
                          </text>
                          {x <= 500 && (
                            <text
                              x={x + 35}
                              y={y + 35}
                              textAnchor="middle"
                              className="text-xs fill-white"
                              style={{ fontSize: '7px' }}
                            >
                              {state.currentRisk}%
                            </text>
                          )}
                        </g>
                      );
                    })}
                    
                    {/* Major Rivers and Water Bodies */}
                    <path
                      d="M200,200 Q300,250 400,200 Q500,150 600,200 Q650,250 600,300"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="4"
                      opacity="0.6"
                    />
                    <text x="300" y="190" className="text-xs fill-blue-600" style={{ fontSize: '10px' }}>Niger River</text>
                    
                    <path
                      d="M500,300 Q550,350 500,400 Q450,450 400,400 Q350,350 400,300"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3"
                      opacity="0.6"
                    />
                    <text x="420" y="380" className="text-xs fill-blue-600" style={{ fontSize: '10px' }}>Benue River</text>
                    
                    {/* Flood Alert Indicators */}
                    {nigerianStates.filter(state => state.alerts > 0).map((state, index) => {
                      const x = 250 + index * 150;
                      const y = 120;
                      return (
                        <g key={`alert-${state.id}`}>
                          <circle
                            cx={x}
                            cy={y}
                            r="15"
                            fill="#dc2626"
                            className="animate-pulse"
                          />
                          <text
                            x={x}
                            y={y + 4}
                            textAnchor="middle"
                            className="text-xs fill-white font-bold"
                            style={{ fontSize: '10px' }}
                          >
                            !
                          </text>
                          <text
                            x={x}
                            y={y + 35}
                            textAnchor="middle"
                            className="text-xs fill-red-600"
                            style={{ fontSize: '9px' }}
                          >
                            {state.alerts} Alert{state.alerts > 1 ? 's' : ''}
                          </text>
                        </g>
                      );
                    })}
                    
                    {/* Title */}
                    <text x="400" y="50" textAnchor="middle" className="text-lg font-bold fill-gray-800">
                      Nigeria Flood Risk Map 2024
                    </text>
                    <text x="400" y="70" textAnchor="middle" className="text-sm fill-gray-600">
                      Real-time flood monitoring across all 36 states
                    </text>
                  </svg>
                  
                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 border">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Risk Levels</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-red-500 rounded"></div>
                        <span className="text-xs text-gray-700">High Risk (≥70%)</span>
                        <span className="text-xs text-red-600 font-medium">
                          {nigerianStates.filter(s => s.riskLevel === 'high').length} states
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                        <span className="text-xs text-gray-700">Medium Risk (40-69%)</span>
                        <span className="text-xs text-yellow-600 font-medium">
                          {nigerianStates.filter(s => s.riskLevel === 'medium').length} states
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-green-500 rounded"></div>
                        <span className="text-xs text-gray-700">Low Risk (&lt;40%)</span>
                        <span className="text-xs text-green-600 font-medium">
                          {nigerianStates.filter(s => s.riskLevel === 'low').length} states
                        </span>
                      </div>
                      <div className="border-t pt-2 mt-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-red-600 rounded-full animate-pulse"></div>
                          <span className="text-xs text-gray-700">Active Alerts</span>
                          <span className="text-xs text-red-600 font-medium">
                            {nigerianStates.reduce((acc, s) => acc + s.alerts, 0)} total
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Selected State Info */}
                  {selectedStateData && (
                    <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 border max-w-xs">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        {selectedStateData.name} State
                      </h4>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Risk Level:</span>
                          <Badge className={getRiskBadgeColor(selectedStateData.riskLevel)}>
                            {selectedStateData.currentRisk}%
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Population:</span>
                          <span className="font-medium">{(selectedStateData.population / 1000000).toFixed(1)}M</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Active Alerts:</span>
                          <span className={`font-medium ${selectedStateData.alerts > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {selectedStateData.alerts}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {nigerianStates.map((state) => (
                  <div
                    key={state.id}
                    onClick={() => handleStateClick(state)}
                    className={`
                      p-4 rounded-lg border cursor-pointer transition-all duration-200
                      ${selectedState === state.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${getRiskColor(state.riskLevel, state.currentRisk)}`}></div>
                        <div>
                          <h4 className="text-sm text-gray-900">{state.name} State</h4>
                          <p className="text-xs text-gray-600">{(state.population / 1000000).toFixed(1)}M population</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getRiskBadgeColor(state.riskLevel)}>
                          {state.currentRisk}% Risk
                        </Badge>
                        {state.alerts > 0 && (
                          <p className="text-xs text-red-600 mt-1">{state.alerts} active alerts</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Selected State Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              {selectedStateData ? `${selectedStateData.name} State Details` : 'Select a State'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedStateData ? (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm text-gray-600">Current Risk Level</h4>
                    <Badge className={getRiskBadgeColor(selectedStateData.riskLevel)}>
                      {selectedStateData.riskLevel.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getRiskColor(selectedStateData.riskLevel, selectedStateData.currentRisk)}`}
                      style={{ width: `${selectedStateData.currentRisk}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{selectedStateData.currentRisk}% flood probability</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                    <p className="text-lg text-blue-600">{(selectedStateData.population / 1000000).toFixed(1)}M</p>
                    <p className="text-xs text-gray-600">Population</p>
                  </div>
                  
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-orange-600 mx-auto mb-1" />
                    <p className="text-lg text-orange-600">{selectedStateData.alerts}</p>
                    <p className="text-xs text-gray-600">Active Alerts</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm text-gray-900">Key Areas at Risk:</h4>
                  {selectedStateData.id === 'niger' && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Bosso Ward</span>
                        <Badge className="bg-red-100 text-red-800">High Risk</Badge>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Tunga Ward</span>
                        <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Chanchaga</span>
                        <Badge className="bg-red-100 text-red-800">High Risk</Badge>
                      </div>
                    </div>
                  )}
                  {selectedStateData.id === 'rivers' && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Port Harcourt</span>
                        <Badge className="bg-red-100 text-red-800">High Risk</Badge>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Obio-Akpor</span>
                        <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>
                      </div>
                    </div>
                  )}
                  {selectedStateData.id === 'lagos' && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Victoria Island</span>
                        <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Lekki</span>
                        <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center space-x-2 text-xs text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Last updated: 2 minutes ago</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p>Click on a state to view detailed information</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}