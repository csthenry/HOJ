(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{359:function(s,a,e){"use strict";e.r(a);var n=e(41),t=Object(n.a)({},(function(){var s=this,a=s.$createElement,e=s._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h1",{attrs:{id:"评测数据同步"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#评测数据同步"}},[s._v("#")]),s._v(" 评测数据同步")]),s._v(" "),e("ol",[e("li",[e("p",[s._v("在主后台服务开启rsync实现服务增量同步，本HOJ使用子服务器主动拉取最新评测数据的功能（可选择主服务推的功能，但对主服务器的功耗较大）")])]),s._v(" "),e("li",[e("p",[s._v("首先在主服务器（运行后端服务）的服务器中配置，指令如下")]),s._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("vim")]),s._v(" /etc/rsyncd/rsyncd.conf "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 新建配置文件")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 将以下内容写入的rsyncd.conf文件里面 然后保存退出")]),s._v("\nport "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("873")]),s._v("\nuid "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" root\ngid "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" root\nuse "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("chroot")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("yes")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("read")]),s._v(" only "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("yes")]),s._v("\nlog "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("file")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" /hoj/log/rsyncd.log\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("testcase"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\npath "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" /hoj/testcase/\nlist "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("yes")]),s._v("\nauth "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("users")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" hojrsync\nsecrets "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("file")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" /etc/rsyncd/rsyncd.passwd\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br")])]),e("p",[s._v("再新建密码配置文件")]),s._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("vim")]),s._v(" /etc/rsyncd/rsyncd.passwd\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 将以下内容写入rsyncd.passwd文件里面，冒号后面的密码可用自定义，然后保存退出。")]),s._v("\nhojrsync:123456\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br")])]),e("p",[s._v("修改密码配置文件的权限为600")]),s._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("chmod")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("600")]),s._v(" /etc/rsyncd/rsyncd.passwd\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v("然后使用命令，使用后台守护进程运行rsync")]),s._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("rsync")]),s._v(" --daemon --config"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("/etc/rsyncd/rsyncd.conf\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("之后在运行JudgeServer判题服务的服务器上使用rsync每60秒同步一次指定文件夹的评测数据（同步周期可自己改）")]),s._v(" "),e("p",[s._v("新建密码配置文件，同时写入与主服务端的rsync一样的密码")]),s._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("vim")]),s._v(" /etc/rsyncd/rsyncd.passwd\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token number"}},[s._v("123456")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 保存退出")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v("修改密码配置文件的权限为600")]),s._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("chmod")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("600")]),s._v(" /etc/rsyncd/rsyncd.passwd\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v("然后编写sh文件")]),s._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("vim")]),s._v(" /etc/rsyncd/rsyncd_slave.sh\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v("注意${ip}写自己主服务器的ip")]),s._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("while")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("do")]),s._v("\n       \t"),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("rsync")]),s._v(" -avz --delete --progress --password-file"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("/etc/rsyncd/rsyncd.passwd hojrsync@"),e("span",{pre:!0,attrs:{class:"token variable"}},[s._v("${ip}")]),s._v("::testcase /hoj/testcase "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">>")]),s._v(" /hoj/log/rsync_slave.log\n       \t"),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("sleep")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("60")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("done")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br")])]),e("p",[s._v("使用 nohup后台运行即可")]),s._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("nohup")]),s._v(" /etc/rsyncd/rsyncd_slave.sh "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])])])])])}),[],!1,null,null,null);a.default=t.exports}}]);