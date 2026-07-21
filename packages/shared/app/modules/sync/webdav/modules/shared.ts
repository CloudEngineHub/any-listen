import zlib from 'node:zlib'

const gzip = async (data: string) => {
  return new Promise<string>((resolve, reject) => {
    zlib.gzip(data, (err, buf) => {
      if (err) {
        reject(err)
        return
      }
      resolve(buf.toString('base64'))
    })
  })
}
const unGzip = async (data: string) => {
  return new Promise<string>((resolve, reject) => {
    zlib.gunzip(Buffer.from(data, 'base64'), (err, buf) => {
      if (err) {
        reject(err)
        return
      }
      resolve(buf.toString())
    })
  })
}

export const encodeData = async (data: string): Promise<string> => {
  return data.length > 1024 ? `cg_${await gzip(data)}` : data
}

export const decodeData = async (data: string): Promise<string> => {
  return data.startsWith('cg_') ? unGzip(data.replace('cg_', '')) : data
}

export const buildSnapshotFileName = (key: string) => {
  return `${Date.now()}_${key}`
}
export const parseSnapshotFileName = (fileName: string) => {
  return fileName.replace(/^\d+_/, '')
}
