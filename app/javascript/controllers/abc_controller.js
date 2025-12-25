import { Controller } from "@hotwired/stimulus";
import * as ABCJS from "abcjs";

export default class extends Controller {
  static targets = ["notation"];

  connect() {
    this.abc = `
X:1
T:C Major Scale
M:4/4
L:1/4
K:C
Q:1/4=120
C D E F | G A B c |
`;

    // Рендерим гамму сразу
    this.visualObj = ABCJS.renderAbc(this.notationTarget, this.abc)[0];

    this.synth = null;
  }

  async play() {
    // Создаём синт один раз
    if (!this.synth) {
      this.synth = new ABCJS.synth.CreateSynth();
      await this.synth.init({
        visualObj: this.visualObj,
        options: {
          chordsOff: true,
        },
      });
      await this.synth.prime();
    }

    // Перезапуск при каждом клике
    this.synth.start();
  }
}
