import React from 'react';

interface SphereDropdownProps {
  sphere: string;
  onSelect: (value: string) => void;
}

const SphereDropdown: React.FC<SphereDropdownProps> = ({ sphere, onSelect }) => {
  const dropdownContainerStyle: React.CSSProperties = {
    width: '250px',
    marginBottom: '20px',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '16px',
    color: '#8B4513', // Brown text color
    marginRight: '10px',
  };

  const selectStyle: React.CSSProperties = {
    width: '100px', // Set dropdown width to 100px
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #8B4513',
    borderRadius: '5px',
    backgroundColor: '#D2B48C',
    color: '#8B4513',
    cursor: 'pointer',
    marginLeft: 'auto', // Align the dropdown to the right
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(e.target.value);
  };

  return (
    <div style={dropdownContainerStyle}>
      <label style={labelStyle}>{sphere}</label>
      <select style={selectStyle} onChange={handleSelect}>
        <option value="">Select</option>
        {[1, 2, 3, 4, 5].map((number) => (
          <option key={number} value={number.toString()}>{number}</option>
        ))}
      </select>
    </div>
  );
};

export default SphereDropdown;
