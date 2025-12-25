import * as Stores from "../effector/stores";

document.addEventListener("alpine:init", () => {
  Object.keys(Stores).forEach((storeName) => {
    const effectorStore = Stores[storeName];

    Alpine.store(storeName, {
      init() {
        this.actions = effectorStore.actions;

        effectorStore.store.watch((store) => {
          this.store = store;
        });
      },
    });
  });
});
