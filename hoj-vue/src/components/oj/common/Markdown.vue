<template>
  <div ref="mdContent" class="markdown-body"></div>
</template>
<script>
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';
import 'katex';
import renderMathInElement from 'katex/contrib/auto-render/auto-render';

export default {
  name: "Markdown",
  props: {
    isAvoidXss: {
      default: false,
      type: Boolean,
    },
    content: {
      require: true,
      type: String,
    },
  },
  data(){
    return{
        pdfLogo: require('@/assets/pdf-logo.svg'),
    }
  },
  mounted() {
    this.renderContent();
  },
  methods: {
    renderContent() {
      if (this.content == null || this.content == undefined) {
        this.$refs.mdContent.innerHTML = "";
        return;
      }

      try {
        // 渲染Markdown
        let html = this.$markDown.render(this.content);

        // 处理PDF链接
        html = html.replace(
          /<a.*?href="(.*?.pdf)".*?>(.*?)<\/a>/gi,
          `<p></p>
          <file-card>
              <div>
                  <img class="pdf-svg" src="${this.pdfLogo}">
              </div>
              <div>
                  <h5 class="filename">$2</h5>
                  <p><a href="$1" target="_blank">Download</a></p>
              </div>
          </file-card>
          <object data="$1" type="application/pdf" width="100%" height="800px">
              <embed src="$1">
              This browser does not support PDFs. Please download the PDF to view it: <a href="$1" target="_blank">Download PDF</a>.</p>
              </embed>
          </object>
          `
        );

        // 根据isAvoidXss决定是否进行XSS过滤
        if (this.isAvoidXss) {
          // 自定义DOMPurify配置，特别处理数学公式
          const purifyConfig = {
            ADD_TAGS: ['math', 'mrow', 'mi', 'mo', 'mn', 'msub', 'mfrac', 'mtext', 'annotation', 'semantics', 'svg', 'file-card'],
            ADD_ATTR: ['xmlns', 'display', 'class', 'style', 'mathvariant'],
            FORBID_TAGS: ['script', 'iframe'],
          };

          html = DOMPurify.sanitize(html, purifyConfig);
        }

        // 更新DOM
        this.$refs.mdContent.innerHTML = html;

        // 应用代码高亮
        this.applyHighlight();

        // 渲染数学公式
        this.renderKatex();
      } catch (error) {
        console.error("Markdown渲染错误:", error);
        this.$refs.mdContent.innerHTML = `<div class="markdown-error">Markdown渲染错误，请检查内容格式</div>`;
      }
    },
    applyHighlight() {
      // 高亮代码块
      const codeBlocks = this.$refs.mdContent.querySelectorAll('pre code');
      codeBlocks.forEach(block => {
        hljs.highlightBlock(block);
      });
    },
    renderKatex() {
      // 渲染数学公式
      renderMathInElement(this.$refs.mdContent, {
        delimiters: [
          {left: '$$', right: '$$', display: true},
          {left: '$', right: '$', display: false},
          {left: '\\[', right: '\\]', display: true},
          {left: '\\(', right: '\\)', display: false}
        ],
        throwOnError: false,
        errorColor: '#cc0000',
        trust: true,
        strict: false
      });
    }
  },
  watch: {
    content: {
      handler() {
        this.$nextTick(() => {
          this.renderContent();
        });
      },
      immediate: true
    }
  }
};
</script>
<style>
file-card .pdf-svg {
  padding: 0 !important;
  margin: 0 !important;
  box-shadow: none !important;
}
file-card {
  margin: 1rem 0;
  display: flex;
  align-items: center;
  max-width: 100%;
  border-radius: 4px;
  transition: 0.2s ease-out 0s;
  color: #7a8e97;
  background: #fff;
  padding: 0.6rem;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.15);
}
file-card > div:first-of-type {
  display: flex;
  align-items: center;
  padding-right: 1rem;
  width: 5rem;
  height: 5rem;
  flex-shrink: 0;
  flex-grow: 0;
}
file-card .filename {
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.2rem;
  margin-bottom: 0.5rem !important;
  font-family: "Roboto";
  font-weight: 400 !important;
  line-height: 1.2 !important;
  color: #000;
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal !important;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
file-card p {
  margin: 0;
  line-height: 1;
  font-family: "Roboto";
}

.markdown-error {
  color: #f56c6c;
  padding: 10px;
  background-color: #fef0f0;
  border-radius: 4px;
  border: 1px solid #f56c6c;
  margin: 10px 0;
}
</style>