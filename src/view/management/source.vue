<template>
    <div>
        <!-- 电影管理 -->
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
        name: "film-list",
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
                        title: '区域',
                        key: 'area'
                    },{
                        title: '类型',
                        key: 'type'
                    },{
                        title: '评分',
                        key: 'score'
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
                pageSize:4,
                currentPage:1,
                filmname:'',
                type:'',
                typeList:[{
                    title:'类型不限',
                },{
                    title:'剧情',
                },{
                    title:'动作',
                },{
                    title:'喜剧',
                }],
                areaList:[{
                    title:'区域不限',
                },{
                    title:'欧美',
                },{
                    title:'日韩',
                },{
                    title:'国产',
                }],
                yearList:[{
                    title:'年代不限',
                },{
                    title:'2015',
                },{
                    title:'2016',
                },{
                    title:'2017',
                },{
                    title:'2018',
                }],
                bigList:[{
                    title:'正在上映',
                },{
                    title:'即将上映',
                },{
                    title:'热播影片',
                }],
                bigtype:'',
                introduction:'',
                screenings:'',
                studio:'',
                remark:'',
                picSrc:'',
                area:'',
                year:'',
                score:'',
                language:'',
                duration:'',
                releasedate1:'',
                currentSceneIndex:0,
                roomList:[],
            };
        },
        created(){
            this.initData();
            this.initRoomList();
        },
        methods: {
            edit(item){
                item.releasedate=commonJS.formatDate(item.releasedate,'yyyy-MM-dd')
                this.openDialog(item);
            },
            //编辑操作
            editFun(item){
                var self=this;
                requestObj({
                    url:'saveFilm.do',
                    method:'GET',
                    params:{
                        id:item.id,
                        filmname:self.filmname||item.filename,
                        type:self.type||item.type,
                        bigtype:self.bigtype||item.bigtype,
                        introduction:self.introduction||item.introduction,
                        studio:self.studio||item.studio,
                        remark:self.remark||item.remark,
                        picSrc:self.picSrc||item.picSrc,
                        area:self.area||item.area,
                        year:self.year||item.year,
                        score:self.score||item.score,
                        language:self.language||item.language,
                        duration:self.duration||item.duration,
                        releasedate1:self.releasedate1||item.releasedate,
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
                    url:'deleteFilmById.do',
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
            //新增电影操作 FC
            add(){
                var self=this;
                requestObj({
                    url:'saveFilm.do',
                    method:'GET',
                    params:{
                        filmname:self.filmname,
                        type:self.type,
                        bigtype:self.bigtype,
                        introduction:self.introduction,
                        studio:self.studio,
                        remark:self.remark,
                        picSrc:self.picSrc,
                        area:self.area,
                        year:self.year,
                        score:self.score,
                        language:self.language,
                        duration:self.duration,
                        releasedate1:self.releasedate1,
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
            //获取电影详情列表数据
            initData(){
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
                        self.data=data;
                    },
                    fail:function (err){
                        console.log(err);
                    },
                });
            },
            //获取影厅内容
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
            //打开对话框
            openDialog(item) {
                var self=this,
                    dialogData,
                    fileList=[];
                if(item){
                    dialogData=item;
                    fileList=[{
                            name:dialogData.picSrc,
                            url:commonJS.basePath+dialogData.picSrc,
                        }];
                }else{
                    dialogData={};
                }
                //Modal 对话框
                this.$Modal.confirm({
                    //点击确定 执行操作
                    onOk:function (){
                        if(item){
                            // 如果有数据 编辑操作
                            self.editFun(item);
                        }else{
                            //反之 新增操作
                            self.add();
                        }
                    },
                    render: (h) => {
                        return h('div',{
                            style:{

                            }
                        },[h('Input', {
                                props: {
                                    value: dialogData.filmname,
                                    autofocus: true,
                                    placeholder: '请输入电影名称'
                                },
                                style: {
                                    marginBottom: '20px'
                                },
                                on: {
                                    input: (val) => {
                                        this.filmname = val;
                                    }
                                }
                            }),
                            h('Input', {
                                props: {
                                    value: dialogData.introduction,
                                    autofocus: true,
                                    placeholder: '请输入电影介绍'
                                },
                                style: {
                                    marginBottom: '20px'
                                },
                                on: {
                                    input: (val) => {
                                        this.introduction = val;
                                    }
                                }
                            }),
                            h('Select',{
                                props: {
                                    value: dialogData.type,
	                                placeholder: '请选择电影类型'
                                },
                                style: {
                                    marginBottom: '20px'
                                },
                                on: {
                                    'on-change': (val) => {
                                        this.type = val;
                                    }
                                }
                            }, this.typeList.map(function (item,index) {
                                return h('Option',{
                                    props: {
                                        value:item.title,
                                        key:index,
                                    },
                                    on:{

                                    },
                                },item.title)
                            })),
                            h('Select',{
                                props: {
                                    value: dialogData.bigtype,
	                                placeholder: '请选择电影分类'
                                },
                                style: {
                                    marginBottom: '20px'
                                },
                                on: {
                                    'on-change': (val) => {
                                        this.bigtype = val;
                                    }
                                }
                            }, this.bigList.map(function (item,index) {
                                return h('Option',{
                                    props: {
                                        value:item.title,
                                        key:index,
                                    },
                                    on:{

                                    },
                                },item.title)
                            })),
                            h('Select',{
                                props: {
                                    value: parseInt(dialogData.studio)||'',
	                                placeholder: '请选择影厅'
                                },
                                style: {
                                    marginBottom: '20px'
                                },
                                on: {
                                    'on-change': (val) => {
                                        this.studio = val;
                                    }
                                }
                            }, this.roomList.map(function (item,index) {   //影厅
                                return h('Option',{
                                    props: {
                                        value:item.id,
                                        key:index,
                                    },
                                    on:{

                                    },
                                },item.name)
                            })),
                            h('Select',{
                                props: {
                                    value: dialogData.area,
	                                placeholder: '请选择电影区域',
                                },
                                style: {
                                    marginBottom: '20px'
                                },
                                on: {
                                    'on-change': (val) => {
                                        this.area = val;
                                    }
                                }
                            }, this.areaList.map(function (item,index) {
                                return h('Option',{
                                    props: {
                                        value:item.title,
                                        key:index,
                                    },
                                    on:{

                                    },
                                },item.title)
                            })),
                            h('Select',{
                                props: {
                                    value: dialogData.year,
	                                placeholder: '请选择电影年代',
                                },
                                style: {
                                    marginBottom: '20px'
                                },
                                on: {
                                    'on-change': (val) => {
                                        this.year = val;
                                    }
                                }
                            }, this.yearList.map(function (item,index) {
                                return h('Option',{
                                    props: {
                                        value:item.title,
                                        key:index,
                                    },
                                    on:{

                                    },
                                },item.title)
                            })),
                            h('Input', {
                                props: {
                                    value: dialogData.score,
                                    autofocus: true,
                                    placeholder: '请输入电影评分'
                                },
                                style: {
                                    marginBottom: '20px'
                                },
                                on: {
                                    input: (val) => {
                                        this.score = val;
                                    }
                                }
                            }),
                            h('Input', {
                                props: {
                                    value: dialogData.language,
                                    autofocus: true,
                                    placeholder: '请输入电影语言'
                                },
                                style: {
                                    marginBottom: '20px'
                                },
                                on: {
                                    input: (val) => {
                                        this.language = val;
                                    }
                                }
                            }),
                            h('Input', {
                                props: {
                                    value: dialogData.duration,
                                    autofocus: true,
                                    placeholder: '请输入电影时长'
                                },
                                style: {
                                    marginBottom: '20px'
                                },
                                on: {
                                    input: (val) => {
                                        this.duration = val;
                                    }
                                }
                            }),
                            h('Input', {
                                props: {
                                    value: dialogData.remark,
                                    autofocus: true,
                                    placeholder: '请输入电影备注'
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
	                                startDate:new Date(),
                                    value: dialogData.releasedate,
                                    type: 'date',
                                    placeholder: '请选择上映时间'
                                },
                                style: {
                                    marginBottom: '20px'
                                },
                                on: {
                                    'on-change': (val) => {
                                        this.releasedate1 = val;
                                    }
                                }
                            }),
                            h('Upload', {
                                //图片上传
                                props: {
                                    action: commonJS.uploadPath+'upload.do',
                                    name:'file',
                                    format:['jpg','jpeg','png'],
                                    withCredentials:true,
                                    defaultFileList:fileList,
                                    onSuccess:function (data){ 
                                        self.picSrc=data.data;
                                    },
                                },
                                style: {
                                    marginBottom: '20px'
                                },
                            },[
                                h('Button', {
                                    props: {
                                        icon: 'ios-cloud-upload-outline',
                                    },
                                    style: {
                                        marginBottom: '20px'
                                    },
                                }),
                            ]),
                        ])
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>