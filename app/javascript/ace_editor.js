import ace from "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";

ace.config.set("basePath", "/ace"); // worker public/ace/

document.addEventListener("turbo:load", () => {
  document.querySelectorAll("[data-ace-json-editor]").forEach((container) => {
    const inputId = container.dataset.aceInput;
    const input = document.getElementById(inputId);
    if (!container || !input) return;

    const editor = ace.edit(container);
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/json");
    editor.setValue(input.value || "", -1); // -1 = cursor at the start
    editor.session.setUseWorker(true); // web worker

    editor.session.on("change", () => {
      input.value = editor.getValue();
    });
  });
});
