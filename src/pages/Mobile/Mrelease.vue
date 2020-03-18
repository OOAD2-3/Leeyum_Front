<template>
  <div id="root">
    <div class="mReleaseHeader">
      <div style="position: absolute;left: 10px;font-weight: bolder;width: 30px" @click="$router.go(-1)"><el-icon class="el-icon-arrow-left"></el-icon></div>
      <div style="font-size: 20px;">信息发布</div>
    </div>
    <div class="mrbac">
        <div class="mcontent">
          <div class="mcontent-title">
            <input class="mcontent-title-main" v-model="title" placeholder="请输入标题"/>
          </div>
          <div class="mcontent-main">
            <textarea class="mcontent-main-main" maxlength="200" v-model="content" placeholder="从这里开始输入内容（活动的具体时刻等）"></textarea>
          </div>
          <div class="mcontent-type">
            <div class="mcontent-title-text">请选择所属类目并填写必要信息</div>
            <div class="mcontent-type-main1">
              <div class="mchooseFirstType">
                <div
                  v-for="type in type_list"
                  :label="type.category_name"
                  :key="type.category_name"
                  class="mchooseFirstTypeItem"
                  @click="readyChooseSubType(type)"
                  :id="type.category_name">
                  {{type.category_name}}
                </div>
              </div>
              <div class="mchooseSubType" id="chooseSubTypeDiv">
                <div v-for="item in activeSecondType"
                     @click="alreadyChooseSecondType(item)"
                     class="msecondType"
                     :id="item.category_id">
                  {{item.category_name}}</div>
              </div>
            </div>
          </div>

          <div class="mspecial" v-if="this.$data.typeCheckName==='求购'" id="求购">
            <input class="myuqijiage" type="number" v-model="price" placeholder="请填写您的心里价位（元）">
            <select class="mzhanxinchengdu" v-model="new_or_old">
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
          <div class="mspecial" v-if="this.$data.typeCheckName==='出售'" id="出售">
            <input class="myuqijiage" type="number" v-model="price" placeholder="请填写售价（元）"/>
            <select class="mzhanxinchengdu" v-model="new_or_old">
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
          <div class="mspecial" v-if="this.$data.typeCheckName==='求租'" id="求租">
            <input class="myuqijiage" type="number" v-model="price" placeholder="请填写您的心里价位（元）"/>
            <input class="myuqijiage" type="number" v-model="time_span" placeholder="请填写您的要租用的天数" style="border: none"/>
          </div>
          <div class="mspecial" v-if="this.$data.typeCheckName==='出借'" id="出借">
            <input class="myuqijiage" type="number" v-model="price" placeholder="请填写价格（元）"/>
            <input class="myuqijiage" type="number" v-model="time_span" placeholder="请填写您的可借出的天数" style="border: none"/>
          </div>
          <div class="mspecial" v-if="this.$data.typeCheckName==='约玩/约学习'" id="约玩/约学习">
            <input type="date" class="myuqijiage" v-model="time"/>
            <input type="number" class="myuqijiage" placeholder="请填写人数" v-model="total_number"/>
            <input class="myuqijiage" placeholder="请填写活动地点" v-model="place"/>
          </div>

          <div class="mspecial" v-if="this.$data.typeCheckName==='拼车'" id="拼车">
            <input type="date" class="myuqijiage" v-model="time"/>
            <input type="number" class="myuqijiage" placeholder="请填写人数" v-model="total_number"/>
            <input class="myuqijiage" placeholder="请填写出发地" v-model="place_start"/>
            <input class="myuqijiage" placeholder="请填写目的地" v-model="place_end"/>
          </div>


          <div class="mspecial" v-if="this.$data.typeCheckName==='家教'" id="家教">
            <input type="date" class="myuqijiage" v-model="time"/>
            <input class="myuqijiage" placeholder="请填写年级" v-model="target_grade"/>
            <input type="number" class="myuqijiage" placeholder="请填写课时费/节（元）" v-model="price"/>
            <select class="mzhanxinchengdu" v-model="sex_require">
              <option value="男">男</option>
              <option value="女">女</option>
            </select>
            <input class="myuqijiage" v-model="place" placeholder="请填写上课地点" style="border: none"/>
          </div>


          <div class="mspecial" v-if="this.$data.typeCheckName==='学校事务'" id="学校事务">
            <input type="date" class="myuqijiage" v-model="time"/>
            <input type="number" class="myuqijiage" placeholder="请填写活动报酬（元）" v-model="price"/>
            <input class="myuqijiage" v-model="place" placeholder="请填写活动地点" style="border: none"/>
          </div>

          <div class="mspecial" v-if="this.$data.typeCheckName==='其他兼职'" id="其他兼职">
            <input type="date" class="myuqijiage" v-model="time"/>
            <input type="number" class="myuqijiage" placeholder="请填写活动报酬（元）" v-model="price"/>
            <input class="myuqijiage" v-model="place" placeholder="请填写活动地点" style="border: none"/>
          </div>

          <div class="mspecial" v-if="this.$data.typeCheckName==='志愿者招聘'" id="志愿者招聘">
            <input type="date" class="myuqijiage" v-model="time"/>
            <input class="myuqijiage" v-model="place" placeholder="请填写活动地点" style="border: none"/>
          </div>


          <div class="mcontent-tag">
            <div class="mcontent-title-text">请选择合适的标签</div>
            <div class="mcontent-type-main">
              <div class="mmyCheckbox" v-for="tag in tag_list" :key="tag.name" @click="clickTag(tag)" :id="tag.name">{{tag.name}}</div>
            </div>
          </div>
          <div class="mcontent-pic">
            <div class="mcontent-title-text">上传图片</div>
            <el-upload action="/api/file/upload/"
                       list-type="picture-card"
                       class="muploadPic"
                       :on-success="(response, file, fileList)=>{return onSuccess(response, file, fileList)}">
              <i slot="default" class="el-icon-plus"/>
            </el-upload>
          </div>
          <button class="mconfirm" @click="myRelease">发 布</button>
        </div>
    </div>
  </div>
</template>

<script>
  import MMyHead from "../../components/Mobile/MmyHead";
  import Tail from "../../components/tail";
  import BottomRouter from "../../components/bottomRouter";
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
      components: {BottomRouter, MMyHead, Tail},
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
          console.log(Width);
          console.log(Width - this.getScrollWidth());
          require('../../assets/css/pages/Mobile/releaseStyleMobile.css');
        },
        jump: function (name) {
          this.$router.push({name: name});
        },
        mgetAllTags: function () {
          let _this = this;
          _this.$axios.get("/api/tag/all/").then((res) => {
            for (let i = 0; i < res.data.data.length; i++) {
              _this.$data.tag_list.push(res.data.data[i]);
            }
          }).catch(err => {
            console.log(err);
          })
        },
        clickTag: function (tag) {
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
        readyChooseSubType: function (item) {
          if (this.$data.chosenFirstType !== '') {
            document.getElementById(this.$data.chosenFirstType).style.background = "white";
            document.getElementById(this.$data.chosenFirstType).style.color = "#606266";
            document.getElementById(this.$data.chosenFirstType).style.border = "1px solid #DCDFE6";
            this.$data.typeCheckName='';
          }
          this.$data.chosenFirstType = item.category_name;
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
        alreadyChooseSecondType: function (item) {
          if (this.$data.typeCheck !== '') {
            document.getElementById(this.$data.typeCheck).style.background = "white";
            document.getElementById(this.$data.typeCheck).style.color = "#606266";
            document.getElementById(this.$data.typeCheck).style.border = "1px solid #DCDFE6";
          }
          this.$data.typeCheckName=item.category_name;
          this.$data.typeCheck = item.category_id;
          document.getElementById(this.$data.typeCheck).style.background = "#c0c0c0";
          document.getElementById(this.$data.typeCheck).style.color = "#606266";
          document.getElementById(this.$data.typeCheck).style.border = "1px solid #c0c0c0";
          console.log(this.$data.typeCheck);
        },
        getAllType: function () {
          this.$axios.get("/api/category/").then(res => {
            for (let i = 0; i < res.data.data.length; i++)
              this.$data.type_list.push(res.data.data[i]);
          }).catch(err => {
            console.log(err);
          })
        },
        onSuccess:function(response, file, fileList){
          this.$data.file_list.push(response.data);
          console.log(this.$data.file_list);
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
              this.jump("MGoods");
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
              this.jump("MGoods");
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
                total_number:parseInt(this.$data.total_number)
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
              this.jump("MGoods");
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
                total_number:parseInt(this.$data.total_number)
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
              this.jump("MGoods");
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
              this.jump("MGoods");
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
              this.jump("MGoods");
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
              this.jump("MGoods");
            }).catch(err=>{
              this.$message.error("出了一点错误，请稍后再试");
            })
          }

          if(this.$data.typeCheckName==='表白墙'||this.$data.typeCheckName==='吐槽专栏') {
            const dataa = JSON.stringify({
              title: this.$data.title,
              content:{
                body: this.$data.content
              },
              tags: this.$data.tagCheckboxGroup,
              category_id: this.$data.typeCheck,
              pic_urls: re
            });
            const config = {
              headers: {
                'Content-Type': 'application/json'
              }
            };
            this.$axios.post("/api/article/", dataa, config).then(res => {
              this.jump("MGoods");
            }).catch(err => {
              this.$message.error("出了一点错误，请稍后再试");
            })
          }
        },
      },
      mounted() {
        this.init();
      },
      created() {
        this.mgetAllTags();
        this.getAllType();
      }
    }
</script>

<style scoped>
  .mReleaseHeader{
    height: 60px;
    width: calc(100% - 10px);
    background: #fdc006;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    padding-left: 10px;
    font-size: 150%;
  }
</style>
