import { Controller } from "@hotwired/stimulus";
import * as ABCJS from "abcjs";

export default class extends Controller {
  static targets = ["notation"];

  connect() {
    // Можно сразу показать ноты, либо рендерить по кнопке
    this.visualObj = null;
  }

  render() {
    const abc = `
X:1
T:Chord Demo
M:2/4
L:1/4
K:C
Q:1/4=200
C D | E F | G A | B c |
`;
    this.visualObj = ABCJS.renderAbc(this.notationTarget, abc)[0];
  }

  async play() {
    if (!this.visualObj) {
      console.error("No visualObj to play!");
      return;
    }

    if (!this.synth) {
      this.synth = new ABCJS.synth.CreateSynth();
      await this.synth.init({
        visualObj: this.visualObj,
        options: { chordsOff: true },
      });
      await this.synth.prime();
    }

    this.synth.start();
  }
}
