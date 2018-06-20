<template>
    <div>
        <!-- 场次管理 -->
        <Row class="table-operation">
            <Col span="2" push="22">
            <Button @click="addFun" type="primary" >新增</Button>
            </Col>
        </Row>
        <Row>
            <table-component @getCurrentNum="getCurrentPageNum" :columns="columns" :tableData="data" :totalCount="totalCount" :page-size="pageSize"></table-component>
        </Row>
    </div>
</template>

<script>
    import commonJS from '../../common/common';
    import requestObj from '../../api/api';
    export default {
        name: "screenings",
        data(){
            return {
                columns: [
                    {
                        title: 'ID',
                        key: 'id',
                    },
                    {
                        title: '电影名称',
                        key: 'filmname'
                    },
                    {
                        title: '价格',
                        key: 'price'
                    },{
                        title: '类型',
                        key: 'type'
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
                                            this.edit(params.row)
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
                                            this.remove(params.row)
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
                filmList:[],
                roomList:[],
                filmid:'',
                type:'',
                price:'',
                remark:'',
                playTime1:'',
                auditiorid:'',
            };
        },
        created(){
            this.initData();
            this.initRoomList();
            this.initFilmList();
        },
        methods: {
            edit(item){
                item.playTime=commonJS.formatDate(new Date(item.play_time),'yyyy-MM-dd hh:mm:ss')
                this.openDialog(item);
            },
            //编辑操作
            editFun(item){
                var self=this;
                requestObj({
                    url:'saveTiclet.do',
                    method:'GET',
                    params:{
                        id:item.id,
                        filmid:self.filmid||item.filmid,
                        type:self.type||item.type,
                        auditiorid:self.auditiorid||item.auditiorid,
                        remark:self.remark||item.remark,
                        price:self.price||item.price,
                        playTime1:self.playTime1||item.play_time,
                    },
                    success:function (res){
                        self.$Message.success('修改成功');
                        self.initData();
                    },
                    fail:function (err){
                        console.log(err);
                    },
                });
            },
            //删除操作
            remove(item){
                var self=this;
                requestObj({
                    url:'deleteTicletById.do',
                    method:'GET',
                    params:{
                        id:item.id,
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
            addFun(){
                this.openDialog()
            },
            //新增操作
            add(){
                var self=this;
                
                    requestObj({
                        url:'saveTiclet.do',
                        method:'GET',
                        params:{
                            filmid:self.filmid,
                            type:self.type,
                            auditiorid:self.auditiorid,
                            remark:self.remark,
                            price:self.price,
                            playTime1:self.playTime1,
                        },
                        success:function (res){
                            self.$Message.success('新增成功');
                            self.initData();
                        },
                        fail:function (err){
                            console.log(err);
                        },
                    });
                  
            },
            //获取场次数据信息
            initData(){
                var self=this;
                requestObj({
                    url:'getTicketPageInfo.do',
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
            //获取影厅数据
            initRoomList(){
                var self=this;
                requestObj({
                    url:'getAuditoriumPageInfo.do',
                    method:'GET',
                    params:{
                        pageCurrent:self.currentPage,
                        pageSize:self.pageSize,
                    },
                    success:function (res){
                        var data=res.data.data.rows;
                        self.roomList=data;
                    },
                    fail:function (err){
                        console.log(err);
                    },
                });
            },
            //获取电影数据
            initFilmList(){
                var self=this;
                requestObj({
                    url:'getFilmPageInfo.do',
                    method:'GET',
                    params:{
                        pageCurrent:self.currentPage,
                        pageSize:self.pageSize,
                    },
                    success:function (res){
                        var data=res.data.data.rows;
                        self.totalCount=res.data.data.total;
                        self.filmList=data;
                    },
                    fail:function (err){
                        console.log(err);
                    },
                });
            },
            //打开对话框 
            openDialog(item) {
                var self=this,
                    dialogData;
                if(item){
                    dialogData=item;
                }else{
                    dialogData={};
                }
                this.$Modal.confirm({
                    onOk:function (){
                        if(item){
                            self.editFun(item);  //编辑操作
                        }else{
                            self.add();   //新增操作
                        }
                    },
                    render: (h) => {
                        return h('div',{
                            style:{

                            }
                        },[
                            h('Select',{
                                props: {
                                    value: dialogData.filmid,
	                                placeholder: '请选择电影'
                                },
                                style: {
                                    marginBottom: '20px'
                                },
                                on: {
                                    'on-change': (val) => {
                                        this.filmid = val;
                                    }
                                }
                            }, this.filmList.map(function (item,index) {
                                return h('Option',{
                                    props: {
                                        value:item.id,
                                        key:index,
                                    },
                                    on:{

                                    },
                                },item.filmname)
                            })),
                            h('Select',{
                                props: {
                                    value: dialogData.auditiorid,
	                                placeholder: '请选择影厅'
                                },
                                style: {
                                    marginBottom: '20px'
                                },
                                on: {
                                    'on-change': (val) => {
                                        this.auditiorid = val;
                                    }
                                }
                            }, this.roomList.map(function (item,index) {
                                return h('Option',{
                                    props: {
                                        value:item.id,
                                        key:index,
                                    },
                                    on:{

                                    },
                                },item.name)
                            })),
                            h('Input', {
                                props: {
                                    value: dialogData.type,
                                    autofocus: true,
                                    placeholder: '请输入电影票类型'
                                },
                                style: {
                                    marginBottom: '20px'
                                },
                                on: {
                                    input: (val) => {
                                        this.type = val;
                                    }
                                }
                            }),
                            h('Input', {
                                props: {
                                    value: dialogData.price,
                                    autofocus: true,
                                    placeholder: '请输入电影价格'
                                },
                                style: {
                                    marginBottom: '20px'
                                },
                                on: {
                                    input: (val) => {
                                        this.price = val;
                                    }
                                }
                            }),
                            h('Input', {
                                props: {
                                    value: dialogData.remark,
                                    autofocus: true,
                                    placeholder: '请输入场次备注'
                                },
                                style: {
                                    marginBottom: '20px'
                                },
                                on: {
                                    input: (val) => {
                                        this.remark = val;
                                    }
                                }
                            }),
                            h('DatePicker', {
                                props: {
                                    value: dialogData.playTime,
                                    type: 'datetime',
                                    placeholder: '请选择放映时间'
                                },
                                style: {
                                    marginBottom: '20px'
                                },
                                on: {
                                    'on-change': (val) => {
                                        this.playTime1 = val;
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