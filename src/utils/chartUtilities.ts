export const textRefactor = (text: string, size: number) => {
  return `${text.split(" ").slice(0, size).join(" ")}...`;
};

export const chartLinearGradient = (canvas: HTMLElement | null, height: number, color: Record<string, any>) => {
  if (canvas) {
    const ctx = (canvas as HTMLCanvasElement)?.getContext("2d");
    const gradient = ctx?.createLinearGradient(0, 0, 0, height);
    gradient?.addColorStop(0, `${color.start}`);
    gradient?.addColorStop(1, `${color.end}`);

    return gradient;
  }
};

export const customTooltips = function (this: any, context: any) {
  // Tooltip Element
  let tooltipEl: HTMLElement | null = document.querySelector(".chartjs-tooltip");

  if (!this._chart?.canvas.closest(".chartjs-container").contains(tooltipEl)) {
    tooltipEl = document.createElement("div");
    tooltipEl.className = "chartjs-tooltip";
    tooltipEl.innerHTML = "<table></table>";

    document.querySelectorAll(".chart-container").forEach((el: Element) => {
      if (el.contains(document.querySelector(".chartjs-tooltip"))) {
        document.querySelector(".chartjs-tooltip")?.remove();
      }
    });

    this._chart?.canvas.closest(".chart-container").appendChild(tooltipEl);
  }
  const tooltipModel = context.tooltip;
  // Hide if no tooltip
  if (tooltipEl && tooltipModel.opacity === 0) {
    tooltipEl.style.opacity = "0";
    return;
  }

  // Set caret Position
  tooltipEl?.classList.remove("above", "below", "no-transform");
  tooltipEl?.classList.add(tooltipModel.yAlign ?? "no-transform");

  function getBody(bodyItem: any) {
    return bodyItem.lines;
  }

  // Set Text
  if (tooltipModel.body) {
    const titleLines = tooltipModel.title || [];
    const bodyLines = tooltipModel.body.map(getBody);

    let innerHtml = "<thead>";

    titleLines.forEach(function (title: string | number) {
      innerHtml += `<div class="tooltip-title">${title}</div>`;
    });
    innerHtml += "</thead><tbody>";

    bodyLines.forEach(function (body: any, i: any) {
      const colors = tooltipModel.labelColors[i];
      let style = `background:${colors.backgroundColor}`;
      style += `; border-color:${colors.borderColor}`;
      style += "; border-width: 2px";
      style += "; border-radius: 30px";
      const span = `<span class="chartjs-tooltip-key" style="${style}"></span>`;
      innerHtml += `<tr><td>${span}${body}</td></tr>`;
    });

    innerHtml += "</tbody>";

    const tableRoot = tooltipEl?.querySelector("table");

    if (tableRoot) tableRoot.innerHTML = innerHtml;
  }

  const positionY = this._chart.canvas.offsetTop || 0;
  const positionX = this._chart.canvas.offsetLeft || 0;
  const toolTip = document.querySelector(".chartjs-tooltip");
  const toolTipHeight = toolTip.clientHeight;

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = `${positionX + tooltipModel.caretX}px`;
  tooltipEl.style.top = `${
    positionY +
    tooltipModel.caretY -
    (tooltipModel.caretY > 10 ? (toolTipHeight > 100 ? toolTipHeight + 5 : toolTipHeight + 15) : 70)
  }px`;
  tooltipEl.style.fontFamily = tooltipModel.options.bodyFontFamily;
  tooltipEl.style.fontSize = `${tooltipModel.options.bodyFontSize}px`;
  tooltipEl.style.fontStyle = tooltipModel.options.bodyFontStyle;
  tooltipEl.style.padding = `${tooltipModel.yPadding}px ${tooltipModel.xPadding}px`;
};
