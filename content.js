(function () {
  document.querySelectorAll("div.formulation.clearfix").forEach((div) => {
    if (div.dataset.copyAdded) return;
    div.dataset.copyAdded = "1";

    const btn = document.createElement("button");
    btn.textContent = "🤘";
    btn.type = "button";
    btn.style.cssText = `
      position: absolute;
      bottom: 5px;
      right: 5px;
      z-index: 999999;
      font-size: 16px;
      padding: 3px 6px;
      cursor: pointer;
      border-radius: 4px;
      border: 0px solid #000000;
      background: #000000;
      color: white;
    `;

    // ✅ Pressed (mouse / touch)
    btn.addEventListener("mousedown", () => {
      btn.textContent = "🖕";
      btn.style.background = "#000000";
      // btn.style.fontSize= '20px';
      btn.style.transform = "rotate(180deg) scale(1.2)";
      btn.style.boxShadow = "inset 0 2px 4px rgba(0,0,0,0.3)";
    });

    // ✅ Release
    const resetPressedStyle = () => {
      btn.textContent = "🤘";
      btn.style.background = "#000000";
      btn.style.transform = "rotate(0deg) scale(1)";
      btn.style.boxShadow = "none";
      btn.style.fontSize= '16px';
    };

    btn.addEventListener("mouseup", resetPressedStyle);
    btn.addEventListener("mouseleave", resetPressedStyle);

    btn.onclick = (e) => {
      e.stopPropagation();
      let content = div.innerText;
      content = content.replace("Clear my choice", "");
      content = content.replace("🤘", "");
      navigator.clipboard.writeText(content);
    };

    if (getComputedStyle(div).position === "static") {
      div.style.position = "relative";
    }

    div.appendChild(btn);
  });
})();
