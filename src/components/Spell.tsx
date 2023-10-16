import React from 'react';

export interface ISpell {
    name: string;
    sphereCostRaw: string;
    sphereCost: Array<Array<{ name: string; cost: number }>>;
    description: string;
}

function Spell(props: ISpell) {
    const spell = props;

    const cardStyle = {
        width: '450px',
        padding: '10px',
        margin: '10px',
        border: '1px solid #8B4513',  // Brown border
        borderRadius: '5px',
        backgroundColor: '#D2B48C',  // Tan background color
    };

    const titleStyle = {
        marginBottom: '8px',
        fontFamily: 'Grenze Gotisch, sans-serif', // Use Grenze Gotisch font for the title
        fontSize: '24px', // Larger font size for the title
        fontWeight: 'bold',
        color: '#8B4513'
    };

    const cellStyle = {
        marginBottom: '8px',
        fontSize: '16px', // Font size for other content
    };

    const hrStyle = {
        marginTop: '10px',
        marginBottom: '10px',
        border: '0',
        borderTop: '1px solid #8B4513',  // Brown horizontal line
    };

    return (
        <div style={cardStyle}>
            <div style={titleStyle}>{spell.name}</div>
            <hr style={hrStyle} />
            <div style={cellStyle}><strong>Cost:</strong> {spell.sphereCostRaw}</div>
            <div style={cellStyle}><strong>Description:</strong> {spell.description}</div>
            {/* <div style={cellStyle}><strong>Cost:</strong> {JSON.stringify(spell.sphereCost)}</div> */}
        </div>
    );
}

export default Spell;