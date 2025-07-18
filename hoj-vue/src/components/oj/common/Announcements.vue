<template>
  <el-card shadow :padding="10">
    <div slot="header">
      <span class="panel-title" v-if="isContest">{{ title }}</span>
      <span v-else class="home-title panel-title"><i class="el-icon-data-board"></i> {{ title }}</span>
      <span style="float: right">
        <el-button
          v-if="listVisible"
          type="primary"
          @click="init"
          size="small"
          icon="el-icon-refresh"
          :loading="btnLoading"
          >{{ $t('m.Refresh') }}</el-button
        >
        <el-button
          v-else
          type="primary"
          icon="el-icon-back"
          @click="goBack"
          size="small"
          >{{ $t('m.Back') }}</el-button
        >
      </span>
    </div>
    <el-skeleton :count="4" :loading="skeletonLoading" :throttle="skeletonDelay" animated>
      <template slot="template">
        <el-skeleton-item
          variant="button"
          style="margin-bottom:15px; width: 100%; height: 88px;"
        />
      </template>
      <template>
        <transition-group name="el-zoom-in-bottom">
          <div
            class="no-announcement"
            v-if="!announcements.length"
            key="no-announcement"
          >
            <el-empty :description="$t('m.No_Announcements')"></el-empty>
          </div>
          <template v-if="listVisible">
            <ul class="announcements-container" key="list">
              <li v-for="announcement in announcements" :key="announcement.title">
                <div class="flex-container">
                  <div class="title">
                    <a class="entry" @click="goAnnouncement(announcement)">
                      {{ announcement.title }}</a
                    >
                  </div>

                  <div class="info">
                    <span class="date">
                      <i class="el-icon-edit"></i>
                      {{ announcement.gmtCreate | localtime }}
                    </span>
                    <span class="creator">
                      <i class="el-icon-user"></i>
                      {{ announcement.username }}
                    </span>
                  </div>
                </div>
              </li>
            </ul>
            <Pagination
              v-if="!isContest"
              key="page"
              :total="total"
              :page-size="limit"
              @on-change="getAnnouncementList"
            >
            </Pagination>
          </template>

          <template v-else>
            <div
              v-katex
              v-highlight
              v-html="announcement.content"
              key="content"
              class="content-container markdown-body"
            ></div>
          </template>
        </transition-group>
      </template>
    </el-skeleton>
  </el-card>
</template>

<script>
import api from '@/common/api';
import { addCodeBtn } from '@/common/codeblock';
import Pagination from '@/components/oj/common/Pagination';
export default {
  name: 'Announcement',
  components: {
    Pagination,
  },
  props: {
    limit: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      total: 0,
      skeletonLoading: true,
      skeletonDelay: 0,
      btnLoading: false,
      announcements: [],
      isMarkdownRender: [],
      announcement: '',
      listVisible: true,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if(this.total !== 0) {
        this.skeletonDelay = 500;
      }
      if (this.isContest) {
        this.getContestAnnouncementList();
      } else {
        this.getAnnouncementList();
      }
      this.isMarkdownRender = []; //重置markdown渲染状态
    },
    getAnnouncementList(page = 1) {
      this.skeletonLoading = true;
      this.btnLoading = true;
      api.getAnnouncementList(page, this.limit).then(
        (res) => {
          this.skeletonLoading = false;
          this.btnLoading = false;
          this.announcements = res.data.data.records;
          this.total = res.data.data.total;
        },
        () => {
          this.skeletonLoading = false;
          this.btnLoading = false;
        }
      );
    },
    getContestAnnouncementList(page = 1) {
      this.skeletonLoading = true;
      this.btnLoading = true;
      api
        .getContestAnnouncementList(
          page,
          this.limit,
          this.$route.params.contestID
        )
        .then(
          (res) => {
            this.skeletonLoading = false;
            this.btnLoading = false;
            this.announcements = res.data.data.records;
            this.total = res.data.data.total;
          },
          () => {
            this.skeletonLoading = false;
            this.btnLoading = false;
          }
        );
    },
    goAnnouncement(announcement) {
      this.announcement = announcement;
      //避免反复渲染markdown
      if(!this.isMarkdownRender[announcement.id]){
        this.announcement.content = this.$markDown.render(announcement.content);
        this.isMarkdownRender[announcement.id] = true;
      }
      this.listVisible = false;
      this.$nextTick((_) => {
        addCodeBtn();
      });
    },
    goBack() {
      this.listVisible = true;
      this.announcement = '';
    },
  },
  computed: {
    title() {
      if (this.listVisible) {
        return this.isContest
          ? this.$i18n.t('m.Contest_Announcement')
          : this.$i18n.t('m.Announcement');
      } else {
        return this.announcement.title;
      }
    },
    isContest() {
      return !!this.$route.params.contestID;
    },
  },
};
</script>

<style scoped>
.announcements-container {
  margin-top: -10px;
  margin-bottom: 10px;
}
.announcements-container li {
  padding-top: 15px;
  list-style: none;
  padding-bottom: 15px;
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 10px;
  font-size: 16px;
  border: 1px solid hsla(0,0%,73.3%,.5);
  border-left: 4px solid #409eff;
  border-radius: 6px;
}
/* .announcements-container li:last-child {
  border-bottom: none;
} */
.flex-container {
  text-align: center;
}
.flex-container .info {
  margin-top: 5px;
}

.flex-container .title .entry {
  color: var(--text-color);
  font-size: 18px;
}
.flex-container .title a:hover {
  color: #2d8cf0;
  border-bottom: 1px solid #2d8cf0;
}
.creator {
  width: 200px;
  text-align: center;
}
.date {
  width: 200px;
  text-align: center;
  margin-right: 5px;
}

.content-container {
  padding: 0 20px 20px 20px;
}

.no-announcement {
  text-align: center;
  font-size: 16px;
}

.announcement-animate-enter-active {
  animation: fadeIn 1s;
}
ul {
  list-style-type: none;
  padding-inline-start: 0px;
}
</style>
