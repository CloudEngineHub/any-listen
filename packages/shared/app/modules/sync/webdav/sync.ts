import { runSync } from './modules'
import { sendSyncWebDAVStatus } from './shared'
import { state } from './state'
import { WebDAV, type WebDAVClientOptions } from './webdav'

export interface SyncWebDAVOptions {
  getListMergeMode?: () => Promise<AnyListen.List.MergeMode>
  getDislikeMergeMode?: () => Promise<AnyListen.Dislike.MergeMode>
}

export const runSyncWebDAV = async (options: WebDAVClientOptions, syncOptions?: SyncWebDAVOptions) => {
  if (state.status !== 'idle' && state.status !== 'error') {
    console.warn('WebDAV sync is already running')
    throw new Error('WebDAV sync is already running')
  }
  state.status = 'waiting'
  state.error = undefined
  sendSyncWebDAVStatus()
  const webDAV = new WebDAV(options)
  const error = await webDAV.checkConnection()
  if (error) {
    state.status = 'error'
    state.error = error
    sendSyncWebDAVStatus()
    return
  }
  state.cancelTask = webDAV.lock(() => {
    state.cancelTask = undefined
    console.log('WebDAV locked')
    state.status = 'syncing'
    sendSyncWebDAVStatus()
    state.cancelTask = runSync(webDAV, {
      onEnd: (error) => {
        state.status = error ? 'error' : 'idle'
        state.error = error
        sendSyncWebDAVStatus()
        void webDAV.unlock()
      },
      getListMergeMode: syncOptions?.getListMergeMode,
      getDislikeMergeMode: syncOptions?.getDislikeMergeMode,
    })
  })
}
export const cancelSyncWebDAV = () => {
  if (state.cancelTask) {
    state.cancelTask()
    state.cancelTask = undefined
  }
}
export const getSyncWebDAVState = () => {
  return {
    status: state.status,
    error: state.error,
    nextSyncTime: state.nextSyncTime,
  }
}
