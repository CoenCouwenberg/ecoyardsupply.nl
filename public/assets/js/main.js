const revealItems = document.querySelectorAll(".reveal");
const menuToggle = document.querySelector(".menu-toggle");
const siteNavigation = document.querySelector("#site-navigation");

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

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
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
