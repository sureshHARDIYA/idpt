import React, {Component} from "react";
import Graph from "react-graph-vis";
import CasedGraph from "../../modules/cased/graph/casedGraph";


const nodes = [
    {id: 1, group: "g1", label: "Node 1"},
    {id: 2, group: "g1", label: "Node 2"},
    {id: 3, group: "g2", label: "Node 3"},
    {id: 4, group: "g2", label: "Node 4"},
    {id: 5, group: "g2", label: "Node 5"},
];

const edges = [
    {id: 1, from: 1, to: 2},
    {id: 2, from: 1, to: 3},
    {id: 3, from: 3, to: 4},
    {id: 4, from: 3, to: 5},
    {id: 5, from: 5, to: 3},
    {id: 6, from: 2, to: 3},
];

const data = {nodes, edges};

const options = {
    autoResize: true,
    height: "500px",
    edges: {
        color: "#000000",
        width: 1,
    },
    nodes: {
        shape: "box",
    },
    groups: {
        useDefaultGroups: true,
    },
    layout: {
        hierarchical: false,
    },
    interaction: {
        //dragNodes: true,
        hover: true,
    },
};

const events = {
    select: function (event) {
        let {nodes, edges} = event;
        console.log(nodes + ", " + edges)
        console.log(CasedGraph.testFunction())
    }
};

export default class HomeCaseGraph extends Component {
    render() {
        return (
            <Graph
                graph={data}
                options={options}
                events={events}
            />
        );
    }
}
