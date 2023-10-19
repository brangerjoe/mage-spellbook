import React from 'react';
import { colors } from '../App';

export interface ISpell {
    name: string;
    category: string;
    subcategory: string;
    books: Array<string>;
    sphereCostRaw: string;
    sphereCost: Array<Array<{ name: string; cost: number }>>;
    description: string;
}

function Spell(props: ISpell) {
    const spell = props;

    // Define category styles mapping
    const categoryStyles: { [key: string]: React.CSSProperties } = {
        'Blessings and Curses': {
            background: 'linear-gradient(to right, white 0%, moccasin 40%)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
        },
        'Computers': {
            background: 'linear-gradient(45deg, slategray, lightsteelblue)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
        },
        'Divination and Fate': {
            background: 'linear-gradient(to right, deeppink, darkviolet)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
        },
        'Elemental Magick': {
            background: `linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet)`,
            WebkitBackgroundClip: 'text',
            color: 'transparent',
        },
        'Energy-Work': {
            background: 'linear-gradient(to right, aqua, blueviolet)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
        },
        'Enhanced Combat': {
            background: 'linear-gradient(45deg, crimson, black)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
        },
        'Healing and Harming': {
            background: 'linear-gradient(45deg, green, greenyellow)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
        },
        'Inanimate Objects': {
            background: 'linear-gradient(grey, black)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
        },
        'Miscellaneous': {
            background: 'linear-gradient(45deg, greenyellow, grey)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
        },
        'Movement and Communication': {
            background: 'linear-gradient(45deg, dodgerblue, deepskyblue)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
        },
        'Mystic Perception': {
            background: 'linear-gradient(45deg, violet, darkviolet)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
        },
        'Necromancy': {
            background: 'linear-gradient(45deg, black, chocolate)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
        },
        'Obfuscation': {
            background: 'linear-gradient(45deg, cadetblue, cornflowerblue)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
        },
        'Space-Time Management': {
            background: 'linear-gradient(45deg, darkcyan, darkgray)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
        },
        'Summoning, Binding and Warding': {
            background: 'linear-gradient(45deg, goldenrod, darkgoldenrod)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
        },
        'Transformations': {
            background: 'linear-gradient(45deg, red 0%, blue 10%)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
        },
        'Uncanny Influence': {
            background: 'linear-gradient(45deg, coral 0%, chocolate 20%)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
        },

        // ... Add more categories here
    };

    const getStyleForCategory = (category: string): React.CSSProperties => {
        return categoryStyles[category] || { color: colors.text }; // default to dark brown text if no special style
    };

    const cardStyle = {
        width: '470px',
        padding: '15px',
        margin: '10px',
        border: `3px solid ${colors.secondary}`,  // Brown border
        borderRadius: '8px',
        backgroundImage: `linear-gradient(45deg, ${colors.secondary}, ${colors.primary})`, // Gradient background
        boxShadow: '0 4px 8px 3px rgba(0, 0, 0, .15), 0 1px 3px rgba(0, 0, 0, .3)',
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

    const categoryStyle = {
        fontSize: '18px', // Made it a bit larger
        fontWeight: 'bold',
        color: colors.text,
        textShadow: '2px 2px 3px rgba(169, 169, 169, 0.2)', // Using a light gray shadow
        ...getStyleForCategory(spell.category),
    };

    const subcategoryStyle = {
        fontSize: '14px', // Smaller font size for subcategory
        color: colors.text,
        marginBottom: '10px'
    };

    const hrStyle = {
        marginTop: '10px',
        marginBottom: '10px',
        border: '0',
        borderTop: `1px solid ${colors.border}`,  // Brown horizontal line
    };

    // ... (Rest of your code)

    const headerContainerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center', // Vertically centers the elements
        marginBottom: '10px', // Optional, to provide some spacing below
    };

    const rightContainerStyle: React.CSSProperties = {
        textAlign: 'right',
    };    

    return (
        <div style={cardStyle}>
            <div style={headerContainerStyle}>
                <div style={titleStyle}>{spell.name}</div>
                <div style={rightContainerStyle}>
                    <div style={categoryStyle}>{spell.category}</div>
                    <div style={subcategoryStyle}>{spell.subcategory}</div>
                </div>
            </div>
            <hr style={hrStyle} />
            <div style={cellStyle}><strong>Cost</strong>: {spell.sphereCostRaw}</div>
            <div style={cellStyle}><strong>Description</strong>: {spell.description}</div>
            <hr style={hrStyle} />
            <div style={cellStyle}>{spell.books.map(book => <div>{book}</div>)}</div>
        </div>
    );

    // ... (Rest of your code)

}

export default Spell;
