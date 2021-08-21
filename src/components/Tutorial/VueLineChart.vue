<template>
    <svg :width="width" :height="height">
        <path fill="none" stroke="#76BF8A" stroke-width="3" :d="path"></path>
         <g
                class="xAxis"
                :transform="`translate(0, ${height - margin.bottom})`"
                fill="none"
                font-size="10"
                font-family="sans-serif"
                text-anchor="middle"
            >
            <path class="doamin" stroke="currentColor" :d="`M${x(xTicks[0])},0H${x(xTicks[xTicks.length - 1])}`"></path>
            <g
                v-for="(v, i) in xTicks"
                :key="`xAxis-tick-${i}`"
                class="tick"
                opacity="1"
                :transform="`translate(${x(v)},0)`"
            >
            
                <line stroke="currentColor" y2="6"></line>
                <text fill="currentColor" y="9" dy="0.71em">
                    {{ v }}
                </text>
            </g>
        </g>
        <g
            class="yAxis"
            :transform="`translate(${margin.left}, 0)`"
            fill="none"
            font-size="10"
            font-family="sans-serif"
            text-anchor="end"
        >
            <path class="doamin" stroke="currentColor" :d="`M-6,${y(yTicks[0])}H0V${y(yTicks[yTicks.length - 1])}H-6`"></path>
            <g
                v-for="(v, i) in yTicks"
                :key="`xAxis-tick-${i}`"
                class="tick"
                opacity="1"
                :transform="`translate(0,${y(v)})`"
            >
                <line stroke="currentColor" x2="-6"></line>
                <text fill="currentColor" x="-9" dy="0.32em">
                    {{ v }}
                </text>
            </g>
        </g>
    </svg>
</template>

<script>
import * as d3 from 'd3'
export default {
    data () {
        return {
            data: [90, 72, 75, 25, 10, 92],
            width: 500,
            height: 300,
            margin: {
                top: 20,
                right: 20,
                bottom: 40,
                left: 40
            }
        }
    },
    computed: {
        yTicks () {
            return this.y.ticks()
        },
        xTicks () {
            return this.x.ticks(this.data.length)
        },
        path () {
            return this.line(this.data)
        },
        line () {
            return d3.line()
                .x((d, i) => this.x(i))
                .y(d => this.y(d))
        },
        x () {
            return d3.scaleLinear()
                .range([this.margin.left, this.width - this.margin.right])
                .domain(d3.extent(this.data, (d, i) => i))
        },
        y () {
            return d3.scaleLinear()
                .range([this.height - this.margin.bottom, this.margin.top])
                .domain([0, 100])
        }
    }
}
</script>

<style>

</style>