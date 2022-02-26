import { createAPI } from '@/utils/request'

export const getDataList = (data) => createAPI('/questions', 'get', data)

export const getSubjectList = (data) =>
  createAPI('/subjects/simple', 'get', data)

export const getDirectoryList = (data) =>
  createAPI('/directorys/simple', 'get', data)

export const getTagsList = (data) => createAPI('/tags/simple', 'get', data)

export const getUserList = (data) => createAPI('/users/simple', 'get', data)

export const remove = (data) =>
  createAPI(`/questions/${data.id}`, 'delete', data)

// 精选题库加入取消
export const choiceAdd = (data) =>
  createAPI(`/questions/choice/${data.id}/${data.choiceState}`, 'patch', data)

// 基础题库详情
export const detail = (data) => createAPI(`/questions/${data.id}`, 'get', data)

// 精选题库列表
export const getChoiceDataList = (data) =>
  createAPI('/questions/choice', 'get', data)

// 精选题库上下架
export const choicePublish = (data) =>
  createAPI(`/questions/choice/${data.id}/${data.publishState}`, 'post', data)

// 获取企业列表
export const enterpriseList = (data) => createAPI('/companys', 'get', data)

// 基础题库添加
export const addItem = (data) => createAPI('/questions', 'post', data)

// 题库修改
export const update = (data) => createAPI(`/questions/${data.id}`, 'put', data)

// 试题审核
export const choiceCheck = (data) =>
  createAPI(`/questions/check/${data.id}`, 'post', data)
