<template>
  <div id="app">
    <el-backtop :right="10"></el-backtop>
    <div v-if="!isAdminView" class="full-height flex-column">
      <NavBar></NavBar>
      <div id="oj-content">
        <transition name="el-zoom-in-bottom">
          <router-view></router-view>
        </transition>
      </div>
      <footer v-if="showFooter" class="fix-to-bottom">
        <div class="mundb-footer">
          <el-row>
            <el-col
              :md="6"
              :xs="24"
            >
              <h1>{{ websiteConfig.name }}</h1>
              <span
                style="line-height:25px"
                v-html="websiteConfig.description"
                v-katex
                v-highlight
              >
              </span>
            </el-col>
            <el-col class="hr-none">
              <el-divider></el-divider>
            </el-col>
            <el-col
              :md="6"
              :xs="24"
            >
              <h1>{{ $t('m.Service') }}</h1>
              <p>
                <a @click="goRoute('/status')">{{ $t('m.Judging_Queue') }}</a>
              </p>
              <p>
                <a @click="goRoute('/developer')">{{ $t('m.System_Info') }}</a>
              </p>
            </el-col>
            <el-col class="hr-none">
              <el-divider></el-divider>
            </el-col>
            <el-col
              :md="6"
              :xs="24"
            >
              <h1>{{ $t('m.Development') }}</h1>
              <p class="mb-1">
                <a
                  href="https://github.com/csthenry/HOJ"
                  target="_blank"
                >{{
                  $t('m.Open_Source')
                }}</a>
              </p>
              <p class="mb-1"><a @click="goRoute('/#')">API</a></p>
            </el-col>
            <el-col class="hr-none">
              <el-divider></el-divider>
            </el-col>
            <el-col
              :md="6"
              :xs="24"
            >
              <h1>{{ $t('m.Support') }}</h1>
              <p>
                <i
                  class="fa fa-info-circle"
                  aria-hidden="true"
                ></i><a @click="goRoute('/introduction')"> {{ $t('m.NavBar_About') }}</a>
              </p>
              <p>
                <i class="el-icon-document"></i>
                <a
                  href="https://docs.hdoi.cn"
                  target="_blank"
                > {{ $t('m.Help') }}</a>
              </p>
            </el-col>
          </el-row>
        </div>
        <div class="mundb-footer">
          <a
            style="color:#1E9FFF"
            :href="websiteConfig.recordUrl"
            target="_blank"
          >{{ websiteConfig.recordName }}</a>
          Powered by
          <a
            :href="websiteConfig.projectUrl"
            style="color:#1E9FFF"
            target="_blank"
          >{{ websiteConfig.projectName }}</a>
          <span style="margin-left:10px">
            <el-dropdown
              @command="changeWebLanguage"
              placement="top"
            >
              <span class="el-dropdown-link">
                <i
                  class="fa fa-globe"
                  aria-hidden="true"
                >
                  {{ this.webLanguage == 'zh-CN' ? '简体中文' : 'English' }}</i><i class="el-icon-arrow-up el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="zh-CN">简体中文</el-dropdown-item>
                <el-dropdown-item command="en-US">English</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </footer>
    </div>
    <div v-else>
      <div id="admin-content">
        <transition name="el-zoom-in-bottom">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/oj/common/NavBar";
import { mapActions, mapState, mapGetters } from "vuex";
import { LOGO, LOGO_Style, MOTTO } from "@/common/logo";
import storage from "@/common/storage";
import utils from "@/common/utils";
export default {
  name: "app-content",
  components: {
    NavBar,
  },
  data() {
    return {
      isAdminView: false,
      showFooter: true,
    };
  },
  methods: {
    ...mapActions(["changeDomTitle", "getWebsiteConfig"]),
    goRoute(path) {
      this.$router.push({
        path: path,
      });
    },
    changeWebLanguage(language) {
      this.$store.commit("changeWebLanguage", { language: language });
    },
    autoChangeLanguge() {
      /**
       * 语言自动转换优先级：路径参数 > 本地存储 > 浏览器自动识别
       */
      let lang = this.$route.query.l;
      if (lang) {
        lang = lang.toLowerCase();
        if (lang == "zh-cn") {
          this.$store.commit("changeWebLanguage", { language: "zh-CN" });
        } else {
          this.$store.commit("changeWebLanguage", { language: "en-US" });
        }
        return;
      }

      lang = storage.get("Web_Language");
      if (lang) {
        return;
      }

      lang = navigator.userLanguage || window.navigator.language;
      lang = lang.toLowerCase();
      if (lang == "zh-cn") {
        this.$store.commit("changeWebLanguage", { language: "zh-CN" });
      } else {
        this.$store.commit("changeWebLanguage", { language: "en-US" });
      }
    },
    autoRefreshUserInfo() {
      this.$store.dispatch("setUserInfo", storage.get("userInfo"));
      let strogeToken = localStorage.getItem("token");
      if (document.hidden == false && this.token != strogeToken) {
        if (strogeToken) {
          this.$store.commit("changeUserToken", strogeToken);
          // if(this.$route.path.startsWith('/admin')){
          //   this.$router.replace({
          //     path: "/home",
          //   });
          // }
        } else {
          if (this.token) {
            this.$store.dispatch("clearUserInfoAndToken");
            let path = this.$route.path;
            if (path.startsWith("/admin")) {
              if (path != "/admin/login") {
                this.$router.replace({
                  path: "/admin/login",
                });
              }
            } else {
              if (path != "/home") {
                this.$router.replace({
                  path: "/home",
                });
              }
            }
          }
        }
      }
    },
  },
  watch: {
    $route(newVal, oldVal) {
      this.changeDomTitle();
      if (newVal !== oldVal && newVal.path.split("/")[1] == "admin") {
        this.isAdminView = true;
      } else {
        this.isAdminView = false;
      }
      if(newVal.name == 'ProblemDetails' || utils.isFocusModePage(newVal.name)){
        this.showFooter = false;
      }else{
        this.showFooter = true;
      }
    },
    websiteConfig() {
      this.changeDomTitle();
    },
  },
  computed: {
    ...mapState(["websiteConfig"]),
    ...mapGetters(["webLanguage", "token", "isAuthenticated"]),
  },
  created: function () {
    this.$nextTick(function () {
      try {
        document.body.removeChild(document.getElementById("app-loader"));
      } catch (e) {}
    });

    if (this.$route.path.split("/")[1] != "admin") {
      this.isAdminView = false;
    } else {
      this.isAdminView = true;
    }

    if(this.isAuthenticated){
      this.$store.dispatch("refreshUserAuthInfo");
    }

    this.showFooter = !(this.$route.name == 'ProblemDetails'|| utils.isFocusModePage(this.$route.name));
    window.addEventListener("visibilitychange", this.autoRefreshUserInfo);
  },
  mounted() {
    console.log(LOGO, LOGO_Style[0], LOGO_Style[1]);
    console.log(MOTTO);
    this.autoChangeLanguge();
    this.getWebsiteConfig();
  },
};
</script>

<style>
@import url("./assets/css/harmonyos.css");
@import url("./assets/css/darkmode.color.css");

* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
html {
  --border-color: #e8eaec;
  --row-stripe-bg-color: #fafafa;
  --nav-bg-color: rgba(255,255,255,0.7);
  --data-nav-bg-color: hsl(211, 20%, 97%);
  --box-bg-color: #fff;
  --bg-color: #eff3f5;
  --el-text-color: #495060;
  --text-color: #495060;
  --submit-row-color: #e6ffdf;
  --code-pre-numbering-bg-color: #f1f1f1;
  --code-bg-color: #fafafa;
}
body {
  font-family: "HarmonyOS Sans SC", "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif !important;
  font-size: 12px !important;
  color: var(--text-color)!important;
  background-color: var(--bg-color)!important;
}
.dark {
  --row-stripe-bg-color: #141414;
  --nav-bg-color: #1d1e1f;
  --data-nav-bg-color: #333333;
  --box-bg-color:#1d1e1f;
  --border-color: #4c4d4f;
  --bg-color: #141414;
  --el-text-color: #9d9d9d;
  --code-pre-numbering-bg-color: #141414;
  --code-bg-color: #1d1e1f;
  --text-color: #b5bcc9;
  --submit-row-color: #172116;
}
.dark .el-divider__text {
    background-color: #1d1e1f!important;
}
.dark .el-card__header {
    border-bottom: none;
}
.v-note-wrapper .v-note-panel .v-note-show .v-show-content, .v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
  color: #606266;
}
.vxe-table {
  color: var(--text-color)!important;
  background-color: var(--bg-color)!important;
}
.vxe-table .vxe-table--header-wrapper {
  background-color: var(--box-bg-color)!important;
}
.vxe-table .vxe-table--body-wrapper, .vxe-table .vxe-table--footer-wrapper {
  background-color: var(--box-bg-color)!important;
}
.vxe-table .vxe-table--body {
  background-color: var(--row-stripe-bg-color)!important;
}
.vxe-table .vxe-body--row.row--stripe {
  background-color: var(--box-bg-color)!important;
}
.vxe-table.border--default .vxe-body--column, .vxe-table.border--default .vxe-footer--column, .vxe-table.border--default .vxe-header--column, .vxe-table.border--inner .vxe-body--column, .vxe-table.border--inner .vxe-footer--column, .vxe-table.border--inner .vxe-header--column {
  background-image: -webkit-gradient(linear,left top, left bottom,from(var(--border-color)),to(var(--border-color)))!important;
  background-image: linear-gradient(var(--border-color),var(--border-color))!important;
}
.vxe-table .vxe-table--header-wrapper .vxe-table--header-border-line, .vxe-table .vxe-table--border-line {
    border-bottom: 1px solid var(--border-color)!important;
}
.vxe-table .vxe-table--border-line {
    border: 1px solid var(--border-color)!important;
}
.vxe-input--inner {
  border: 1px solid var(--border-color)!important;
  color: var(--text-color)!important;
  background-color: var(--box-bg-color)!important;
}
.vxe-input:not(.is--disabled).is--active .vxe-input--inner {
    border: 1px solid #409eff!important;
}
.mu-paper {
  background-color: var(--box-bg-color)!important;
}
.mu-item, .mu-item-action {
  color: var(--text-color)!important;
}
.el-menu-item, .el-submenu__title {
  color: var(--text-color)!important;
  font-size: 16px;
}
code,
kbd,
pre,
samp {
  font-family: Consolas, Menlo, Courier, monospace;
}
::-webkit-scrollbar {
  width: 10px;
  height: 12px;
  -webkit-box-shadow: inset 0 0 6px rgb(0 0 0 / 20%);
}

::-webkit-scrollbar-thumb {
  display: block;
  min-height: 12px;
  min-width: 10px;
  border-radius: 8px;
  background-color: var(--text-color);
}

::-webkit-scrollbar-thumb:hover {
  display: block;
  min-height: 12px;
  min-width: 10px;
  border-radius: 6px;
  background-color: rgb(159, 159, 159);
}

#admin-content {
  background-color: #1e9fff;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
.mu-item-title {
  overflow: visible;
}
.mobile-menu-active {
  background-color: rgba(0, 0, 0, 0.1);
}
.mobile-menu-active .mu-item-title {
  color: #2d8cf0 !important;
}
.mobile-menu-active .mu-icon {
  color: #2d8cf0 !important;
}
#particles-js {
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
a {
  text-decoration: none;
  background-color: transparent;
  color: var(--text-color);
  outline: 0;
  cursor: pointer;
  transition: color 0.2s ease;
}
a:hover {
  color: #2196f3 !important;
}
.markdown-body {
  color: var(--text-color);
  font-family: -apple-system, BlinkMacSystemFont, PingFang SC, HarmonyOS Sans SC,
    Segoe UI, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
}
.markdown-body table tr {
  background-color: var(--bg-color);
}
.markdown-body table tr:nth-child(2n) {
  background-color: var(--box-bg-color);
}
.markdown-body a {
  color: #2196f3;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.28s ease;
  -moz-transition: all 0.28s ease;
  -webkit-transition: all 0.28s ease;
  -o-transition: all 0.28s ease;
}
.markdown-body a:hover {
  color: #ff5722 !important;
  text-decoration: underline;
}
.panel-title {
  font-size: 21px;
  font-weight: 500;
  padding-top: 10px;
  padding-bottom: 20px;
  line-height: 30px;
}

.home-title {
  color: #409eff;
  font-family: "HarmonyOS Sans SC", "Raleway";
}
.contest-config{
  text-align:right;
}
.contest-config-switches p span{
  margin-left: 8px;
  margin-right: 4px;
}

.contest-rank-filter{
  margin: 10px 0;
}
.contest-rank-config{
  text-align:right;
  margin-top: 15px;
}
.contest-scoreBoard-config{
  margin-top: 30px !important;
}
.contest-rank-config span {
  margin-left: 5px;
}
.contest-config span {
  margin-left: 5px;
}
@media screen and (max-width: 992px) {
  .contest-rank-config{
    text-align:center;
    margin-bottom: 10px;
    margin-top: -1px;
  }
  .contest-config{
    margin-top: 5px;
    text-align:center;
  }
  .contest-scoreBoard-config{
    margin-top: 10px !important;
  }
}
.contest-rank-concerned {
  font-size: 1rem;
  margin-left: 0.5rem !important;
  margin-right: 0.5rem !important;
  vertical-align: top;
}
.contest-rank-concerned i {
  margin-top: 11px;
  cursor: pointer;
}
.contest-rank-user-box{
  display: flex;
}
.contest-rank-user-info{
  flex: 1;
  text-align:right;
  min-width: 0;
}

.contest-username {
  display: block;
  overflow: hidden;
  color: black;
  font-size: 13.5px;
  font-weight: 550;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.contest-school {
  font-size: 12px;
  font-weight: normal;
  color: dimgrey;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
}
.contest-rank-flag {
  margin-right: 20px !important;
  background-color: rgb(255, 193, 10);
  border-radius: 4px;
  color: rgb(73, 36, 0);
  padding: 1px 3px !important;
}

.bg-female {
  background-color: rgb(255, 153, 203);
}
.bg-star {
  background-color: #ffffcc;
}
.bg-concerned {
  background-color: lightyellow;
}

.contest-rank-balloon {
  vertical-align: top;
  margin-left: -10px !important;
  margin-right: -7px !important;
}

.oi-100 {
  background-color: #19be6b;
  color: #fff;
  font-weight: 700;
}

.oi-0 {
  color: #a94442;
  background-color: #f2dede;
}

.oi-between {
  background-color: #2d8cf0;
  color: #fff;
}
.after-ac {
  background-color: rgba(92,184,92,.4);
}
.first-ac {
  background-color: #1daa1d;
}
.ac {
  background-color: #60e760;
}
.wa {
  background-color: #e87272;
}
.try {
  background-color: #ff9800;
}

.status-green {
  background-color: #19be6b !important;
  color: #fff !important;
}
.status-red {
  background-color: #ed3f14 !important;
  color: #fff !important;
}
.status-yellow {
  background-color: #f90 !important;
  color: #fff !important;
}
.status-blue {
  background-color: #2d8cf0 !important;
  color: #fff !important;
}
.status-gray {
  background-color: #909399 !important;
  color: #fff !important;
}
.status-purple {
  background-color: #676fc1 !important;
  color: #fff !important;
}
.own-submit-row {
  background: var(--submit-row-color) !important;
}
.submission-hover:hover {
  cursor: pointer;
}
.vxe-table {
  font-size: 12px !important;
  font-weight: 500 !important;
}
.row--hover {
  cursor: pointer;
  background-color: var(--box-bg-color)!important;
}
.vxe-table .vxe-body--column:not(.col--ellipsis),
.vxe-table .vxe-footer--column:not(.col--ellipsis),
.vxe-table .vxe-header--column:not(.col--ellipsis) {
  padding: 9px 0 !important;
}
#nprogress .bar {
  background: #66b1ff !important;
}
@media screen and (min-width: 1050px) {
  #oj-content {
    margin-top: 20px;
    padding: 0 3%;
    margin-bottom: 1.5rem;
  }
}
.markdown-body img {
  max-width: 100%;
}
.contest-description img {
  max-width: 100%;
}
@media screen and (max-width: 1050px) {
  #oj-content {
    margin-top: 20px;
    padding: 0 5px;
    margin-bottom: 1.5rem;
  }
  .el-row {
    margin-left: 0px !important;
    margin-right: 0px !important;
  }
  .el-col {
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .el-message-box {
    width: 70% !important;
  }
}
#problem-content .sample pre {
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  -ms-flex-item-align: stretch;
  align-self: stretch;
  border-style: solid;
  background-color: var(--code-bg-color);
  border-left: 2px solid #3498db;
}

.markdown-body pre {
  padding: 5px 10px;
  white-space: pre-wrap;
  margin-top: 15px;
  margin-bottom: 15px;
  background-color: var(--code-bg-color);
  border: 1px dashed #e9eaec;
}

.el-menu--popup {
  min-width: 120px !important;
  text-align: center;
}
.panel-options {
  margin-top: 10px;
  text-align: center;
}
.el-tag--dark {
  border: none !important;
}
.el-notification .el-icon-info {
    color: #409eff;
}
.v-note-wrapper .v-note-panel {
  height: 460px !important;
}

.tex-formula {
  font-family: times new roman, sans-serif;
  vertical-align: middle;
  margin: 0;
  border: medium none;
  position: relative;
  bottom: 2px;
}

.tex-span {
  font-size: 125%;
  font-family: times new roman, sans-serif;
  white-space: nowrap;
}

.tex-font-size-tiny {
  font-size: 70%;
}

.tex-font-size-script {
  font-size: 75%;
}

.tex-font-size-footnotes {
  font-size: 85%;
}

.tex-font-size-small {
  font-size: 85%;
}

.tex-font-size-normal {
  font-size: 100%;
}

.tex-font-size-large-1 {
  font-size: 115%;
}

.tex-font-size-large-2 {
  font-size: 130%;
}

.tex-font-size-large-3 {
  font-size: 145%;
}

.tex-font-size-huge-1 {
  font-size: 175%;
}

.tex-font-size-huge-2 {
  font-size: 200%;
}

.tex-font-style-sf {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.tex-font-style-tt {
  font-size: 110%;
  font-family: courier new, monospace;
}

.tex-font-style-bf {
  font-weight: bold;
}

.tex-font-style-it {
  font-style: italic;
}

.tex-font-style-sl {
  font-style: italic;
}

.tex-font-style-sc {
  text-transform: uppercase;
}

.tex-font-style-striked {
  text-decoration: line-through;
}

.tex-font-style-underline {
  text-decoration: underline;
}

.tex-graphics {
  display: block;
}

.full-height {
  height: 100vh;
}
.flex-column {
  display: flex;
  flex-direction: column;
}
.fix-to-bottom {
  margin-top: auto;
}

footer {
  color: var(--text-color) !important;
  background-color: var(--box-bg-color);
  text-align: center;
}
footer a {
  color: var(--text-color);
}
footer a:hover {
  color: #409eff;
  text-decoration: none;
}
footer h1 {
  font-family: -apple-system, BlinkMacSystemFont, PingFang SC, HarmonyOS Sans SC,
    Segoe UI, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  font-weight: 300;
  color: var(--text-color);
  line-height: 1.1;
  font-size: 1.5rem;
}

.vxe-table {
  font-family: -apple-system, BlinkMacSystemFont, PingFang SC, HarmonyOS Sans SC,
    Segoe UI, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol!important;
}
.mundb-footer {
  padding: 1rem 2.5rem;
  width: 100%;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1;
}
@media (min-width: 768px) {
  .hr-none {
    display: none !important;
  }
}
.el-empty {
  max-width: 256px;
  margin: 0 auto;
}
.el-empty__description {
  text-align: center;
  color: #3498db;
  font-size: 13px;
}
</style>
<style>
.markdown-body pre {
  display: block;
  border-radius: 3px !important;
  border: 1px solid var(--border-color);
  padding: 0 16px 0 50px !important;
  position: relative !important;
  overflow-y: hidden !important;
  font-size: 1rem !important;
  background-color: var(--code-bg-color) !important;
  white-space: pre !important;
}
.markdown-body pre code {
  line-height: 26px !important;
}
.markdown-body pre ol.pre-numbering {
  position: absolute;
  top: 0;
  left: 0;
  line-height: 26px;
  margin: 0;
  padding: 0;
  list-style-type: none;
  counter-reset: sectioncounter;
  background-color: var(--code-pre-numbering-bg-color);
  color: #777;
  font-size: 12px;
}
.markdown-body pre ol.pre-numbering li {
  margin-top: 0 !important;
}
.markdown-body pre ol.pre-numbering li:before {
  content: counter(sectioncounter) "";
  counter-increment: sectioncounter;
  display: inline-block;
  width: 40px;
  text-align: center;
}
.markdown-body pre i.code-copy {
  position: absolute;
  top: 0;
  right: 0;
  background-color: #2196f3;
  display: none;
  padding: 5px;
  margin: 5px 5px 0 0;
  font-size: 11px;
  border-radius: inherit;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.markdown-body pre:hover i.code-copy {
  display: block;
}
.markdown-body pre i.code-copy:hover i.code-copy {
  display: block;
}

.markdown-body blockquote {
  color: #666;
  border-left: .4rem solid #42b983;
  padding: 10px;
  margin-left: 0;
  font-size: 14px;
  background: #e8ecf3;
}
.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
  position: relative;
  margin-top: 1em;
  margin-bottom: 16px;
  font-weight: bold;
  line-height: 1.4;
}
.markdown-body h1 {
  padding-bottom: 0.3em;
  font-size: 1.86em;
  line-height: 1.2;
  border-bottom: 1px solid var(--border-color);
}
.markdown-body h2 {
  font-size: 1.45em;
  line-height: 1.425;
  border-bottom: 1px solid var(--border-color);
  padding: 8px 10px;
  color: #545857;
  border-radius: 3px;
}
.markdown-body h3 {
  font-size: 1.3em;
  line-height: 1.43;
}
.markdown-body h3:before {
  content: "";
  border-left: 4px solid #03a9f4;
  padding-left: 6px;
}
.markdown-body h4 {
  font-size: 1.12em;
}
.markdown-body h4:before {
  content: "";
  border-left: 4px solid #bbb;
  padding-left: 6px;
}
.markdown-body img {
  border: 0;
  background: #ffffff;
  padding: 15px;
  box-sizing: border-box;
  margin: 5px 0;
  box-shadow: inset 0 0 12px rgb(219 219 219);
}
.markdown-body p {
  font-size: 15px;
  word-wrap: break-word;
  word-break: break-word;
  line-height: 1.8;
}
.hljs {
  color: var(--text-color) !important;
  background: var(--code-bg-color) !important;
  padding: 0 !important;
}
</style>
