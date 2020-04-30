import React, { createRef, Component } from "react";
import * as d3 from "d3";

class PieClass extends Component {
    constructor(props) {
        super(props);
        this.ref = createRef();
        this.createPie = d3
            .pie()
            .value(d => d.value)
            .sort(null);
        this.createArc = d3
            .arc()
            .innerRadius(props.innerRadius)
            .outerRadius(props.outerRadius);
        this.colors = d3.scaleOrdinal(d3.schemeCategory10);
        this.format = d3.format(".0%");
    }
    componentDidMount() {
        const svg = d3.select(this.ref.current);
        const data = this.createPie(this.props.data);
        const { width, height, innerRadius, outerRadius } = this.props;

        svg
            .attr("class", "chart")
            .attr("width", width)
            .attr("height", height);

        const group = svg
            .append("g")
            .attr("transform", `translate(${outerRadius} ${outerRadius})`);

        const groupWithEnter = group
            .selectAll("g.arc")
            .data(data)
            .enter();

        const path = groupWithEnter.append("g").attr("class", "arc");

        path
            .append("path")
            .attr("class", "arc")
            .attr("d", this.createArc)
            .attr("fill", (d, i) => this.colors(d.index));

        path
            .append("text")
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .attr("transform", d => `translate(${this.createArc.centroid(d)})`)
            .style("fill", "white")
            .style("font-size", 10)
            .text(d => this.format(d.value));


    }

    componentWillUpdate(nextProps, nextState) {
        const svg = d3.select(this.ref.current);
        const data = this.createPie(nextProps.data);

        const group = svg
            .select("g")
            .selectAll("g.arc")
            .data(data);

        group.exit().remove();

        const groupWithUpdate = group
            .enter()
            .append("g")
            .attr("class", "arc");

        const path = groupWithUpdate.append("path").merge(group.select("path.arc"));

        path
            .attr("class", "arc")
            .attr("d", this.createArc)
            .attr("fill", (d, i) => this.colors(i));

        const text = groupWithUpdate.append("text").merge(group.select("text"));

        text
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .attr("transform", d => `translate(${this.createArc.centroid(d)})`)
            .text(d => this.format(d.value));

        const legendG = groupWithUpdate
            .selectAll(".legend") // note appending it to mySvg and not svg to make positioning easier
            .data(data)
            .enter().append("g")
            .attr("transform", (d,i)=>{
                return "translate(" + (-this.props.width/2) + "," + (i * 30 + 120) + ")"; // place each legend on the right and bump each one down 15 pixels
            })
            .attr("class", "legend");

        legendG.append("rect") // make a matching color rect
            .attr("width", 15)
            .attr("height", 15)
            .attr("fill", (d, i) => this.colors(i));

        legendG.append("text") // add the text
            .text(function(d){
                return d.data.cate;
            })
            .style("font-size", 20)
            .attr("y", 15)
            .attr("x", 30);
    }

    render() {
        return <svg ref={this.ref} />;
    }
}

export default PieClass;
