<template>
    <!-- 前台页面显示 -->
    <div v-if="deviceType===1" class="layout">
        <Layout>
            <Header >
            <!-- 通过事件 on-select 可以得到点击菜单的 name 值，从而控制页面路由或自定义操作。 -->
                <Menu mode="horizontal" theme="dark" @on-select="toRouter" :active-name="navList[0].path" accordion>
                    <div class="layout-nav">
                        <div v-for="(item,index) in navList" :key="index">
                            <MenuItem v-if="!item.children" :name="item.path">
                                <Icon type="navigate"></Icon>
                                {{item.title}}
                            </MenuItem>
                            <Submenu v-else :name="item.path">
                                <template slot="title">
                                    <Icon type="navigate"></Icon>
                                    {{item.title}}
                                </template>
                                <MenuItem v-for="(innerItem,innerIndex) in item.children" :key="innerIndex" :name="innerItem.path">{{innerItem.title}}</MenuItem>
                            </Submenu>
                        </div>
                    </div>
                </Menu>
            </Header>
            <Content>
                <Card class="center-content">
                    <slot name="content"></slot>
                </Card>
            </Content>
            <Footer class="layout-footer-center">2018-2019 &copy; ALEX电影系统</Footer>
        </Layout>
    </div>
</template>

<script>
    import commonJS from '../common/common';
    export default {
        name: '',
        data() {
            return {
                title:'电影',
                navList:[{
                    title:'首页',
                    path:'',
                },{
                    title:'精彩电影',
                    path:'scenicSpot',
                },{
	                title:'电影推荐',
	                path:'recommend',
                },{
                    title:'电影查询',
                    path:'route',
                },{
                    title:'用户',
                    path:'food',
                },],
                selectedIndex:0,
                selectedMobileIndex:0,
                selectedChildrenIndex:0,
                deviceType:1,//1为PC前台展示
            }
        },
        watch:{
            selectedMobileIndex(){
                this.$router.push("/"+this.navList[this.selectedMobileIndex].path);
            },
            selectedChildrenIndex(){
                this.$router.push("/"+this.navList[this.selectedMobileIndex].children[this.selectedChildrenIndex].path);
            },
        },
        methods: {
            toRouter(path){
                this.$router.push("/"+path);
            },
            showChildren(item,index){
                item.isShowChildren=true;
                this.navList.splice(index,1,item);
            },
            hideChildren(item,index){
                item.isShowChildren=false;
                this.navList.splice(index,1,item);
            },
        },
        created() {

        },
    }
</script>

<style>

</style>
