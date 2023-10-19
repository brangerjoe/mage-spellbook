var fs = require("fs");
var text = fs.readFileSync(require('path').resolve(__dirname, './source.txt'));
var textByLine = text.toString().split("\n")
var output = [];

const trimLineEndings = (str) => {
    return str.replace(/(\r\n|\n|\r)/gm, "");
}

const checkEndOfDescription = (str) => {
    return /\.\r$|\.\"[\r\n]|\.\)[\r\n]/.test(str);
}

const parseSpheres = (str) => {
    function replaceWithSmallerNumber(inputString) {
        const regex = /(\d+)\s+or\s+(\d+)/g;
        return inputString.replace(regex, function (match, number1, number2) {
            const smallerNumber = Math.min(parseInt(number1), parseInt(number2));
            return smallerNumber.toString();
        });
    }

    str = replaceWithSmallerNumber(str);
    str = str.replace(";", " or ");
    let groups = str.split(",");

    let configurations = [[]];

    for (let group of groups) {
        const spheres = group.split(" or ").map(s => s.trim().replace("Primal Utility", "Prime").replace("Dimensional Science", "Spirit").replace("Data", "Correspondence"));

        let newConfigurations = [];
        let shouldUpdateConfigurations = false; // flag to determine whether configurations should be updated

        for (let sphere of spheres) {
            const sphereParts = sphere.split(" ");
            const name = sphereParts[0];
            const cost = parseInt(sphereParts[1]);

            if (name.includes("optional")) continue;
            if (name.includes("both")) continue;
            if (name.includes("may substitute")) continue;
            if (!name || !cost) {
                // console.log(`No name or cost provided for ${name} (${sphere})`);
                continue;
            }
            if (isNaN(cost)) {
                console.log(`Failed to add cost for ${name}`);
                continue;
            }

            for (let config of configurations) {
                const newConfig = config.concat([{ name, cost }]);
                newConfigurations.push(newConfig);
            }

            shouldUpdateConfigurations = true; // flag set to true as we have valid sphere configurations
        }

        if (shouldUpdateConfigurations) {
            configurations = newConfigurations;
        }
    }

    return configurations;
}

// Testing the function:
console.log(parseSpheres(" Life 3, Time 3 or Correspondence 2, Matter 2, optional Spirit 2,Prime 2"));
// console.log(parseSpheres("Entropy 2 or Forces 3, Prime 2, Correspondence 3"));
// console.log(parseSpheres("Correspondence 2, Matter 2 or Prime 2"));
// console.log(parseSpheres("Spirit 3 or 4, Matter 3 or Forces 3, Prime 2;"));
// console.log(parseSpheres("Correspondence 2, Forces 2, optional Forces 3, Prime 2"));
// console.log(parseSpheres("Time 4, Entropy 3, Prime 2, may substitute Mind 4 or Life 3"));
// console.log(parseSpheres("Correspondence 1 or Entropy 1 or Spirit 1"));
// console.log(parseSpheres("Entropy 2 or 3, Life 2 or Matter 2 or Forces 2"));
// console.log(parseSpheres("Entropy 2 or Time 4, Life 2 or Matter 2 or Forces 2"));

let currentCategory = null;
let currentSubcategory = null;

for (let i = 0; i < textByLine.length; i++) {
    const line = trimLineEndings(textByLine[i]);

    // Detect category and subcategory
    if (line.startsWith('===')) {
        currentCategory = line.replace('===', '').trim();
    } else if (line.startsWith('==')) {
        currentSubcategory = line.replace('==', '').trim();
    } else {
        const pattern = /^((Entropy|Prime|Spirit|Correspondence|Life|Mind|Matter|Time|Forces|Data|Primal Utility)\s\d(,)?(\sor)?(\sand)?(\s\d)?(,)?(\soptional)?(\smay substitute)?(\sboth)?(\sother spheres)?\s?;?)+$/;

        if (line.startsWith('=')) {
            // Spell name detected
            let name = line.replace('=', '').trim();

            // Capture all book lines
            let books = [];
            while (textByLine[i + 1] && (textByLine[i + 1].includes('page') || textByLine[i + 1].includes('pas'))) {
                books.push(trimLineEndings(textByLine[++i]));
            }

            // Next line after books should be sphere cost
            let sphereCost = trimLineEndings(textByLine[++i]);
            while (pattern.test(textByLine[i + 1])) {
                sphereCost += " " + trimLineEndings(textByLine[++i]);
            }

            // Find description
            let description = "";
            i++; // move to the first line of description
            while (textByLine[i] && !textByLine[i].startsWith('=') && !textByLine[i].startsWith('==') && !textByLine[i].startsWith('===')) {
                description += " " + trimLineEndings(textByLine[i]);
                i++;
            }
            i--; // revert the last increment to ensure the next loop iteration reads the next spell/category/subcategory

            const spell = {
                name,
                category: currentCategory,
                subcategory: currentSubcategory,
                books,
                sphereCostRaw: sphereCost,
                sphereCost: parseSpheres(sphereCost),
                description: description.trim()
            };

            output.push(spell);
        }
    }
}

const jsonData = JSON.stringify(output);
console.log(output.length);

fs.writeFile('../data.json', jsonData, (err) => {
    if (err) throw err;
    console.log('Data has been written to the file');
});
