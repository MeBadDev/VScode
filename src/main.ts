import * as monaco from 'monaco-editor'
import './index.css'

const EDITOR_1 = document.getElementById("editor-1") as HTMLDivElement
const EDITOR_2 = document.getElementById("editor-2") as HTMLDivElement

monaco.editor.defineTheme("ctp-mocha", {
  base: "vs-dark",
  inherit: true,
  rules: [
    {
      token: "comment",
      foreground: "#6c7086"
    },
    {
      token: "string",
      foreground: "#a6e3a1"
    },
    {
      token: "number",
      foreground: "#fab387"
    },
    {
      token: "keyword",
      foreground: "#cba6f7"
    },
  ] as Array<any>,
  colors: {
    "editor.background": "#1e1e2e",
    "editor.lineHighlightBackground": "#181825",
    "editor.selectionBackground": "#89b4fa",
    "editorLineNumber.foreground": "#bac2de",

  }
} as monaco.editor.IStandaloneThemeData)
monaco.editor.create(EDITOR_1, {
  language: "javascript",
  value: "//some shitty codes \n123\n export default function helloWorld(){\n\tconsole.log('Hello World!')\n}",
  theme: "ctp-mocha",
  roundedSelection: false,
  smoothScrolling: true,
  stickyScroll: { enabled: true },
})
monaco.editor.create(EDITOR_2, {
  language: "javascript"
})
