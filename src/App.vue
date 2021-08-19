<template>
    <div id="app">
        <div style="display:flex;margin:1rem">
            <line-chart></line-chart>
        </div>
        <hr>
        <div style="display:flex;margin:1rem">
            <line-chart></line-chart>
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
import LineChart from './components/LineChart'
export default {
    name: 'App',
    components: {
        LineChart
    }
}
</script>

<style>

</style>
