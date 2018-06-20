<template>
    <div :style="'background:url('+bg+') no-repeat;background-size:cover;min-height:675px;overflow:hidden;'">
        <Row class="stay-item">
            <Col :xs="{ span: 24, offset:0 }" :lg="{ span: 20, offset: 2 }">
                <Col :xs="{ span: 15, push: 8 }" :lg="{ span: 21, push: 2 }">
                    <h2 class="stay-title">昵称：{{userInfo.username}}</h2>
                    <h2 class="stay-title">性别：{{userInfo.genger}}</h2>
                    <Button @click="showLikes" type="primary">我的收藏</Button>
                </Col>
                <!-- 退出登录 -->
                <Col :xs="{ span: 1, push: 6 }" :lg="{ span: 1, push: 1 }">
                    <Button @click="logout" type="primary" size="small"><Icon type="log-out"></Icon>退出登录</Button>
                </Col>
                <!-- 头像 -->
                <Col :xs="{ span: 8, pull: 16 }" :lg="{ span: 2, pull: 22 }">
                    <img class="user-img" :src="userImg">
                </Col>
            </Col>
        </Row>
        <h1 class="main-title">订单列表</h1>
        <Row>
            <!-- totalCount 数据总条数 -->
            <table-component @getCurrentNum="getCurrentPageNum" :columns="columns" :tableData="datalist" :totalCount="totalCount" :page-size="pageSize"  ></table-component>
        </Row>
    </div>
</template>

<script>
    import requestObj from '../../api/api';
    export default {
        name: "food",
        data(){
            return {
	            bg:require('../../assets/frontend/c-bg.jpg'),
                userImg:require('../../assets/frontend/common/userPhoto.jpg'),
                columns: [
                    {
                        title: '电影名称',
                        key: 'filmname',
                    },
                    {
                        title: '时间',
                        key: 'buytime'
                    },
                    {
                        title: '金额',
                        key: 'price'
                    },
                ],
                datalist: [],
                userInfo:{},
                totalCount:100,
                pageSize:10,
                currentPage:1,
            };
        },
        created(){
        //页面创建完成后 如果用户未登录则跳转到登录页面
          if(sessionStorage.getItem('userID')){
              this.initData();
              this.initLogs();
          }else{
              this.$router.push('/login');
          }
        },
        methods:{
	        showLikes(){
                //将当前用户的id通过push传过去 达到不同用户不同的显示页面的效果
                //sessionStorage.getItem('userID')  ===    userInfo.id
                this.$router.push('/likeList/'+sessionStorage.getItem('userID'));
            },
            //获取用户数据  UC 
            initData(){
                var self=this;
                requestObj({
                    url:'getUserInfo.do',
                    method:'GET',
                    params:{

                    },
                    success:function (res){
                        var data=res.data.data;
                        
                        self.userInfo=data;
                    },
                    fail:function (err){
                        console.log(err);
                    },
                });
            },
            getCurrentPageNum(num){
                this.currentPage=num;
                this.initLogs();
            },
            //获取订单信息  OC
            initLogs(){
              var self=this;
              requestObj({
                  url:'getOrderPageInfo.do',
                  method:'GET',
                  params:{
                      pageCurrent:self.currentPage,
                      pageSize:self.pageSize,
                  },
                  success:function (res){
                      var data=res.data.data.rows;
                      console.log(data);
                      //获取total总个数  
                      self.totalCount=res.data.data.total;
                      //获取订单数据  rows数据
                      self.datalist=data;
                  },
                  fail:function (err){
                      console.log(err);
                  },
              });
            },
            //注销登录
            logout(){
                var self=this;
                requestObj({
                    url:'logout.do',
                    method:'GET',
                    params:{
                    },
                    success:function (res){
                        //localStorage.setItem("userID",res.data.data.id);
                        //sessionStorage 会话存储 当浏览器页面关闭后才会消失
                        sessionStorage.removeItem('userID');
                        self.$router.push('/login');
                    },
                    fail:function (err){
                        console.log(err);
                    },
                });
              //把本地的localStorage删除 达到清除浏览器用户登录的效果
            //   sessionStorage.removeItem('userID');
            //   this.$router.push('/login');
            },
        }
    }
</script>

<style scoped>
    .stay-item{
        margin-top:20px;
    }
</style>