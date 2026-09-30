/* Hold explainer: links numbered image markers to a list of points.
   Click or focus on either side sets the active pair. No dependencies. */

if (!customElements.get('hold-explainer')) {
  customElements.define(
    'hold-explainer',
    class HoldExplainer extends HTMLElement {
      constructor() {
        super();
        this.markers = Array.from(this.querySelectorAll('.hold-explainer__marker'));
        this.items = Array.from(this.querySelectorAll('.hold-explainer__item'));
        this.triggers = Array.from(this.querySelectorAll('.hold-explainer__item-trigger'));
        this.activeIndex = 0;

        this.onMarkerKeydown = this.onMarkerKeydown.bind(this);
      }

      connectedCallback() {
        this.markers.forEach((marker) => {
          marker.addEventListener('click', () => this.setActive(this.indexOf(marker), { scrollItem: true }));
          marker.addEventListener('focus', () => this.setActive(this.indexOf(marker)));
          marker.addEventListener('keydown', this.onMarkerKeydown);
        });

        this.triggers.forEach((trigger) => {
          trigger.addEventListener('click', () => this.setActive(this.indexOf(trigger)));
          trigger.addEventListener('focus', () => this.setActive(this.indexOf(trigger)));
        });

        const initiallyActive = this.markers.findIndex((marker) => marker.classList.contains('is-active'));
        this.setActive(initiallyActive >= 0 ? initiallyActive : 0);
      }

      indexOf(element) {
        const index = Number(element.dataset.holdIndex);
        return Number.isNaN(index) ? 0 : index;
      }

      onMarkerKeydown(event) {
        if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();

        const count = this.markers.length;
        let next = this.activeIndex;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (this.activeIndex + 1) % count;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (this.activeIndex - 1 + count) % count;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = count - 1;

        this.markers[next].focus();
      }

      setActive(index, options = {}) {
        if (index < 0 || index >= this.items.length) return;
        this.activeIndex = index;

        this.markers.forEach((marker, i) => {
          const active = i === index;
          marker.classList.toggle('is-active', active);
          marker.setAttribute('aria-expanded', active ? 'true' : 'false');
        });

        this.items.forEach((item, i) => {
          item.classList.toggle('is-active', i === index);
        });

        this.triggers.forEach((trigger, i) => {
          trigger.setAttribute('aria-pressed', i === index ? 'true' : 'false');
        });

        if (options.scrollItem && window.matchMedia('(max-width: 989px)').matches) {
          const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          this.items[index].scrollIntoView({
            block: 'nearest',
            behavior: reduceMotion ? 'auto' : 'smooth',
          });
        }
      }
    }
  );
}
