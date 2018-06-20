<template>
    <div>
        <canvas id="c"></canvas>
        <h1 class="main-title" :style="'position:relative'" >{{title}}</h1>
        <Row class="write">
            <Col :xs="{ span: 8, offset:8  }" :lg="{ span: 8, offset:8 }">
            <Input v-model="userName" size="large" placeholder="请输入用户名" />
            </Col>
        </Row>
        <Row class="write">
            <Col :xs="{ span: 8, offset:8  }" :lg="{ span: 8, offset:8 }">
            <Input type="password" v-model="password" size="large" placeholder="请输入密码" /> 
            </Col>
        </Row>
        <Row class="write">
            <Col :xs="{ span: 8, offset:8  }" :lg="{ span: 8, offset:8}">
            <Button @click="login" long type="success" >登录</Button>
            </Col>
        </Row>
        <Row class="write">
            <Col :xs="{ span:8, offset:8  }" :lg="{ span: 8, offset:8 }">
            <Button @click="register" long type="primary" >注册</Button>
            </Col>
        </Row>
    </div>
</template>

<script>
    import requestObj from '../../api/api';
    export default {
        name: "login",
        data(){
            return {
                userName:'',
                password:'',
            };
        },
        mounted(){
            var c = document.getElementById('c');
            var w = 1200;
            var h = 600;
            c.style.width = 100+"%";
            c.style.height = 100 + "%";
            var ctx = c.getContext('2d'),  
            count = (w*h/3000)|0,
            speed = 4,
            range = 80,
            lineAlpha = .05,
            
            particles = [],
            huePart = 360/count;

        for(var i = 0; i < count; ++i)
            particles.push(new Particle((huePart*i)|0));

            function Particle(hue){
                this.x = Math.random()*w;
                this.y = Math.random()*h;
                this.vx = (Math.random()-.5)*speed;
                this.vy = (Math.random()-.5)*speed;     
                this.hue = hue;
            }
            Particle.prototype.update = function(){
                this.x += this.vx;
                this.y += this.vy;
                if(this.x < 0 || this.x > w) this.vx *= -1;
                if(this.y < 0 || this.y > h) this.vy *= -1;
            }

            function checkDist(a, b, dist){
                var x = a.x - b.x, y = a.y - b.y;   
                return x*x + y*y <= dist*dist;
            }
            function anim(){
                window.requestAnimationFrame(anim);    
                ctx.fillStyle = 'rgba(0, 0, 0, .05)';
                ctx.fillRect(0, 0, w, h);
                for(var i = 0; i < particles.length; ++i){
                    var p1 = particles[i];
                    p1.update();                
                for(var j = i+1; j < particles.length; ++j){
                    var p2 = particles[j];
                    if(checkDist(p1, p2, range)){
                        ctx.strokeStyle = 'hsla(hue, 80%, 50%, alp)'
                        .replace('hue', ((p1.hue  + p2.hue + 3)/2) % 360)
                        .replace('alp', lineAlpha);
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
             }
        }
            anim();
        },
        computed:{
            title(){
                if(this.$route.query.title){
                	return this.$route.query.title;
                }else{
                	return '登录'
                }
            },
        },
        methods:{
            login(){
                var self=this;
                requestObj({
                    url:'login.do',
                    method:'GET',
                    params:{
                        username:self.userName,
                        password:self.password,
                    },
                    success:function (res){
                        //localStorage.setItem("userID",res.data.data.id);
                        //sessionStorage 会话存储 当浏览器页面关闭后才会消失
                        sessionStorage.setItem("userID",res.data.data.id);
                        self.$router.go(-1); //后退
                    },
                    fail:function (err){
                        console.log(err);
                    },
                });
            },
            register(){
                //跳转到注册页面
                this.$router.push('/register');
            },
        },
    }
</script>

<style scoped>
canvas{
  position:absolute;
  top:0;
  left:0;
  background-color:black;
}
</style>