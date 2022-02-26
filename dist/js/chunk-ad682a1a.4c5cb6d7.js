(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ad682a1a"],{"30c6":function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-card",{staticClass:"box-card"},[a("el-form",{attrs:{model:t.form,"label-width":"80px",size:"small"}},[a("el-form-item",{staticClass:"demo-form",attrs:{label:"标签名称"}},[a("el-input",{model:{value:t.form.tags,callback:function(e){t.$set(t.form,"tags",e)},expression:"form.tags"}})],1),a("el-form-item",{staticClass:"demo-form",attrs:{label:"城市"}},[a("el-select",{attrs:{placeholder:"请选择"},on:{change:t.getCityInfo},model:{value:t.form.value,callback:function(e){t.$set(t.form,"value",e)},expression:"form.value"}},t._l(t.options,(function(t){return a("el-option",{key:t,attrs:{label:t,value:t}})})),1)],1),a("el-form-item",{staticClass:"demo-form",attrs:{label:"地区"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.form.cityModel,callback:function(e){t.$set(t.form,"cityModel",e)},expression:"form.cityModel"}},t._l(t.cityOptions,(function(t){return a("el-option",{key:t,attrs:{label:t,value:t}})})),1)],1),a("el-form-item",{staticClass:"demo-form",attrs:{label:"企业简称"}},[a("el-input",{model:{value:t.form.shortName,callback:function(e){t.$set(t.form,"shortName",e)},expression:"form.shortName"}})],1),a("el-form-item",{staticClass:"demo-form",attrs:{label:"状态"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择"},model:{value:t.form.state,callback:function(e){t.$set(t.form,"state",e)},expression:"form.state"}},[a("el-option",{attrs:{label:"启用",value:1}}),a("el-option",{attrs:{label:"禁止",value:0}})],1)],1),[a("el-form-item",{staticClass:"demo-form",staticStyle:{"text-align":"left"}},[a("el-button",{attrs:{size:"small"},on:{click:t.btnClose}},[t._v("清除")]),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.searchInfo}},[t._v("搜索")])],1),a("el-form-item",{staticStyle:{width:"50%",display:"inline-block","text-align":"right"}},[a("el-button",{attrs:{type:"success",size:"small",icon:"el-icon-edit"},on:{click:t.btnAddList}},[t._v("新增用户")])],1)]],2),a("el-alert",{attrs:{title:"共"+t.total+"条记录",type:"info",closable:!1,"show-icon":""}}),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData}},[a("el-table-column",{attrs:{prop:"id",label:"序号"}}),a("el-table-column",{attrs:{prop:"number",label:"企业编号"}}),a("el-table-column",{attrs:{prop:"shortName",label:"企业简称"}}),a("el-table-column",{attrs:{prop:"tags",label:"标签"}}),a("el-table-column",{attrs:{prop:"creatorID",label:"创建者"}}),a("el-table-column",{attrs:{prop:"addDate",label:"创建日期"}}),a("el-table-column",{attrs:{prop:"remarks",label:"备注"}}),a("el-table-column",{attrs:{prop:"state",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(1===e.row.state?"启用":"禁用")+" ")]}}])}),a("el-table-column",{attrs:{label:"操作",width:"180px"},scopedSlots:t._u([{key:"default",fn:function(e){var o=e.row;return[a("el-button",{attrs:{type:"primary",plain:"",icon:"el-icon-edit",circle:""},on:{click:function(e){return t.updateList(o)}}}),a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:1===o.state?"禁用":"启用",placement:"top-start"}},[a("el-button",{attrs:{plain:"",type:1===o.state?"warning":"success",icon:1===o.state?"el-icon-close":"el-icon-check",circle:""},on:{click:function(e){return t.changestatus(o)}}})],1),a("el-button",{attrs:{type:"danger",plain:"",icon:"el-icon-delete",circle:""},on:{click:function(e){return t.delList(o.id)}}})]}}])})],1),a("el-pagination",{attrs:{background:"","current-page":t.form.page,"page-sizes":[10,20,30,40],"page-size":t.form.pagesize,layout:"prev, pager, next,sizes,jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}}),a("el-dialog",{staticClass:"AddList",attrs:{title:t.showText+"用户",visible:t.dialogVisible,width:"60%"},on:{"update:visible":function(e){t.dialogVisible=e},close:t.btnCancel}},[a("el-form",{ref:"AddformRef",attrs:{rules:t.AddformRef,model:t.Addform,"label-width":"80px"}},[a("el-form-item",{staticClass:"form-item",attrs:{prop:"shortName",label:"企业名称","label-width":"120px"}},[a("el-input",{model:{value:t.Addform.shortName,callback:function(e){t.$set(t.Addform,"shortName",e)},expression:"Addform.shortName"}})],1),a("el-form-item",{staticClass:"form-item",attrs:{prop:"company",label:"所属公司","label-width":"120px"}},[a("el-input",{model:{value:t.Addform.company,callback:function(e){t.$set(t.Addform,"company",e)},expression:"Addform.company"}}),t._v(" https://www.tianyancha.com （在此可查询所属公司全称及简称） ")],1),a("el-form-item",{staticClass:"demo-form",staticStyle:{"margin-left":"60px",display:"inline-block"},attrs:{label:"城市地区","label-width":"120px",prop:"province"}},[a("el-select",{staticStyle:{width:"100px"},attrs:{placeholder:"请选择"},on:{change:t.changeCity},model:{value:t.Addform.province,callback:function(e){t.$set(t.Addform,"province",e)},expression:"Addform.province"}},t._l(t.options,(function(t){return a("el-option",{key:t,attrs:{label:t,value:t}})})),1)],1),a("el-form-item",{staticStyle:{display:"inline-block"},attrs:{prop:"city"}},[a("el-select",{staticStyle:{width:"100px"},attrs:{placeholder:"请选择"},model:{value:t.Addform.city,callback:function(e){t.$set(t.Addform,"city",e)},expression:"Addform.city"}},t._l(t.cityOptions,(function(t){return a("el-option",{key:t,attrs:{label:t,value:t}})})),1)],1),a("el-form-item",{staticClass:"form-item",attrs:{label:"方向(企业标签)","label-width":"120px",prop:"tags"}},[a("el-input",{model:{value:t.Addform.tags,callback:function(e){t.$set(t.Addform,"tags",e)},expression:"Addform.tags"}})],1),a("el-form-item",{staticClass:"form-item",attrs:{label:"备注","label-width":"120px"}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:4},placeholder:"请输入内容"},model:{value:t.Addform.remarks,callback:function(e){t.$set(t.Addform,"remarks",e)},expression:"Addform.remarks"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:t.btnCancel}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.btnOk}},[t._v("确 定")])],1)],1)],1)},r=[],s=a("1da1"),n=(a("96cf"),a("99af"),a("b775")),i=function(t){return Object(n["a"])("/companys","get",t)},l=function(t){return Object(n["a"])("/companys","post",t)},c=function(t){return Object(n["a"])("/companys/".concat(t,"?id=").concat(t),"get")},m=function(t){return Object(n["a"])("/companys/".concat(t),"delete")},u=function(t,e){return Object(n["a"])("/companys/".concat(t,"/").concat(e),"post")},d=function(t){return Object(n["a"])("/companys/".concat(t.id),"put",t)},f=a("b59c"),p={data:function(){return{cityOptions:[],form:{page:1,pagesize:10,tags:"",shortName:"",value:"",cityModel:"",state:null},options:[],total:0,tableData:[],map:[],dialogVisible:!1,Addform:{province:"",city:"",shortName:"",company:"",tags:"",remarks:""},province:"",city:"",AddformRef:{shortName:[{required:!0,message:"企业简称不能为空",trigger:"blur"}],company:[{required:!0,message:"所属公司不能为空",trigger:"blur"}],province:[{required:!0,message:"所属城市不能为空",trigger:"change"}],city:[{required:!0,message:"所属地区不能为空",trigger:"change"}],tags:[{required:!0,message:"请输入标签",trigger:"blur"}],remark:[{required:!0,message:"备注不能为空",trigger:"blur"}]},actionopen:""}},created:function(){this.getCompanysList(),this.getprovinceList()},computed:{showText:function(){return this.Addform.id?"编辑":"创建"}},methods:{btnOk:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.$refs.AddformRef.validate(),!t.Addform.id){e.next=12;break}return t.Addform.isFamous=Boolean(t.Addform.isFamous),console.log(t.Addform),e.next=6,d(t.Addform);case 6:a=e.sent,console.log(a),t.getCompanysList(),t.$message.success("更新成功"),e.next=17;break;case 12:return t.Addform.isFamous=Boolean(t.Addform.isFamous),e.next=15,l(t.Addform);case 15:t.getCompanysList(),t.$message.success("更新成功");case 17:t.dialogVisible=!1;case 18:case"end":return e.stop()}}),e)})))()},searchInfo:function(){console.log(this.form.state),this.getCompanysList()},getprovinceList:function(){this.options=Object(f["b"])(),console.log(Object(f["b"])())},changeCity:function(){var t=this.Addform.province;this.cityOptions=Object(f["a"])(t),console.log(this.cityOptions),this.Addform.city=this.cityOptions[0],console.log(this.Addform.city)},getCityInfo:function(){var t=this.form.value;this.cityOptions=Object(f["a"])(t),this.form.cityModel=this.cityOptions[0],console.log(this.form.cityModel)},btnClose:function(){this.form={page:1,pagesize:10,tags:"",shortName:"",value:"",cityModel:"",state:""},this.cityOptions=[],this.options=[],this.getprovinceList(),this.getCityInfo()},getCompanysList:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var a,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,i(t.form);case 2:a=e.sent,o=a.data,t.tableData=o.items,t.total=o.counts;case 6:case"end":return e.stop()}}),e)})))()},handleSizeChange:function(t){this.form.pagesize=t,this.getCompanysList()},handleCurrentChange:function(t){this.form.page=t,this.getCompanysList()},delList:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,e.$confirm("确定要删除该数据吗");case 3:return a.next=5,m(t);case 5:e.getCompanysList(),e.$message.success("删除成功"),a.next=12;break;case 9:a.prev=9,a.t0=a["catch"](0),console.log(a.t0);case 12:case"end":return a.stop()}}),a,null,[[0,9]])})))()},changestatus:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,e.$confirm("已成功".concat(1==t.state?"禁用":"启用",", 是否继续?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).catch((function(t){return t}));case 2:if(o=a.sent,"confirm"===o){a.next=5;break}return a.abrupt("return",e.$message.info("您取消了操作"));case 5:return a.prev=5,a.next=8,u({id:t.id,state:1===t.state?0:1});case 8:t.state=1===t.state?0:1,e.$message.success("已成功".concat(1==t.state?"禁用":"启用")),a.next=15;break;case 12:a.prev=12,a.t0=a["catch"](5),e.$message("设置状态失败!");case 15:case"end":return a.stop()}}),a,null,[[5,12]])})))()},updateList:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var o,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return e.dialogVisible=!0,a.next=3,c(t.id);case 3:o=a.sent,r=o.data,console.log(r),e.Addform=r,console.log(e.Addform);case 8:case"end":return a.stop()}}),a)})))()},btnAddList:function(){this.dialogVisible=!0},btnCancel:function(){this.$refs.AddformRef.resetFields(),this.dialogVisible=!1,this.Addform={province:"",city:"",shortName:"",company:"",tags:"",remarks:""}}}},b=p,g=(a("d4fe"),a("2877")),h=Object(g["a"])(b,o,r,!1,null,"39c65c2e",null);e["default"]=h.exports},4959:function(t,e,a){},d4fe:function(t,e,a){"use strict";a("4959")}}]);
//# sourceMappingURL=chunk-ad682a1a.4c5cb6d7.js.map