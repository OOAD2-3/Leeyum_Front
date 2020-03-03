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
          // console.log(re);
          // console.log(this.$data.content);
          // console.log(this.$data.title);
          // console.log(this.$data.typeCheck);
          // console.log(this.$data.tagCheckboxGroup);
          const dataa=JSON.stringify({
            title:this.$data.title,
            content:this.$data.content,
            tags:this.$data.tagCheckboxGroup,
            category_id:this.$data.typeCheck,
            pic_urls:re
          });
          const config={
            headers:{
              'Content-Type':'application/json'
            }
          };
          this.$axios.post("/api/article/",dataa,config).then(res=>{
            this.jump("PGoods");
          }).catch(err=>{
            this.$message.error("出了一点错误，请稍后再试");
          })

        },
        handleRemove(file) {
          console.log(file);
        },
        handlePictureCardPreview:function(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
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
          this.$data.typeCheck=item.category_id;
          document.getElementById(this.$data.typeCheck).style.background = "#c0c0c0";
          document.getElementById(this.$data.typeCheck).style.color = "#606266";
          document.getElementById(this.$data.typeCheck).style.border = "1px solid #c0c0c0";
          console.log(this.$data.typeCheck);
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
