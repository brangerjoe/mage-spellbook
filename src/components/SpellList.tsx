import React from 'react';
import Spell, { ISpell } from './Spell';
import { bookCategories } from '../App';

interface SpellListProps {
    data: ISpell[];
    filter: Array<[string, number]>;
    sortSphere: string | null;
    sortOrder: 'asc' | 'desc' | null;
    bookFilter: string[];
}

function SpellList(props: SpellListProps) {
    const { data, filter, sortSphere, sortOrder, bookFilter } = props;

    const filteredSpells = data.filter((spell: ISpell) => {
        // Sphere Cost Filtering
        const matchesSphereCost = spell.sphereCost.some(group => {
            return group.every(sphere => {
                const found = filter.find(([name, cost]) => name === sphere.name);
                return found && found[1] >= sphere.cost;
            });
        });
    
        if (!matchesSphereCost) return false;
    
        // If "Others" is checked, return true for Spells that don't belong to any of the predefined book categories
        if (bookFilter.includes('Others')) {
            const isOther = spell.books.every(book => !bookCategories.some(category => book.includes(category)));
            if (isOther) return true;
        }
    
        // Check for spells that should be excluded because they match a deselected category
        const hasDeselectedCategory = spell.books.some(book => bookCategories.some(category => book.includes(category) && !bookFilter.includes(category)));
    
        if (hasDeselectedCategory) return false;
    
        // Filtering for specific book checkboxes
        const matchesSpecificBook = spell.books.some(book => bookCategories.some(category => book.includes(category) && bookFilter.includes(category)));
    
        return matchesSpecificBook;
    });

    let sortedSpells = [...filteredSpells];

    if (sortSphere && sortOrder) {
        sortedSpells.sort((a, b) => {
            const findSphereCost = (spell: ISpell, sphereName: string) => {
                for (let group of spell.sphereCost) {
                    for (let sphere of group) {
                        if (sphere.name === sphereName) {
                            return sphere.cost;
                        }
                    }
                }
                return 0; // default to 0 if sphere is not found
            };
    
            const aSphereCost = findSphereCost(a, sortSphere);
            const bSphereCost = findSphereCost(b, sortSphere);
    
            return sortOrder === 'asc' ? aSphereCost - bSphereCost : bSphereCost - aSphereCost;
        });
    }
    
    

    return (
        <div>
            {sortedSpells.map(cur => (
                <Spell
                    name={cur.name}
                    category={cur.category}
                    subcategory={cur.subcategory}
                    books={cur.books}
                    description={cur.description}
                    sphereCostRaw={cur.sphereCostRaw}
                    sphereCost={cur.sphereCost}
                    key={cur.name}
                />
            ))}
        </div>
    );
}

export default SpellList;
