import excel from '@/libs/excel'

/**
 * 获取excel的 key 和 title
 * @param columnsData 表格数据
 * @returns {{titleArray: Array, keyArray: Array}}
 * needExport 是否需要导出 默认需要
 */
export function getExportKeyArray (columnsData) {
  let titleArray = []
  let keyArray = []
  for (let item of columnsData) {
    let title = item.title
    let key = item.key
    let needExport = item.needExport === undefined ? true : item.needExport
    if (needExport) {
      titleArray.push(title)
      keyArray.push(key)
    }
  }
  return {
    titleArray: titleArray,
    keyArray: keyArray
  }
}

/**
 * 导出数组
 * @param titleArray 标题
 * @param keyArray key
 * @param exportData 导出数据
 * @param fileName 文件名称
 */
export function exportArrayToExcel (titleArray, keyArray, exportData, fileName) {
  const params = {
    title: titleArray,
    key: keyArray,
    data: exportData,
    autoWidth: true,
    filename: fileName
  }
  excel.export_array_to_excel(params)
}

/**
 * 简单导出表格
 * @param columnsData
 * @param exportData
 * @param fileName
 */
export function exportSimple (columnsData, exportData, fileName) {
  let dataKeyArray = getExportKeyArray(columnsData)
  exportArrayToExcel(
    dataKeyArray.titleArray,
    dataKeyArray.keyArray,
    exportData,
    fileName
  )
}

export default {
  getExportKeyArray,
  exportArrayToExcel,
  exportSimple
}

