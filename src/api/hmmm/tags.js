/*
 * @Author: taoshiwei
 * @Date: 2019-04-09 14:39:32
 * @Last Modified by: taoshiwei
 * @Last Modified time: 2019-04-29 14:57:26
 *
 * 标签
 */

import { createAPI } from '@/utils/request'

// 标签列表
export const getList = data => createAPI('/tags', 'get', data)

// 标签简单列表
export const simple = data => createAPI('/tags/simple', 'get', data)

// 标签详情
export const detail = data => createAPI(`/tags/${data.id}`, 'get', data)

// 标签添加
export const addList = data => createAPI('/tags', 'post', data)

// 标签修改
export const editList = (id, data) => createAPI(`/tags/${id}`, 'put', data)

// 标签删除
export const deleteList = id => createAPI(`/tags/${id}`, 'delete')

// 标签状态
export const cutState = data => createAPI(`/tags/${data.id}/${data.state}`, 'post', data)
