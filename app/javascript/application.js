import "@hotwired/turbo-rails";
import "./controllers";

// AlpineJS
import Alpine from "alpinejs";
import "./alpine/init";
window.Alpine = Alpine;
Alpine.start();

// ABCJS
import * as ABCJS from "abcjs";
window.ABCJS = ABCJS;
