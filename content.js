const TARGET_SELECTOR = "div.formulation.clearfix";
const BUTTON_BG = "#000000";
const BUTTON_ACTIVE_BG = "#e12f53ff";
const BUTTON_COLOR = "#ffffff";
const copiedBtnTitle = "🖕 Copied!";
const btnTitle = "🤘 Copy";
const copyAllBtnTitle = "🤘 Copy All";

let cleanData = (content) => {
  let string1 = "Question text";
  let string2 = "Clear my choice";
  content = content.replace(string1, "");
  content = content.replace(string2, "");
  content = content.replace(btnTitle, "");
  content = content.replace(copyAllBtnTitle, "");
  content = content.replace(copiedBtnTitle, "");
  content = content.replace(/([a-d]\.)\n/g, "$1 ");
  content = content + "\n\n";
  return content;
};

(function () {
  document.querySelectorAll(TARGET_SELECTOR).forEach((div) => {
    if (div.dataset.copyAdded) return;
    div.dataset.copyAdded = "1";

    const btn = document.createElement("button");
    btn.textContent = btnTitle;
    btn.type = "button";
    btn.style.cssText = `
      position: absolute;
      bottom: 5px;
      right: 5px;
      z-index: 999999;
      font-size: 12px;
      padding: 3px 6px;
      cursor: pointer;
      border-radius: 4px;
      border: none;
      background: ${BUTTON_BG};
      color: ${BUTTON_COLOR};
      transition: transform 0.1s ease, box-shadow 0.1s ease;
    `;

    // ✅ Pressed (mouse / touch)
    btn.addEventListener("mousedown", () => {
      btn.textContent = copiedBtnTitle;
      btn.style.background = BUTTON_ACTIVE_BG;
      btn.style.transform = "scale(0.95)";
      btn.style.boxShadow = "inset 0 2px 4px rgba(0,0,0,0.3)";
    });

    // ✅ Release
    const resetPressedStyle = () => {
      setTimeout(() => {
        btn.textContent = btnTitle;
        btn.style.background = BUTTON_BG;
        btn.style.transform = "scale(1)";
        btn.style.boxShadow = "none";
      }, 500);
    };

    btn.addEventListener("mouseup", resetPressedStyle);
    btn.addEventListener("mouseleave", resetPressedStyle);

    btn.onclick = (e) => {
      e.stopPropagation();
      let content = cleanData(div.innerText);
      navigator.clipboard.writeText(content);
    };

    if (getComputedStyle(div).position === "static") {
      div.style.position = "relative";
    }

    div.appendChild(btn);
  });

  if (!document.querySelector("#copyAllBtn")) {
    const allDivs = document.querySelectorAll(TARGET_SELECTOR);
    if (allDivs.length > 0) {
      const copyAllBtn = document.createElement("button");
      copyAllBtn.id = "copyAllBtn";
      copyAllBtn.type = "button";
      copyAllBtn.textContent = copyAllBtnTitle;

      copyAllBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 999999;
        font-size: 14px;
        padding: 4px 8px;
        cursor: pointer;
        border-radius: 6px;
        border: none;
        background: ${BUTTON_BG};
        color: ${BUTTON_COLOR};
        transition: transform 0.1s ease, box-shadow 0.1s ease;
      `;

      // Pressed / active style
      const resetPressedStyle = () => {
        copyAllBtn.style.transform = "scale(1)";
        copyAllBtn.style.boxShadow = "none";
      };

      copyAllBtn.addEventListener("mousedown", () => {
        copyAllBtn.style.transform = "scale(0.95)";
        copyAllBtn.style.boxShadow = "inset 0 2px 4px rgba(0,0,0,0.3)";
      });

      copyAllBtn.addEventListener("mouseup", resetPressedStyle);
      copyAllBtn.addEventListener("mouseleave", resetPressedStyle);

      // Click: copy all divs
      copyAllBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const combinedText = Array.from(allDivs)
          .map((div) => cleanData(div.innerText))
          .join("\n\n");

        navigator.clipboard.writeText(combinedText);

        copyAllBtn.textContent = copiedBtnTitle;
        copyAllBtn.style.background = BUTTON_ACTIVE_BG;

        setTimeout(() => {
          copyAllBtn.textContent = copyAllBtnTitle;
          copyAllBtn.style.background = BUTTON_BG;
        }, 1200);

        copyAllBtn.blur();
      });

      document.body.appendChild(copyAllBtn);
    }
  }
})();
