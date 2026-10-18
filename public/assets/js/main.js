const menuToggle = document.querySelector(".menu-toggle");
const siteNavigation = document.querySelector("#site-navigation");

// Content is visible immediately, including with the previous CSS still cached.
// Keep this before enabling the enhanced mobile menu styles.
document.querySelectorAll(".reveal").forEach((item) => item.classList.add("is-visible"));
document.documentElement.classList.add("reveal-animations");

if (menuToggle && siteNavigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Menu openen" : "Menu sluiten");
    siteNavigation.classList.toggle("is-open", !isOpen);
  });

  siteNavigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Menu openen");
      siteNavigation.classList.remove("is-open");
    });
  });
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("a");

  if (!link || typeof window.gtag !== "function") {
    return;
  }

  const href = link.getAttribute("href") || "";
  let eventName = "";
  let eventDetails = {};

  if (href.startsWith("tel:")) {
    eventName = "contact_click";
    eventDetails = { contact_method: "phone" };
  } else if (href.startsWith("mailto:")) {
    eventName = "contact_click";
    eventDetails = { contact_method: "email" };
  } else if (href.includes("wa.me/")) {
    eventName = "contact_click";
    eventDetails = { contact_method: "whatsapp" };
  } else if (/\.pdf(?:$|[?#])/i.test(href)) {
    eventName = "file_download";
    eventDetails = { file_name: href.split("/").pop().split(/[?#]/)[0] };
  } else {
    return;
  }

  window.gtag("event", eventName, {
    ...eventDetails,
    link_text: link.textContent.trim(),
    link_url: link.href,
  });
});

// Keep every article available without JavaScript; enhance the overview with filters.
const adviceFilters = document.querySelector(".advice-filters");
const adviceCards = [...document.querySelectorAll("#advice-cards [data-advice-category]")];
const adviceCount = document.querySelector("[data-advice-count]");

if (adviceFilters && adviceCards.length && adviceCount) {
  adviceFilters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-advice-filter]");
    if (!button || !adviceFilters.contains(button)) return;
    const category = button.dataset.adviceFilter;
    adviceFilters.querySelectorAll("[data-advice-filter]").forEach((filter) => {
      filter.setAttribute("aria-pressed", String(filter === button));
    });
    let visibleCount = 0;
    adviceCards.forEach((card) => {
      card.hidden = category !== "all" && card.dataset.adviceCategory !== category;
      if (!card.hidden) visibleCount += 1;
    });
    adviceCount.textContent = `${visibleCount} ${visibleCount === 1 ? "artikel" : "artikelen"}${category === "all" ? "" : ` · ${button.textContent.trim()}`}`;
  });
  adviceFilters.hidden = false;
}

// Links open the original photo without JS; enhance them into a compact gallery.
document.querySelectorAll('[data-product-gallery]').forEach((gallery) => {
  const mainImage = gallery.querySelector('.gallery-stage img');
  const fullLink = gallery.querySelector('[data-gallery-full]');
  const zoomLink = gallery.querySelector('[data-gallery-zoom]');
  const caption = gallery.querySelector('[data-gallery-caption]');
  const choices = [...gallery.querySelectorAll('[data-gallery-select]')];
  function selectPhoto(choice) {
    mainImage.srcset = `${choice.dataset.small} 560w, ${choice.dataset.src} 1600w`;
    mainImage.src = choice.dataset.src;
    mainImage.alt = choice.dataset.alt;
    mainImage.title = choice.dataset.title;
    fullLink.href = choice.dataset.src;
    zoomLink.href = choice.dataset.src;
    caption.textContent = choice.dataset.caption;
    choices.forEach((link) => {
      if (link === choice) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }
  choices.forEach((choice, index) => {
    choice.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      selectPhoto(choice);
    });
    choice.addEventListener('keydown', (event) => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % choices.length;
      if (event.key === 'ArrowLeft') next = (index + choices.length - 1) % choices.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = choices.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      choices[next].focus();
      selectPhoto(choices[next]);
    });
  });
});
