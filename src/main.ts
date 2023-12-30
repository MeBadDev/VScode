import * as monaco from 'monaco-editor'
import './index.css'

const EDITOR_1 = document.getElementById("editor-1") as HTMLDivElement
const EDITOR_2 = document.getElementById("editor-2") as HTMLDivElement

monaco.editor.create(EDITOR_1, {
  language: "typescript"
})
monaco.editor.create(EDITOR_2, {
  language: "typescript"
})
