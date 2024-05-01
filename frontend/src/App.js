import React, { useState } from 'react';
import './App.css';

// Mock data representing the plant structure   condition: 'normal'    condition: 'critical' 
const plantData = [
  {
    id: 1,
    location: 'Norway',
    plants: [
      {
        id: 1,
        name: 'Oslo',
        equipment: [
          { id: 1, name: 'Furnace', sensors: [{ id: 1, type: 'Temperature', value: '1500°C',condition: 'normal' }, { id: 2, type: 'Pressure', value: '3 atm',condition: 'critical' }] },
          { id: 2, name: 'Tapping System', sensors: [{ id: 3, type: 'Flow Rate', value: '200 L/min',condition: 'normal' }] },
          { id: 3, name: 'Cooling Tower', sensors: [{ id: 4, type: 'Water Temp', value: '30°C',condition: 'normal' }] },
          { id: 4, name: 'Crusher', sensors: [{ id: 5, type: 'Vibration', value: '0.5 g',condition: 'normal' }] },
          { id: 5, name: 'Packing Machine', sensors: [{ id: 6, type: 'Weight', value: '50 kg',condition: 'critical' }] },
          { id: 6, name: 'Gas Scrubber', sensors: [{ id: 7, type: 'Efficiency', value: '95%',condition: 'normal' }] },
          { id: 7, name: 'Water Filter', sensors: [{ id: 8, type: 'Purity', value: '99%',condition: 'normal' }] }
        ]
      },
      {
        id: 2,
        name: 'Bergen',
        equipment: [
          { id: 8, name: 'Electric Arc Furnace', sensors: [{ id: 9, type: 'Energy Consumption', value: '500 kWh',condition: 'normal' }] },
          { id: 9, name: 'Ladle Furnace', sensors: [{ id: 10, type: 'Material Temp', value: '1400°C',condition: 'normal' }] },
          { id: 10, name: 'Continuous Caster', sensors: [{ id: 11, type: 'Speed', value: '15 m/min',condition: 'normal' }] },
          { id: 11, name: 'Water Cooling System', sensors: [{ id: 12, type: 'Flow Rate', value: '250 L/min',condition: 'normal' }] },
          { id: 12, name: 'Bagging System', sensors: [{ id: 13, type: 'Bag Count', value: '200 bags/hour',condition: 'normal' }] },
          { id: 13, name: 'Air Filtration', sensors: [{ id: 14, type: 'Air Quality', value: 'Low',condition: 'critical' }] },
          { id: 14, name: 'Settling Pond', sensors: [{ id: 15, type: 'Sediment Level', value: 'Low',condition: 'normal' }] }
        ]
      },
      {
        id: 3,
        name: 'Stavanger',
        equipment: [
          { id: 15, name: 'Blast Furnace', sensors: [{ id: 16, type: 'Temperature', value: '2000°C',condition: 'normal' }, { id: 17, type: 'Pressure', value: '5 atm',condition: 'critical' }] },
          { id: 16, name: 'Slag Tapping', sensors: [{ id: 18, type: 'Viscosity', value: 'Medium',condition: 'normal' }] },
          { id: 17, name: 'Spray Chamber', sensors: [{ id: 19, type: 'Humidity', value: '45%',condition: 'normal' }] },
          { id: 18, name: 'Comminution Area', sensors: [{ id: 20, type: 'Particle Size', value: '2 mm',condition: 'critical' }] },
          { id: 19, name: 'Packaging Unit', sensors: [{ id: 21, type: 'Package Integrity', value: 'Good',condition: 'normal' }] },
          { id: 20, name: 'Flue Gas System', sensors: [{ id: 22, type: 'CO2 Levels', value: 'Safe',condition: 'normal' }] },
          { id: 21, name: 'Effluent Treatment', sensors: [{ id: 23, type: 'Chemical Dosing Rate', value: '100 mL/min',condition: 'normal' }] }
        ]
      }
    ]
  }
];



function Equipment({ equipment }) {
  const [showSensors, setShowSensors] = useState(false);

  return (
    <div className="equipment">
      <h3 onClick={() => setShowSensors(!showSensors)}>{equipment.name}</h3>
      {showSensors && (
        <ul>
          {equipment.sensors.map(sensor => (
            <li key={sensor.id} className={sensor.condition}>
              {sensor.type}: {sensor.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Plant({ data }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="plant">
      <h2 onClick={() => setExpanded(!expanded)}>{data.name}</h2>
      {expanded && (
        <div className="equipment-container">
          {data.equipment.map(equip => <Equipment key={equip.id} equipment={equip} />)}
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Plant Structure Explorer</h1>
        <div className="plant-container">
          {plantData.map(country =>
            country.plants.map(plant => <Plant key={plant.id} data={plant} />)
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
