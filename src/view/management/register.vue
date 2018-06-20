<template>
    <div>
        <canvas id="c"></canvas>
        <h1 class="main-title" :style="'position:relative'" >注册</h1>
        <Row class="write">
            <Col :xs="{ span: 8, offset:8  }" :lg="{ span: 8, offset:8 }">
            <Input v-model="userName" size="large" placeholder="请输入用户名"></Input>
            </Col>
        </Row>
        <Row class="write">
            <Col :xs="{ span: 8, offset:8  }" :lg="{ span: 8, offset:8 }">
            <Input v-model="realName" size="large" placeholder="请输入真实姓名"></Input>
            </Col>
        </Row>
        <Row class="write">
            <Col :xs="{ span: 8, offset:8  }" :lg="{ span: 8, offset:8 }">
            <Select placeholder="请选择性别" v-model.sync="genger" size="large">
                <Option v-for="item in sexList" :value="item.title" :key="item.title">{{ item.title }}</Option>
            </Select>
            </Col>
        </Row>
        <Row class="write">
            <Col :xs="{ span: 8, offset:8  }" :lg="{ span: 8, offset:8 }">
            <Input type="password" v-model="password" size="large" placeholder="请输入密码"></Input>
            </Col>
        </Row>
        <Row class="write">
            <Col :xs="{ span: 8, offset:8  }" :lg="{ span: 8, offset:8 }">
            <Input type="password" v-model="confirmPWD" size="large" placeholder="请确认密码"></Input>
            </Col>
        </Row>
        <Row class="write">
            <Col :xs="{ span: 8, offset:8  }" :lg="{ span: 8, offset:8 }">
            <Button @click="register" long type="primary" >注册</Button>
            </Col>
        </Row>
    </div>
</template>

<script>
    import requestObj from '../../api/api';
    export default {
        name: "register",
        data(){
            return {
                userName:'',
                realName:'',
                genger:'',
                password:'',
                confirmPWD:'',
                sexList:[{
                    title:'男',
                },{
                    title:'女',
                },],
            };
        },
         mounted(){
            /* 动画背景实现  画布canvas */
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
        var x = a.x - b.x,
            y = a.y - b.y;
        
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
        methods:{
            register(){
                var self=this;
	            if(!self.userName){
		            self.$Message.success('用户名不能为空');
	            }else if(!self.password){
		            self.$Message.success('密码不能为空');
	            }else if(!self.realName){
		            self.$Message.success('真实姓名不能为空');
	            }else if(!self.genger){
		            self.$Message.success('性别不能为空');
	            }else if(self.password!=self.confirmPWD){
                    self.$Message.success('两次输入的密码不同');
                }else{
                    requestObj({
                        url:'regist.do',
                        method:'GET',
                        params:{
                            username:self.userName,
                            realname:self.realName,
                            genger:self.genger,
                            password:self.password,
                        },
                        success:function (res){
                            self.$Message.success('注册成功');
                            self.$router.go(-1);
                        },
                        fail:function (err){
                            console.log(err);
                        },
                    });
                }
            },
        }
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