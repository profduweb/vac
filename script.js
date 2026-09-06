const videoContainer = document.querySelector("[data-video]");
const videoButton = document.querySelector("[data-video-play]");

videoButton?.addEventListener("click", () => {
  const iframe = document.createElement("iframe");
  iframe.className = "video-frame";
  iframe.src = "https://www.youtube-nocookie.com/embed/videoseries?list=UUNzUonmxxvG-HIqOC3S7Thw&autoplay=1";
  iframe.title = "Dernières vidéos de VAC — Vulgarisateur Apple & Cie";
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  iframe.allowFullscreen = true;
  videoContainer.replaceWith(iframe);
});

const testimonialCarousel = document.querySelector("[data-testimonial-carousel]");
const previousTestimonial = document.querySelector("[data-carousel-previous]");
const nextTestimonial = document.querySelector("[data-carousel-next]");
const testimonialCards = testimonialCarousel
  ? [...testimonialCarousel.querySelectorAll(".testimonial-card")]
  : [];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function updateTestimonialControls() {
  if (!testimonialCarousel) return;

  const maxScroll = testimonialCarousel.scrollWidth - testimonialCarousel.clientWidth;
  previousTestimonial.disabled = testimonialCarousel.scrollLeft <= 2;
  nextTestimonial.disabled = testimonialCarousel.scrollLeft >= maxScroll - 2;
}

function moveTestimonials(direction) {
  if (!testimonialCarousel || testimonialCards.length === 0) return;

  const current = testimonialCards.reduce((closestIndex, card, index) => {
    const currentDistance = Math.abs(testimonialCards[closestIndex].offsetLeft - testimonialCarousel.scrollLeft);
    const nextDistance = Math.abs(card.offsetLeft - testimonialCarousel.scrollLeft);
    return nextDistance < currentDistance ? index : closestIndex;
  }, 0);
  const destination = Math.max(0, Math.min(testimonialCards.length - 1, current + direction));

  testimonialCarousel.scrollTo({
    left: testimonialCards[destination].offsetLeft,
    behavior: reduceMotion.matches ? "auto" : "smooth"
  });
}

previousTestimonial?.addEventListener("click", () => moveTestimonials(-1));
nextTestimonial?.addEventListener("click", () => moveTestimonials(1));
testimonialCarousel?.addEventListener("scroll", updateTestimonialControls, { passive: true });
window.addEventListener("resize", updateTestimonialControls);
updateTestimonialControls();

document.querySelector("[data-year]").textContent = new Date().getFullYear();
