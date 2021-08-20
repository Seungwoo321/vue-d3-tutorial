<template>
    <div id="app">
        <div style="display:flex;margin:1rem">
            <line-chart></line-chart>
        </div>
        <hr>
        <div style="display:flex;margin:1rem">
            <line-width-missing-data></line-width-missing-data>
            <line-chart></line-chart>
        </div>
        <hr>
        <div style="display:flex;margin:1rem">
            <line-chart></line-chart>
            <line-chart></line-chart>
            <line-chart></line-chart>
        </div>
        <hr>
    </div>
</template>

<script>
import LineChart from './components/Lines/LineChart'
import LineWidthMissingData from './components/Lines/LineWithMissingData.vue'
export default {
    name: 'App',
    components: {
        LineChart,
        LineWidthMissingData
    }
}
</script>

<style>

</style>
