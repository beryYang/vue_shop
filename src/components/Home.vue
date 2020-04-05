<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
        <el-header>
            <div>
                <span>后台管理系统</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <el-container>
            <el-aside :width="isCollapse?'64px':'200px'">
                <!-- 侧边栏 -->
                <div class="toggle-button" @click="collapse">|||</div>
                <el-menu background-color="steelblue" text-color="#fff" active-text-color="blue" unique-opened :collapse="isCollapse" :collapse-transition="false" router>
                    <!-- 一级菜单 -->
                    <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
                        <template slot="title">
                            <i :class="iconObej[item.id]"></i>
                            <span>{{item.authName}}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item :index="'/'+subitem.path" v-for="subitem in item.children" :key="subitem.id">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>{{subitem.authName}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>
<script>
    export default {
        data() {
            return {
                // 左侧菜单数据
                menuList: [],
                iconObej: {
                    '125': 'iconfont icon-user',
                    '103': 'iconfont icon-tijikongjian',
                    '101': 'iconfont icon-shangpin',
                    '102': 'iconfont icon-danju',
                    '145': 'iconfont icon-baobiao'
                },
                // 是否折叠
                isCollapse: true
            }
        },
        created() {
            this.getMenuList()
        },
        methods: {
            logout() {
                window.sessionStorage.clear()
                this.$router.push('/login')
            },
            // 获取菜单列表
            async getMenuList() {
                const { data: res } = await this.$http.get('menus')
                if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
                this.menuList = res.data
                // console.log(res)
            },
            collapse() {
                this.isCollapse = !this.isCollapse
            }
        }
    }
</script>
<style lang="less">
    .home-container {
        height: 100%;
    }

    .el-header {
        background-color: lightskyblue;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: lightyellow;
        font-size: 20px;
    }

    .el-aside {
        background-color: steelblue;

        .el-menu {
            border-right: none;
        }
    }

    .el-main {
        background-color: lightsteelblue;
    }

    .el-footer {
        background-color: lightskyblue;
    }

    .iconfont {
        margin-right: 10px;
    }

    .toggle-button {
        background-color: rgb(121, 169, 218);
        font-size: 10px;
        line-height: 24px;
        color: lightyellow;
        text-align: center;
        letter-spacing: 0.2em;
        cursor: pointer;
    }
</style>