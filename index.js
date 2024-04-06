const {loadData, processData} = require('./topoLoader');
const {twoOpt} = require('./twoOpt');

const TOPOLOGY_FILE = "topology.txt";

function createMST(startNode, links){
    let visited = new Set();
    let mst = [];

    links.sort((a, b) => a.weight - b.weight);
    visited.add(startNode);

    while (visited.size < 16 && links.length > 0) {
        let added = false;
        for (let i = 0; i < links.length; i++) {
            const link = links[i];
            if (visited.has(link.cityA) !== visited.has(link.cityB)) {
                visited.add(link.cityA);
                visited.add(link.cityB);

                mst.push(link);
                
                links.splice(i, 1);
                added = true;
                break;
            }
        }
        if (!added) break;
    }

    return mst;
}

function generateMatchings(nodes) {
    if (nodes.length < 2) {
      return [[]];
    }
    let matchings = [];
    let first = nodes[0];
    for (let i = 1; i < nodes.length; i++) {
      let pair = [first, nodes[i]];
      let remaining = nodes.slice(1, i).concat(nodes.slice(i + 1));
      let restMatchings = generateMatchings(remaining);
      for (let rest of restMatchings) {
        matchings.push([pair].concat(rest));
      }
    }
    return matchings;
}

function findBest(matchings){
    let minDistance = Infinity;
    let bestLinks = [];

    matchings.forEach((pairSet)=>{
        let distance = 0;
        let currentLinks = [];

        pairSet.forEach((pair)=>{
            let links = pair[0].links;
            let link = links.find((link) => {return link.secondCity(pair[0]) == pair[1]});
            currentLinks.push(link);
            distance += link.weight;
        })
        if (distance < minDistance){
            minDistance = distance;
            bestLinks = currentLinks;
        }
    })
    return bestLinks;
}
  
function generateMultigraph(links){
    const freq = new Map()
    links.forEach((link) => {
        freq.set(link.cityA, (freq.get(link.cityA) || 0) + 1);
        freq.set(link.cityB, (freq.get(link.cityB) || 0) + 1);
    })
    let odd = []
    freq.forEach((item, key)=>{if(item % 2 != 0){odd.push(key)}})
    return links.concat(findBest(generateMatchings(odd)))
}

function findEulerianTour(links, startNode){
    let graph = {};
    for (let edge of links) {
        if (!graph[edge.cityA]) {
            graph[edge.cityA] = [];
        }
        if (!graph[edge.cityB]) {
            graph[edge.cityB] = [];
        }
        graph[edge.cityA].push(edge.cityB);
        graph[edge.cityB].push(edge.cityA);
    }
    let stack = [startNode];
    let tour = [];

    while (stack.length > 0) {
        let current = stack[stack.length - 1];
        if (graph[current] && graph[current].length > 0) {
            let next = graph[current].shift();
            graph[next] = graph[next].filter(node => node !== current);
            stack.push(next);
        } else {
            tour.push(stack.pop());
        }
    }

    tour = tour.reverse()
    return tour;
}

function main() {
    // loading topology info from text file
    loadData(TOPOLOGY_FILE, function(err, data) {
        if (err) {
            console.error('Error:', err);
            return;
        }

        // converting text data into arrays of objects separate for links and cities
        let [cities, links] = processData(data);

        // setting starting node as a first city ("Warszawa")
        const STARTING_NODE = cities[0]

        // using Cristofides algorithm to solve Traveling Salesmen Problem 
        let minimumSpanningTree = createMST(STARTING_NODE, links)
        let multigraph = generateMultigraph(minimumSpanningTree)
        let eulerianTour = findEulerianTour(multigraph, STARTING_NODE)
        let final = []
        eulerianTour.forEach((node)=>{
            if(final.indexOf(node) == -1){
                final.push(node)
            }
        })

        // applying two-opt optymalization to get a better result
        final = twoOpt(final)
    });
}

main();

