const {Link} = require("./link")

class City{
    constructor(name){
        this.name = name;
        this.links = [];
    }
    addLink(cityB, weight){
        if (!(cityB instanceof City)) {
            throw new Error("Invalid city provided.");
        }

        const link = new Link(this, cityB, weight);
        this.links.push(link);
        cityB.links.push(link);

        return link;
    }
    print(){
        let linksData = []
        this.links.forEach((link) => linksData.push(link.print(this.name)))
        return `\"${this.name}\": {${linksData.join(", ")}}`
    }
    valueOf(){
        return this.name;
    }
}

function calcDistance(nodes){
    const path = [nodes.shift()]
    nodes.push(path[path.length - 1])
    let distance = 0
    nodes.forEach((node) => {
        let links = node.links
        let link = links.find((link)=>{return link.secondCity(node) == path[path.length - 1]})
        path.push(node)
        distance += link.weight;
    })
    return distance
}

module.exports = {
    City, calcDistance
};