import { Controller } from "@hotwired/stimulus";
import * as ABCJS from "abcjs";

export default class extends Controller {
  static targets = ["notation"];

  connect() {
    this.abc = `
X:1
T:Chord Demo
M:4/4
L:1/1
K:C
"C"[CEG] | "Am"[ACE] | "F"[FAC] | "G"[GBD]
`;
    // Рендер нот и сохраняем визуальный объект
    this.visualObj = ABCJS.renderAbc(this.notationTarget, this.abc)[0];
  }

  async play() {
    // Создаём синтезатор один раз
    if (!this.synth) {
      this.synth = new ABCJS.synth.CreateSynth();
      await this.synth.init({ visualObj: this.visualObj });
      await this.synth.prime();
    }
    // Проигрываем
    this.synth.start();
  }
}
