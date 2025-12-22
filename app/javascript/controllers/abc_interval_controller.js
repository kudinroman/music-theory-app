import { Controller } from "@hotwired/stimulus";
import * as ABCJS from "abcjs";

export default class extends Controller {
  static targets = ["notationInterval", "buttons", "feedback"];

  connect() {
    // Определяем интервалы
    this.intervals = {
      CE: "C E",
      CA: "C A",
      CF: "C F",
    };

    // Рендерим их сразу (но без звука)
    this.intervalKeys = Object.keys(this.intervals);
    this.intervalKeys.forEach((name, index) => {
      const targetDiv = document.createElement("div");
      targetDiv.dataset.intervalName = name;
      targetDiv.style.display = "inline-block";
      targetDiv.style.marginRight = "10px";
      targetDiv.style.cursor = "pointer";

      ABCJS.renderAbc(
        targetDiv,
        `
X:${index + 1}
T:${name}
M:2/4
L:1/4
K:C
[${this.intervals[name]}] |
`,
        { add_classes: true, staffwidth: 100 },
      );

      targetDiv.addEventListener("click", (event) => this.check(event));
      this.buttonsTarget.appendChild(targetDiv);
    });

    this.synth = null;
    this.currentIntervalName = null; // интервал, который проигрывается
  }

  // Проигрываем один случайный интервал
  async playInterval() {
    const randomIndex = Math.floor(Math.random() * this.intervalKeys.length);
    const intervalName = this.intervalKeys[randomIndex];
    this.currentIntervalName = intervalName;

    const abcNotation = `
X:1
T:Interval
M:2/4
L:1/4
K:C
[${this.intervals[intervalName]}] |
`;

    // Временный div, чтобы проиграть без рендера на страницу
    const tempDiv = document.createElement("div");
    const visualObj = ABCJS.renderAbc(tempDiv, abcNotation, {
      add_classes: true,
    })[0];

    if (!this.synth) {
      this.synth = new ABCJS.synth.CreateSynth();
      await this.synth.init({
        visualObj: visualObj,
        options: { chordsOff: false }, // ноты звучат одновременно
      });
      await this.synth.prime();
    }

    this.synth.start();
    this.feedbackTarget.textContent = "";
  }

  // Проверка ответа
  async check(event) {
    const selectedName = event.currentTarget.dataset.intervalName;

    if (selectedName === this.currentIntervalName) {
      this.feedbackTarget.textContent = "✅ Правильно!";
      this.feedbackTarget.style.color = "green";
    } else {
      this.feedbackTarget.textContent = `❌ Неправильно! Было: ${this.currentIntervalName}`;
      this.feedbackTarget.style.color = "red";
    }
  }
}
