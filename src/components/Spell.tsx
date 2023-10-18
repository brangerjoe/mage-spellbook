import React from 'react';

export interface ISpell {
    name: string;
    books: Array<string>;
    sphereCostRaw: string;
    sphereCost: Array<Array<{ name: string; cost: number }>>;
    description: string;
}

function Spell(props: ISpell) {
    const spell = props;

    // Define color palette
    const colors = {
        primary: '#D5BBA2', // light brown
        secondary: '#E9DCCD', // lighter brown
        text: '#5D473B', // dark brown for text
        border: '#8B4513', // darker brown for border
    };

    const cardStyle = {
        width: '470px',
        padding: '15px',
        margin: '10px',
        border: `3px solid ${colors.border}`,  // Brown border
        borderRadius: '8px',
        backgroundImage: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`, // Gradient background
        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',  // More pronounced shadow for depth
        fontFamily: 'Gabarito, sans-serif'
    };
    

    const titleStyle = {
        marginBottom: '10px',
        fontFamily: 'Grenze Gotisch, sans-serif', 
        fontSize: '24px', 
        fontWeight: 'bold',
        color: colors.text
    };

    const cellStyle = {
        marginBottom: '8px',
        fontSize: '16px', 
        color: colors.text,
    };

    const hrStyle = {
        marginTop: '10px',
        marginBottom: '10px',
        border: '0',
        borderTop: `1px solid ${colors.border}`,  // Brown horizontal line
    };

    return (
        <div style={cardStyle}>
            <div style={titleStyle}>{spell.name}</div>
            <hr style={hrStyle} />
            <div style={cellStyle}>{spell.books.map(book => <div>{book}</div>)}</div>
            <div style={cellStyle}><strong>Cost</strong>: {spell.sphereCostRaw}</div>
            <div style={cellStyle}><strong>Description</strong>: {spell.description}</div>
        </div>
    );
}

export default Spell;
