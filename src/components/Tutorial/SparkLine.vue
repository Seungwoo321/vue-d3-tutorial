<template>
    <div class="downloads">
        <h3 class="downloads--title">
            {{ downloadTitle }}
        </h3>
        <div class="downloads--container">
            <svg
                class="sparkline"
                :width="width"
                :height="height"
                stroke-width="3"
                stroke="#8956FF"
                fill="rgba(137, 86, 255, .2)"
            >
                <path
                    class="sparkline--fill"
                    stroke="none"
                    :d="area(weeklyDownloads)"
                >
                </path>
                <path
                    class="sparkline--line"
                    fill="none"
                    :d="line(weeklyDownloads)"
                >
                </path>
                <line class="sparkline--cursor" :x1="lineX" :x2="lineX" y1="0" y2="40" stroke-width="2"></line>
                <circle class="sparkline--spot" :cx="cx" :cy="cy" r="2"></circle>
                <rect
                    class="sparkline--interaction-layer"
                    style="fill: transparent; stroke: transparent"
                    :width="width"
                    :height="height"
                    @mousemove="mousemoveHandler"
                    @mouseout="mouseoutHandler"
                ></rect>
            </svg>
            <p class="downloads--count">
                {{ downloadValue || weeklyDownloads[weeklyDownloads.length - 1].value }}
            </p>
        </div>
    </div>
</template>

<script>
import * as d3 from 'd3'
import { fetchData} from './data-vue'
export default {
    data () {
        return {
            width: 200,
            height: 40,
            lineX: -1000,
            cx: -1000,
            cy: -1000,
            downloadTitle: 'Weekly Downloads',
            downloadValue: 0
        }
    },
    computed: {
        weeklyDownloads () {
            return fetchData()
        },
        xScale () {
            return d3.scaleLinear()
                .domain([0, this.weeklyDownloads.length])
                .range([8, this.width])
        },
        yScale () {
            return d3.scaleLinear()
                .domain([0, d3.max(this.weeklyDownloads, d => d.downloads)]).nice()
                .range([this.height, 5])
        },
        line () {
            return d3.line()
                .x((d, i) => this.xScale(i))
                .y(d => this.yScale(d.downloads))
        },
        area () {
            return d3.area()
                .x((d, i) => this.xScale(i))
                .y0(this.yScale(0))
                .y1(d => this.yScale(d.downloads))
        },
        xPoint () {
            return this.weeklyDownloads.map((d, i) => this.xScale(i))
        },
        yPoint () {
            return this.weeklyDownloads.map(d => this.yScale(d.downloads))
        },
    },
    methods: {
        hideCusor () {
            this.lineX = -1000
            this.cx = -1000
            this.cy = -1000
        },
        resetText () {
            this.downloadTitle = 'Weekly Downloads'
            this.downloadValue = 0
        },
        mousemoveHandler (event) {
            const pointIndex = this.xPoint.findIndex(d => event.layerX <= d)
            if (pointIndex < 0) {
                this.hideCusor()
                this.resetText()
            } else {
                this.lineX = this.xPoint[pointIndex]
                this.cx = this.xPoint[pointIndex]
                this.cy = this.yPoint[pointIndex]
    
                this.downloadTitle = this.weeklyDownloads[pointIndex].label
                this.downloadValue = this.weeklyDownloads[pointIndex].value
            }
        },
        mouseoutHandler () {
            this.hideCusor()
            this.resetText()
        }
    }
}
</script>

<style scoped>
.downloads {
    width: 390px;
}
.downloads--title {
    margin-top: 0.5rem;
    margin-bottom: 0;
    font-size: 1rem;
    color: #757575;
}
.downloads--container {
    display: flex;
    align-items: flex-end;
    flex-direction: row-reverse;
    border-bottom: 2px solid rgba(137, 86, 255, .2);
}
.sparkline {
    margin-right: -4px;
}
.downloads--count {
    flex: 1 1 auto;
    padding-bottom: .25rem; 
    padding-right: .5rem;
    margin: 0;
    font-weight: 600;
    font-size: 1rem;
}
</style>