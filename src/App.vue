<template>
    <div id="app">
        <!-- $route.meta.showNav  从router那传来的一个布尔值 true时相当于进入前台页面 反之则进入后台管理页面 -->
        <!-- 前台页面 -->
        <navs v-if="$route.meta.showNav">
            <router-view slot="content"></router-view>
        </navs>
        <!-- 后台页面 -->
        <NavManagement v-else>
            <router-view slot="contentManagement"></router-view>
        </NavManagement>
    </div>
</template>

<script>
    import Navs from './components/Nav.vue'
    import NavManagement from './components/NavManagement'

    export default {
        components: {
            Navs,
            NavManagement,
        },
        name: 'app',
        data() {
            return {}
        },
        watch: {},
        methods: {

        },
        mounted() {
        }
    }
</script>

<style lang="scss">
    @import 'assets/style.scss';
</style>
