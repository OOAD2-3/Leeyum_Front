<template>
  <div id="root">
    <PMyHead default-active="6"/>
    <div class="bac">
      <div class="adjust">
        <div class="content">
          <div class="content-head">发布信息</div>
          <div class="line"></div>
          <div class="content-title">
            <label class="content-title-text"><span style="color: red">*</span> 标题</label>
            <el-input
              style="margin-top: 2px;margin-left: 10%;width: 80%;font-size: 13px;"
              placeholder="请输入标题"
              v-model="title"
              clearable
              size="small">
            </el-input>
          </div>
          <div class="content-main">
            <label class="content-title-text">简介</label>
            <el-input
              style=" font-family: Microsoft;width: 80%;font-size:13px;margin-top:2px;margin-left:10%;"
              type="textarea"
              :rows="5"
              placeholder="更具体的描述您的信息（200字以内）"
              maxlength="10"
              clearable
              v-model="content">
            </el-input>
          </div>
          <div class="content-type">
            <div class="content-title-text">
              <span style="color: red">*</span>
              <span v-if="typeCheckName !== ''">
                类目 <span style="color: rgb(253,192,6)">{{typeCheckName}}
              </span></span>
              <span v-else>类目</span>
            </div>
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
                  {{item.category_name}}
                </div>
              </div>
            </div>
          </div>
          <div class="special" v-if="this.$data.typeCheckName==='求购'" id="求购">
            <div class="special_main">
              <div class="special_item">
                <div>
                  <span style="color: red">*</span>
                  <span>预期价格:</span>
                </div>
                <el-input-number
                  style="margin-top:2px;"
                  size="small"
                  :min="0.00" :max="99999.99"
                  :precision="2" :step="1"
                  v-model="price">
                </el-input-number>
              </div>
              <div class="special_item">
                <div>
                  <span style="color: red">*</span>
                  <span>崭新程度:</span>
                </div>
                <el-select
                  style="margin-top: 2px"
                  size="small"
                  v-model="new_or_old"
                  placeholder="请选择">
                  <el-option
                    v-for="item in new_or_old_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="special" v-if="this.$data.typeCheckName==='出售'" id="出售">
            <div class="special_main">
              <div class="special_item">
                <div>
                  <span style="color: red">*</span>
                  <span>预期价格:</span>
                </div>
                <el-input-number
                  style="margin-top:2px;"
                  size="small"
                  :min="0.00" :max="99999.99"
                  :precision="2" :step="1"
                  v-model="price">
                </el-input-number>
              </div>
              <div class="special_item">
                <div>
                  <span style="color: red">*</span>
                  <span>崭新程度:</span>
                </div>
                <el-select
                  style="margin-top: 2px"
                  size="small"
                  v-model="new_or_old"
                  placeholder="请选择">
                  <el-option
                    v-for="item in new_or_old_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="special" v-if="this.$data.typeCheckName==='求租'" id="求租">
            <div class="special_main">
              <div class="special_item">
                <div>
                  <span style="color: red">*</span>
                  <span>预期价格:</span>
                </div>
                <el-input-number
                  style="margin-top:2px;"
                  size="small"
                  :min="0.00" :max="99999.99"
                  :precision="2" :step="1"
                  v-model="price">
                </el-input-number>
              </div>
              <div class="special_item">
                <div>
                  <span style="color: red">*</span>
                  <span>租赁天数:</span>
                </div>
                <el-input-number
                  style="margin-top:2px;"
                  size="small"
                  :min="0" :max="99999"
                  v-model="time_span">
                </el-input-number>
              </div>
            </div>
          </div>
          <div class="special" v-if="this.$data.typeCheckName==='出借'" id="出借">
            <div class="special_main">
              <div class="special_item">
                <div>
                  <span style="color: red">*</span>
                  <span>预期价格:</span>
                </div>
                <el-input-number
                  style="margin-top:2px;"
                  size="small"
                  :min="0.00" :max="99999.99"
                  :precision="2" :step="1"
                  v-model="price">
                </el-input-number>
              </div>
              <div class="special_item">
                <div>
                  <span style="color: red">*</span>
                  <span>租赁天数:</span>
                </div>
                <el-input-number
                  style="margin-top:2px;"
                  size="small"
                  :min="0" :max="99999"
                  v-model="time_span">
                </el-input-number>
              </div>
            </div>
          </div>

          <div class="special" v-if="this.$data.typeCheckName==='约玩/约学习'" id="约玩/约学习">
            <div class="special_main">
              <div class="special_item">
                <div>
                  <span style="color: red">*</span>
                  <span>日期(可在详情内补充说明)</span>
                </div>
                <el-date-picker
                  style="margin-top: 2px;"
                  size="small"
                  v-model="time"
                  type="datetime"
                  placeholder="选择日期时间"
                  default-time="12:00:00">
                </el-date-picker>
              </div>
              <div class="special_item">
                <div>
                  <span style="color: red">*</span>
                  <span>人数</span>
                </div>
                <div>
                  <el-input-number
                    style="margin-top:2px;"
                    size="small"
                    :min="0" :max="999"
                    v-model="total_number">
                  </el-input-number>
                </div>
              </div>
              <div class="special_item">
                <div>
                  <span>地点</span>
                </div>
                <div>
                  <el-input
                    style="margin-top:2px;width: 30%"
                    size="small"
                    clearable
                    v-model="place">
                  </el-input>
                </div>
              </div>
            </div>
          </div>
          <div class="special" v-if="this.$data.typeCheckName==='拼车'" id="拼车">
            <div class="special_main">
              <div class="special_item">
                <div>
                  <span style="color: red">*</span>
                  <span>日期(可在详情内补充说明)</span>
                </div>
                <el-date-picker
                  style="margin-top: 2px;"
                  size="small"
                  v-model="time"
                  type="datetime"
                  placeholder="选择日期时间"
                  default-time="12:00:00">
                </el-date-picker>
              </div>
              <div class="special_item">
                <div>
                  <span style="color: red">*</span>
                  <span>人数</span>
                </div>
                <div>
                  <el-input-number
                    style="margin-top:2px;"
                    size="small"
                    :min="0" :max="999"
                    v-model="total_number">
                  </el-input-number>
                </div>
              </div>
              <div class="special_item">
                <div>
                  <span style="color: red">*</span>
                  <span>出发地</span>
                </div>
                <div>
                  <el-input
                    style="margin-top:2px;width:30%"
                    size="small"
                    clearable
                    v-model="place_start">
                  </el-input>
                </div>
              </div>
              <div class="special_item">
                <div>
                  <span style="color: red">*</span>
                  <span>目的地</span>
                </div>
                <div>
                  <el-input
                    style="margin-top:2px;width:30%"
                    size="small"
                    clearable
                    v-model="place_end">
                  </el-input>
                </div>
              </div>
            </div>
          </div>
          <div class="special" v-if="this.$data.typeCheckName==='其它组队'" id="其它组队">
            <div class="special_main">
              <div class="special_item">
                <div>
                  <span style="color: red">*</span>
                  <span>日期(可在详情内补充说明)</span>
                </div>
                <el-date-picker
                  style="margin-top: 2px;"
                  size="small"
                  v-model="time"
                  type="datetime"
                  placeholder="选择日期时间"
                  default-time="12:00:00">
                </el-date-picker>
              </div>
              <div class="special_item">
                <div>
                  <span style="color: red">*</span>
                  <span>人数</span>
                </div>
                <div>
                  <el-input-number
                    style="margin-top:2px;"
                    size="small"
                    :min="0" :max="999"
                    v-model="total_number">
                  </el-input-number>
                </div>
              </div>
              <div class="special_item">
                <div>
                  <span>地点</span>
                </div>
                <div>
                  <el-input
                    style="margin-top:2px;width: 30%"
                    size="small"
                    clearable
                    v-model="place">
                  </el-input>
                </div>
              </div>
            </div>
          </div>

          <div class="special" v-if="this.$data.typeCheckName==='家教'" id="家教">
            <div class="special_main">
              <div class="special_item">
                <div>
                  <span style="color: red">*</span>
                  <span>预期价格:</span>
                </div>
                <el-input-number
                  style="margin-top:2px;"
                  size="small"
                  :min="0.00" :max="99999.99"
                  :precision="2" :step="1"
                  v-model="price">
                </el-input-number>
              </div>
              <div class="special_item">
                <div>
                  <span>年级</span>
                </div>
                <el-cascader
                  style="margin-top: 2px"
                  size="small"
                  v-model="target_grade"
                  :options="grade_options"
                  :props="{expandTrigger: 'hover'}">
                </el-cascader>
              </div>
              <div class="special_item">
                <div>
                  <span>性别要求</span>
                </div>
                <el-select
                  style="margin-top: 2px"
                  size="small"
                  v-model="sex_require">
                  <el-option
                    v-for="item in sex_require_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="special_item">
                <div>
                  <span>日期(可在详情内补充说明)</span>
                </div>
                <el-date-picker
                  style="margin-top: 2px;"
                  size="small"
                  v-model="time"
                  type="datetime"
                  placeholder="选择日期时间"
                  default-time="12:00:00">
                </el-date-picker>
              </div>
              <div class="special_item">
                <div>
                  <span>地点</span>
                </div>
                <div>
                  <el-input
                    style="margin-top:2px;width: 50%"
                    size="small"
                    clearable
                    v-model="place">
                  </el-input>
                </div>
              </div>
            </div>
          </div>
          <div class="special" v-if="this.$data.typeCheckName==='学校事务'" id="学校事务">
            <div class="special_main">
              <div class="special_item">
                <div>
                  <span style="color: red">*</span>
                  <span>预期价格:</span>
                </div>
                <el-input-number
                  style="margin-top:2px;"
                  size="small"
                  :min="0.00" :max="99999.99"
                  :precision="2" :step="1"
                  v-model="price">
                </el-input-number>
              </div>
              <div class="special_item">
                <div>
                  <span>日期(可在详情内补充说明)</span>
                </div>
                <el-date-picker
                  style="margin-top: 2px;"
                  size="small"
                  v-model="time"
                  type="datetime"
                  placeholder="选择日期时间"
                  default-time="12:00:00">
                </el-date-picker>
              </div>
              <div class="special_item">
                <div>
                  <span>地点</span>
                </div>
                <div>
                  <el-input
                    style="margin-top:2px;width: 50%"
                    size="small"
                    clearable
                    v-model="place">
                  </el-input>
                </div>
              </div>
            </div>
          </div>
          <div class="special" v-if="this.$data.typeCheckName==='志愿者招聘'" id="志愿者招聘">
            <div class="special_main">
              <div class="special_item">
                <div>
                  <span>日期(可在详情内补充说明)</span>
                </div>
                <el-date-picker
                  style="margin-top: 2px;"
                  size="small"
                  v-model="time"
                  type="datetime"
                  placeholder="选择日期时间"
                  default-time="12:00:00">
                </el-date-picker>
              </div>
              <div class="special_item">
                <div>
                  <span>地点</span>
                </div>
                <div>
                  <el-input
                    style="margin-top:2px;width: 50%"
                    size="small"
                    clearable
                    v-model="place">
                  </el-input>
                </div>
              </div>
            </div>
          </div>
          <div class="special" v-if="this.$data.typeCheckName==='其他兼职'" id="其他兼职">
            <div class="special_main">
              <div class="special_item">
                <div>
                  <span style="color: red">*</span>
                  <span>预期价格:</span>
                </div>
                <el-input-number
                  style="margin-top:2px;"
                  size="small"
                  :min="0.00" :max="99999.99"
                  :precision="2" :step="1"
                  v-model="price">
                </el-input-number>
              </div>
              <div class="special_item">
                <div>
                  <span>日期(可在详情内补充说明)</span>
                </div>
                <el-date-picker
                  style="margin-top: 2px;"
                  size="small"
                  v-model="time"
                  type="datetime"
                  placeholder="选择日期时间"
                  default-time="12:00:00">
                </el-date-picker>
              </div>
              <div class="special_item">
                <div>
                  <span>地点</span>
                </div>
                <div>
                  <el-input
                    style="margin-top:2px;width: 50%"
                    size="small"
                    clearable
                    v-model="place">
                  </el-input>
                </div>
              </div>
            </div>
          </div>

          <div class="content-tag">
            <div class="content-title-text">标签</div>
            <div style="display: inline;margin-left: 10%;margin-right: 10%">
              <el-tag
                v-for="tag in tag_list"
                :key="tag.name"
                :type="tag.type"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)">
                {{tag.name}}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="tagInputVisible"
                v-model="tagInputValue"
                ref="saveTagInput"
                size="small"
                maxlength="4"
                placeholder="四字之内"
                clearable
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">自定义标签</el-button>
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
          <button class="confirm" @click="myRelease">确认</button>
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
    data() {
      return {
        file_list: [],
        type_list: [],
        activeSecondType: [],
        chosenFirstType: '',
        typeCheck: '',
        typeCheckName: '',
        tag_list: [
          {name: '毕业季', type: 'danger'},
          {name: '优质发布', type: 'success'},
        ],
        tagInputVisible: false,
        tagInputValue: '',
        tagCheckboxGroup: [],

        new_or_old_options: [
          {
            'value': 1,
            'label': '一成新'
          },
          {
            'value': 2,
            'label': '二成新'
          },
          {
            'value': 3,
            'label': '三成新'
          },
          {
            'value': 4,
            'label': '四成新'
          },
          {
            'value': 5,
            'label': '五成新'
          },
          {
            'value': 6,
            'label': '六成新'
          },
          {
            'value': 7,
            'label': '七成新'
          },
          {
            'value': 8,
            'label': '八成新'
          },
          {
            'value': 9,
            'label': '九成新'
          },
          {
            'value': 10,
            'label': '十成新'
          }
        ],
        grade_options: [
          {
            'value': '小学',
            'label': '小学',
            'children': [
              {
                'value': '一年级',
                'label': '一年级',
              },
              {
                'value': '二年级',
                'label': '二年级',
              },
              {
                'value': '三年级',
                'label': '三年级',
              },
              {
                'value': '四年级',
                'label': '四年级',
              },
              {
                'value': '五年级',
                'label': '五年级',
              },
              {
                'value': '六年级',
                'label': '六年级',
              }
            ]
          }
        ],
        sex_require_options: [
          {
            'value': '不限男女',
            'label': '不限男女',
          },
          {
            'value': '只要女生',
            'label': '只要女生',
          },
          {
            'value': '只要男生',
            'label': '只要男生',
          }
        ],

        title: '',
        content: '',

        price: 0,
        new_or_old: 10,
        time_span: 0,
        time: Date.now(),
        place_start: '',
        place_end: '',
        place: '',
        total_number: '',
        target_grade: '',
        sex_require: '不限男女'
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
      onSuccess: function (response, file, fileList) {
        this.$data.file_list.push(response.data);
      },

      myRelease: function () {
        if (this.$data.title === '') {
          this.$message({
            message: '您还没输入 标题',
            type: 'error'
          });
          return;
        }
        if (this.$data.typeCheckName === '') {
          this.$message({
            message: '您还没选择 类目',
            type: 'error'
          });
          return;
        }

        if (this.$data.typeCheckName === '求购' || this.$data.typeCheckName === '出售') {
          this.publish(
            {
              body: this.$data.content,
              price: this.$data.price,
              new_or_old: this.$data.new_or_old,
            }
          );
        }
        else if (this.$data.typeCheckName === '出借' || this.$data.typeCheckName === '求租') {
          this.publish(
            {
              body: this.$data.content,
              price: this.$data.price,
              time_span: this.$data.time_span,
            }
          );
        }
        else if (this.$data.typeCheckName === '约玩/约学习') {
          this.publish(
            {
              body: this.$data.content,
              time: this.$data.time,
              place: this.$data.place,
              total_number: parseInt(this.$data.total_number)
            }
          );
        }
        else if (this.$data.typeCheckName === '拼车') {
          this.publish(
            {
              body: this.$data.content,
              time: this.$data.time,
              place: this.$data.place_start + '-' + this.$data.place_end,
              total_number: parseInt(this.$data.total_number)
            }
          );
        }
        else if (this.$data.typeCheckName === '家教') {
          this.publish(
            {
              body: this.$data.content,
              price: this.$data.price,
              time: this.$data.time,
              place: this.$data.place,
              target_grade: this.$data.target_grade,
              sex_require: this.$data.sex_require
            }
          );
        }
        else if (this.$data.typeCheckName === '学校事务' || this.$data.typeCheckName === '其他兼职') {
          this.publish(
            {
              body: this.$data.content,
              price: this.$data.price,
              time: this.$data.time,
              place: this.$data.place,
            }
          );
        }
        else if (this.$data.typeCheckName === '志愿者招聘') {
          this.publish(
            {
              body: this.$data.content,
              time: this.$data.time,
              place: this.$data.place,
            }
          );
        }
        else if (this.$data.typeCheckName === '表白墙' || this.$data.typeCheckName === '吐槽专栏') {
          this.publish(
            {
              body: this.$data.content,
            }
          );
        }
        else {
          this.publish(
            {
              body: this.$data.content,
            }
          );
        }
      },
      publish(content) {
        let re = [];
        for (let i = 0; i < this.$data.file_list.length; i++) {
          re.push(this.$data.file_list[i].file_url);
        }

        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        const dataa = JSON.stringify({
          title: this.$data.title,
          content: content,
          tags: this.$data.tag_list,
          category_id: this.$data.typeCheck,
          pic_urls: re,
        });

        this.$axios.post("/api/article/", dataa, config).then(res => {
          let t = res.data.data.article_id;
          this.$router.push({
            name: 'PMatch',
            params: {
              id: t
            }
          })
        }).catch(err => {
          if (err.response.status === 400) this.$message.error("发布内容中包含敏感词！");
        })
      },

      handleRemove(file) {
        console.log(file);
      },
      handleDownload: function (file) {
        console.log(file);
      },
      getAllTags: function () {
        let _this = this;
        // _this.$axios.get("/api/tag/all/").then((res) => {
        //   for (let i = 0; i < res.data.data.length; i++) {
        //     _this.$data.tag_list.push(res.data.data[i]);
        //   }
        // }).catch(err => {
        //   console.log(err);
        // })
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
      getAllType: function () {
        this.$axios.get("/api/category/").then(res => {
          for (let i = 0; i < res.data.data.length; i++)
            this.$data.type_list.push(res.data.data[i]);
        }).catch(err => {
          console.log(err);
        })
      },
      readyChooseSubType: function (item) {
        if (this.$data.chosenFirstType !== '') {
          document.getElementById(this.$data.chosenFirstType).style.background = "white";
          document.getElementById(this.$data.chosenFirstType).style.color = "#606266";
          document.getElementById(this.$data.chosenFirstType).style.border = "1px solid #DCDFE6";
          this.$data.typeCheckName = '';
        }
        this.$data.chosenFirstType = item.category_id;
        if (this.$data.typeCheck !== '') {
          document.getElementById(this.$data.typeCheck).style.background = "white";
          document.getElementById(this.$data.typeCheck).style.color = "#606266";
          document.getElementById(this.$data.typeCheck).style.border = "1px solid #DCDFE6";
        }
        this.$data.typeCheck = '';
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
        this.$data.typeCheckName = item.category_name;
        this.$data.typeCheck = item.category_id;
        document.getElementById(this.$data.typeCheck).style.background = "white";
        document.getElementById(this.$data.typeCheck).style.color = "rgb(253,192,6)";
        document.getElementById(this.$data.typeCheck).style.border = "1px solid rgb(253,192,6)";
      },
      handleClose(tag) {
        this.$data.tag_list.splice(this.tag_list.indexOf(tag), 1);
      },
      showInput() {
        this.$data.tagInputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let inputValue = this.$data.tagInputValue;
        if (inputValue) {
          this.$data.tag_list.push({name: inputValue, type: 'warning'});
        }
        this.$data.tagInputVisible = false;
        this.$data.tagInputValue = '';
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

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
    margin-top: 2px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 100px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
