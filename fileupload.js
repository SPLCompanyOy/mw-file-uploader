'use strict'

function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
}
module.exports = function (options) {
  this.options = {
    field: null,
    dropzone: null,
    multiple: true,
    onAddFile: () => { },
    onRemoveFile: () => { },
    accept: '',
    allowDrop: false,
    name: 'file-upload-input',
    labelClass: 'file-uploader-label',
    fieldClass: 'file-uploader-input'
  }
  this.options = Object.assign(this.options, options)
  this.field = null
  this.fileList = []

  this.add = function (files) {
    if (this.fileList.length > 0) this.fileList = []
    const addedFiles = new File(files[0], this.fileList.length + 1)

    this.fileList.push(addedFiles)
    this.field.setAttribute('files', this.fileList)

    this.options.onAddFile(addedFiles)
  }

  this.remove = function () {
    this.fileList = []
    this.options.onRemoveFile()
  }

  const config = function () {
    console.log('this', this)

    this.field =
      this.options.field && this.options.field.nodeName
        ? this.options.field
        : null

    // set up the field
    this.field.addEventListener('change', handleAddEvent)
    this.field.setAttribute('class', this.options.fieldClass)
    this.field.setAttribute('accept', this.options.accept)

    // Add label before the field
    this.field.setAttribute('name', this.options.name)
    let label = document.createElement('label')
    label.setAttribute('for', this.options.name)
    label.setAttribute('class', this.options.labelClass)
    label.addEventListener('click', () => {
      this.field.click()
    })
    label.innerHTML = 'Add files'
    insertAfter(label, this.field)

    if (this.options.allowDrop) {
      if (this.options.dropzone === null) {
        this.options.dropzone = document.createElement('div')
        this.insertAfter(
          this.options.dropzone,
          document.querySelector(`label[for=${this.options.name}]`)
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

      /*
      e.originalEvent.dataTransfer.files returns the list of files that were dropped.
      */
      this.options.dropzone.addEventListener('drop', drop)
      this.options.dropzone.setAttribute('class', 'file-uploader-dropzone')
    }
  }.bind(this)

  const handleAddEvent = function (event) {
    // if file already exists, clear the fileList
    // @NOTE: if multiple file loading is later supported, this logic will need to be updated
    this.add(event.target.files)
  }.bind(this)

  const drop = function (event) {
    this.add(event.dataTransfer.files)
  }.bind(this)

  config()
}
