import React from 'react';
import Spell, { ISpell } from './Spell';

interface SphereCost {
    name: string;
    cost: number;
}
interface SpellListProps {
    data: ISpell[]; // Define the data prop
    filter: Array<[string, number]>;
}

function SpellList(props: SpellListProps) {
    const { data, filter } = props;
    console.log(filter);
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


    return (
        <div>
            <div>
                {filteredSpells.map(cur => (
                    <Spell name={cur.name} description={cur.description} sphereCostRaw={cur.sphereCostRaw} sphereCost={cur.sphereCost} key={cur.name} />
                ))}
            </div>
        </div>
    )
}

export default SpellList;