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
    let output = [];

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
        const spheres = group.split(" or ").map(s => s.trim().replace("Primal Utility", "Prime"));

        let newConfigurations = [];

        for (let sphere of spheres) {
            const sphereParts = sphere.split(" ");
            const name = sphereParts[0];
            const cost = parseInt(sphereParts[1]);

            if (name.includes("optional")) continue;
            if (name.includes("both")) continue;
            if (name.includes("may substitute")) continue;
            if (!name || !cost) {
                console.log(`No name or cost provided for ${name} (${sphere})`);
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
        }

        configurations = newConfigurations;
    }

    return configurations;
}

// Testing the function:
console.log(parseSpheres("Entropy 2 or Forces 3, Prime 2, Correspondence 3"));

console.log(parseSpheres("Correspondence 2, Matter 2 or Prime 2"));
console.log(parseSpheres("Spirit 3 or 4, Matter 3 or Forces 3, Prime 2;"));
console.log(parseSpheres("Correspondence 2, Forces 2, optional Forces 3, Prime 2"));
console.log(parseSpheres("Time 4, Entropy 3, Prime 2, may substitute Mind 4 or Life 3"));
console.log(parseSpheres("Correspondence 1 or Entropy 1 or Spirit 1"));
console.log(parseSpheres("Entropy 2 or 3, Life 2 or Matter 2 or Forces 2"));
console.log(parseSpheres("Entropy 2 or Time 4, Life 2 or Matter 2 or Forces 2"));


for (let i = 0; i < textByLine.length; i++) {
    const pattern = /^((Entropy|Prime|Spirit|Correspondence|Life|Mind|Matter|Time|Forces|Data|Primal Utility)\s\d(,)?(\sor)?(\sand)?(\s\d)?(,)?(\soptional)?(\smay substitute)?(\sboth)?(\sother spheres)?\s?;?)+$/;

    if (pattern.test(trimLineEndings(textByLine[i]))) {
        // Find spell name
        let j = i;
        while (textByLine[j - 1] && (!checkEndOfDescription(textByLine[j - 1]) || i - j > 20)) {
            j--;
        }
        let name = trimLineEndings(textByLine[j]);

        // Aggregate spell cost
        let sphereCost = textByLine[i];
        while (pattern.test(textByLine[i + 1])) {
            sphereCost = " " + trimLineEndings(sphereCost);
            sphereCost = sphereCost + textByLine[i + 1];
            i++;
        }

        // Find description
        let descriptionStartLine = ++i;
        let description = "";
        while (textByLine[i]) {
            description += i == descriptionStartLine ? trimLineEndings(textByLine[i]) : " " + trimLineEndings(textByLine[i]);
            if (checkEndOfDescription(textByLine[i])) {
                break;
            }
            i++;
        }

        const spell = {
            name,
            sphereCostRaw: trimLineEndings(sphereCost),
            sphereCost: parseSpheres(trimLineEndings(sphereCost)),
            description
        };
        output.push(spell);
    }
}

const jsonData = JSON.stringify(output);
console.log(output.length);

fs.writeFile('./src/data.json', jsonData, (err) => {
    if (err) throw err;
    console.log('Data has been written to the file');
});
