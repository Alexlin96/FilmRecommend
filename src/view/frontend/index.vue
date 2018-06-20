<template>
    <div>
        <Carousel class="swiper" 
        v-model="value" 
        :loop="setting.loop"  
        :autoplay="setting.autoplay"
        :autoplay-speed="setting.autoplaySpeed"
        :dots="setting.dots"
        :radius-dot="setting.radiusDot"
        :trigger="setting.trigger"
        :arrow="setting.arrow" >
            <CarouselItem>
                <div class="demo-carousel">
                    <img :src="l1">
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel">
                    <img :src="l2">
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel">
                    <img :src="l3">
                </div>
            </CarouselItem>
             <CarouselItem>
                <div class="demo-carousel">
                    <img :src="l4">
                </div>
            </CarouselItem>
        </Carousel>
        <div class="nowhot" >
            <h4>今日热点</h4>
            <div class="customnav" >
                <i></i>
                <dl>
                    <dd>时光对话</dd>
                    <dd>产业聚焦</dd>
                    <dd>电影情报</dd>
                    <dd>全球动态</dd>
                </dl>
            </div>
            <div class="newlist fix" >
                <dl class="newspart" >
                    <dd  v-for="(item) in newhot" :key="item.id" >
                        <div class="newsitem" >
                            <img :src="item.imgs" >
                            <h3>{{item.title}}</h3>
                            <p>{{item.message}}</p>
                        </div>
                    </dd>
                </dl>
            </div>
            <p class="viewmore" @click="sort()" >换一批看看</p>
        </div>
        <div class="movielst" >
            <h4>电影精选</h4>
            <div class="customnav" >
                <i></i>
                <dl>
                    <dd>电影指南</dd>
                    <dd>特约影片</dd>
                    <dd>获奖影片</dd>
                    <dd>实时票房</dd>
                </dl>
            </div>
            <dl class="movietype" >
                <dd v-for="(item) in movielist" :key="item.id" >
                    <img :src="item.imgs">
                    <p>{{item.title}}</p>
                </dd>
            </dl>
        </div>
        <div class="indexpage" >
            <h1><span>电影推荐</span></h1>
            <Row v-if="list.length>0">
                <Col class="index-list"  v-for="(item,index) in list" :key="item.id" :xs="{ span: 24, offset:0
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
        name: "index",
        data(){
          return {
            movielist :[
                {
                    id : '01',
                    imgs :'../../../static/img/movielist/x1.jpeg',
                    title:'芬芳年华'
                },
                {
                    id : '02',
                    imgs :'../../../static/img/movielist/x2.jpg',
                    title:'龙门飞甲'
                },
                {
                    id : '03',
                    imgs :'../../../static/img/movielist/x3.jpg',
                    title:'星球大战'
                },
                {
                    id : '04',
                    imgs :'../../../static/img/movielist/x4.jpg',
                    title:'你的名字'
                },
                {
                    id : '05',
                    imgs :'../../../static/img/movielist/x5.jpg',
                    title:'一生所爱'
                },
                {
                    id : '06',
                    imgs :'../../../static/img/movielist/x6.jpeg',
                    title:'无间道'
                },
                {
                    id : '07',
                    imgs :'../../../static/img/movielist/x7.jpg',
                    title:'美女与野兽'
                },
                {
                    id : '08',
                    imgs :'../../../static/img/movielist/x8.jpg',
                    title:'红色情怀'
                },
            ],
            newhot:[
                {
                    id:"01",
                    title:'上海看！"三次元女友"将亮相上影节',
                    imgs:'../../../static/img/newhot/newhot1.jpg',
                    message:'宅男与现充女的恋爱故事中国观众怎么看？'
                },
                {
                    id:"02",
                    title:'现世现报？哈维韦恩斯坦自首了！',
                    imgs:'../../../static/img/newhot/newhot2.jpg',
                    message:'现身纽约警察局 将面临多项强奸指控'
                },
                {
                    id:"03",
                    title:'迅速靠近又消失？这个女人不简单',
                    imgs:'../../../static/img/newhot/newhot3.jpg',
                    message:'《一个小忙》曝预告 好莱坞双娇演对手戏'
                },
                {
                    id:"04",
                    title:'嘉年华"导演文晏:好导演与性别无关',
                    imgs:'../../../static/img/newhot/newhot4.jpg',
                    message:'神奇女侠"导演获"跃动她影"卓越女影人奖'
                },
                {
                    id:"05",
                    title:'王家卫获哈佛大学荣誉博士殊荣',
                    imgs:'../../../static/img/newhot/newhot5.jpg',
                    message:'发表感言：成为爱因斯坦校友，与有荣焉'
                },
                {
                    id:"06",
                    title:'环球影业拿下007电影海外发行权',
                    imgs:'../../../static/img/newhot/newhot6.jpg',
                    message:'对于索尼是一大损失 米高梅负责美国发行'
                },
                {
                    id:"07",
                    title:'DC海王、沙赞新宣传照曝光预告片没影',
                    imgs:'../../../static/img/newhot/newhot7.jpg',
                    message:'外国网友Cos海后你最喜欢哪一款？'
                },
                {
                    id:"08",
                    title:'长泽雅美&山田孝之"约会照"公开！',
                    imgs:'../../../static/img/newhot/newhot8.jpg',
                    message:'《初吻50次》曝新片场照 二人走遍夏威夷'
                },
            ],
            l1:require('../../assets/frontend/lb1.jpg'),
			l2:require('../../assets/frontend/lb2.jpg'),
            l3:require('../../assets/frontend/lb3.jpg'), 
            l4:require('../../assets/frontend/lb4.jpg'), 
            list:[],
            noData:require('../../assets/frontend/common/no-data.png'),
            setting: {
                    autoplay: true,
                    autoplaySpeed: 2000,
                    dots: 'inside',
                    radiusDot: false,
                    trigger: 'click',
                    arrow: 'hover',
                    loop:true
                }
          };
        },
        created(){
          this.initData();
        },
        methods:{
            //初始化 获取电影推荐的数据 Uc
            initData(){
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

<style  lang="scss" scoped>
    .movielst{
        padding: 45px 0 25px;
        width: 1200px;
        margin: 0 auto;
        h4{
            font-weight: 400;
            font-size: 30px;
            line-height: 1;
            text-align: center;
            padding-bottom: 15px;
        }
        .customnav{
            width: 1200px;
            margin: 0 auto 20px;
            position: relative;
            text-align: center;
            i{
                background: #e5e5e5;
                width: 100%;
                height: 1px;
                overflow: hidden;
                position: absolute;
                left: 0;
                top: 50%;
                margin-top: 2px;
            }
            dl{
                width: 450px;
                display: flex;
                margin: 0 auto;
                dd{
                    cursor: pointer;
                    flex: 1;
                    padding: 0 20px;
                    font-size: 16px;
                    line-height: 1.1;
                    border-left: 1px solid #e5e5e5;
                    border-right: 1px solid #e5e5e5;
                    margin-left: -1px;
                    color: #191919;
                    background: #ffffff;
                    z-index: 2;
                    overflow: hidden;
                }
                dd:hover{
                    color: skyblue;
                }
            }
        }
        .movietype{
            display: flex;
            flex-direction: row;
             flex-wrap: wrap;
             justify-content: space-around;
             text-align: center;      
            dd{
                border-radius: 2px;
                border: 0;
                flex-basis: 23%;
                margin:10px 0;
                padding: 5px;
                img{
                    width: 250px;
                    height: 150px;     
                    transition:all 0.5s;
                }
                img:hover {
                    border-radius: 150px;
                    transform:scale(1.03) rotateY(180deg); /*放大两倍*/
                }
                p{
                    text-align: center;
                    font-size: 16px;
                    color: #999999;
                }
            }
            dd:hover{
                cursor: pointer;
                box-shadow: 10px;
                p{
                    color: #333;
                }
            }
        }
    }
    .nowhot{
        padding: 45px 0 25px;
        width: 1200px;
        margin: 0 auto;
        h4{
            font-weight: 400;
            font-size: 30px;
            line-height: 1;
            text-align: center;
            padding-bottom: 15px;
        }
        .customnav{
            width: 1200px;
            margin: 0 auto 20px;
            position: relative;
            text-align: center;
            i{
                background: #e5e5e5;
                width: 100%;
                height: 1px;
                overflow: hidden;
                position: absolute;
                left: 0;
                top: 50%;
                margin-top: 2px;
            }
            dl{
                width: 450px;
                display: flex;
                margin: 0 auto;
                dd{
                    cursor: pointer;
                    flex: 1;
                    padding: 0 20px;
                    font-size: 16px;
                    line-height: 1.1;
                    border-left: 1px solid #e5e5e5;
                    border-right: 1px solid #e5e5e5;
                    margin-left: -1px;
                    color: #191919;
                    background: #ffffff;
                    z-index: 2;
                    overflow: hidden;
                }
                dd:hover{
                    color: skyblue;
                }
            }
        }
        .newlist{
            overflow: hidden;
            .newspart{
                width: 1200px;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: space-around;
                dd{
                    cursor: pointer;
                    flex-basis:20%;
                    padding:10px 5px;
                    .newsitem{
                        h3{
                            font-weight: 600;
                           font-size: 16px;
                           padding-top: 10px; 
                           color: #333;
                        }
                        p{
                            padding-top: 3px;
                        }
                    }
                }
            }
        }
        .viewmore{
            margin-top: 8px;
            width: 158px;
            line-height: 35px;
            height: 35px;
            color: #666;
            border-radius: 20px;
            font-size: 15px;
            border: 1px solid #666;
            margin: 0 auto;
            text-align: center;
        }
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
    .swiper{
        height:360px;
        width:100%;
    }
    .demo-carousel img{
        width:100%;
        height:360px;
    }
    .no-data-container{
        text-align: center;
    }
    .film-img{
        width:100%;
        height:200px;
    }
    h2{
        text-align: center;
        font-size: 20px;
    }
</style>