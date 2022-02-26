import { createAPI } from '@/utils/request'
export const getList = data => createAPI('/directorys', 'get', data)
export const cutState = (id, state) => createAPI(`/directorys/${id}/${state}`, 'post')//切换状态
export const deleteList = id => createAPI(`/directorys/${id}`, 'delete')//删除
export const addList = data => createAPI('/directorys', 'post', data)//添加
export const editList = (id, data) => createAPI(`/directorys/${id}`, 'PUT', data)//修改




