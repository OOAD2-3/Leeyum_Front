<template>
  <div id="root">
    <PMyHead default-active="6"/>
    <div class="bac">
      <div class="adjust">
        <div class="content">
          <div class="content-head">信息发布</div>
          <div class="line"></div>
          <div class="content-title">
            <div class="content-title-text">标题</div>
            <input class="content-title-main" v-model="title"/>
          </div>
          <div class="content-main">
            <div class="content-title-text">内容（200字以内）</div>
            <textarea class="content-main-main" v-model="content" maxlength="200"></textarea>
          </div>
          <div class="content-type">
            <div class="content-title-text">类目</div>
            <div class="content-type-main1">
              <div class="chooseFirstType">
                <div
                  v-for="type in type_list"
                  :label="type.category_name"
                  :key="type.category_name"
                  class="chooseFirstTypeItem"
                  @click="readyChooseSubType(type)"
                  :id="type.category_id">
                  {{type.category_name}}
                </div>
              </div>
              <div class="chooseSubType" id="chooseSubTypeDiv">
                <div v-for="item in activeSecondType"
                     @click="alreadyChooseSecondType(item)"
                     class="secondType"
                    :id="item.category_id">
                  {{item.category_name}}</div>
              </div>
            </div>
          </div>
          <div class="special" v-if="this.$data.typeCheckName==='求购'" id="求购">
            <div class="special_main">
              <div style="width: 30%;height: 25px;line-height: 25px;margin-left: 10px;">
                <span>预期价格:</span>
                <input class="yuqijiage" type="number" v-model="price"/>
              </div>
              <div style="width: 30%;height: 25px;line-height: 25px;margin-left: 10px;">
                <span>崭新程度:</span>
                <select class="zhanxinchengdu" v-model="new_or_old">
                  <option value="1">一成新</option>
                  <option value="2">两成新</option>
                  <option value="3">三成新</option>
                  <option value="4">四成新</option>
                  <option value="5">五成新</option>
                  <option value="6">六成新</option>
                  <option value="7">七成新</option>
                  <option value="8">八成新</option>
                  <option value="9">九成新</option>
                  <option value="10">十成新</option>
                </select>
              </div>
            </div>
          </div>
          <div class="special" v-if="this.$data.typeCheckName==='出售'" id="出售">
            <div class="special_main">
              <div style="width: 30%;height: 25px;line-height: 25px;margin-left: 10px;">
                <span>售价:</span>
                <input class="yuqijiage" type="number" v-model="price"/>
              </div>
              <div style="width: 30%;height: 25px;line-height: 25px;margin-left: 10px;">
                <span>崭新程度:</span>
                <select class="zhanxinchengdu" v-model="new_or_old">
                  <option value="1">一成新</option>
                  <option value="2">两成新</option>
                  <option value="3">三成新</option>
                  <option value="4">四成新</option>
                  <option value="5">五成新</option>
                  <option value="6">六成新</option>
                  <option value="7">七成新</option>
                  <option value="8">八成新</option>
                  <option value="9">九成新</option>
                  <option value="10">十成新</option>
                </select>
              </div>
            </div>
          </div>
          <div class="special" v-if="this.$data.typeCheckName==='求租'" id="求租">
            <div class="special_main">
              <div style="width: 30%;height: 25px;line-height: 25px;margin-left: 10px;">
                <span>预期价格:</span>
                <input class="yuqijiage" type="number" v-model="price"/>
              </div>
              <div style="width: 30%;height: 25px;line-height: 25px;margin-left: 10px;">
                <span>租赁天数:</span>
                <input class="yuqijiage" type="number" v-model="time_span"/>
              </div>
            </div>
          </div>
          <div class="special" v-if="this.$data.typeCheckName==='出借'" id="出借">
            <div class="special_main">
              <div style="width: 30%;height: 25px;line-height: 25px;margin-left: 10px;">
                <span>租价:</span>
                <input class="yuqijiage" type="number" v-model="price"/>
              </div>
              <div style="width: 30%;height: 25px;line-height: 25px;margin-left: 10px;">
                <span>可出租天数:</span>
                <input class="yuqijiage" type="number" v-model="time_span"/>
              </div>
            </div>
          </div>
          <div class="special" v-if="this.$data.typeCheckName==='约玩/约学习'" id="约玩/约学习">
            <div style="display: flex;width: 80%;margin-left: 10%;margin-bottom: 5px">
              <div style="width: 50%">
                <div>日期(具体时间请在内容里写明)</div>
                <input type="date" class="content-title-main" style="width: 150px;height: 25px;margin-left: 0" v-model="time"/>
              </div>
              <div style="width: 50%">
                <div>人数</div>
                <input type="number" class="content-title-main" style="width: 150px;height: 23px;margin-left: 0" v-model="total_number"/></div>
            </div>
            <div class="content-title-text">地点</div>
            <input class="content-title-main" style="height: 23px;" v-model="place"/>
          </div>

          <div class="special" v-if="this.$data.typeCheckName==='拼车'" id="拼车">
            <div style="display: flex;width: 80%;margin-left: 10%;margin-bottom: 5px;justify-content: space-between">
              <div style="">
                <div>日期(具体时间请在内容里写明)</div>
                <input type="date" class="content-title-main" style="width: 275px;height: 25px;margin-left: 0" v-model="time"/>
              </div>
<!--              <div style="">-->
<!--                <div>时间</div>-->
<!--                <input type="number" class="content-title-main" style="width: 180px;height: 23px;margin-left: 0"/>-->
<!--              </div>-->
              <div style="">
                <div>人数</div>
                <input type="number" class="content-title-main" style="width: 275px;height: 23px;margin-left: 0" v-model="total_number"/>
              </div>
            </div>
            <div style="display: flex;width: 80%;margin-left: 10%;margin-bottom: 5px;justify-content: space-between">
              <div style="">
                <div>出发地</div>
                <input class="content-title-main" style="width: 275px;height: 23px;margin-left: 0" v-model="place_start"/>
              </div>
              <div style="">
                <div>目的地</div>
                <input class="content-title-main" style="width: 275px;height: 23px;margin-left: 0" v-model="place_end"/>
              </div>
            </div>

          </div>
          <div class="special" v-if="this.$data.typeCheckName==='家教'" id="家教">
            <div style="display: flex;width: 80%;margin-left: 10%;margin-bottom: 5px;justify-content: space-between">
              <div style="">
                <div>时间</div>
                <input type="date" class="content-title-main" style="width: 130px;height: 25px;margin-left: 0" v-model="time"/>
              </div>
              <div style="">
                <div>年级</div>
                <input class="content-title-main" style="width: 130px;height: 23px;margin-left: 0" v-model="target_grade" placeholder="学生所在年级"/>
              </div>
              <div style="">
                <div>性别</div>
                <select class="content-title-main" style="width: 130px;height: 27px;margin-left: 0;outline: none" v-model="sex_require">
                  <option>男</option>
                  <option>女</option>
                </select>
              </div>
              <div style="">
                <div>报酬</div>
                <input type="number" class="content-title-main" style="width: 130px;height: 23px;margin-left: 0" v-model="price"/>
              </div>
            </div>
            <div class="content-title-text">地点</div>
            <input class="content-title-main" placeholder="辅导地点" v-model="place"/>
          </div>

          <div class="special" v-if="this.$data.typeCheckName==='学校事务'" id="学校事务">
            <div style="display: flex;width: 80%;margin-left: 10%;margin-bottom: 5px">
              <div style="width: 50%">
                <div>时间</div>
                <input type="date" class="content-title-main" style="width: 150px;height: 25px;margin-left: 0" v-model="time"/>
              </div>
              <div style="width: 50%">
                <div>报酬</div>
                <input type="number" class="content-title-main" style="width: 150px;height: 23px;margin-left: 0" v-model="price"/></div>
            </div>
            <div class="content-title-text">地点</div>
            <input class="content-title-main" v-model="place"/>
          </div>

          <div class="special" v-if="this.$data.typeCheckName==='其他兼职'" id="其他兼职">
            <div style="display: flex;width: 80%;margin-left: 10%;margin-bottom: 5px">
              <div style="width: 50%">
                <div>时间</div>
                <input type="date" class="content-title-main" style="width: 150px;height: 25px;margin-left: 0" v-model="time"/>
              </div>
              <div style="width: 50%">
                <div>报酬(每节)</div>
                <input type="number" class="content-title-main" style="width: 150px;height: 23px;margin-left: 0" v-model="price"/></div>
            </div>
            <div class="content-title-text">地点</div>
            <input class="content-title-main" v-model="place"/>
          </div>

          <div class="special" v-if="this.$data.typeCheckName==='志愿者招聘'" id="志愿者招聘">
            <div style="display: flex;width: 80%;margin-left: 10%;margin-bottom: 5px">
              <div style="width: 50%">
                <div>时间</div>
                <input type="date" class="content-title-main" style="width: 150px;height: 25px;margin-left: 0" v-model="time"/>
              </div>
            </div>
            <div class="content-title-text">地点</div>
            <input class="content-title-main" v-model="place"/>
          </div>

          <div class="content-tag">
            <div class="content-title-text">标签</div>
            <div class="content-type-main">
              <div class="myCheckbox"
                   v-for="tag in tag_list"
                   :key="tag.name"
                   @click="clickTag(tag)"
                   :id="tag.name">{{tag.name}}</div>
            </div>
          </div>
          <div class="content-pic">
            <div class="content-title-text">上传图片</div>
            <el-upload action="/api/file/upload/"
              list-type="picture-card"
              class="uploadPic"
              :on-success="(response, file, fileList)=>{return onSuccess(response, file, fileList)}">
              <i slot="default" class="el-icon-plus"/>
            </el-upload>
          </div>
          <button class="confirm" @click="myRelease">发 布</button>
        </div>
      </div>
    </div>
    <tail id="mpt"/>
  </div>
</template>

<script>
  import PMyHead from "../../components/PC/PmyHead";
  import Tail from "../../components/tail";
  import BottomRouter from "../../components/bottomRouter";
  import Pgoods from "./Pgoods";
    export default {
        name: "release_goods",
      data(){
          return{
            file_list:[],
            type_list:[],
            activeSecondType:[],
            chosenFirstType:'',
            typeCheck:'',
            typeCheckName:'',
            tag_list:[{
              id:'10',
              name:'又大又圆',
              intro:'自带'
            },{
              id:'10',
              name:'又长又宽',
              intro:'自带'
            },{
              id:'10',
              name:'又扁又圆',
              intro:'自带'
            }
            ],
            tagCheckboxGroup:[],
            title:'',
            content:'',

            price:'',
            new_or_old:10,
            time_span:'',
            time:'',
            place_start:'',
            place_end:'',
            place:'',
            total_number:'',
            target_grade:'',
            sex_require:'男'
          }
      },
      components: {BottomRouter, PMyHead, Tail},
      methods: {
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
            require('../../assets/css/pages/PC/releaseStylePC.css');

        },
        jump: function (name) {
          this.$router.push({name: name});
        },
        onSuccess:function(response, file, fileList){
          this.$data.file_list.push(response.data);
        },

        myRelease:function(){
          let re=[];
          for(let i=0;i<this.$data.file_list.length;i++){
            re.push(this.$data.file_list[i].file_url);
          }

          if(this.$data.typeCheckName==='求购'||this.$data.typeCheckName==='出售') {
            const dataa = JSON.stringify({
              title: this.$data.title,
              content: {
                body: this.$data.content,
                price: this.$data.price,
                new_or_old: this.$data.new_or_old,
              },
              tags: this.$data.tagCheckboxGroup,
              category_id: this.$data.typeCheck,
              pic_urls: re,
            });
            const config = {
              headers: {
                'Content-Type': 'application/json'
              }
            };
            this.$axios.post("/api/article/",dataa,config).then(res=>{
              this.jump("PGoods");
            }).catch(err=>{
              this.$message.error("出了一点错误，请稍后再试");
            })
          }

            if(this.$data.typeCheckName==='出借'||this.$data.typeCheckName==='求租') {
              const dataa = JSON.stringify({
                title: this.$data.title,
                content:{
                  body:this.$data.content,
                  price:this.$data.price,
                  time_span:this.$data.time_span,
                },
                tags: this.$data.tagCheckboxGroup,
                category_id: this.$data.typeCheck,
                pic_urls: re,
              });
              const config = {
                headers: {
                  'Content-Type': 'application/json'
                }
              };
              this.$axios.post("/api/article/",dataa,config).then(res=>{
                this.jump("PGoods");
              }).catch(err=>{
                this.$message.error("出了一点错误，请稍后再试");
              })
            }

            if(this.$data.typeCheckName==='约玩/约学习') {
              const dataa = JSON.stringify({
                title: this.$data.title,
                content:{
                  body:this.$data.content,
                  time:this.$data.time,
                  place:this.$data.place,
                  total_number:this.$data.total_number
                },
                tags: this.$data.tagCheckboxGroup,
                category_id: this.$data.typeCheck,
                pic_urls: re,
              });
              const config = {
                headers: {
                  'Content-Type': 'application/json'
                }
              };
              this.$axios.post("/api/article/",dataa,config).then(res=>{
                this.jump("PGoods");
              }).catch(err=>{
                this.$message.error("出了一点错误，请稍后再试");
              })
            }

            if(this.$data.typeCheckName==='拼车') {
              const dataa = JSON.stringify({
                title: this.$data.title,
                content:{
                  body:this.$data.content,
                  time:this.$data.time,
                  place:this.$data.place_start+'-'+this.$data.place_end,
                  total_number:this.$data.total_number,
                },
                tags: this.$data.tagCheckboxGroup,
                category_id: this.$data.typeCheck,
                pic_urls: re,
              });
              const config = {
                headers: {
                  'Content-Type': 'application/json'
                }
              };
              this.$axios.post("/api/article/",dataa,config).then(res=>{
                this.jump("PGoods");
              }).catch(err=>{
                this.$message.error("出了一点错误，请稍后再试");
              })
            }

            if(this.$data.typeCheckName==='家教') {
              const dataa = JSON.stringify({
                title: this.$data.title,
                content:{
                  body:this.$data.content,
                  price:this.$data.price,
                  time:this.$data.time,
                  place:this.$data.place,
                  target_grade:this.$data.target_grade,
                  sex_require:this.$data.sex_require
                },
                tags: this.$data.tagCheckboxGroup,
                category_id: this.$data.typeCheck,
                pic_urls: re,
              });
              const config = {
                headers: {
                  'Content-Type': 'application/json'
                }
              };

              this.$axios.post("/api/article/",dataa,config).then(res=>{
                this.jump("PGoods");
              }).catch(err=>{
                this.$message.error("出了一点错误，请稍后再试");
              })
            }

            if(this.$data.typeCheckName==='学校事务'||this.$data.typeCheckName==='其他兼职') {
              const dataa = JSON.stringify({
                title: this.$data.title,
                content:{
                  body:this.$data.content,
                  price:this.$data.price,
                  time:this.$data.time,
                  place:this.$data.place,
                },
                tags: this.$data.tagCheckboxGroup,
                category_id: this.$data.typeCheck,
                pic_urls: re,
              });
              const config = {
                headers: {
                  'Content-Type': 'application/json'
                }
              };

              this.$axios.post("/api/article/",dataa,config).then(res=>{
                this.jump("PGoods");
              }).catch(err=>{
                this.$message.error("出了一点错误，请稍后再试");
              })
            }

            if(this.$data.typeCheckName==='志愿者招聘') {
              const dataa = JSON.stringify({
                title: this.$data.title,
                content:{
                  body:this.$data.content,
                  time:this.$data.time,
                  place:this.$data.place,
                },
                tags: this.$data.tagCheckboxGroup,
                category_id: this.$data.typeCheck,
                pic_urls: re,
              });
              const config = {
                headers: {
                  'Content-Type': 'application/json'
                }
              };

              this.$axios.post("/api/article/",dataa,config).then(res=>{
                this.jump("PGoods");
              }).catch(err=>{
                this.$message.error("出了一点错误，请稍后再试");
              })
            }
        },


        handleRemove(file) {
          console.log(file);
        },
        handleDownload:function(file) {
          console.log(file);
        },
        getAllTags:function(){
          let _this=this;
          _this.$axios.get("/api/tag/all/").then((res)=>{
            for(let i=0;i<res.data.data.length;i++){
              _this.$data.tag_list.push(res.data.data[i]);
            }
          }).catch(err=>{
            console.log(err);
          })
        },
        clickTag:function(tag) {
          let flag = -1;
          for (let i = 0; i < this.$data.tagCheckboxGroup.length; i++) {
            if (tag.name === this.$data.tagCheckboxGroup[i]) {
              flag = i;
              break;
            }
          }
          if (flag === -1) {
            this.$data.tagCheckboxGroup.push(tag.name);
            document.getElementById(tag.name).style.color = "white";
            document.getElementById(tag.name).style.background = "#fdc006";
            document.getElementById(tag.name).style.border = "1px solid #fdc006";
          } else {
            this.$data.tagCheckboxGroup.splice(flag, 1);
            document.getElementById(tag.name).style.color = "#606266";
            document.getElementById(tag.name).style.background = "white";
            document.getElementById(tag.name).style.border = "1px solid #DCDFE6";
          }
        },
        getAllType:function() {
          this.$axios.get("/api/category/").then(res => {
            for (let i = 0; i < res.data.data.length; i++)
              this.$data.type_list.push(res.data.data[i]);
          }).catch(err => {
            console.log(err);
          })
        },
        readyChooseSubType:function(item) {
          if(this.$data.chosenFirstType!=='') {
            document.getElementById(this.$data.chosenFirstType).style.background = "white";
            document.getElementById(this.$data.chosenFirstType).style.color = "#606266";
            document.getElementById(this.$data.chosenFirstType).style.border = "1px solid #DCDFE6";
            this.$data.typeCheckName='';
          }
          this.$data.chosenFirstType=item.category_id;
          if (this.$data.typeCheck !== '') {
            document.getElementById(this.$data.typeCheck).style.background = "white";
            document.getElementById(this.$data.typeCheck).style.color = "#606266";
            document.getElementById(this.$data.typeCheck).style.border = "1px solid #DCDFE6";
          }
          this.$data.typeCheck='';
          document.getElementById(this.$data.chosenFirstType).style.background = "rgb(253,192,6)";
          document.getElementById(this.$data.chosenFirstType).style.color = "white";
          document.getElementById(this.$data.chosenFirstType).style.border = "1px solid #fdc006";
          this.$data.activeSecondType.splice(0, this.$data.activeSecondType.length);
          document.getElementById("chooseSubTypeDiv").style.display = "flex";
          for (let i = 0; i < item.sub_category_list.length; i++)
            this.$data.activeSecondType.push(item.sub_category_list[i]);
        },
        alreadyChooseSecondType:function(item){
          if(this.$data.typeCheck!==''){
            document.getElementById(this.$data.typeCheck).style.background = "white";
            document.getElementById(this.$data.typeCheck).style.color = "#606266";
            document.getElementById(this.$data.typeCheck).style.border = "1px solid #DCDFE6";
          }
          this.$data.typeCheckName=item.category_name;
          this.$data.typeCheck=item.category_id;
          document.getElementById(this.$data.typeCheck).style.background = "#c0c0c0";
          document.getElementById(this.$data.typeCheck).style.color = "#606266";
          document.getElementById(this.$data.typeCheck).style.border = "1px solid #c0c0c0";
        }
      },
      mounted() {
        this.init();
      },
      created() {
         this.getAllTags();
         this.getAllType();
      }
    }
</script>

<style scoped>

</style>
