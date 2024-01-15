import { contentList, getOneContent, coverList } from "@/api/content";
import _ from 'lodash'
import { defineStore } from 'pinia';

const state = {
  content: '',
  formState: {
    edit: false,
    formData: {
      targetUser: "",
      title: "",
      stitle: "",
      type: "1",
      categories: [],
      keywords: "",
      sortPath: "",
      tags: [],
      source: "",
      sImg: "/static/upload/images/defaultImg.jpg",
      sImgType: "2",
      cover: "",
      discription: "",
      author: {},
      uAuthor: "",
      markDownComments: "",
      state: "1",
      isTop: 0,
      roofPlacement: "0",
      clickNum: 0,
      comments: "",
      simpleComments: "",
      commentNum: 0,
      likeNum: 0,
      dismissReason: "",
    },
  },
  contentList: {
    pageInfo: {},
    docs: [],
  },
  directUser: {
    formState: {
      show: false,
      edit: false,
      type: '',
      formData: {
        name: "",
        alias: "",
        targetUser: "",
      },
    },
  },
  moveCate: {
    formState: {
      show: false,
      edit: false,
      type: '',
      formData: {
        categories: "",
      },
    },
  },
  contentCoverDialog: {
    show: false,
  },
  contentCoverList: {
    pageInfo: {},
    docs: [],
  },
  draftContentDialog: {
    show: false,
  },
  draftContentList: {
    pageInfo: {},
    docs: [],
  },
};

export const contentStore = defineStore('content', {
  state:()=>(state),
  actions:{
    CONTENT_FORMSTATE(formState: any) {
      this.formState.edit = formState.edit;
      this.formState.formData = Object.assign(
        {
          targetUser: '',
          title: '',
          stitle: '',
          type: '1',
          categories: [],
          keywords: '',
          sortPath: '',
          tags: [],
          source: '',
          sImg: '',
          sImgType: '2',
          cover: '',
          discription: '',
          author: {},
          uAuthor: '',
          markDownComments: '',
          state: '1',
          isTop: 0,
          roofPlacement: '0',
          clickNum: 0,
          comments: '',
          simpleComments: '',
          commentNum: 0,
          likeNum: 0,
        },
        formState.formData
      );
    },
    CONTENT_LIST(contentList: any) {
      this.contentList = contentList;
    },
    CONTENT_ONE(content:any) {
      this.content = content;
    },
    DIRECTUSERFORMSTATE(formState: any) {
      this.directUser.formState.show = formState.show;
      this.directUser.formState.edit = formState.edit;
      this.directUser.formState.type = formState.type;
      this.directUser.formState.formData = Object.assign(
        {
          name: "",
          alias: "",
          targetUser: "",
        },
        formState.formData
      );
    },
    CONTENT_MOVECATEFORMSTATE(formState: any) {
      this.moveCate.formState.show = formState.show;
      this.moveCate.formState.edit = formState.edit;
      this.moveCate.formState.type = formState.type;
      this.moveCate.formState.formData = Object.assign(
        {
          categories: "",
        },
        formState.formData
      )
    },
    CONTENT_COVERDIALOGSTAGE(formState:any) {
      this.contentCoverDialog.show = formState.show;
    },
    CONTENT_COVERLIST(contentCoverList: any) {
      this.contentCoverList = contentCoverList;
    },
    CONTENT_DRAFTDIALOGSTAGE(formState: any){
      this.draftContentDialog.show = formState.show
    },
    CONTENT_DRAFTLIST(draftList: any) {
      this.draftContentList = draftList;
    },
    showContentForm(params: any = {
      edit: false,
      formData: {},
    }){
      this.CONTENT_FORMSTATE( {
        edit: params.edit,
        formData: params.formData,
      })
    },
    showDirectUserForm (
      params:any = {
        edit: false,
        formData: {},
      }) {
      this.DIRECTUSERFORMSTATE({
        show: true,
        edit: params.edit,
        formData: params.formData,
      })
    },
    hideDirectUserForm() {
      this.DIRECTUSERFORMSTATE({
        show: false,
      })
    },
    showMoveCateForm (
      params = {
        edit: false,
        formData: {},
      }
    )  {
      this.CONTENT_MOVECATEFORMSTATE({
        show: true,
        edit: params.edit,
        formData: params.formData,
      })
    },
    hideMoveCateForm ()  {
      this.CONTENT_MOVECATEFORMSTATE({
        show: false
      })
    },
    showCoverListDialog(
      params = {
        edit: false,
      }
    ) {
      this.CONTENT_COVERDIALOGSTAGE({
        show: true,
      })
    },
    hideCoverListDialog () {
      this.CONTENT_COVERDIALOGSTAGE({
        show: false,
      })
    },
    showDraftListDialog() {
      this.CONTENT_DRAFTDIALOGSTAGE({
          show: true,
      })
    },
    hideDraftListDialog(){
      this.CONTENT_DRAFTDIALOGSTAGE({
        show: false,
      })
    },
    getContentList(params = {}) {
      contentList(params).then((result) => {
        this.CONTENT_LIST(result)
      })
    },
  
    getOneContent( params = {}) {
      getOneContent(params).then((result) => {
        this.CONTENT_ONE(result)
      })
    },
  
    getContentCoverList( params = {}) {
      coverList(params).then((result) => {
        this.CONTENT_COVERLIST(result)
      })
    },
  
    getDraftContentList( params = {}) {
      contentList(Object.assign(params, { draft: "1" })).then((result) => {
        this.CONTENT_DRAFTLIST(result)
      })
    },
  }
})