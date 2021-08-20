<template>
    <div ref="container" class="container">
        <svg class="area-chart">
            <path
                fill="#eee"
                :d="missingPath"
            ></path>
            <path
                fill="steelblue"
                :d="chartPath"
            >
            </path>
            <g
                class="xAxis"
                :transform="`translate(0, ${height - margin.bottom})`"
                fill="none"
                font-size="10"
                font-family="sans-serif"
                text-anchor="middle"
            >
                <g
                    v-for="(v, i) in xTicks"
                    :key="`xAxis-tick-${i}`"
                    class="tick"
                    opacity="1"
                    :transform="`translate(${x(v)},0)`"
                >
                
                    <line stroke="currentColor" y2="6"></line>
                    <text fill="currentColor" y="9" dy="0.71em">
                        {{ parseTime(v) }}
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
                    <text v-if="i === yTicks.length - 1" fill="currentColor" x="3" dy="0.32em" text-anchor="start" font-weight="bold">$ Close</text>
                </g>
            </g>
        </svg>
    </div>
</template>

<script>
import * as d3 from 'd3'
import data from '../../assets/data.json'
export default {
    data () {
        return {
            width: 0,
            height: 0,
            margin: {
                top: 20,
                right: 30,
                bottom: 30,
                left: 40
            }
        }
    },
    computed: {
        svgWidth: {
            get () {
                return this.width
            },
            set (element) {
                this.width = element.getBoundingClientRect().width
            }
        },
        svgHeight: {
            get () {
                return this.height
            },
            set (element) {
                this.height = element.getBoundingClientRect().height
            }
        },
        parseTime () {
            const formatMonth = d3.timeFormat("%B")
            const formatYear = d3.timeFormat("%Y")
            return (date) => {
                if (date.getMonth() === 0) {
                    return formatYear(date)
                } else {
                    return formatMonth(date)
                }
            }

        },
        yTicks () {
            return this.y.ticks()
        },
        xTicks () {
            return this.x.ticks(this.width / 80)
        },
        chartPath () {
            return this.area(this.chartData)
        },
        missingPath () {
            return this.area(this.chartData.filter(this.area.defined()))
        },
        chartData () {
            return Object.assign(data.map(({ date, value }) => ({ date: new Date(date), value: new Date(date).getMonth() < 3 ? undefined : value })))
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
        area () {
            return d3.area()
                .defined(d => !isNaN(d.value))
                .x(d => this.x(d.date))
                .y0(this.y(0))
                .y1(d => this.y(d.value))
        }
    },
    mounted () {
        this.resize()
        window.addEventListener('resize', this.resize)
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.resize)
    },
    methods: {
        resize () {
            this.svgWidth = this.$refs.container
            this.svgHeight = this.$refs.container
        }
    }
}
</script>

<style scoped>
.container {
  height: 0;
  width: 100%;
  padding-top: 30%;
  position: relative;
  max-height: 300px;
}
.area-chart {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
