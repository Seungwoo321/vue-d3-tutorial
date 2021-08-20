<template>
    <div id="app">
        <!-- 1. Lines -->
        <div style="display:flex;margin:1rem">
            <line-chart></line-chart>
            <line-width-missing-data></line-width-missing-data>
        </div>
        <hr>
        <!-- 2. Areas -->
        <div style="display:flex;margin:1rem">
            <area-chart></area-chart>
            <area-with-missing-data></area-with-missing-data>
        </div>
        <hr>
        <!--  -->
        <!-- <div style="display:flex;margin:1rem">
            <line-chart></line-chart>
            <line-chart></line-chart>
            <line-chart></line-chart>
        </div>
        <hr> -->
    </div>
</template>

<script>
import LineChart from './components/Lines/LineChart'
import LineWidthMissingData from './components/Lines/LineWithMissingData'
import AreaChart from './components/Areas/AreaChart'
import AreaWithMissingData from './components/Areas/AreaWithMissingData'
export default {
    name: 'App',
    components: {
        // Lines
        LineChart,
        LineWidthMissingData,

        // Areas
        AreaChart,
        AreaWithMissingData
    }
}
</script>

<style>

</style>
