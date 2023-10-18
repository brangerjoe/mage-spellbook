import React from 'react';
import Spell, { ISpell } from './Spell';

interface SpellListProps {
    data: ISpell[];
    filter: Array<[string, number]>;
    sortSphere: string | null;
    sortOrder: 'asc' | 'desc' | null; // Added sortOrder prop
}

function SpellList(props: SpellListProps) {
    const { data, filter, sortSphere, sortOrder } = props;

    const filteredSpells = data.filter((spell: ISpell) => {
        const spellSphereCosts = spell.sphereCost;
        for (let i = 0; i < spellSphereCosts.length; i++) {
            const requiredSpheres = spellSphereCosts[i];
            const hasEnoughSpheres = requiredSpheres.every(currency => {
                const foundCurrency = filter.find(c => c[0] === currency.name);
                return foundCurrency && foundCurrency[1] >= currency.cost;
            });

            if (hasEnoughSpheres) {
                return true;
            }
        }
        return false;
    });

    // If a sortSphere is provided, sort the filtered spells based on that sphere's cost
    if (sortSphere) {
        filteredSpells.sort((a, b) => {
            // Extract the cost for the provided sortSphere for both spells
            const findSphereCost = (spell: ISpell) => {
                for (let sphereGroup of spell.sphereCost) {
                    const foundSphere = sphereGroup.find(s => s.name === sortSphere);
                    if (foundSphere) return foundSphere.cost;
                }
                return 0; // Default cost if the sphere is not found
            };

            const aCost = findSphereCost(a);
            const bCost = findSphereCost(b);

            if (sortOrder === 'asc') {
                return aCost - bCost; // Sort in ascending order
            } else {
                return bCost - aCost; // Sort in descending order (or default if sortOrder is null)
            }
        });
    }

    return (
        <div>
            <div>
                {filteredSpells.map(cur => (
                    <Spell 
                        name={cur.name} 
                        books={cur.books}
                        description={cur.description} 
                        sphereCostRaw={cur.sphereCostRaw} 
                        sphereCost={cur.sphereCost} 
                        key={cur.name} 
                    />
                ))}
            </div>
        </div>
    );
}

export default SpellList;
