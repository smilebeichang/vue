import { createAPI } from '@/utils/request'

export const list = (data) => createAPI('/users/', 'get', data)
export const simple = (data) => createAPI('/users/simple', 'get', data)
export const add = (data) => createAPI('/users', 'post', data)
export const update = (data) => createAPI(`/users/${data.id}`, 'put', data)
export const remove = (id) => createAPI(`/users/${id}`, 'delete')
export const detail = (id) => createAPI(`/users/${id}`, 'get')
