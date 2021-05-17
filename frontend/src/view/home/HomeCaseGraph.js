import React, {Component} from "react";
import Graph from "react-graph-vis";


const nodes = [
  {id: 1, group: "g1", shape: "ellipse", label: "Node 1", x: 0, y: 0},
  {id: 2, group: "g1", hidden: false, label: "Node 2", x: 0, y: 200},
  {id: 3, group: "g2", label: "Node 3", x: 200, y: 0},
  {id: 4, group: "g2", label: "Node 4", x: 200, y: 200},
  {id: 5, group: "g3", label: "Node 5", x: 400, y: 0},
  {id: 6, group: "g4", label: "Node 6", x: 600, y: 0},
];
/*
Desired elements in an case-node:
- id (idField)                          - id
- name (stringField)                    - label
- status (enumeratorField)              - hidden ("ACTIVE" = false, "INACTIVE" = true, "DRAFT" = true)
- modules (relationToManyField)         - NEW GRAPH

Desired elements in a module-node:
- id (idField)                          - id
- name (stringField)                    - label
- status (enumeratorField)              - hidden ("ACTIVE" = false, "INACTIVE" = true, "DRAFT" = true)
- tasks (relationToManyField)           - NEW GRAPH
- prerequisite (relationToManyField)    - edge from that to this

Desired elements in a task-node:
- id (idField)                          - id
- name (stringField)                    - label
- status (enumeratorField)              - hidden ("ACTIVE" = false, "INACTIVE" = true, "DRAFT" = true)
- completionRequired (booleanField)     - shape (true = "box", false = "ellipse")
- prerequisite (relationToManyField)    - edge from that to this
 */

const edges = [
  {id: 1, from: 1, to: 2},
  {id: 2, from: 1, to: 3},
  {id: 3, from: 3, to: 4},
  {id: 4, from: 3, to: 5},
  {id: 5, from: 5, to: 3},
  {id: 6, from: 2, to: 3},
];

const data = {nodes, edges};

let options = {
  autoResize: true,
  height: "500px",
  edges: {
    color: "#000000",
    width: 1,
    /*
    smooth: { // Removing smoothness, results in straight lines (horizonal / vertical / diagonal)

        enabled: true,
        type: "curvedCW",
        forceDirection: "vertical",
        roundness: .3
    },/**/
  },
  nodes: {shape: "box"},
  interaction: {hover: true},
  physics: {
    enabled: true, // This must be false to use manual positioning for nodes
    stabilization: { // Force the graph to stabilize before being shown
      enabled: true,
      iterations: 5000
    }
  },
};

const events = {
  select: function (event) {
    let {nodes, edges} = event;
    console.log(nodes + ", " + edges)
  },
  /*stabilizationIterationsDone: function () {
      console.log("FINISHED STABILIZATION")

      const response = CasedService.graph();
      console.log(response)
      //this.options.physics = false;
  }*/
};

export default class HomeCaseGraph extends Component {
  render() {
    return (
      <React.Fragment>
        <Graph
          graph={data}
          options={options}
          events={events}
        />
      </React.Fragment>
    );
  }
}