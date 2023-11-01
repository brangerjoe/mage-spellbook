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

export const bookCategories = [
	'Mage: The Ascension',
	'Guide to the Traditions',
	'Akashic Brotherhood',
	'Celestial Chorus',
	'Cult of Ecstasy',
	'Dreamspeakers',
	'Euthanatos',
	'Hollow Ones',
	'Order of Hermes',
	'Sons of Ether',
	'Verbena',
	'Virtual Adepts',
	'Guide to the Technocracy',
	'Iteration X',
	'New World Order',
	'Progenitors',
	'Syndicate',
	'Void Engineers',

];

function App() {
	const spellArray: ISpell[] = require('./data.json');

	const [filter, setFilter] = useState<Array<[string, number]>>([]);
	const [sortSphere, setSortSphere] = useState<string | null>(null);
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
	const [, setDropdownHovered] = useState(false);
	const [bookFilter, setBookFilter] = useState<string[]>([...bookCategories, 'Others']);

	const handleSelect = (sphere: string, cost: number) => {
		const updatedFilter = filter.filter(([sphereName]) => sphereName !== sphere);
		if (cost > 0) {
			updatedFilter.push([sphere, cost]);
		}
		setFilter(updatedFilter);
	};

	const handleBookFilterChange = (keyword: string) => {
		let newBookFilter = [...bookFilter];
		if (bookFilter.includes(keyword)) {
			newBookFilter = newBookFilter.filter(k => k !== keyword);
		} else {
			newBookFilter.push(keyword);
		}
		setBookFilter(newBookFilter);
	};

	const selectAllBooks = () => {
		setBookFilter([...bookCategories, 'Others']);
	};

	const deselectAllBooks = () => {
		setBookFilter([]);
	};

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
					{/* Sphere selectors */}
					{sphereOptions.map((sphere, index) => (
						<SphereSelector
							key={index}
							sphere={sphere}
							reset={filter.length === 0}
							onSelect={(cost: number) => handleSelect(sphere, cost)}
						/>
					))}
					<hr className="horizontal-hr" />
					{/* Sorting dropdowns */}
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
					<hr className="horizontal-hr" />
					{/* Book filters */}
					<div className="book-filter-container">
						<div className="all-none-container">
							<span className="all-none-option" onClick={selectAllBooks}>All</span>
							<span className="all-none-option" onClick={deselectAllBooks}>None</span>
						</div>
						{bookCategories.map((keyword, index) => (
							<div key={index}>
								<input
									type="checkbox"
									id={`checkbox-${index}`}
									checked={bookFilter.includes(keyword)}
									onChange={() => handleBookFilterChange(keyword)}
								/>
								<label className="checkbox-label" htmlFor={`checkbox-${index}`}>{keyword}</label>
							</div>
						))}
						<div>
							<input
								type="checkbox"
								id="checkbox-others"
								checked={bookFilter.includes('Others')}
								onChange={() => handleBookFilterChange('Others')}
							/>
							<label className="checkbox-label" htmlFor="checkbox-others">Others</label>
						</div>
					</div>

				</div>
				<div className="cards-container">
					<SpellList data={spellArray} filter={filter} sortSphere={sortSphere} sortOrder={sortOrder} bookFilter={bookFilter} />
				</div>
			</div>
		</div>
	);
}

export default App;
