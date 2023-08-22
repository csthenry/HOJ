<template>
  <!-- <el-card class="box-card"> -->
    <el-tabs class="box-card" v-model="activeName" type="border-card">
      <el-tab-pane name="Account">
        <template slot="label">
          <i class="fa fa-gear"></i> {{ $t('m.Account_Setting') }}
        </template>
        <component :is="Account"></component>
      </el-tab-pane>
      <el-tab-pane name="UserInfo">
        <template slot="label">
          <i class="fa fa-gear"></i> {{ $t('m.UserInfo_Setting') }}
        </template>
        <component :is="UserInfo"></component>
      </el-tab-pane>
    </el-tabs>
  <!-- </el-card> -->
</template>
<script>
const Account = () => import('@/components/oj/setting/Account');
const UserInfo = () => import('@/components/oj/setting/UserInfo');
export default {
  components: {
    Account,
    UserInfo,
  },
  data() {
    return {
      Account: 'Account',
      UserInfo: 'UserInfo',
      activeName: 'Account',
    };
  },
};
</script>
<style scoped>
@media screen and (min-width: 1200px) {
  .box-card {
    margin-left: 10%;
    margin-right: 10%;
  }
}
</style>
