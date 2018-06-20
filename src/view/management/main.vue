<template>
    <router-view></router-view>
</template>

<script>
    // 后台主页面
    export default {
        name: "management",
        created(){
            //如果当前用户未登录 则跳转到登录页面 
            if(!sessionStorage.getItem('userID')){
            	this.$router.push({path:'/login',query:{title:'后台管理员登录'}});
            }
        },
    }
</script>

<style scoped>

</style>