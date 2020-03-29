<template>
  <div id="root">
    <div class="mDetailHeader">
      <div style="position: absolute;left: 10px;font-weight: bolder;width: 30px" @click="$router.go(-1)"><el-icon class="el-icon-arrow-left"></el-icon></div>
      <div style="font-size: 20px;">信息详情</div>
    </div>
    <div>
      <el-carousel>
        <el-carousel-item v-for="item in pic_urls" :key="item"
                          style="text-align:center;background: white">
          <img :src="item" alt="" :id="item" style="width: auto;height: auto;max-width: 100%;max-height: 100%;	"/>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="mbasicinfo">
      <div class="mtitle">
        <span v-if="category[1]==='表白墙'" class="biaobaiC">表白</span>
        <span v-else class="biaobaiC" style="color: #fdc006;border-color: #fdc006">{{category[1]}}</span> {{title}}
      </div>
      <div class="mmcontent">{{content}}</div>

      <div class="mobSpecial" v-if="category[1]==='出售'||category[1]==='求购'">
        <div class="mobSpecialLine">
          <el-icon class="el-icon-magic-stick"></el-icon>
          <span style="font-size: 14px">{{new_or_old}}成新</span>
        </div>
        <div class="mobSpecialLine" style="color: red">
          <el-icon name="money" style="color: #616776;"></el-icon>
          <span style="font-size: 14px">{{price}}元</span>
        </div>
      </div>

      <div class="mobSpecial" v-if="category[1]==='出借'||category[1]==='求租'">
        <div class="mobSpecialLine">
          <el-icon class="el-icon-magic-stick"></el-icon>
          <span style="font-size: 14px">租借{{time_span}}天</span>
        </div>
        <div class="mobSpecialLine" style="color: red">
          <el-icon name="money" style="color: #616776;"></el-icon>
          <span style="font-size: 14px">共{{price}}元</span>
        </div>
      </div>

      <div class="mobSpecial" v-if="category[1]==='家教'">
        <div class="mobSpecialLine">
          <el-icon class="el-icon-time"></el-icon>
          <span style="font-size: 14px">{{time}}</span>
        </div>
        <div class="mobSpecialLine">
          <el-icon class="el-icon-location-outline"></el-icon>
          <span style="font-size: 14px">{{place}}</span>
        </div>
        <div class="mobSpecialLine">
          <el-icon class="el-icon-chat-line-round"></el-icon>
          <span style="font-size: 14px">学生目前{{target_grade}}</span>
        </div>
        <div class="mobSpecialLine">
          <el-icon class="el-icon-user"></el-icon>
          <span style="font-size: 14px">只需{{sex_require}}生</span>
        </div>
        <div class="mobSpecialLine" style="color: red">
          <el-icon name="money" style="color: #616776;"></el-icon>
          <span style="font-size: 14px">{{price}}元/节</span>
        </div>
      </div>

      <div class="mobSpecial" v-if="category[1]==='学校事务'||category[1]==='其他兼职'">
        <div class="mobSpecialLine">
          <el-icon class="el-icon-time"></el-icon>
          <span style="font-size: 14px">{{time}}</span>
        </div>
        <div class="mobSpecialLine">
          <el-icon class="el-icon-location-outline"></el-icon>
          <span style="font-size: 14px">{{place}}</span>
        </div>
        <div class="mobSpecialLine" style="color: red">
          <el-icon name="money" style="color: #616776;"></el-icon>
          <span style="font-size: 14px">报酬{{price}}元</span>
        </div>
      </div>

      <div class="mobSpecial" v-if="category[1]==='志愿者招聘'">
        <div class="mobSpecialLine">
          <el-icon class="el-icon-time"></el-icon>
          <span style="font-size: 14px">{{time}}</span>
        </div>
        <div class="mobSpecialLine">
          <el-icon class="el-icon-location-outline"></el-icon>
          <span style="font-size: 14px">{{place}}</span>
        </div>
      </div>


      <div class="mobSpecial" v-if="category[1]==='约玩/约学习'||category[1]==='拼车'">
        <div class="mobSpecialLine">
          <el-icon class="el-icon-time"></el-icon>
          <span style="font-size: 14px">{{time}}</span>
        </div>
        <div class="mobSpecialLine">
          <el-icon class="el-icon-location-outline"></el-icon>
          <span style="font-size: 14px">{{place}}</span>
        </div>

        <div class="mobSpecialLine">
          <el-icon class="el-icon-user"></el-icon>
          <el-progress :percentage="(now_number/total_number)*100" color="#fdc006" style="width: 30%;margin-right: 10px"
                       :stroke-width="8" :show-text="false"></el-progress>
          <span>{{now_number}}/{{total_number}}人</span>
          <div class="mhasJoinTeam" v-if="now_number===total_number&&team_has_joined" @click="showLeave=true">已加入(满)</div>
          <div class="mhasJoinTeam" v-if="now_number===total_number&&!team_has_joined">已满</div>
          <div class="mjoinTeam" v-if="!team_has_joined&&now_number!==total_number" @click="showJoin=true">加入</div>
          <div class="mhasJoinTeam" v-if="team_has_joined&&now_number!==total_number" @click="showLeave=true">已加入</div>
        </div>
      </div>

    </div>

    <div class="mmiddle">
      <div class="myonghu">
        <div class="mtouxiang">
          <img src="../../../static/picture/about_pic.jpg" alt="" style="height: 100%">
        </div>
        <div class="mname">{{publisher}}</div>
      </div>

      <div class="mtime">
        <i class="el-icon-time"></i>
        <span style="font-size: 14px">发布于{{publish_time}}</span>
      </div>

      <!--      <div class="mcate">-->
      <!--        <i class="el-icon-tickets"> </i>-->
      <!--        <el-tag type="warning">{{category[0]}}</el-tag>-->
      <!--        <el-tag type="warning">{{category[1]}}</el-tag>-->
      <!--      </div>-->

      <div class="mmmtag">
        <i class="el-icon-price-tag"> </i>
        <div v-for="item in tags" class="mtags">{{item}}</div>
        <div v-if="tags.length===0" style="font-size: 13px;color: #8c939d">无标签</div>
      </div>

      <div class="mconnect">
        <i class="el-icon-phone-outline"></i>
        <span style="font-size: 14px;color: #2d8cf0" v-if="username===''" @click="jump('MLogin')">登录后查看联系方式</span>
        <span style="font-size: 14px;color: #2d8cf0" v-if="username!==''">详情请拨打 {{contactWay}}</span>
      </div>
    </div>

    <div class="mcomment">
      <div style="height: 20px;font-size: 14px;line-height: 20px;margin-bottom: 10px">精彩评论</div>
      <div v-for="item in comment" class="McommentItem">
        <div class="McommentItemCol1">
          <img src="../../../static/picture/about_pic.jpg" style="height: 100%;margin-left: 5px" alt="">
        </div>
        <div class="McommentItemCol2">
          <div style="font-size: 12px;height: 10px;margin-bottom: 5px;color: black;font-weight: bolder">
            {{item.publisher_name}}&nbsp;&nbsp;<span style="color:#8c939d;font-weight: normal">2020-03-15</span></div>
          <div style="width: 100%;margin-bottom: 5px;font-size: 13px;color: #4b4b4b">{{item.comment_message}}</div>
        </div>
        <div class="McommentItemCol3">
          <span @click="wantJubaoComment(item)" >举报</span>
          <span style="margin-left: 10px" @click="wantDeleteComment(item)" v-if="item.has_commented">删除</span>
        </div>
      </div>
      <div v-if="comment.length===0" style="width: 100%;height: 50px;line-height: 50px;text-align: center;color: #8c939d">暂无评论
      </div>
    </div>

    <div class="mmtail">
      <i class="el-icon-house" style="width: 20%;text-align: center" @click="jump('MGoods')"> </i>
      <i class="el-icon-chat-dot-square" style="width: 20%;text-align: center" @click="toComment"></i>
      <i class="el-icon-star-off" style="color:#fdc006;width: 20%;text-align: center" v-if="!shou" @click="shoucang"></i>
      <i class="el-icon-star-on" style="color:#fdc006;width: 20%;text-align: center" v-if="shou" @click="qvxiaoshoucang"></i>
      <i class="el-icon-warning" style="color:red;width: 20%;text-align: center" @click="wantJubao"></i>
    </div>

    <el-dialog :visible.sync="reportVisible" width="80%">
      <div style="margin-bottom: 10px">请核实要举报的信息名称<span style="font-weight: bolder;color: black">“{{title}}”</span>
      </div>
      <select style="margin-bottom: 10px;width: 100%;height: 25px;border: 1px solid #e0e0e0;background: white;border-radius: 5px" v-model="reportChoose" @change="changeOOO">
        <option>低俗色情</option>
        <option>内容不实或有误</option>
        <option>涉嫌违法犯罪</option>
        <option>侵权（抄袭）</option>
        <option>其他</option>
      </select>
      <textarea placeholder="请输入详细描述（200字以内）"
                v-model="ReportReason"
                maxlength="200"
                class="mreportTextarea">
      </textarea>
      <button class="mreportButton" @click="showReport=true">举 报</button>
    </el-dialog><el-dialog :visible.sync="reportVisible1" width="80%">

    <div style="margin-bottom: 10px">你要举报评论<span style="font-weight: bolder;color: black">“{{reportCommentContent}}”</span>
    </div>
    <select style="margin-bottom: 10px;width: 100%;height: 25px;border: 1px solid #e0e0e0;background: white;border-radius: 5px" v-model="reportChoose" @change="changeOOO">
      <option>低俗色情</option>
      <option>内容不实或有误</option>
      <option>涉嫌违法犯罪</option>
      <option>侵权（抄袭）</option>
      <option>其他</option>
    </select>

    <textarea placeholder="请输入举报原因（200字以内）"
              v-model="ReportReason"
              maxlength="200"
              class="mreportTextarea">
      </textarea>
    <button class="mreportButton" @click="showReportComment=true">举 报</button>
  </el-dialog>

    <confirm v-model="showJoin"
             title="确认加入组队?"
             @on-cancel="onCancelJoin"
             @on-confirm="joinTeam">
      <p style="text-align:center;">加入后可随时退出</p>
    </confirm>
    <confirm v-model="showLeave"
             title="确认离开组队?"
             @on-cancel="onCancelLeave"
             @on-confirm="exitTeam">
      <p style="text-align:center;">离开后可重新加入</p>
    </confirm>
    <confirm v-model="showReport"
             title="确认举报该消息?"
             @on-cancel="onCancelReport"
             @on-confirm="onConfirmReport">
      <p style="text-align:center;">随意举报将面临处罚</p>
    </confirm>
    <confirm v-model="showReportComment"
             title="确认举报该评论?"
             @on-cancel="onCancelReportComment"
             @on-confirm="onConfirmReportComment">
      <p style="text-align:center;">随意举报将面临处罚</p>
    </confirm>
    <confirm v-model="deleteComment"
             title="确认删除该评论?"
             @on-cancel="onCancelLeave"
             @on-confirm="deleteMyComment">
      <p style="text-align:center;">删除后将无法找回</p>
    </confirm>
  </div>
</template>

<script>
  import { Confirm } from 'vux'
  export default {
    name: "Mdetail",
    components: {
      Confirm
    },
    data() {
      return {
        deleteCommentId:'',
        deleteComment:false,
        reportCommentId:'',
        reportCommentContent:'',
        showJoin:false,
        showReport:false,
        showReportComment:false,
        showLeave:false,
        contactWay: '',
        ReportReason: '',
        reportChoose:'低俗色情',
        reportVisible: false,
        reportVisible1: false,
        username: '',
        text: '',
        textarea: '',
        id: '',
        title: '',
        pic_urls: ["http://leeyum-bucket.oss-cn-hangzhou.aliyuncs.com/default_front_file/404pic.png",],
        content: '',
        tags: [],
        category: [],
        publish_time: '',
        publisher: '',
        comment: [],
        shou: false,

        price: '未知',
        new_or_old: 10,
        time_span: '未知',
        time: '未知',
        place: '未知',
        now_number: '未知',
        total_number: '未知',
        target_grade: '未知',
        sex_require: '未知',
        team_has_joined: false,
      }
    },
    methods: {
      shoucang: function () {
        if (this.$data.username === '') {
          this.$message.error("请先登录！");
          this.jump("MLogin");
        } else {
          const dataa = {
            article_id: this.$data.id
          };
          const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };
          this.$axios.post("/api/user/like/", dataa, config).then(res => {
            this.$data.shou = !this.$data.shou;
            this.$message.success("收藏成功！");
          }).catch(err => {

          })
        }
      },
      deleteMyComment:function(){
        this.$axios.delete("/api/comment/?comment_id="+this.$data.deleteCommentId).then(()=>{
          this.$message.success("删除成功！");
        }).catch(()=>{
          this.$message.success("出了一点小错误，请稍后重试！");
        })
      },
      qvxiaoshoucang:function(){
        this.$axios.delete("/api/user/like/?article_id="+this.$data.id).then(res => {
          this.$data.shou = !this.$data.shou;
          this.$message.success("已取消收藏！");
        }).catch(err => {

        })
      },
      wantJubao: function () {
        if (this.$data.username === '') {
          this.$message.error("请先登录！");
          this.jump("MLogin");
        } else {
          this.$data.reportVisible = true;
        }
      },
      jubao: function () {
        const dataa = {
          article_id: this.$data.id,
          report_reason: this.$data.ReportReason
        };
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        this.$axios.post("/api/report/", dataa, config).then(res => {
          this.$message.success("举报成功，感谢您为净化网络做出的贡献！");
          this.$data.reportVisible = false;
        }).catch(err => {
          this.$message.success("出了一点小问题，请稍后再试");
        })
      },
      getScrollWidth: function () {
        // 获取滚动条宽度
        let noScroll, scroll, oDiv = document.createElement("DIV");
        oDiv.style.cssText = "position:absolute;top:-1000px;width:100px;height:100px; overflow:hidden;";
        noScroll = document.body.appendChild(oDiv).clientWidth;
        oDiv.style.overflowY = "scroll";
        scroll = oDiv.clientWidth;
        document.body.removeChild(oDiv);
        return noScroll - scroll;
      },
      init: function () {
        let Height = window.screen.availHeight;
        let Width = window.screen.availWidth;
        document.getElementById("root").style.height = Height + "px";
        document.getElementById("root").style.width = Width - this.getScrollWidth() + "px";
        document.getElementById("root").style.background = "#f0f0f0";
        require('../../assets/css/pages/Mobile/detailStyleMobile.css');
        this.$axios.get("/api/user/details/").then(res => {
          localStorage.setItem("username", res.data.data.username);
          this.$data.username = localStorage.getItem("username");
        }).catch(err => {
          console.log(err);
          localStorage.setItem("username", '');
          this.$data.username = '';
        });
      },
      jump: function (name) {
        this.$router.push({name: name});
      },
      getGoodInfo: function () {
        this.$data.id = this.$route.params.articleId;
        this.$axios.get("/api/article/details/?id=" + this.$data.id).then(res => {
          this.$data.shou=res.data.data.is_liked;
          this.$data.id = res.data.data.id;
          if (res.data.data.pic_urls.length > 0) {
            this.$data.pic_urls.splice(0,1);
            this.$data.pic_urls.push(...res.data.data.pic_urls);
          }
          this.$data.title = res.data.data.title;
          this.$data.content = res.data.data.content.body;
          this.$data.tags = res.data.data.tags;
          this.$data.category = res.data.data.category;
          this.$data.publish_time = res.data.data.publish_time;
          this.$data.publisher = res.data.data.publisher.username;
          if (res.data.data.team_has_joined) this.$data.team_has_joined = res.data.data.team_has_joined;
          if (res.data.data.content.price !== null) this.$data.price = res.data.data.content.price;
          if (res.data.data.content.new_or_old) this.$data.new_or_old = res.data.data.content.new_or_old;
          if (res.data.data.content.time_span) this.$data.time_span = res.data.data.content.time_span;
          if (res.data.data.content.time) this.$data.time = res.data.data.content.time;
          if (res.data.data.content.place) this.$data.place = res.data.data.content.place;
          if (res.data.data.content.total_number) this.$data.total_number = res.data.data.content.total_number;
          if (res.data.data.content.now_number) this.$data.now_number = res.data.data.content.now_number;
          if (res.data.data.content.target_grade) this.$data.target_grade = res.data.data.content.target_grade;
          if (res.data.data.content.sex_require) this.$data.sex_require = res.data.data.content.sex_require;
          this.$data.contactWay = res.data.data.publisher.phone_number;
        }).catch(error => {
          if (error.response) {
            if(error.response.status===404) {
              this.$message.error("找不到相关页面");
              this.jump("MGoods");
            }
          } else if (error.request) {
            console.log(error.request);
          }
        });

        this.$axios.get("/api/comment/?article_id=" + this.$data.id).then(res => {
          for (let i = 0; i < res.data.data.length; i++) {
            let temp = {
              comment_id: res.data.data[i].comment_id,
              publisher_name: res.data.data[i].publisher_name,
              comment_message: res.data.data[i].comment_message,
              has_commented: res.data.data[i].has_commented
            };
            this.$data.comment.push(temp);
          }
        }).catch(err => {
          console.log(err);
        })
      },
      joinTeam: function () {
        if (this.$data.username === '') {
          this.$message.error("请先登录！");
          this.jump("MLogin");
        } else {
          const dataa = {
            article_id: this.$data.id
          };
          const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };
          this.$axios.put("/api/article/join_team/", dataa, config).then(res => {
            this.$data.team_has_joined = true;
            let temp = parseInt(this.$data.now_number) + 1;
            this.$data.now_number = temp;
          }).catch(err => {
            this.$alert("加入失败，请重试");
          })
        }
      },
      exitTeam: function () {
        if (this.$data.username === '') {
          this.$message.error("请先登录！");
          this.jump("MLogin");
        } else {

          const dataa = {
            article_id: this.$data.id
          };
          const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };
          this.$axios.put("/api/article/leave_team/", dataa, config).then(res => {
            this.$data.team_has_joined = false;
            let temp = parseInt(this.$data.now_number) - 1;
            this.$data.now_number = temp.toString();
          }).catch(err => {
            this.$alert("退出失败，请重试");
          })
        }
      },
      toComment: function () {
        if (this.$data.username === '') {
          this.$message.error("请先登录！");
          this.jump("MLogin");
        } else {
          this.$router.push({
            name: 'MWritecomment',
            params: {
              article_id: this.$data.id
            }
          })
        }
      },
      onCancelJoin:function(){
        this.$message({
          type: 'info',
          message: '已返回'
        });
      },
      onCancelLeave:function(){
        this.$message({
          type: 'info',
          message: '已返回'
        });
      },
      onCancelReport:function () {
        this.$message({
          type: 'info',
          message: '已取消举报'
        });
      },
      onCancelReportComment:function () {
        this.$message({
          type: 'info',
          message: '已取消举报'
        });
      },
      onConfirmReport:function () {
        const dataa = {
          article_id: this.$data.id,
          report_reason: this.$data.ReportReason
        };
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        this.$axios.post("/api/report/", dataa, config).then(res => {
          this.$message.success("举报成功，感谢您为净化网络做出的贡献！");
          this.$data.reportVisible = false;
        }).catch(err => {
          this.$message.success("出了一点小问题，请稍后再试");
        })
      },
      onConfirmReportComment:function () {
        const dataa = {
          comment_id: this.$data.reportCommentId,
          report_reason: this.$data.ReportReason
        };
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        this.$axios.post("/api/report/", dataa, config).then(res => {
          this.$message.success("举报成功，感谢您为净化网络做出的贡献！");
          this.$data.reportVisible1 = false;
        }).catch(err => {
          this.$message.success("出了一点小问题，请稍后再试");
        })
      },
      wantJubaoComment:function(item){
        this.$data.reportCommentId=item.comment_id;
        this.$data.reportCommentContent=item.comment_message;
        this.$data.reportVisible1=true;
      },
      wantDeleteComment:function(item){
        this.$data.deleteComment=true;
        this.$data.deleteCommentId=item.comment_id;
      },
      changeOOO:function(){
        console.log(this.$data.reportChoose);
      },
    },
    mounted() {
      this.init();
    },
    created() {
      this.getGoodInfo();
    }
  }
</script>

<style scoped>

</style>
