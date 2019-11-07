# mw-file-uploader

> Dependency-free library for uploading files.

## Installation

With [npm](https://www.npmjs.com/):

```javascript
// last stable
npm install mw-file-uploader@1.3.7
```

## Usage

The FileUploader can be bound to an input field:

```javascript

<input type="field" id="file-uploader">
```

Import FileUploader

```javascript
import FileUploader from 'mw-file-uploader'
```

```javascript
<input type="file" id="file-uploader">

<script>
let FileUploader = new FileUploader({
    field: document.getElementById('file-uploader')
})
</script>
```

### Configuration

Available options are:

| Option        | Type        | Default               | Description  |
| :------------ | :---------- | :-------------------- | :----------- |
| field         | HTMLElement | `null`                  | Input element, requires to have `type="file"` |
| accept        | string      | `''` (empty string)     | One or more unique file type specifiers describing file types to allow, divided by comma. Example: `'.jpg,.png'` |
| multiple      | boolean     | `false`                 | Enables adding multiple files. |
| allowDrop     | boolean     | `false`                 | Enables dragging and dropping files to the dropzone element. |
| dropzone      | HTMLElement | `null` if `allowDrop` is `false`. If `allowDrop` is `true` and dropzone element has not been defined, FileUploader will create an empty `<div>` below the input element. | Any HTML element where files can be dragged. Only works if `allowDrop` is `true`. |
| onAddFile     | function    | `() => {}`              | Callback function that gets passed an array of the added files |
| onRemoveFile  | function    | `() => {}`              | Callback function that gets passed an array of the removed files |
| fieldClass    | string      | `'file-uploader-input'` | Class(es) set to the input field. |
| dropzoneClass | string      | `'file-uploader-dropzone'` | Class(es) set to the dropzone element. |

### Properties

In addition to the `options` property, FileUploader exposes additional properties:

* `field`
* `fileList` contains all the added files

### Methods

* `add(files)`
* `remove(files)`
* `open()`

## License

[ISC](LICENSE.txt)
