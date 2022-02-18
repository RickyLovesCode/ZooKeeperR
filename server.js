const express = require('express');
const fs = require('fs');
const path = require('path');
const res = require('express/lib/response');
const { animals } = require('./data/animals');
const { type } = require('express/lib/response');
const PORT = process.env.PORT || 3001;
const app = express();

///////////////////////////////////////////////////////////
//this 'parse incoming string's && Arrays (data) **meaning to covert incoming client side data (Intercept POST request) before the 'callback func' ** converts HTTP into a JSON obj


//parse any incoming string or array
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data
app.use(express.json());

// transmit 'html/css/js' middleware
app.use(express.static('public'));

//route for 'animals.html'
app.get('/aniamls', (req, res) => {
    res.sendFile(path.join(__dirname, './public/animals.html'));
});

//route for zookeerers.html
app.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, './public/zookeepers.html'));
});

//wildcard route 'catch errors'
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});




function filterByQuery(query, animalsArray) {

    let personalityTraitsArray = [];
    let filteredResults = animalsArray;

    if (query.personalityTraits) {
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits]
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        personalityTraitsArray.forEach(trait => {
            filteredResults = filteredResults.filter(animal => animal.personalityTraits.indexOf(trait) !== -1);
        })
    }

    ///////////////////////////////////////////

    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
}


function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
}

function createNewAnimal(body, animalsArray) {
    // below, will be the main code for 'createNewAnimal'
    const animal = body;
    animalsArray.push(animal);

    fs.writeFileSync(path.join(__dirname, './data/animals.json'), JSON.stringify({ animals: animalsArray }, null, 2));
    //return finished code, to start (post) route for 'response
    return animal;
}

function validateAnimal(animal) {
    if (!animal.name || typeof animal.name !== 'string') {
        return false;
    }
    if (!animal.species || typeof animal.species !== 'string') {
        return false;
    }
    if (!animal.diet || typeof animal.diet !== 'string') {
        return false;
    }
    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
        return false;
    } else {
        return true;
    }

}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
})

app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
    // res.json(result);
});

app.post('/api/animals', (req, res) => {
    //set new (createNewAnimal) POST data 'i.d' to what the next 'index of the array' (position) in the array will be

    req.body.id = animals.length.toString();
    //side note the 'length' property will always be ONE number ahead in the index[array]


    //**this is for any incorrect data, send 400 err */
    if (!validateAnimal(req.body)) {
        res.status(400).send('the animal is not properly formatted');
    } else {
        const animal = createNewAnimal(req.body, animals);
        res.json(animal);
    }

    //**add 'animal' (new data) to json file && animals array in (createNewAniaml) func */
    const animal = animals.length.toString();
    res.json(animal);
});

app.listen(PORT, () => {
    console.log('API server now on port ${PORT}!');
});