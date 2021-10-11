<template>
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
    </svg>
</template>

<script>
import * as d3 from 'd3'
import { fetchData} from './data-vue'
export default {
    data () {
        return {
            width: 200,
            height: 40,
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
        }
    }
}
</script>