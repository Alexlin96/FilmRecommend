<template>
    <div>
        <!-- 电影详情 -->
        <Row class="stay-item">
            <Col :xs="{ span: 24, offset:0 }" :lg="{ span: 20, offset: 2 }">
                 <Col :xs="{ span: 16, push: 8 }" :lg="{ span: 18, push: 6 }">
                <h1>{{filmInfo.filmname}}
                    <img @click="isLike=!isLike;follow(filmInfo.id)" class="like-img" v-show="isLike" :src="likeSImg">
                    <img @click="isLike=!isLike;follow(filmInfo.id)" class="like-img" v-show="!isLike" :src="likeImg">
                </h1>
                <h2 class="stay-title">{{filmInfo.type}}</h2>
                <h2 class="stay-title">{{filmInfo.area}}/{{filmInfo.duration}}</h2>
                <h2 class="stay-title">{{filmInfo.year}}年上映</h2>
                </Col>
                <Col :xs="{ span: 8, pull: 16 }" :lg="{ span: 6, pull: 18 }">
                    <img class="image-info" :src="filmInfo.picSrc ? '/static/img/'+filmInfo.picSrc :  imagePath" >
                </Col>
            </Col>
        </Row>
        <!-- 播放的影厅 -->
        <Row>
            <table-component @getCurrentNum="getCurrentPageNum" :columns="columns" :tableData="data" :totalCount="totalCount" :page-size="pageSize"></table-component>
        </Row>
        <!-- 影评 -->
        <h1 class="main-title">影评</h1>
        <Row v-for="(item,index) in evaList" class="stay-item">
            <Col :xs="{ span: 24, offset:0 }" :lg="{ span: 18, offset: 2 }">
                <Col :xs="{ span: 13, push: 8 }" :lg="{ span: 14, push: 1 }">
                    <h2 class="stay-title">{{item.userName}}</h2>
                    <p class="stay-content">{{item.content}}</p>
                    <p v-for="(innerItem,innerIndex) in item.reply" :key="innerIndex" class="reply-content">
                        {{innerItem.realname}} 回复：{{innerItem.content}}
                    </p>
                </Col>
                <Col :xs="{ span: 6, push: 8 }" :lg="{ span: 7, push: 1 }">
                    <Rate disabled v-model="item.star"></Rate>
                    <img @click="zan(item.id)" class="zan-img" v-show="item.status=='已点赞'" :src="zanSImg">
                    <img @click="zan(item.id)" class="zan-img" v-show="item.status=='未点赞'" :src="zanImg">
                    <Button @click="reply(item.id)" type="primary">回复</Button>
                </Col>
                <Col :xs="{ span: 4, pull: 16 }" :lg="{ span: 2, pull: 22 }">
                    <img class="user-img" :src="userImg">
                </Col>
            </Col>
        </Row>
        <Row class="write">
            <Row>
                <!-- Rate 星星评分 -->
                <Col :xs="{ span: 24, offset:0 }" :lg="{ span: 18, offset: 4 }">
                    <Rate v-model="starNum"></Rate>
                </Col>
            </Row>
                <!-- 提交评论 -->
            <Col :xs="{ span: 24, offset:0 }" :lg="{ span: 20, offset: 2 }">
                <Col :xs="{ span: 17, push: 0 }" :lg="{ span: 16, push: 2 }">
                    <Input v-model="content" size="large" placeholder="写点儿什么，评论一下吧"></Input>
                </Col>
                <Col :xs="{ span: 1, push: 2 }" :lg="{ span: 1, push: 3 }">
                    <Button @click="evaluate" type="primary" >提交</Button>
                </Col>
            </Col>
        </Row>
    </div>
</template>

<script>
    import requestObj from '../../api/api';
    import commonJS from '../../common/common';
    export default {
        name: "book",
        data(){
          return {
              userImg:require('../../assets/frontend/common/userPhoto.jpg'),
              columns: [
                  {
                      title: '放映时间',
                      key: 'play_time',
                  },
                  {
                      title: '放映厅',
                      key: 'name'
                  },
                  {
                      title: '售价',
                      key: 'price'
                  },
                  {
                      title: '选座购票',
                      key: 'action',
                      width: 150,
                      align: 'center',
                      render: (h, params) => {
                          return h('div', [
                              h('Button', {
                                  props: {
                                      type: 'primary',
                                      size: 'small'
                                  },
                                  style: {
                                      marginRight: '5px'
                                  },
                                  on: {
                                      click: () => {
                                          this.pay(params.row)
                                      }
                                  }
                              }, '选座购票')
                          ]);
                      }
                  }
              ],
              data: [
              ],
              filmInfo:{},
              evaList:[],
              totalCount:100,
              pageSize:10,
              currentPage:1,
	          content:'',
              isLike:false,
              isZan:false,
              likeImg:require("../../assets/frontend/common/like.png"),
              likeSImg:require("../../assets/frontend/common/like-s.png"),
	          zanImg:require("../../assets/frontend/common/zan.png"),
	          zanSImg:require("../../assets/frontend/common/zan-s.png"),
	          starNum:5,
          };
        },
        //创建后
        created(){
            this.initData();
            this.initScreening();
            this.initEvaluation();
        },
        methods:{
        //点赞或者取消赞后触发 向后台返回数据 userC
          zan(id){
            // console.log(id);
          	var self=this;
          	requestObj({
          	    url:'thumbsUp.do',
          	    method:'GET',
          	    params:{
	                criticid:id,
          	    },
          	    success:function (res){
	                self.$Message.success('操作成功');
	                self.initEvaluation();  //再次获取影评数据
          	    },
          	    fail:function (err){
          	        console.log(err);
          	    },
          	});
          },
          //收藏或取消收藏的时候 向后端发送数据  userC
          follow(id){
          	var self=this;
          	requestObj({
          	    url:'userFollow.do',
          	    method:'GET',
          	    params:{
	                filmid:id,
          	    },
          	    success:function (res){
	                self.$Message.success('操作成功');
	                self.initData();
          	    },
          	    fail:function (err){
          	        console.log(err);
          	    },
          	});
          },
          pay(item){
            //跳转到选座页面
            this.$router.push('/pay/'+JSON.stringify(item));
          },
          //获取电影详情数据  Fc
          initData(){
          	var self=this;
          	requestObj({
          	    url:'getFilmById.do',
          	    method:'GET',
          	    params:{
          	        id:self.$route.params.id,
          	    },
          	    success:function (res){
          	        var data=res.data.data;
                    //console.log(data);
          	        self.filmInfo=data;
                    //通过是否存在status为已收藏 则改变isLike的布尔值
          	        if(data.status==='已收藏'){
          	        	self.isLike=true;
                    }else{
	                    self.isLike=false;
                    }
          	    },
          	    fail:function (err){
          	        console.log(err);
          	    },
          	});
          },
          //获取影厅播放详情 TC
          initScreening(){
	          var self=this;
	          requestObj({
		          url:'getTicketPageInfo.do',
		          method:'GET',
		          params:{
			          pageCurrent:self.currentPage,
			          pageSize:self.pageSize,
			          filmid:self.$route.params.id,
		          },
		          success:function (res){
			          var data=res.data.data.rows;
			          data.forEach(item=>{
			          	item.play_time=commonJS.formatDate(new Date(item.play_time),'yyyy-MM-dd hh:mm:ss');
                      });
			          self.totalCount=res.data.data.total;
			          self.data=data;
		          },
		          fail:function (err){
			          console.log(err);
		          },
	          });
          },
          //获取影评数据 FCC
          initEvaluation(){
            var self=this;
            requestObj({
                url:'getTFilmCriticPageInfo.do',
                method:'GET',
                params:{
	                pageCurrent:1,
	                pageSize:10,
                    filmid:self.$route.params.id,
                },
                success:function (res){
                    var data=res.data.data.rows;
                    self.evaList=data;
                },
                fail:function (err){
                    console.log(err);
                },
            });
          },
          //获取影厅信息
          getCurrentPageNum(num){
            this.currentPage=num;
            this.initScreening();
          },
          //提交评论数据到后台 FC
          evaluate(){
          	var self=this;
          	if(self.content){
	            requestObj({
		            url:'saveTFilmCritic.do',
		            method:'GET',
		            params:{
			            userId:sessionStorage.getItem('userID'),
			            filmid:self.$route.params.id,
			            content:self.content,
			            star:self.starNum,
		            },
		            success:function (res){
			            self.$Message.success('评论成功');
			            self.initEvaluation();
		            },
		            fail:function (err){
			            console.log(err);
		            },
	            });
            }else{
	            self.$Message.success('评论内容不能为空');
            }
          },
          //点击回复触发 向后台提交回复的数据  FCC
          reply(id) {
		        var self=this;
		        this.$Modal.confirm({
			        title:'回复',
			        onOk:function (){
				        requestObj({
					        url:'saveTReply.do',
					        method:'GET',
					        params:{
						        criticid:id,
						        content:self.replyContent,
					        },
					        success:function (res){
						        self.$Message.success('回复成功');
						        self.initEvaluation();
					        },
					        fail:function (err){
						        console.log(err);
					        },
				        });
			        },
                    //弹出页面 
			        render: (h) => {
				        return h('Input', {
					        props: {
						        value: this.value,
						        autofocus: true,
						        placeholder: '请输入你的回复'
					        },
					        on: {
						        input: (val) => {
							        self.replyContent = val;
						        }
					        }
				        })
			        }
		        })
	        }
        },
	    filters:{

        },
    }
</script>

<style scoped  lang="scss"  > 
h2{
    color:#333333;
    font-size:16px;
}
    .like-img{
        width:20px;
    }
    .zan-img{
        width:20px;
        vertical-align: middle;
        margin-right:10px;
    }
    .reply-content{
        font-size: 14px;
        color: #999999;
        margin-left:30px;
    }
    .image-info{
    display: block;
    width: 230px;
    height: 120px;
}
</style>