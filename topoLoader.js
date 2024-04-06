const fs = require('fs');
const {City} = require('./city');

function loadData(filename, callback) {
    fs.readFile(__dirname + '/' + filename, function (err, data) {
        if (err) {
            callback(err, null);
            return;
        }

        let citiesString = data.toString().split("\n");
        callback(null, citiesString);
    });
}

function processData(data){
    let firstLine = data[0].split(" ")
    let numberOfCities = firstLine[0]
    let startingCity = firstLine[1]

    let cities = []
    let links = []
    cities.push(new City(startingCity))

    data.forEach((line) => {
        line = line.replace("Gorzów Wielkopolski", "Gorzów-Wielkopolski")
        let linkData = line.split(" ")
        if (linkData.length == 3){
            const [cityAName, cityBName, weight] = linkData;
            if (!cities.some(city => city.name === cityAName)) {
                let newCity = new City(cityAName)
                cities.push(newCity);
            }
            if (!cities.some(city => city.name === cityBName)) {
                let newCity = new City(cityBName)
                cities.push(newCity);
            }
            currentCity = cities.find(city => city.name === cityAName)
            secondCity = cities.find(city => city.name === cityBName)
            let link = currentCity.addLink(secondCity, parseInt(weight))
            links.push(link)
        }
    })

    return [cities, links]
}

module.exports = {
    loadData,
    processData
};