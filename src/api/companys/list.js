import { createAPI } from '@/utils/request'
export const getList = data => createAPI('/companys', 'get', data)
export const addList = (data) => createAPI('/companys', 'post', data)//添加
export const updateList = id => createAPI(`/companys/${id}?id=${id}`, 'get')//获取编辑
export const delList = id => createAPI(`/companys/${id}`, 'delete',)
export const actionState = (id, state) => createAPI(`/companys/${id}/${state}`, 'post')
export const editList = (data) => createAPI(`/companys/${data.id}`, 'put', data)//编辑


