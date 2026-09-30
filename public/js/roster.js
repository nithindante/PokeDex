document.addEventListener("DOMContentLoaded", () => {
  const PLACEHOLDER_IMG = "/images/pokemon-placeholder.svg";
  const spotlight = document.getElementById("spotlight");
  const spotlightImg = document.getElementById("spotlight-img");
  const spotlightName = document.getElementById("spotlight-name");
  const spotlightLvl = document.getElementById("spotlight-lvl");
  const spotlightType = document.getElementById("spotlight-type");
  const spotlightHpRow = document.getElementById("spotlight-hp-row");
  const spotlightHpFill = document.getElementById("spotlight-hp-fill");

  document.querySelectorAll(".roster-grid .mon-card:not(.unavailable):not(.empty-slot)").forEach((card) => {
    card.addEventListener("click", () => {
      if (!spotlightImg) return;
      const { name, img, lvl, hp, type, grad } = card.dataset;

      spotlight.classList.add("is-swapping");
      setTimeout(() => {
        spotlightImg.onerror = () => {
          spotlightImg.onerror = null;
          spotlightImg.src = PLACEHOLDER_IMG;
        };
        spotlightImg.src = img || PLACEHOLDER_IMG;
        spotlightImg.alt = name;
        spotlightName.textContent = name;
        spotlightLvl.textContent = `Lv. ${lvl}`;
        spotlightType.textContent = type;
        spotlightType.style.setProperty("--grad", grad);

        if (hp) {
          spotlightHpRow.hidden = false;
          spotlightHpFill.style.setProperty("--hp", `${hp}%`);
        } else {
          spotlightHpRow.hidden = true;
        }

        spotlight.classList.remove("is-swapping");
      }, 150);
    });
  });

  const addToggle = document.getElementById("addPokemonToggle");
  const addPanel = document.getElementById("addPokemonPanel");
  if (addToggle && addPanel) {
    addToggle.addEventListener("click", () => {
      addPanel.hidden = !addPanel.hidden;
    });
  }

  document.querySelectorAll("form[data-confirm]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      if (!confirm(form.dataset.confirm)) event.preventDefault();
    });
  });
});
