<template>
    <div>
        <Table border :columns="columns" :data="tableData"></Table>
        <Page @on-change="pageChange" class="table-page" :total="totalCount" show-total :page-size="pageSize" show-elevator></Page>
    </div>
</template>

<script>
    export default {
        props: {
            columns: {
                type: Array,
                required: true
            },
            tableData: {
                type: Array,
                required: true
            },
            totalCount:{
                type:Number,
                required:true,
            },
            pageSize:{
                type:Number,
                required:true,
            },
        },
        data(){
          return {
              currentPage:1,
          }
        },
        methods: {
            pageChange (pageNum) {
                this.$emit('getCurrentNum',pageNum);
            }
        }
    }
</script>

<style scoped>

</style>