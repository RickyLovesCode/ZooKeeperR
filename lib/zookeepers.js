const fs = require("fs");
const path = require("path");

function filterByQuery(query, zookeepersArray) {
    let filteredResults = zookeepersArray;
    if (query.age) {
        filteredResults = filteredResults.filter(
            // Since our form data will be coming in as strings, and our JSON is storing
            // age as a number, we must convert the query string to a number to
            // perform a comparison:
            (zookeeper) => zookeeper.age === Number(query.age)
        );
    }
    if (query.favoriteAnimal) {
        filteredResults = filteredResults.filter(
            (zookeeper) => zookeeper.favoriteAnimal === query.favoriteAnimal
        );
    }
    if (query.name) {
        filteredResults = filteredResults.filter(
            (zookeeper) => zookeeper.name === query.name
        );
    }
    return filteredResults;
}

function findById(id, zookeepers) {
    const result = zookeepers.filter((zookeeper) => zookeeper.id === id)[0];
    return result;
}

function createNewZookeeper(body, zookeepersArray) {
    const zookeeper = body;
    zookeepersArray.push(zookeeper);
    fs.writeFileSync(
        path.join(__dirname, "../data/zookeepers.json"),
        JSON.stringify({ zookeepers: zookeepersArray }, null, 2)
    );
    return zookeeper;
}

// function createNewAnimal(body, animalsArray) {
//     // below, will be the main code for 'createNewAnimal'
//     const animal = body;
//     animalsArray.push(animal);

//     fs.writeFileSync(path.join(__dirname, '../data/animals.json'), JSON.stringify({ animals: animalsArray }, null, 2));
//     //return finished code, to start (post) route for 'response
//     return animal;
// }

function validateZookeeper(zookeeper) {
    if (!zookeeper.name || typeof zookeeper.name !== "string") {
        return false;
    }
    if (!zookeeper.age || typeof zookeeper.age !== "number") {
        return false;
    }
    if (
        !zookeeper.favoriteAnimal ||
        typeof zookeeper.favoriteAnimal !== "string"
    ) {
        return false;
    }
    return true;
}

module.exports = {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,
};