'use strict'

let File = require('./file')

function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
}
module.exports = function (options) {
  this.options = {
    field: null,
    dropzone: null,
    multiple: false,
    onAddFile: () => { },
    onRemoveFile: () => { },
    accept: '',
    allowDrop: false,
    fieldClass: 'file-uploader-input',
    dropzoneClass: 'file-uploader-dropzone'
  }
  this.options = Object.assign(this.options, options)
  this.field = null
  this.fileList = []

  this.add = function (files) {
    let addedFiles = []

    files.forEach(file => {
      const newFile = new File(file, this.fileList.length + 1)
      addedFiles.push(newFile)
      this.fileList.push(newFile)
    })

    this.options.onAddFile(addedFiles)
  }

  this.remove = function (files = []) {
    if (typeof files === 'string' ||typeof files === 'number') {
      const fileIndex = this.findIndex(parseInt(files))
      this.fileList.splice(fileIndex)

      this.options.onRemoveFile()
      return
    }

    if (Array.isArray(files) && files.length > 0) {
      files.forEach(file => {
        const fileIndex = this.findIndex(parseInt(files))
        this.fileList.splice(fileIndex)
      })
      this.options.onRemoveFile()
      return
    }

    this.fileList = []
    return
  }

  this.open = function () {
    this.field.click()
  }

  const config = function () {
    this.field =
      this.options.field && this.options.field.nodeName
        ? this.options.field
        : null

    // set up the field
    this.field.addEventListener('change', handleChange)
    this.field.setAttribute('class', this.options.fieldClass)
    this.field.setAttribute('accept', this.options.accept)
    if (this.options.multiple) this.field.setAttribute('multiple', '')

    if (this.options.allowDrop) {
      if (this.options.dropzone === null) {
        this.options.dropzone = document.createElement('div')
        this.insertAfter(
          this.options.dropzone,
          this.field
        )
      }
      /*
      e.preventDefault() and e.stopPropagation() prevent any unwanted behaviors for the assigned events across browsers.
      */
      this.options.dropzone.addEventListener('dragover', event => {
        event.stopPropagation()
        event.preventDefault()
      })

      this.options.dropzone.addEventListener('drag', event => {
        event.stopPropagation()
        event.preventDefault()
      })

      this.options.dropzone.addEventListener('drop', drop)
      this.options.dropzone.setAttribute('class', this.options.dropzoneClass)
    }
  }.bind(this)

  const handleChange = function (event) {
    // event.target.files is a FileList object, which is iterable
    // an array is created from it for consistency purposes
    const filesArray = Array.from(event.target.files)
    this.add(filesArray)
  }.bind(this)

  const drop = function (event) {
    this.add(event.dataTransfer.files)
  }.bind(this)

  config()
}
