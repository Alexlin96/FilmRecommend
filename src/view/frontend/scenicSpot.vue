<template>
    <div>
        <!-- 正在上映模块 -->
        <div class="nowplaying" >
            <h1><span>正在上映</span></h1>
            <Row>
                <Col class="index-list" v-for="(item,index) in nowList" :key="item.id" :xs="{ span: 24, offset:0 }" :lg="{ span: 6, offset: index%3===0?0:3 }">
                <div @click="toBook(item)">
                        <img class="film-img" :src="item.picSrc ? '/static/img/'+item.picSrc :  imagePath"   >
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
        </div>
         <!-- 即将上映模块 -->
        <div class="comingsoon" >
            <h1><span>即将上映</span></h1>
            <Row>
                <Col class="index-list" v-for="(item,index) in lateList" :key="item.id" :xs="{ span: 24, offset:0 }" :lg="{ span: 6, offset: index%3===0?0:3 }">
                <div @click="toBook(item)">
                        <img class="film-img" :src="item.picSrc ? '/static/img/'+item.picSrc :  imagePath"   >
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
        </div>
        <!-- 热播影片模块 -->
        <div class="hotplay" >
            <h1><span>热播影片</span></h1>
            <Row>
                <Col class="index-list" v-for="(item,index) in hotList" :key="item.id" :xs="{ span: 24, offset:0 }" :lg="{ span: 6, offset: index%3===0?0:3 }">
                <div @click="toBook(item)">
                        <img class="film-img" :src="item.picSrc ? '/static/img/'+item.picSrc :  imagePath"   >
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
        </div> 
    </div>
</template>

<script>
    import requestObj from '../../api/api';
    export default {
        name: "scenic-spot",
        data(){
            return {
                nowList:[],
                lateList:[],
                hotList:[],
            };
        },
        created(){
            this.initNowData(); //正在上映
            this.initLateData(); //即将上映
            this.initHotData();  //热播影片
        },
        methods:{
            //获取正在上映的电影数据   FC
            initNowData(){
                var self=this;
                requestObj({
                    url:'getFilmPageInfo.do',  
                    method:'GET',
                    params:{
                        pageCurrent:1,
                        pageSize:10,
                        bigType:'正在上映',
                    },
                    success:function (res){
                        var data=res.data.data.rows;
                        self.nowList=self.remove('正在上映', data);;
                    },
                    fail:function (err){
                        console.log(err);
                    },
                });
            },
            //获取即将上映的电影数据
            initLateData(){
                var self=this;
                requestObj({
                    url:'getFilmPageInfo.do',
                    method:'GET',
                    params:{
                        pageCurrent:1,
                        pageSize:10,
                        bigType:'即将上映',
                    },
                    success:function (res){
                        var data=res.data.data.rows;
                        self.lateList=self.remove('即将上映', data);
                    },
                    fail:function (err){
                        console.log(err);
                    },
                });
            },
            //获取热播影片的电影数据
            initHotData(){
                var self=this;
                requestObj({
                    url:'getFilmPageInfo.do',
                    method:'GET',
                    params:{
                        pageCurrent:1,
                        pageSize:10,
                        bigType:'热播影片',
                    },
                    success:function (res){
                        var data=res.data.data.rows;
                        self.hotList=self.remove('热播影片', data);
                    },
                    fail:function (err){
                        console.log(err);
                    },
                });
            },
	        toBook(item){
		        this.$router.push('/book/'+item.id);
            },
            //对于后台返回数据进行筛选 返回需要的数据
            remove(bigType, data){
                let result = [];
                for(var i = 0; i < data.length;i++){
                    if(data[i].bigtype == bigType){
                        result.push(data[i]);
                    }
                }
                return result;
            }
        },
    }
</script>

<style scoped>
.nowplaying{
    padding: 15px;
   background: #191919;
}
.nowplaying h1 span{
    background: #191919;
}
.comingsoon{
    padding: 15px;
    background: seagreen;
}
.comingsoon h1 span {
     background: seagreen;
}
.hotplay{
     padding: 15px;
    background: skyblue;
}
.hotplay h1 span {
     background: skyblue;
}
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
    .film-img{
        width:100%;
        height:200px;
    }
</style>