<template>
    <div class="like" >
         <h1><span>收藏列表</span></h1>
        <Row>
            <Col class="index-list" v-for="(item,index) in nowList" :key="item.id" :xs="{ span: 24, offset:0 }" :lg="{ span: 6, offset: index%3===0?0:3 }">
                <div class="likelist" >
					<img :src="'/static/img/'+item.pic_src"  @click="toBook(item.id)" >
					<h3><Button @click="follow(item.id)" class="index-list-btn" type="primary">取消收藏</Button></h3>
				</div>				
            </Col>
        </Row>
    </div>
</template>

<script>
	import requestObj from '../../api/api';
	export default {
		name: "likeList",
		data(){
			return {
				nowList:[],
			};
		},
		//创建后 
		created(){
			this.initNowData();
		},
		methods:{
			//取消收藏  UC
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
						self.initNowData();
					},
					fail:function (err){
						console.log(err);
					},
				});
			},
			//获取收藏的电影信息数据 UC
			initNowData(){
				var self=this;
				requestObj({
					url:'getUserFollow.do',
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
			//跳转电影详情页
			toBook(item){
				this.$router.push('/book/'+item);
			}
		},
	}
</script>

<style scoped lang="scss" >
.like{
	background: #191919;
}
.likelist{
	img{
		display: block;
		width: 330px;
		height: 200px;
	}
}
	 h1{
		margin-top: 50px;
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
</style>