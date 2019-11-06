'use strict'

function extractFileExtension(fileName) {
  if (fileName.length > 0) {
    const index = fileName.lastIndexOf('.')
    return index > -1 ? fileName.slice(index) : ''
  }
  return ''
}

module.exports = function (file, id) {
  this.id = id
  this.file = file
  this.fileName = file.name
  this.fileExtension = extractFileExtension(file.name)
  this.mimeType = file.type
  this.fileSize = file.size
}
