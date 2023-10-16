import React, { useState } from 'react';
import { ISpell } from './components/Spell';
import SpellList from './components/SpellList';
import SphereDropdown from './components/SphereDropdown';

function App() {
  const spellArray: ISpell[] = require('./data.json');
  const [filter, setFilter] = useState<Array<[string, number]>>([]);

  const handleSelect = (sphere: string, cost: string) => {
    const updatedFilter = filter.filter(([sphereName]) => sphereName !== sphere);
    if (cost) {
      updatedFilter.push([sphere, parseInt(cost, 10)]);
    }
    setFilter(updatedFilter);
  };

  const sphereOptions = [
    'Entropy', 'Prime', 'Spirit', 'Correspondence', 'Life', 'Mind',
    'Matter', 'Time', 'Forces', 'Data', 'PrimalUtility'
  ];

  const appContainerStyle: React.CSSProperties = {
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start', // Align items to the top
    justifyContent: 'center', // Center horizontally
    padding: '20px',
  };

  const dropdownContainerStyle: React.CSSProperties = {
    marginRight: '20px',
    width: '250px', // Make the left container 50px wider
  };

  return (
    <div style={appContainerStyle}>
      <div style={dropdownContainerStyle}>
        <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Spheres</h1>
        {sphereOptions.map((sphere, index) => (
          <SphereDropdown key={index} sphere={sphere} onSelect={(cost: string) => handleSelect(sphere, cost)} />
        ))}
      </div>
      <div style={{ width: '400px' }}> {/* Set width for the content container */}
        <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Mage: The Ascension (20th) Spellbook</h1>
        <SpellList data={spellArray} filter={filter} />
      </div>
    </div>
  );
}

export default App;
