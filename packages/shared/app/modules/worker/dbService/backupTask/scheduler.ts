import { BACKUP_HOUR } from './constants'

const getNextBackupDelay = () => {
  const now = new Date()
  const next = new Date(now)
  next.setHours(BACKUP_HOUR, 0, 0, 0)
  if (next.getTime() <= now.getTime()) next.setDate(next.getDate() + 1)
  return next.getTime() - now.getTime()
}

export const scheduleDailyBackup = (run: () => Promise<void>) => {
  const delay = getNextBackupDelay()
  setTimeout(() => {
    void run().finally(() => {
      scheduleDailyBackup(run)
    })
  }, delay)
}
