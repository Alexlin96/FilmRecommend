<template>
    <div>
       <div class="indexpage" >
            <h1><span>电影推荐</span></h1>
            <Row v-if="nowList.length>0">
                <Col class="index-list"  v-for="(item,index) in nowList" :key="item.id" :xs="{ span: 24, offset:0
                }" :lg="{ span: 6, offset: index%3===0?0:3 }">
                    <div @click="toBook(item)">
                        <img class="film-img" :src="item.pic_src ? '/static/img/'+item.pic_src :  imagePath"  >
                        <p>
                            {{item.introduction}}     
                        </p>
                        <h2 class="score" >
                            <span >{{item.filmname}}</span>
                            <span>评分:<b>{{item.score}}</b></span>
                        </h2>
                    </div>
                </Col>
            </Row>
            <Row v-else>
                <Col class="no-data-container" :xs="{ span: 24, offset:0}" :lg="{ span: 16, offset: 4 }">
                    <img class="no-data" :src="noData">
                    <h2>暂无推荐电影哟</h2>
                </Col>
            </Row>
     </div>
    </div>
</template>

<script>
	import requestObj from '../../api/api';
	export default {
		name: "recommend",
        data(){
			return {
				value:1,
				nowList:[],
				noData:require('../../assets/frontend/common/no-data.png'),
			};
		},
		created(){
			this.initNowData();
		},
		methods:{
			initNowData(){
				var self=this;
				requestObj({
					url:'getUserRecommend.do',
					method:'GET',
					params:{
						pageCurrent:1,
						pageSize:10,
					},
					success:function (res){
                        var data=res.data.data;
						self.nowList=data;
					},
					fail:function (err){
						console.log(err);
					},
				});
			},
			toBook(item){
				this.$router.push('/book/'+item.id);
			},
		},
	}
</script>

<style scoped lang='scss' >
    h1{
        font-size: 30px;
        line-height: 38px;
        font-weight: 600;
        position: relative;
        padding: 5px;
        text-align: center;
        color:#ffffff;
    }
    h1::before{
        content: '';
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        right: 0;
        height: 3px;
        background: #FEC400;
    }
    h1 span{
       position: relative;
       padding: 10px;
       background: #191919;
       color: white;
    }
    .indexpage{
        padding: 15px;
        background: #191919;
    }
    .score{
        height: 30px;
        line-height: 30px;
    }
    .score span{
        float: right;
        color:rgb(179, 6, 35);
    }
    .score span b {
        color:red;
    }
    .score span:first-child{
        font-size: 16px;
        float: left;
        color: #747c8c; 
    }
    .swiper{
        height:500px;
        width:100%;
    }
    .demo-carousel img{
        width:100%;
        height:500px;
    }
    .no-data-container{
        text-align: center;
    }
    .film-img{
        width:100%;
        height:200px;
    }
</style>