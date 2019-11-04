<template>
  <div ref="dropzone" id="container" class="p-4 bg-green-500">
    <input ref="fileuploader" type="file" />
    <img v-if="attachment.length > 0" :src="attachment[0].file" />
  </div>
</template>

<script>
import { FileUploader } from './fileuploader'
export default {
  data() {
    return {
      fileUploader: null,
      attachment: []
    }
  },
  mounted: function() {
    this.fileUploader = new FileUploader({
      field: this.$refs.fileuploader,
      onAddFile: this.loaded,
      allowDrop: true,
      dropzone: this.$refs.dropzone,
    })

    window.addEventListener(
      'dragover',
      event => {
        event.stopPropagation()
        event.preventDefault()
      }, false
    )
    window.addEventListener(
      'drop',
      event => {
        event.stopPropagation()
        event.preventDefault()
      }, false
    )
  },
  methods: {
    loaded(file) {
      this.attachment = file
    }
  }
}
</script>

<style lang="css">
  .file-uploader-dropzone {
    height: 100px;
    width: 100%;
    background-color: white;
  }

  .file-uploader-label {
    cursor: pointer;
    display: inline-block;
    padding: 1rem 2rem;
    background-color: bisque;
  }
  .file-uploader-label:focus {
    background-color:antiquewhite;
    border: 2px solid brown;
  }

  [type="file"]:focus + label,
  [type="file"] + label:hover {
    background-color: #f15d22;
  }

  .file-uploader-input {
    width: 1px;
    height: 1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
</style>
