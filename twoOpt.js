const {calcDistance} = require('./city');

function twoOptSwap(tour, i, k) {
    const newTour = [...tour.slice(0, i), ...tour.slice(i, k + 1).reverse(), ...tour.slice(k + 1)];
    return newTour;
}

function twoOpt(tour) {
    let improvement = true;
    let bestTour = tour.slice();
    let bestDistance = calcDistance(tour);

    while (improvement) {
        improvement = false;
        for (let i = 1; i < tour.length - 1; i++) {
            for (let k = i + 1; k < tour.length; k++) {
                const newTour = twoOptSwap(tour, i, k);
                const newDistance = calcDistance(newTour);
                if (newDistance < bestDistance) {
                    bestTour = newTour;
                    bestDistance = newDistance;
                    improvement = true;
                }
            }
        }
        tour = bestTour;
    }
    console.log(bestDistance)
    return bestTour;
}

module.exports = {
    twoOpt
}