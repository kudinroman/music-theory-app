import "./controllers"; // подключаем Stimulus
import "@hotwired/turbo-rails";
import { Application } from "@hotwired/stimulus";

// Stimulus
const application = Application.start();
window.Stimulus = application;

// Alpine
import Alpine from "alpinejs";
import { player } from "./stores/player";

window.Alpine = Alpine;
Alpine.data("playerData", () => player);
Alpine.start();

// ABCJS
import * as ABCJS from "abcjs";
window.ABCJS = ABCJS;
