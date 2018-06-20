<template>
    <!-- 后台界面 -->
    <div class="layout">
        <Layout>
            <Header class="header-title">
                {{managementTitle}}
                <Button @click="logout" type="ghost" style="color:#ffffff;" class="log-out"><Icon type="log-out"></Icon>退出登录</Button>
            </Header>
            <Row>
                <Col span="4">
                    <Menu @on-select="toRouter" :theme="theme2">
                        <Submenu v-for="(item,index) in managementMenu" :key="index" :name="index">
                            <template slot="title">
                                <Icon type="ios-paper"></Icon>
                                {{item.title}}
                            </template>
                            <MenuItem v-for="(innerItem,innerIndex) in item.children" :key="innerIndex" :name="item.path+'/'+innerItem.path">{{innerItem.title}}</MenuItem>
                        </Submenu>
                    </Menu>
                </Col>
                <Col span="20">
                    <Content class="right-container" :style="{padding: '0 50px'}">
                        <Card class="center-content">
                            <slot name="contentManagement"></slot>
                        </Card>
                    </Content>
                </Col>
            </Row>
            <Footer class="layout-footer-center">2018-2019 &copy; ALEX电影后台管理系统</Footer>
        </Layout>
    </div>
</template>

<script>
    import commonJS from '../common/common';
    export default {
        name: '',
        data() {
            return {
                managementMenu:[{
                    title:'内容管理',
                    path:'management',
                    children:[{
                        title:'电影管理',
                        path:'source',
                    },{
                        title:'影厅管理',
                        path:'message',
                    },{
                        title:'场次管理',
                        path:'screenings',
                    },{
                        title:'用户管理',
                        path:'user',
                    },]
                }],
                theme2: 'light',
                managementTitle:'后台管理系统',
            }
        },
        methods: {
            toRouter(path){
                this.$router.push("/"+path);
            },
            logout(){
            	sessionStorage.clear();
                this.$router.push({path:'/login',query:{title:'后台管理员登录'}});
            }
        },
        created() {

        },
    }
</script>

<style>

</style>
