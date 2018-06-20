<template>
    <div>
        <!-- 影厅管理 -->
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
        name: "room-list",
        data(){
            return {
                columns: [
                    {
                        title: 'ID',
                        key: 'id',
                    },
                    {
                        title: '影厅名称',
                        key: 'name'
                    },
                    {
                        title: '编号',
                        key: 'number'
                    },{
                        title: '座位数',
                        key: 'max'
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
                name:'',
                max:50,
                number:'',
                remark:'',
                totalCount:0,
                pageSize:10,
                currentPage:1,
            };
        },
        created(){
            this.initData();
        },
        methods: {
            edit(item){
                this.openEditDialog(item);
            },
            //编辑操作
            editFun(item){
                var self=this;
                requestObj({
                    url:'saveAuditorium.do',
                    method:'GET',
                    params:{
                        id:item.row.id,
                        name:self.name||item.row.name,
                        number:self.number||item.row.number,
                        max:self.max||item.row.max,
                        remark:self.remark||item.row.remark,
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
                    url:'deleteAuditoriumById.do',
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
            addFun(){
                this.openAddDialog()
            },
            //新增操作
            add(){
                var self=this;
                if(!self.name){
	                self.$Message.success('影院名称不能为空');
                }else if(!self.max){
	                self.$Message.success('影院座位数不能为空');
                }else if(!self.number){
	                self.$Message.success('影院编号不能为空');
                }else{
	                requestObj({
		                url:'saveAuditorium.do',
		                method:'GET',
		                params:{
			                name:self.name,
			                max:self.max,
			                number:self.number,
			                remark:self.remark,
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
            //初始化 获取影厅列表数据 
            initData(){
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
                        self.totalCount=res.data.data.total;
                        self.data=data;
                    },
                    fail:function (err){
                        console.log(err);
                    },
                });
            },
            //打开对话框 （新增）
            openAddDialog() {
                var self=this;
                this.$Modal.confirm({
                    onOk:function (){
                        self.add();
                    },
                    render: (h) => {
                        return h('div',[
                            h('Input', {
                                props: {
                                    value: this.value,
                                    autofocus: true,
                                    placeholder: '请输入影院名称'
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
                                    placeholder: '请输入影院座位数'
                                },
                                style: {
                                    marginBottom: '20px'
                                },
                                on: {
                                    input: (val) => {
                                        this.max = val;
                                    }
                                }
                            }),
                            h('Input', {
                                props: {
                                    value: this.value,
                                    autofocus: true,
                                    placeholder: '请输入影院编号'
                                },
                                style: {
                                    marginBottom: '20px'
                                },
                                on: {
                                    input: (val) => {
                                        this.number = val;
                                    }
                                }
                            }),
                            h('Input', {
                                props: {
                                    value: this.value,
                                    autofocus: true,
                                    placeholder: '请输入影院备注'
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
                        ])
                    }
                })
            },
            //打开对话框 （编辑）
            openEditDialog(item) {
                var self=this;
                this.$Modal.confirm({
                    onOk:function (){
                        self.editFun(item);
                    },
                    render: (h) => {
                        return h('div',[
                            h('Input', {
                                props: {
                                    value: item.row.name,
                                    autofocus: true,
                                    placeholder: '请输入影院名称'
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
                                    value: item.row.max,
                                    autofocus: true,
                                    placeholder: '请输入影院座位数'
                                },
                                style: {
                                    marginBottom: '20px'
                                },
                                on: {
                                    input: (val) => {
                                        this.max = val;
                                    }
                                }
                            }),
                            h('Input', {
                                props: {
                                    value: item.row.number,
                                    autofocus: true,
                                    placeholder: '请输入影院编号'
                                },
                                style: {
                                    marginBottom: '20px'
                                },
                                on: {
                                    input: (val) => {
                                        this.number = val;
                                    }
                                }
                            }),
                            h('Input', {
                                props: {
                                    value: item.row.remark,
                                    autofocus: true,
                                    placeholder: '请输入影院备注'
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
                        ])
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>