<template>
    <div>
        <!-- 电影信息 -->
        <Row class="stay-item">
            <Col :xs="{ span: 24, offset:0 }" :lg="{ span: 20, offset: 2 }">
            <Col :xs="{ span: 15, push: 8 }" :lg="{ span: 18, push: 6 }">
            <h1>{{screeningInfo.filmname}}</h1>
            <h2 class="stay-title">影厅：{{screeningInfo.name}}</h2>
            <h2 class="stay-title">场次：{{screeningInfo.play_time}}</h2>
            <h2 class="stay-title">票价：¥{{screeningInfo.price}}/张</h2>
            </Col>
            <Col :xs="{ span: 8, pull: 16 }" :lg="{ span: 6, pull: 18 }">
                <img class="image-info" :src=" screeningInfo.pic_src ? '/static/img/'+screeningInfo.pic_src :  imagePath"  >
            </Col>
            </Col>
        </Row>
        <!-- 分割线 -->
        <p class="line"></p>
        <!-- 座位显示图 -->
        <Row class="write">
            <Col>
                <!-- 巨幕 -->
                <img class="scene" :src="scene">
            </Col>
            <Col :xs="{ span: 24, offset:0 }" :lg="{ span: 20, offset: 2 }">
                <ul class="seat-list">
                    <li v-for="(item,index) in seatList" :key="index">
                        <!-- 红色是不可选的 -->
                        <img v-if="item.isOtherSelected" class="seat-img" :src="seatS">
                        <img v-else-if="item.isSelected" @click="selectSeat(item)" class="seat-img" :src="seatS">
                        <img v-else @click="selectSeat(item)" class="seat-img" :src="seat">
                    </li>
                </ul>
            </Col>
        </Row>
        <!-- 确认购买 -->
        <Row>
            <Col :xs="{ span: 24, offset:0 }" :lg="{ span: 2, offset: 11 }">
                <Button @click="pay" class="pay-btn" type="success">确认购买</Button>
            </Col>
        </Row>
    </div>
</template>

<script>
    import requestObj from '../../api/api';
    let max=0;
    export default {
        name: "pay",
        data(){
          return {
              seatS:require('../../assets/frontend/common/seat-s.png'),
              seat:require('../../assets/frontend/common/seat.png'),
              scene:require('../../assets/frontend/common/scene.png'),
              seatList:[],
              screeningInfo:{},
              selectSeats:new Set(),
          };
        },
        created(){
          //将url地址中的数据date 赋给screeningInfo 从而获取到购买的电影信息
          this.screeningInfo=JSON.parse(this.$route.params.data);
          //座位数
          max=parseInt(this.screeningInfo.max);
          this.initData();
        },
        methods:{
	        selectSeat(data){
		        this.selectSeats.add(data.id);
		        this.seatList.forEach(item=>{
		        	if(item.id==data.id){
		        		item.isSelected=!item.isSelected;
                    }
                });
            },
            //初始化 获取座位数据 OC
            initData(){
               var self=this;
               //console.log(self.screeningInfo.id);
               requestObj({
                   url:'getRestInfo.do',
                   method:'GET',
                   params:{
	                   screeningsid:self.screeningInfo.id,
                   },
                   success:function (res){
                       var data=res.data.data,
                           totalList=new Array(max),
                           newSeatList=[];
                        for(var i=0;i<totalList.length;i++){
	                        var seatObj={
		                        id:	i,
                                isSelected:false,
	                        };
	                        data.forEach(innerItem=>{
		                        if(innerItem!=''&&innerItem==i){
			                        seatObj.isOtherSelected=true;
		                        }
	                        });
	                        newSeatList.push(seatObj);
                        }
                       self.seatList=newSeatList;
                       //console.log(self.seatList)
                   },
                   fail:function (err){
                       console.log(err);
                   },
               });
            },
            //购当前座位的票
            pay(){
                var self=this;
                if(self.selectSeats.size>0){
	                this.$Modal.confirm({
		                title:'提示',
		                content:'是否确定购买',
		                onOk:function (){
			                requestObj({
				                url:'orderTicket.do',
				                method:'GET',
				                params:{
					                screeningsid:self.screeningInfo.id,
					                position:Array.from(self.selectSeats).join(','),
				                },
				                success:function (res){
					                self.$Message.info('购买成功');
					                self.initData();
				                },
				                fail:function (err){
					                console.log(err);
				                },
			                });
		                },
	                })
                }else{
	                this.$Message.info('您还未选择任何座位');
                }
            },
        },
    }
</script>

<style lang='scss' scoped>
.line{
    margin: 30px auto;
    width: 90%;
    height: 3px;;
    background: #DC143C;
}
.image-info{
    display: block;
    width: 230px;
    height: 120px;
}
h2{
    color:#333333;
    font-size:16px;
}
</style>