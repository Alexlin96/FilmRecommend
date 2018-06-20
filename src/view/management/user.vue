<template>
    <div>
        <!-- 用户管理 -->
        <Row class="table-operation">
            <Col span="2" push="22">
            <!--<Button @click="openAddDialog" type="primary" >新增</Button>-->
            </Col>
        </Row>
        <Row>
            <table-component @getCurrentNum="getCurrentPageNum" :columns="columns" :tableData="data" :totalCount="totalCount" :page-size="pageSize"></table-component>
        </Row>
    </div>
</template>

<script>
    import requestObj from '../../api/api';
    export default {
        name: "user",
        data(){
            return {
                columns: [
                    {
                        title: 'ID',
                        key: 'id',
                    },
                    {
                        title: '用户名',
                        key: 'username'
                    },
                    {
                        title: '真实姓名',
                        key: 'realname'
                    },
                    {
                        title: '操作',
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
                                            this.edit(params)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data: [],
                totalCount:0,
                pageSize:10,
                currentPage:1,
                name:'',
                realname:'',
                password:'',
                confirmPWD:'',
            };
        },
        created(){
            this.initData();
        },
        methods: {
            edit(item){
                this.openEditDialog(item);
            },
            //编辑
            editFun(item){
                var self=this;
                if(self.password!=self.confirmPWD){
                    self.$Message.success('两次输入的密码不同');
                }else{
                    requestObj({
                        url:'saveUser.do',
                        method:'GET',
                        params:{
                            id:item.row.id,
                            username:self.name||item.row.username,
                            realname:self.realname||item.row.realname,
                            password:self.password||item.row.password,
                        },
                        success:function (res){
                            self.$Message.success('修改成功');
                            self.initData();
                        },
                        fail:function (err){
                            console.log(err);
                        },
                    });
                }
            },
            //删除
            remove(item){
                var self=this;
                requestObj({
                    url:'deleteUser.do',
                    method:'GET',
                    params:{
                        id:item.row.id,
                    },
                    success:function (res){
                        self.$Message.success('删除成功');
                        self.initData();
                    },
                    fail:function (err){
                        console.log(err);
                    },
                });
            },
            getCurrentPageNum(num){
                this.currentPage=num;
                this.initData();
            },
            //新增
            add(){
                var self=this;
                if(!self.userName){
	                self.$Message.success('用户名不能为空');
                }else if(!self.password){
	                self.$Message.success('密码不能为空');
                }else if(self.password!=self.confirmPWD){
                    self.$Message.success('两次输入的密码不同');
                }else{
                    requestObj({
                        url:'addSmUser.do',
                        method:'GET',
                        params:{
                            userName:self.name,
                            pwd:self.password,
                            email:self.email,
                        },
                        success:function (res){
                            self.$Message.success('新增成功');
                            self.initData();
                        },
                        fail:function (err){
                            console.log(err);
                        },
                    });
                }
            },
            //初始化 获取用户信息数据
            initData(){
                var self=this;
                requestObj({
                    url:'getUserPageInfo.do',
                    method:'GET',
                    params:{
                        pageCurrent:self.currentPage,
                        pageSize:self.pageSize,
                    },
                    success:function (res){
                        var data=res.data.data.rows;
                        self.totalCount=res.data.data.total;
                        self.data=data;
                    },
                    fail:function (err){
                        console.log(err);
                    },
                });
            },
            //打开对话框  
            openAddDialog(item) {
                var self=this;
                this.$Modal.confirm({
                    onOk:function (){
                        self.add();   //新增
                    },
                    render: (h) => {
                        return h('div',[
                            h('Input', {
                                props: {
                                    value: this.value,
                                    autofocus: true,
                                    placeholder: '请输入用户名'
                                },
                                style: {
                                    marginBottom: '20px'
                                },
                                on: {
                                    input: (val) => {
                                        this.name = val;
                                    }
                                }
                            }),
                            h('Input', {
                                props: {
                                    value: this.value,
                                    autofocus: true,
                                    placeholder: '请输入邮箱'
                                },
                                style: {
                                    marginBottom: '20px'
                                },
                                on: {
                                    input: (val) => {
                                        this.email = val;
                                    }
                                }
                            }),
                            h('Input', {
                                props: {
                                    value: this.value,
                                    autofocus: true,
                                    placeholder: '请输入密码',
                                    type:'password',
                                },
                                style: {
                                    marginBottom: '20px'
                                },
                                on: {
                                    input: (val) => {
                                        this.password = val;
                                    }
                                }
                            }),
                            h('Input', {
                                props: {
                                    value: this.value,
                                    autofocus: true,
                                    placeholder: '请确认密码',
                                    type:'password',
                                },
                                style: {
                                    marginBottom: '20px'
                                },
                                on: {
                                    input: (val) => {
                                        this.confirmPWD = val;
                                    }
                                }
                            }),
                        ])
                    }
                })
            },
            //打开对话框 （编辑）
            openEditDialog(item) {
                var self=this;
                this.$Modal.confirm({
                    onOk:function (){
                        self.editFun(item);  //编辑 
                    },
                    render: (h) => {
                        return h('div',[
                            h('Input', {
                                props: {
                                    value: item.row.username,
                                    autofocus: true,
                                    placeholder: '请输入用户名'
                                },
                                style: {
                                    marginBottom: '20px'
                                },
                                on: {
                                    input: (val) => {
                                        this.name = val;
                                    }
                                }
                            }),
                            h('Input', {
                                props: {
                                    value: item.row.realname,
                                    autofocus: true,
                                    placeholder: '请输入真实姓名'
                                },
                                style: {
                                    marginBottom: '20px'
                                },
                                on: {
                                    input: (val) => {
                                        this.realname = val;
                                    }
                                }
                            }),
                            h('Input', {
                                props: {
                                    value: item.row.password,
                                    autofocus: true,
                                    placeholder: '请输入密码',
                                    type:'password',
                                },
                                style: {
                                    marginBottom: '20px'
                                },
                                on: {
                                    input: (val) => {
                                        this.password = val;
                                    }
                                }
                            }),
                            h('Input', {
                                props: {
                                    value: item.row.password,
                                    autofocus: true,
                                    placeholder: '请确认密码',
                                    type:'password',
                                },
                                style: {
                                    marginBottom: '20px'
                                },
                                on: {
                                    input: (val) => {
                                        this.confirmPWD = val;
                                    }
                                }
                            }),
                        ])
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>