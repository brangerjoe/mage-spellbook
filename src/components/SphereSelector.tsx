import React, { useState } from 'react';

interface SphereSelectorProps {
  sphere: string;
  onSelect: (value: number) => void;
}

const SphereSelector: React.FC<SphereSelectorProps> = ({ sphere, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState<number>(0);

  const handleSelect = (option: number) => {
    setSelectedOption(option);
    onSelect(option);
  };

  const labelStyle = {
    fontSize: '14px',
    fontWeight: 550,  // Semibold
    color: '#8B4513',
    fontFamily: 'Gabarito, sans-serif',
  };

  const containerStyle = {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    borderRadius: '8px',
    backgroundColor: '#E9DCCD'
  };

  const radioContainerStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <div style={containerStyle}>
      <label style={labelStyle}>{sphere}</label>
      <div style={radioContainerStyle}>
        {[1, 2, 3, 4, 5].map((number) => (
          <input
            key={number}
            type="radio"
            value={number}
            checked={number <= selectedOption}
            onClick={() => handleSelect(number)}
            style={{ marginRight: '5px' }}
          />
        ))}
      </div>
    </div>
  );
};

export default SphereSelector;
