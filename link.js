class Link{
    constructor(cityA, cityB, weight){
        this.cityA = (cityA > cityB) ? cityA : cityB
        this.cityB = (cityA > cityB) ? cityB : cityA
        this.weight = weight
    }
    has(city){
        return (city.name === this.cityA.name) || (city.name === this.cityB.name)
    }
    secondCity(city){
        return (city.name === this.cityA.name) ? this.cityB : this.cityA
    }
    print(name){
        if (name === undefined){
            return `\"${(name === this.cityA.name) ? this.cityB.name: this.cityA.name}\": ${this.weight}`
        }
        else{
            return `\"${this.cityA.name}-${this.cityB.name}\": ${this.weight}`
        }
    }
}

module.exports = {
    Link
};