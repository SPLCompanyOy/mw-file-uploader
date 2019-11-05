module.exports = class File {
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
