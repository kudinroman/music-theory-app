// app/javascript/application.js

import "./controllers";
import "@hotwired/turbo-rails";
import { Application } from "@hotwired/stimulus";

// Stimulus
const application = Application.start();
window.Stimulus = application;

// Alpine
import Alpine from "alpinejs";
import { player } from "./stores/player";

Alpine.data("playerData", () => player);

Alpine.start();

// ABCJS
import * as ABCJS from "abcjs";
window.ABCJS = ABCJS;
