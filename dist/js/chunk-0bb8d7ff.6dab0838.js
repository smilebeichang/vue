(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0bb8d7ff"],{"0afc":function(t,e,r){},"72a0":function(t,e,r){"use strict";r.d(e,"a",(function(){return a})),r.d(e,"c",(function(){return i})),r.d(e,"b",(function(){return o}));var a=[{value:1,label:"简单"},{value:2,label:"一般"},{value:3,label:"困难"}],i=[{value:1,label:"单选"},{value:2,label:"多选"},{value:3,label:"简答"}],o=["o2o","外包服务","企业服务","互联网金融","企业咨询","互联网","电子商务","其他"]},ce55:function(t,e,r){"use strict";r("0afc")},d463:function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-card",{staticClass:"questions-new"},[r("div",{staticClass:"header",attrs:{slot:"header"},slot:"header"},[t._v("试题"+t._s(t.queryObj?"修改":"录入"))]),r("el-form",{ref:"refForm",attrs:{"label-width":"100px",model:t.formData,rules:t.formRules}},[r("el-form-item",{attrs:{label:"学科：",prop:"subjectID"}},[r("el-select",{staticClass:"w400",attrs:{clearable:"",placeholder:"请选择"},model:{value:t.formData.subjectID,callback:function(e){t.$set(t.formData,"subjectID",e)},expression:"formData.subjectID"}},t._l(t.subjectList,(function(t){return r("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1),r("el-form-item",{attrs:{label:"目录：",prop:"catalogID"}},[r("el-select",{staticClass:"w400",attrs:{clearable:"",placeholder:"请选择"},model:{value:t.formData.catalogID,callback:function(e){t.$set(t.formData,"catalogID",e)},expression:"formData.catalogID"}},t._l(t.secondaryDirectoryListing,(function(t){return r("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1),r("el-form-item",{attrs:{label:"企业：",prop:"enterpriseID"}},[r("el-select",{staticClass:"w400",attrs:{clearable:"",placeholder:"请选择"},model:{value:t.formData.enterpriseID,callback:function(e){t.$set(t.formData,"enterpriseID",e)},expression:"formData.enterpriseID"}},t._l(t.enterpriseList,(function(t){return r("el-option",{key:t.id,attrs:{label:t.company,value:t.id}})})),1)],1),r("el-form-item",{attrs:{label:"城市：",prop:"city"}},[r("el-select",{staticStyle:{width:"195px","margin-right":"10px"},attrs:{placeholder:"请选择",clearable:""},model:{value:t.formData.province,callback:function(e){t.$set(t.formData,"province",e)},expression:"formData.province"}},t._l(t.provincesSY,(function(t,e){return r("el-option",{key:e,attrs:{label:t.city,value:t.city}})})),1),r("el-select",{staticStyle:{width:"195px"},attrs:{placeholder:"请选择",clearable:""},model:{value:t.formData.city,callback:function(e){t.$set(t.formData,"city",e)},expression:"formData.city"}},t._l(t.citys,(function(t,e){return r("el-option",{key:e,attrs:{label:t,value:t}})})),1)],1),r("el-form-item",{attrs:{label:"方向：",prop:"direction"}},[r("el-select",{staticClass:"w400",attrs:{clearable:"",placeholder:"请选择"},model:{value:t.formData.direction,callback:function(e){t.$set(t.formData,"direction",e)},expression:"formData.direction"}},t._l(t.direction,(function(t,e){return r("el-option",{key:e,attrs:{label:t,value:t}})})),1)],1),r("el-form-item",{attrs:{label:"题型：",prop:"questionType"}},t._l(t.questionType,(function(e){return r("el-radio",{key:e.value,staticStyle:{width:"100px"},attrs:{label:e.value},model:{value:t.formData.questionType,callback:function(e){t.$set(t.formData,"questionType",e)},expression:"formData.questionType"}},[t._v(t._s(e.label)+" ")])})),1),r("el-form-item",{attrs:{label:"难度：",prop:"difficulty"}},t._l(t.difficulty,(function(e){return r("el-radio",{key:e.value,staticStyle:{width:"100px"},attrs:{label:e.value},model:{value:t.formData.difficulty,callback:function(e){t.$set(t.formData,"difficulty",e)},expression:"formData.difficulty"}},[t._v(t._s(e.label)+" ")])})),1),r("el-form-item",{attrs:{label:"题干：",prop:"question"}},[r("quill-editor",{ref:"myQuillEditor",attrs:{options:t.editorOption},model:{value:t.formData.question,callback:function(e){t.$set(t.formData,"question",e)},expression:"formData.question"}})],1),3!==t.formData.questionType?r("el-form-item",{attrs:{label:"选项："}},[1===t.formData.questionType?r("div",t._l(t.formData.options,(function(e){return r("el-row",{key:e.code},[r("el-radio",{attrs:{label:e.code},model:{value:t.optionResults,callback:function(e){t.optionResults=e},expression:"optionResults"}},[t._v(" "+t._s(e.code)+"： "),r("el-input",{attrs:{placeholder:"请输入内容"},model:{value:e.title,callback:function(r){t.$set(e,"title",r)},expression:"item.title"}})],1)],1)})),1):2===t.formData.questionType?r("el-checkbox-group",{model:{value:t.optionResults,callback:function(e){t.optionResults=e},expression:"optionResults"}},t._l(t.formData.options,(function(e){return r("el-row",{key:e.code},[r("el-checkbox",{attrs:{label:e.code}},[t._v(" "+t._s(e.code)+"： "),r("el-input",{attrs:{placeholder:"请输入内容"},model:{value:e.title,callback:function(r){t.$set(e,"title",r)},expression:"item.title"}})],1)],1)})),1):t._e(),r("el-button",{attrs:{type:"danger"},on:{click:function(e){t.optionsNum++}}},[t._v(" +增加选项与答案 ")])],1):t._e(),r("el-form-item",{attrs:{label:"解析视频："}},[r("el-input",{staticClass:"w400",attrs:{placeholder:"请输入内容"},model:{value:t.formData.videoURL,callback:function(e){t.$set(t.formData,"videoURL",e)},expression:"formData.videoURL"}})],1),r("el-form-item",{attrs:{label:"答案解析：",prop:"answer"}},[r("quill-editor",{ref:"myQuillEditor2",attrs:{options:t.editorOption},model:{value:t.formData.answer,callback:function(e){t.$set(t.formData,"answer",e)},expression:"formData.answer"}})],1),r("el-form-item",{attrs:{label:"题目备注："}},[r("el-input",{staticClass:"w400",attrs:{type:"textarea",rows:2,placeholder:"请输入内容"},model:{value:t.formData.remarks,callback:function(e){t.$set(t.formData,"remarks",e)},expression:"formData.remarks"}})],1),r("el-form-item",{attrs:{label:"试题标签：",prop:"tags"}},[r("el-select",{staticClass:"w400",attrs:{multiple:"",filterable:"","allow-create":"","default-first-option":"",placeholder:"请选择标签"},model:{value:t.formData.tags,callback:function(e){t.$set(t.formData,"tags",e)},expression:"formData.tags"}},t._l(t.tagList,(function(t,e){return r("el-option",{key:e,attrs:{label:t.label,value:t.label}})})),1)],1),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v(" 确认"+t._s(t.queryObj?"编辑":"提交")+" ")])],1)],1)],1)},i=[],o=r("1da1"),n=(r("d3b7"),r("159b"),r("a15b"),r("ac1f"),r("1276"),r("96cf"),r("72a0")),s=r("b59c"),c=r("d700"),l={name:"QuestionsNew",data:function(){return{labelPosition:"right",queryObj:this.$route.query,formData:{subjectID:"",catalogID:"",enterpriseID:"",province:"",city:"",direction:"",questionType:1,difficulty:1,question:"",options:[],videoURL:"",answer:"",remarks:"",tags:""},formRules:{subjectID:[this.checkRequired("学科")],catalogID:[this.checkRequired("目录")],enterpriseID:[this.checkRequired("企业")],city:[this.checkRequired("城市")],direction:[this.checkRequired("方向")],questionType:[this.checkRequired("题型")],difficulty:[this.checkRequired("难度")],question:[this.checkRequired("题干")],answer:[this.checkRequired("答案解析")],tags:[this.checkRequired("试题标签","blur")]},serialNumber:65,optionsNum:4,optionResults:[],subjectList:[],secondaryDirectoryListing:[],enterpriseList:[],provincesSY:s["c"],citys:[],direction:n["b"],questionType:n["c"],difficulty:n["a"],tagList:[],editorOption:{modules:{toolbar:["bold","italic","underline","strike",{list:"ordered"},{list:"bullet"},"blockquote","code-block","image","link"]},placeholder:"输入内容..."}}},computed:{editor:function(){return this.$refs.myQuillEditor.quill},editor2:function(){return this.$refs.myQuillEditor2.quill}},methods:{getCourseList:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(c["j"])();case 2:r=e.sent,a=r.data,t.subjectList=a;case 5:case"end":return e.stop()}}),e)})))()},getSecondaryDirectory:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var r,a,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=t.formData.subjectID,e.next=3,Object(c["i"])({subjectID:r});case 3:a=e.sent,i=a.data,t.secondaryDirectoryListing=i;case 6:case"end":return e.stop()}}),e)})))()},getEnterpriseList:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(c["f"])();case 2:r=e.sent,a=r.data,t.enterpriseList=a.items;case 5:case"end":return e.stop()}}),e)})))()},getTagsList:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(c["k"])();case 2:r=e.sent,a=r.data,t.tagList=a;case 5:case"end":return e.stop()}}),e)})))()},checkRequired:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:["blur","change"];return{required:!0,message:"".concat(t,"不能为空"),trigger:e}},onSubmit:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var r,a,i,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$refs.refForm.validate();case 2:return Array.isArray(t.optionResults)?t.optionResults.forEach((function(e){t.formData.options.forEach((function(t){t.isRight=e===t.code||t.isRight}))})):t.formData.options.forEach((function(e){e.isRight=t.optionResults===e.code})),t.formData.tags=t.formData.tags.join(","),t.formData.questionType+="",t.formData.difficulty+="",e.next=8,null!==(r=t.queryObj)&&void 0!==r&&r.id?Object(c["n"])(t.formData):Object(c["a"])(t.formData);case 8:i=e.sent,o=i.status,200===o&&t.$router.push("choice"===(null===(a=t.queryObj)||void 0===a?void 0:a.or)?"/questions/choice":"/questions/list");case 11:case"end":return e.stop()}}),e)})))()},getDetail:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var r,a,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(c["e"])({id:t.queryObj.id});case 2:r=e.sent,a=r.data,t.formData=a,t.formData.questionType-=0,t.formData.difficulty-=0,i=[],a.options.forEach((function(t){t.isRight&&i.push(t.code)})),t.optionResults=1===t.formData.questionType?i.join():i,t.formData.tags=t.formData.tags.split(",");case 11:case"end":return e.stop()}}),e)})))()}},created:function(){var t;this.getCourseList(),this.getSecondaryDirectory(),this.getEnterpriseList(),this.getTagsList(),this.serialNumber=65;for(var e=0;e<this.optionsNum;e++)this.formData.options.push({isRight:!1,code:String.fromCharCode(this.serialNumber++),title:"",img:""});(null===(t=this.queryObj)||void 0===t?void 0:t.id)&&this.getDetail()},mounted:function(){this.editor.container.style.height="200px",this.editor2.container.style.height="200px"},watch:{formData:{deep:!0,handler:function(){var t=this;this.getSecondaryDirectory(),this.provincesSY.forEach((function(e){e.city===t.formData.province&&(t.citys=e.area)}))}},optionsNum:function(t,e){for(var r=0;r<t-e;r++)this.formData.options.push({isRight:!1,code:String.fromCharCode(this.serialNumber++),title:"",img:""})}}},u=l,f=(r("ce55"),r("2877")),d=Object(f["a"])(u,a,i,!1,null,"4f2caa46",null);e["default"]=d.exports},d700:function(t,e,r){"use strict";r.d(e,"h",(function(){return i})),r.d(e,"j",(function(){return o})),r.d(e,"i",(function(){return n})),r.d(e,"k",(function(){return s})),r.d(e,"l",(function(){return c})),r.d(e,"m",(function(){return l})),r.d(e,"b",(function(){return u})),r.d(e,"e",(function(){return f})),r.d(e,"g",(function(){return d})),r.d(e,"d",(function(){return p})),r.d(e,"f",(function(){return m})),r.d(e,"a",(function(){return b})),r.d(e,"n",(function(){return h})),r.d(e,"c",(function(){return v}));r("99af");var a=r("b775"),i=function(t){return Object(a["a"])("/questions","get",t)},o=function(t){return Object(a["a"])("/subjects/simple","get",t)},n=function(t){return Object(a["a"])("/directorys/simple","get",t)},s=function(t){return Object(a["a"])("/tags/simple","get",t)},c=function(t){return Object(a["a"])("/users/simple","get",t)},l=function(t){return Object(a["a"])("/questions/".concat(t.id),"delete",t)},u=function(t){return Object(a["a"])("/questions/choice/".concat(t.id,"/").concat(t.choiceState),"patch",t)},f=function(t){return Object(a["a"])("/questions/".concat(t.id),"get",t)},d=function(t){return Object(a["a"])("/questions/choice","get",t)},p=function(t){return Object(a["a"])("/questions/choice/".concat(t.id,"/").concat(t.publishState),"post",t)},m=function(t){return Object(a["a"])("/companys","get",t)},b=function(t){return Object(a["a"])("/questions","post",t)},h=function(t){return Object(a["a"])("/questions/".concat(t.id),"put",t)},v=function(t){return Object(a["a"])("/questions/check/".concat(t.id),"post",t)}}}]);
//# sourceMappingURL=chunk-0bb8d7ff.6dab0838.js.map