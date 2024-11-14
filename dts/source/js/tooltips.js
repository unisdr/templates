import {
    computePosition,
    flip,
    shift,
    offset,
    arrow,
} from "./floating-ui-core@1.6.8";

const button = document.querySelector("#button");
const tooltip = document.querySelector("#tooltip");
const arrowElement = document.querySelector("#arrow");

function update() {
  computePosition(button, tooltip, {
      placement: "top",
      middleware: [
          offset(6),
          flip(),
          shift({ padding: 5 }),
          arrow({ element: arrowElement }),
      ],
  }).then(({ x, y, placement, middlewareData }) => {
      Object.assign(tooltip.style, {
          left: `${x}px`,
          top: `${y}px`,
      });

      // Accessing the data
      const { x: arrowX, y: arrowY } = middlewareData.arrow;

      const staticSide = {
          top: "bottom",
          right: "left",
          bottom: "top",
          left: "right",
      }[placement.split("-")[0]];

      Object.assign(arrowElement.style, {
          left: arrowX != null ? `${arrowX}px` : "",
          top: arrowY != null ? `${arrowY}px` : "",
          right: "",
          bottom: "",
          [staticSide]: "-4px",
      });
  });
}

function showTooltip() {
    tooltip.style.display = "block";
    update();
}

function hideTooltip() {
    tooltip.style.display = "";
}

[
    ["mouseenter", showTooltip],
    ["mouseleave", hideTooltip],
    ["focus", showTooltip],
    ["blur", hideTooltip],
].forEach(([event, listener]) => {
    button.addEventListener(event, listener);
});
