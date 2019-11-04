/*eslint no-unused-vars: "error"*/

function log(content) {
  // eslint-disable-next-line no-console
  console.log(content)
}

log('init log')
/**
 * A FileUploader
 * @typedef
 * @property {object} field - field the FileUploader is bound to
 * @property {object} fileList - fileList from the field's 'files' attribute
 * @property {function} updateFile - function called in field's input event
 * @property {function} loaded - callback function after new file has been added
 */

export class FileUploader {
  /**
   * Creates an instance of {@link FileUploader}.
   *
   * @constructor
   * @param {object} options The custom options for {@link FileUploader}.
   */
  constructor(options) {
    this.options = {
      field: null,
      dropzone: null,
      onAddFile: () => { },
      onRemoveFile: () => { },
      accept: '',
      allowDrop: false,
      name: 'file-upload-input',
      labelClass: 'file-uploader-label',
      fieldClass: 'file-uploader-input'
    }

    // Properties
    this.options = Object.assign(this.options, options)
    this.field = null
    this.fileList = []

    this.droppedFiles = false

    // Methods-->
    this.add = this.add.bind(this)
    this.remove = this.remove.bind(this)
    this.drop = this.drop.bind(this)
    this.handleAddEvent = this.handleAddEvent.bind(this)
    this.config = this.config.bind(this)

    // Hooks -->
    this.onAddFile = this.options.onAddFile.bind(this)
    this.onRemoveFile = this.options.onRemoveFile.bind(this)

    this.config()
  }

  /**
   * Sets custom options on top of default options of the instance of {@link FileUploader}.
   *
   * @function
   * @param {object} options The custom options for {@link FileUploader} passed to constructor.
   */
  config() {
    this.field =
    this.options.field && this.options.field.nodeName
    ? this.options.field
    : null

    log(this.field)
    // set up the field
    this.field.addEventListener('change', this.handleAddEvent)
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
    this.insertAfter(label, this.field)

    if (this.options.allowDrop) {

      if(this.options.dropzone === null) {
        this.options.dropzone = document.createElement('div')
        this.insertAfter(this.options.dropzone, document.querySelector(`label[for=${this.options.name}]`))
      }
      /*
      e.preventDefault() and e.stopPropagation() prevent any unwanted behaviors for the assigned events across browsers.
      */
      this.options.dropzone.addEventListener(
        'dragover',
        event => {
          event.stopPropagation()
          event.preventDefault()
        }
      )

      this.options.dropzone.addEventListener('drag', event => {
        event.stopPropagation()
        event.preventDefault()
      })

      /*
      e.originalEvent.dataTransfer.files returns the list of files that were dropped.
      */
      this.options.dropzone.addEventListener('drop', this.drop)
      this.options.dropzone.setAttribute('class', 'file-uploader-dropzone')
    }
  }

  /**
   * Updates the the fileList property and fires onAddFile callback function.
   *
   * @function
   * @param {object} event The input event.
   */
  handleAddEvent(event) {
    // if file already exists, clear the fileList
    // @NOTE: if multiple file loading is later supported, this logic will need to be updated
    this.add(event.target.files)
  }

  add(files) {
    if (this.fileList.length > 0) this.fileList = []
    const addedFiles = new File(files[0], this.fileList.length + 1)

    this.fileList.push(addedFiles)
    this.field.setAttribute('files', this.fileList)

    this.onAddFile(addedFiles)
  }

  remove() {
    this.fileList = []

    this.onRemoveFile()
  }

  drop(event) {
    this.add(event.dataTransfer.files)
  }

  insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
  }

  /**
   * Returns the 'files' attribute of the field.
   *
   * @return {object} A FileList object that lists every selected file. This list has no more than one member unless the 'multiple' attribute is specified.
   */
  get files() {
    return this.field.files
  }

  /**
   * Returns the 'value' attribute ot the field.
   *
   * @return {string} A DOMString representing the path to the selected file..
   */
  get value() {
    return this.field.value
  }
}

class File {
  constructor(file, id) {
    // this.file = file
    this.id = id
    this.file = ''
    this.objectURL = URL.createObjectURL(file)
    this.fileName = file.name
    this.fileExtension = this.extractFileExtension(file.name)
    this.mimeType = file.type
    this.fileSize = file.size
    this.readFile = this.readFile.bind(this)
    this.readFile(file)
  }

  extractFileExtension(fileName) {
    if (fileName.length > 0) {
      const index = fileName.lastIndexOf('.')

      // checks if any index if found
      return index > -1 ? fileName.slice(index) : ''
    }
    return ''
  }

  readFile(URL) {
    let reader = new FileReader()
    reader.addEventListener('load', event => {
      this.file = event.target.result
    })
    reader.readAsDataURL(URL)

    reader.addEventListener('load', event => {
      this.objectURL = event.target.result
    })
  }
}
