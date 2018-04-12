<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-logo{
        padding: 5px 15px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        left: 20px;
        color: #ffffff;
        font-size: 14px;
        font-weight: bold;
        text-align: center;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-middle{
        height: 80%;
        width: 100%;
    }
    .layout-ceiling{
        background: #464c5b;
        padding: 10px 0;
        overflow: hidden;
    }
    .layout-ceiling-main{
        float: right;
        margin-right: 30px;
        color: #9ba7b5;
        height: 30px;
    }
    .layout-ceiling-start{
        margin-left: 5px;
    }
</style>
<template>
    <div id="app">
        <div class="layout">
            <div class="layout-ceiling">
                <div class="layout-logo">账号显示系统</div>
                <Button type="ghost" class="layout-ceiling-main a" v-on:click="exportData">导出</Button>
            </div>
            <div class="layout-middle">
                <Table height="560" :columns="columns1" :data="data2" :loading="loading" ref="table"></Table>
            </div>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="total" :current="current" :page-size="10" show-total @on-change="changePage"></Page>
                </div>
                <div style="float: left;">
                    <Button v-if="batching === 1" type="primary" class="layout-ceiling-start" v-on:click="startBatch">开始运行</Button>
                    <Button v-else-if="batching === 2" type="ghost" class="layout-ceiling-start" v-on:click="stopBatch">停止运行</Button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Util from '../libs/util';
    import schedule from 'node-schedule';

    export default {
        data () {
            return {
                loading: true,
                total: 1,
                index: 1,
                current: 1,
                batching: 0,
                columns1: [{
                    title: '头像',
                    key: 'head_url',
                    columns: {
                        'width': '50px',
                        'height': '50px'
                    },
                    render: (h, params) => {
                        return h('div', [
                            h('img', {
                                attrs: {
                                    src: params.row.head_url
                                },
                                style: {
                                    marginTop: '5px',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '3px'
                                }
                            }),
                        ]);
                    }
                },{
                    title: '手机号',
                    key: 'phone'
                },{
                    title: '姓名',
                    key: 'user_name'
                },{
                    title: '性别',
                    key: 'sex',
                    render: (h, params) => {
                        return h('div', params.row.sex == 3 ? '男' : '女');
                    }
                },{
                    title: '生日',
                    key: 'birthday',
                    render: (h, params) => {
                        return h('div', this.formatDate(params.row.birthday));
                    }
                },{
                    title: '居住地',
                    key: 'roots'
                },{
                    title: '类型',
                    key: 'user_type',
                    render: (h, params) => {
                        return h('div', params.row.sex == 1 ? '天主教徒' : '基督教徒');
                    }
                },{
                    title: '密码',
                    key: 'password'
                }],
                data2: [],
                data3: []
            }
        },
        mounted() {
            var that = this;
            that.queryStatus();
            that.requestData();

            function scheduleCronstyle() {
                schedule.scheduleJob('32 * * * * *', function(){
                    console.log('scheduleCronstyle:' + new Date());
                    that.requestData();
                    that.queryStatus();
                }); 
            }

            scheduleCronstyle();
        },
        methods: {
            requestData() {
                var that = this;
                Util.ajax('/v1/user/list')
                .then(function (response) {
                    let current = Math.ceil(response.data.data.length/10);
                    that.data3 = response.data.data;
                    that.loading = false;
                    that.total = response.data.data.length;
                    that.current = current;
                    that.changePage(current);
                })
                .catch(function (error) {
                    console.log(error);
                    that.loading = false;
                });
            },
            changePage (index) {
                var data = [];
                for (var i = (index-1)*10; i < this.data3.length; i++) {
                    if (data.length >= 10) {
                        break;
                    }
                    data.push(this.data3[i]);
                }

                this.data2 = data;
            },
            formatDate (time) {
                var date = new Date(time);
                let y = date.getYear();
                let m = date.getMonth() + 1;
                m = m < 10 ? '0' + m : m;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                return y + '-' + m + '-' + d;
            },
            exportData () {
                this.$refs.table.exportCsv({
                    filename: '友信批量注册账号'
                });
            },
            startBatch () {
                var that = this;
                Util.ajax('/v1/status/start')
                .then(function (response) {
                    that.queryStatus();
                    that.$Notice.open({
                        title: '注册服务已开启'
                    });
                })
                .catch(function (error) {
                    console.log(error);
                    that.loading = false;
                });
            },
            stopBatch () {
                var that = this;
                Util.ajax('/v1/status/stop')
                .then(function (response) {
                    that.queryStatus();
                    that.$Notice.open({
                        title: '注册服务已停止'
                    });
                })
                .catch(function (error) {
                    console.log(error);
                    that.loading = false;
                });
            },
            queryStatus () {
                var that = this;
                Util.ajax('/v1/status')
                .then(function (response) {
                    that.batching = response.data.data.status === 1 ? 2 : 1;
                })
                .catch(function (error) {
                    console.log(error);
                    that.loading = false;
                });
            }
        }
    }
</script>
