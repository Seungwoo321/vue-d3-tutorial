<template>
    <svg :viewBox="`0, 0, ${width}, ${height}`">
        <g
            class="xAxis"
            :transform="`translate(0, ${height - margin.bottom})`"
            fill="none"
            font-size="10"
            font-family="sans-serif"
            text-anchor="middle"
        >
            <path class="doamin" stroke="currentColor" :d="domainPath"></path>
            <template v-for="(d, i) in chartData">
                <g
                    v-if="i % 80 === 0"
                    :key="`xAxis-tick-${i}`"
                    class="tick"
                    opacity="1"
                    :transform="`translate(${x(d.date)},0)`"
                >
                
                    <line stroke="currentColor" y2="6"></line>
                    <text fill="currentColor" y="9" dy="0.71em">
                        <!-- {{ d }} -->
                    </text>
                </g>
            </template>
        </g>
        <g
            class="yAxis"
            :transform="`translate(${margin.left}, 0)`"
        >

        </g>
        <path
            :d="chartPath"
            fill="none"
            stroke="steelblue"
            :stroke-width="1.5"
            stroke-linejoin="round"
            stroke-linecap="round"
        ></path>
    </svg>
</template>

<script>
import * as d3 from 'd3'
import data from './data.json'
// import { get } from 'vue/composition-api'
export default {
    data () {
        return {
            width: 1152,
            height: 500,
            margin: {
                top: 20,
                right: 30,
                bottom: 30,
                left: 40
            }
        }
    },
    mounted () {
        console.log(this.xAxis(1))
    },
    computed: {
        yValues () {
            return this.chartData.map(d => d.value)
        },
        xAxis () {
            return d3.axisBottom().scale(this.x)
        },
        yAxis () {
            return d3.axisLeft(this.y)
        },
        domainPath () {
            return `M${this.margin.left},0H${this.width - this.margin.left}`
        },
        chartPath () {
            return this.line(this.chartData)
        },
        chartData () {
            return Object.assign(data.map(({ date, value }) => ({ date: new Date(date), value })))
        },
        x () {
            return d3.scaleUtc()
                .domain(d3.extent(this.chartData, d => d.date))
                .range([this.margin.left, this.width - this.margin.right])
        },
        y () {
            return d3.scaleLinear()
                .domain([0, d3.max(this.chartData, d => d.value)]).nice()
                .range([this.height - this.margin.bottom, this.margin.top])
        },
        line () {
            return d3.line()
                .defined(d => !isNaN(d.value))
                .x(d => this.x(d.date))
                .y(d => this.y(d.value))
        }
    }
}
</script>

<style>

</style>