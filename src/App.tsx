import React, { useState } from 'react';
import { ISpell } from './components/Spell';
import SpellList from './components/SpellList';
import SphereSelector from './components/SphereSelector';

export const colors = {
	primary: '#D5BBA2', // light brown
	secondary: '#E9DCCD', // lighter brown
	text: '#5D473B', // dark brown for text
	border: '#8B4513', // darker brown for border
};

function App() {
	const spellArray: ISpell[] = require('./data.json');
	const [filter, setFilter] = useState<Array<[string, number]>>([]);
	const [sortSphere, setSortSphere] = useState<string | null>(null);
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
	const [, setDropdownHovered] = useState(false);

	const handleSelect = (sphere: string, cost: number) => {
		const updatedFilter = filter.filter(([sphereName]) => sphereName !== sphere);
		if (cost > 0) {
			updatedFilter.push([sphere, cost]);
		}
		setFilter(updatedFilter);
	};

	const resetSpheres = () => {
		setFilter([]);
	};

	const sphereOptions = [
		'Entropy', 'Prime', 'Spirit', 'Correspondence', 'Life', 'Mind',
		'Matter', 'Time', 'Forces'
	];

	const appContainerStyle: React.CSSProperties = {
		fontFamily: 'Arial, sans-serif',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '10px 20px',
		backgroundColor: colors.secondary,
	};

	const contentContainerStyle: React.CSSProperties = {
		display: 'flex',
		flexDirection: 'row',
		minWidth: '800px',
		marginTop: '20px',
		backgroundColor: colors.primary,
		padding: '20px',
		borderRadius: '8px',
		boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
	};

	const dropdownContainerStyle: React.CSSProperties = {
		marginRight: '20px',
		width: '250px'
	};

	const titleStyle: React.CSSProperties = {
		fontSize: '62px',
		marginBottom: '5px',
		color: colors.text,
		textAlign: 'center',
		width: '800px',
		fontFamily: 'Fondamento, sans-serif',
		borderBottom: '2px solid ' + colors.text,
		paddingBottom: '5px'
	};

	const subtitleStyle: React.CSSProperties = {
		fontSize: '18px',
		marginBottom: '20px',
		color: colors.text,
		textAlign: 'center',
		width: '800px',
		marginTop: '2px',
		fontFamily: 'Gabarito, sans-serif',
	};

	const dropdownNormalStyle: React.CSSProperties = {
		padding: '10px',
		border: 'none',
		borderRadius: '5px',
		fontFamily: 'Gabarito, sans-serif',
		backgroundColor: colors.secondary,
		color: '#5D473B',
		// appearance: 'none',
		cursor: 'pointer',
	};

	// Style for the horizontal <hr />
	const horizontalHrStyle: React.CSSProperties = {
		width: '100%',
		backgroundColor: colors.secondary,
		border: 'none',
		height: '1px',
		margin: '20px 0',
	};

	return (
		<div style={appContainerStyle}>
			<h1 style={titleStyle}>Rote Spellbook</h1>
			<h2 style={subtitleStyle}>Mage: The Ascension</h2>
			<div style={contentContainerStyle}>
				<div style={dropdownContainerStyle}>
					<h2 style={{ fontSize: '24px', marginBottom: '20px', color: colors.text }}>
						Spheres
						<span
							onClick={resetSpheres}
							style={{ marginLeft: '10px', fontSize: '16px', cursor: 'pointer', alignItems: 'end' }}
						>
							(Reset)
						</span>
					</h2>
					{sphereOptions.map((sphere, index) => (
						<SphereSelector
							key={index}
							sphere={sphere}
							reset={filter.length === 0}
							onSelect={(cost: number) => handleSelect(sphere, cost)}
						/>

					))}
					<hr style={horizontalHrStyle} />
					<div style={{ display: 'flex', flexDirection: 'row', marginBottom: '20px', alignItems: 'center' }}>
						<select
							style={{ ...dropdownNormalStyle, flex: '2', marginRight: '2px', textAlign: 'center' }}
							onMouseEnter={() => setDropdownHovered(true)}
							onMouseLeave={() => setDropdownHovered(false)}
							onChange={(e) => setSortSphere(e.target.value)}
						>
							<option value="">Sort by Sphere...</option>
							{sphereOptions.map(sphere => (
								<option key={sphere} value={sphere}>{sphere}</option>
							))}
						</select>
						<select
							style={{ ...dropdownNormalStyle, flex: '1', textAlign: 'center' }}
							onMouseEnter={() => setDropdownHovered(true)}
							onMouseLeave={() => setDropdownHovered(false)}
							onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
						>
							<option value="desc">Desc</option>
							<option value="asc">Asc</option>
						</select>
					</div>
				</div>
				<div style={{ flex: 1, overflow: 'hidden' }}>
					<SpellList data={spellArray} filter={filter} sortSphere={sortSphere} sortOrder={sortOrder} />
				</div>
			</div>
		</div>
	);
}

export default App;
