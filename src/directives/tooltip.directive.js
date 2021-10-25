import localizeFilter from "@/filters/localize.filter";

export default {
  bind(el, { value, modifiers }) {
    M.Tooltip.init(el, {
      html: modifiers.noloc ? value : localizeFilter(value),
      position: modifiers.customClass ? "top" : "bottom",
    });
    if (modifiers.customClass) {
      M.Tooltip.getInstance(el).tooltipEl.classList.add("custom-tooltip");
    }
  },

  unbind(el) {
    const tooltip = M.Tooltip.getInstance(el);

    if (tooltip && tooltip.destroy) {
      tooltip.destroy();
    }
  },
};
