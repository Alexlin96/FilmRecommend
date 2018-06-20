<template>
    <div :style="'background:url('+bg+') no-repeat;background-size:cover;overflow:hidden;min-height:530px; '">
        <Row class="write">
            <Col :xs="{ span: 10, push: 0 }" :lg="{ span: 6, push: 5 }">
                <Input v-model="filmname" size="large" placeholder="输入电影名称"></Input>
            </Col>
            <Col :xs="{ span: 10, push: 1 }" :lg="{ span: 6, push: 7 }">
                <Select placeholder="请选择电影类型" v-model.sync="type" size="large">
                    <Option v-for="item in typeList" :value="item.title" :key="item.title">{{ item.title }}</Option>
                </Select>
            </Col>
        </Row>
        <Row class="write">
            <Col :xs="{ span: 10, push: 0 }" :lg="{ span: 6, push: 5 }">
            <!-- .sync 修饰符所提供的功能。当一个子组件改变了一个 prop 的值时，这个变化也会同步到父组件中所绑定 -->
                <Select placeholder="请选择电影区域" v-model.sync="area" size="large">
                    <Option v-for="item in areaList" :value="item.title" :key="item.title">{{ item.title }}</Option>
                </Select>
            </Col>
            <Col :xs="{ span: 10, push: 1 }" :lg="{ span: 6, push: 7 }">
                <Select placeholder="请选择电影年代" v-model.sync="year" size="large">
                    <Option v-for="item in yearList" :value="item.title" :key="item.title">{{ item.title }}</Option>
                </Select>
            </Col>
            <Col :xs="{ span: 1, push: 2 }" :lg="{ span: 1, push: 8 }">
                <Button @click="initData" type="primary"  shape="circle" icon="ios-search"></Button>
            </Col>
        </Row> 
        <Row>
            <h1><span>电影列表</span></h1>
            <Col class="index-list"  v-for="(item,index) in list" :key="item.id" :xs="{ span: 24, offset:0
                }" :lg="{ span: 6, offset: index%3===0?0:3 }">
                    <div @click="toBook(item)" class="indexpage">
                        <img class="film-img" :src="item.picSrc ? '/static/img/'+item.picSrc :  imagePath"  >
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
</template>

<script>
    import requestObj from '../../api/api';
    export default {
        name: "route",
        data(){
          return {
	          bg:require('../../assets/frontend/search-bg.jpg'),
              filmname:'',
              typeList:[{
                  title:'不限',
              },{
                  title:'剧情',
              },{
                  title:'动作',
              },{
                  title:'喜剧',
              }],
              type:'',
              areaList:[{
                  title:'不限',
              },{
                  title:'欧美',
              },{
                  title:'日韩',
              },{
                  title:'国产',
              }],
              area:'',
              yearList:[{
                  title:'不限',
              },{
                  title:'2015',
              },{
                  title:'2016',
              },{
                  title:'2017',
              },{
                  title:'2018',
              }],
              year:'',
              list: [],
          };
        },
        created(){
            this.initData();
        },
        methods:{
            //获取电影数据 Fc
            initData(){
                var self=this;
                requestObj({
                    url:'getFilmPageInfo.do',
                    method:'GET',
                    params:{
                        filmname:self.filmname,
                        type:self.type!='不限'?self.type:'',
                        area:self.area!='不限'?self.area:'',
                        year:self.year!='不限'?self.year:'',
                        pageCurrent:1,
                        pageSize:10,
                    },
                    success:function (res){
                        var data=res.data.data.rows;
                        self.list=data;
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

<style scoped>
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
    .film-img{
        width:100%;
        height:200px;
    }
    .indexpage{
        padding: 15px;
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
    h2{
        text-align: center;
        font-size: 20px;
    }
</style>