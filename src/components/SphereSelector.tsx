import React, { useEffect, useState, CSSProperties } from 'react';

interface SphereSelectorProps {
	sphere: string;
	onSelect: (value: number) => void;
	reset: boolean;
}

const colors = {
	primary: '#D5BBA2',
	label: '#8B4513',
	containerBg: '#E9DCCD',
	checkboxBg: '#EEE',
	checkboxBorder: '#999',
	checkboxSelected0: '#D5BBA2',
	checkboxSelectedOther: '#444',
};

const labelStyle: CSSProperties = {
	fontSize: '14px',
	fontWeight: 550,
	color: colors.label,
	fontFamily: 'Gabarito, sans-serif',
	textAlign: 'center',
	width: '100%',
	padding: '4px 10px',
};

const containerStyle: CSSProperties = {
	marginBottom: '10px',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	padding: '10px',
	borderRadius: '8px',
	backgroundColor: colors.containerBg,
};

const radioContainerStyle: CSSProperties = {
	display: 'flex',
	alignItems: 'center',
	marginTop: '8px',
	width: '100%',
	justifyContent: 'flex-end',
};

const labelContainerStyle: CSSProperties = {
	backgroundColor: colors.primary,
	width: '100%',
	borderRadius: '4px',
	padding: '2px 0',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
};

const checkboxStyle: CSSProperties = {
	opacity: 0,
	width: '18px',
	height: '18px',
	position: 'relative',
};

const checkboxPseudoStyle: CSSProperties = {
	content: '""',
	position: 'absolute',
	top: '20%',
	left: '10%',
	width: '60%',
	height: '60%',
	backgroundColor: colors.checkboxBg,
	borderRadius: '50%',
	pointerEvents: 'none',
	border: `1px solid ${colors.checkboxBorder}`,
};

const SphereSelector: React.FC<SphereSelectorProps> = ({ sphere, onSelect, reset }) => {
	const [selectedOption, setSelectedOption] = useState<number>(0);

	useEffect(() => {
		if (reset) {
			setSelectedOption(0);
		}
	}, [reset]);

	const handleSelect = (option: number) => {
		setSelectedOption(option);
		const zeroElement = document.getElementById(`checkbox-0`) as HTMLInputElement;
		if (zeroElement) {
			zeroElement.checked = option === 0;
		}
		for (let i = 1; i <= 5; i++) {
			const element = document.getElementById(`checkbox-${i}`) as HTMLInputElement;
			if (element) {
				element.checked = i <= option;
			}
		}
		onSelect(option);
	};

	return (
		<div style={containerStyle}>
			<div style={labelContainerStyle}>
				<label style={labelStyle}>{sphere}</label>
			</div>
			<div style={radioContainerStyle}>
				{[0, 1, 2, 3, 4, 5].map((number) => (
					<div key={number} style={{ position: 'relative', display: 'inline-block', marginRight: number === 0 ? 'auto' : '5px' }}>
						<input
							type="checkbox"
							id={`checkbox-${number}`}
							checked={number === 0 ? selectedOption === 0 : number <= selectedOption}
							onChange={() => handleSelect(number)}
							style={checkboxStyle}
						/>
						<span
							style={
								number === 0
									? { ...checkboxPseudoStyle, backgroundColor: selectedOption === 0 ? colors.checkboxSelected0 : 'white', border: 'none' }
									: checkboxPseudoStyle
							}
						></span>


						{number === 0 && selectedOption === 0 ? (
							<span style={{ ...checkboxPseudoStyle, backgroundColor: colors.checkboxSelected0, border: 'none' }}></span>
						) : number !== 0 && number <= selectedOption ? (
							<span style={{ ...checkboxPseudoStyle, backgroundColor: colors.checkboxSelectedOther }}></span>
						) : null}

					</div>
				))}
			</div>
		</div>
	);
};

export default SphereSelector;
