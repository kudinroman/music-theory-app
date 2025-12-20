import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  show(event) {
    event.preventDefault();
    alert("У вас нет прав для доступа к админке!");
  }
}
