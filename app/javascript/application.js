import "@hotwired/turbo-rails";
import "./controllers";
import "./ace_editor";

// AlpineJS
import Alpine from "alpinejs";
window.Alpine = Alpine;

// ABCJS
import * as ABCJS from "abcjs";
window.ABCJS = ABCJS;

import "./alpine/init";
Alpine.start();
