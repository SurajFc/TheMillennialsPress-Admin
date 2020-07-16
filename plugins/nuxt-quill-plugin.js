import Vue from 'vue'

import VueQuillEditor from 'vue-quill-editor'
import quillemoji from 'quill-emoji';
// import { ImageResize } from '../components/imageresize/ImageResize';

import ImageResize from 'quill-image-resize-module'

Quill.register('modules/imageResize', ImageResize)

Vue.use(VueQuillEditor)
Vue.use(quillemoji)

// Quill.register("modules/imageResize", ImageResize);

// import { ImageResize } from "quill-image-resize-module";
 
