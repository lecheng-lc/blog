import { readFile } from 'fs/promises'
export default {
  async readPackageJson(url: string) {
    try {
      const data = await readFile(url, 'utf8')
      const packageData:PackageJson = JSON.parse(data)
      return packageData
    } catch (error) {
      console.error('出错了:', error)
      throw error
    }
  }
}
