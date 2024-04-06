# 🌍 Traveling Salesman Problem 🦆
Trying to solve the Travelling Salesman Problem, which involves finding the optimal route among a set of cities. In this case, we have 16 cities.

## 🛠️ Approach
In order to find the optimal route, I implemented the Christofides algorithm. The algorithm works by first creating a Minimal Spanning Tree, then identifying odd degree vertices to create a multigraph. Next, I removed any repeated nodes (Eulerian Tour) and applied the two-opt method to further optimize the solution.
### Details
For detailed descriptions of the functions used in this project, please refer to [functions.md](functions.md).

## 📥 Input
The program takes as input a list of cities and their connections from the `topology.txt` file.

## 📤 Output
The program outputs the distance of the shortest path found, connecting all cities while visiting each city only once.

## 💻 Usage
To run the program, follow these steps:
1. Place your `topology.txt` file containing city connections in the appropriate directory.
2. Run the program with the appropriate command, specifying any required arguments.
Use `npm start` or directly with: `node ./index.js`.
