import React, { useEffect, useState, CSSProperties } from 'react';
import { colors } from '../App';

interface SphereSelectorProps {
	sphere: string;
	onSelect: (value: number) => void;
	reset: boolean;
}

const SphereSelector: React.FC<SphereSelectorProps> = ({ sphere, onSelect, reset }) => {
	const [selectedOption, setSelectedOption] = useState<number>(0);
	useEffect(() => {
		if (reset) {
			setSelectedOption(0);
		}
	}, [reset]);

	const handleSelect = (option: number) => {
		setSelectedOption(option);
		onSelect(option);
	};

	const labelStyle: CSSProperties = {
		fontSize: '14px',
		fontWeight: 550,
		color: '#8B4513',
		fontFamily: 'Gabarito, sans-serif',
		textAlign: 'center',
		width: '100%',
		padding: '4px 10px'
	};

	const containerStyle: CSSProperties = {
		marginBottom: '10px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '10px',
		borderRadius: '8px',
		backgroundColor: '#E9DCCD'
	};

	const radioContainerStyle: CSSProperties = {
		display: 'flex',
		alignItems: 'center',
		marginTop: '5px',
		width: '100%',
		justifyContent: 'center'
	};

	const labelContainerStyle: CSSProperties = {
		backgroundColor: colors.primary,
		width: '100%',
		borderRadius: '4px',
		padding: '2px 0',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	};
	

	return (
		<div style={containerStyle}>
			<div style={labelContainerStyle}>
				<label style={labelStyle}>{sphere}</label>
			</div>
			<div style={radioContainerStyle}>
				{[0, 1, 2, 3, 4, 5].map((number) => (
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
