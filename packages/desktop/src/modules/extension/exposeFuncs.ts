import { extensionEvent } from '@/modules/extension'
import { rendererIPC } from '@/renderer/winMain/rendererEvent'
import { getAllUserLists, getListMusics, sendMusicListAction } from '@any-listen/app/modules/musicList'
import { checkProxyCache, createProxy, writeProxyCache } from '@any-listen/app/modules/proxyServer'
import type { Options } from '@any-listen/nodejs/request'
import { getPlayInfo, playerEvent } from '../player'
import { boxTools } from './clientTools'

/**
 * 暴露给扩展进程调用的方法
 */
export const exposedFuncs: AnyListen.IPCExtension.MainIPCActions = {
  async onExtensionEvent(action) {
    extensionEvent.extensionEvent(action)
  },
  async createProxyUrl(url, options) {
    return createProxy(url, options as Options)
  },
  async checkProxyCache(url) {
    return checkProxyCache(url)
  },
  async writeProxyCache(fileName, data) {
    return writeProxyCache(fileName, data)
  },

  async getPlayInfo() {
    return getPlayInfo()
  },
  async playerAction(action) {
    playerEvent.playerAction(action)
  },
  async playListAction(action) {
    await playerEvent.playListAction(action)
  },
  async playHistoryListAction(action) {
    await playerEvent.playHistoryListAction(action)
  },

  async getAllUserLists() {
    return getAllUserLists()
  },
  async getListMusics(listId) {
    return getListMusics(listId)
  },
  async musicListAction(action) {
    await sendMusicListAction(action)
  },

  async createExtensionIconPublicPath(filePath) {
    return filePath
  },
  async removeExtensionIconPublicPath(filePath) {},

  async showMessageBox(key, extId, options) {
    if (options.modal) {
      return boxTools.showBox(key, async () => {
        return rendererIPC.showMessageBox(key, extId, options)
      })
    }
    return rendererIPC.showMessageBox(key, extId, options)
  },
  async showInputBox(key, extId, options) {
    return boxTools.showBox(key, async () => {
      return rendererIPC.showInputBox(key, extId, options)
    })
  },
  async showOpenBox(key, extId, options) {
    // TODO
    // return boxTools.showBox(key, async () => {
    //   return rendererIPC.showOpenBox(key, extId, options)
    // })
  },
  async showSaveBox(key, extId, options) {
    // TODO
    // return boxTools.showBox(key, async () => {
    //   return rendererIPC.showSaveBox(key, extId, options)
    // })
  },
  async closeMessageBox(key) {
    boxTools.closeBox(key)
  },
} as const

export type ExposedFuncs = typeof exposedFuncs
