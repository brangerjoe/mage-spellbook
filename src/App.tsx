import React, { useState } from 'react';
import { ISpell } from './components/Spell';
import SpellList from './components/SpellList';
import SphereSelector from './components/SphereSelector';
import './styles/App.css'; // Import the CSS file

export const colors = {
	primary: '#D5BBA2',
	secondary: '#E9DCCD',
	text: '#5D473B',
	border: '#8B4513',
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

	// const resetSpheres = () => {
	// 	setFilter([]);
	// };

	const sphereOptions = [
		'Entropy', 'Prime', 'Spirit', 'Correspondence', 'Life', 'Mind',
		'Matter', 'Time', 'Forces'
	];

	return (
		<div className="app-container">
			<h1 className="title">Rote Spellbook</h1>
			<h2 className="subtitle">Mage: The Ascension</h2>
			<div className="content-container">
				<div className="dropdown-container">
					{/* <h2 className="sphere-title">
						Spheres
						<span onClick={resetSpheres} className="reset-text">
							(Reset)
						</span>
					</h2> */}
					{sphereOptions.map((sphere, index) => (
						<SphereSelector
							key={index}
							sphere={sphere}
							reset={filter.length === 0}
							onSelect={(cost: number) => handleSelect(sphere, cost)}
						/>
					))}
					<hr className="horizontal-hr" />
					<div className="dropdown-flex">
						<select
							className="dropdown-normal dropdown-wide"
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
							className="dropdown-normal dropdown-narrow"
							onMouseEnter={() => setDropdownHovered(true)}
							onMouseLeave={() => setDropdownHovered(false)}
							onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
						>
							<option value="desc">Desc</option>
							<option value="asc">Asc</option>
						</select>
					</div>
				</div>
				<div className="cards-container">
					<SpellList data={spellArray} filter={filter} sortSphere={sortSphere} sortOrder={sortOrder} />
				</div>
			</div>
		</div>
	);
}

export default App;
