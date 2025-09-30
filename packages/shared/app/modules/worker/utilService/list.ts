import { generateId } from '@any-listen/common/utils'
import { type FileAction, watchMusicDir } from '@any-listen/nodejs/watcher'

const watchers = new Map<string, () => Promise<void>>()
export const createMusicDirWatcher = (
  dir: string,
  onFile: (action: FileAction, path: string) => void,
  onReady: () => void,
  onError: (message: string) => void,
  options: { recursive?: boolean } = {}
) => {
  const id = generateId()
  watchers.set(id, watchMusicDir(dir, onFile, onReady, onError, options))
  return id
}
export const removeMusicDirWatcher = async (id: string) => {
  const unwatch = watchers.get(id)
  if (!unwatch) return
  await unwatch()
  watchers.delete(id)
}
