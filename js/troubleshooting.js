(async function () {
  try {
    // Load software first
    const software = await loadJSON("data/software.json");
    const sel = document.getElementById("ts-software");

    software.forEach(item => {
      sel.insertAdjacentHTML(
        "beforeend",
        `<option value="${item.id}">${escapeHtml(item.name)}</option>`
      );
    });

    // Load troubleshooting data
    const data = await loadJSON("data/troubleshooting.json");

    // Pre-select software from URL
    const id = new URLSearchParams(location.search).get("software");
    if (id) sel.value = id;

    document.getElementById("diagnose-btn").addEventListener("click", () => {
      const error = document.getElementById("ts-error").value.trim().toLowerCase();
      const context = document.getElementById("ts-context").value.trim().toLowerCase();
      const chosen = sel.value;
      const text = `${error} ${context}`;

      let x = data.find(v => {
        if (chosen && v.software !== chosen) return false;

        return (
          v.title.toLowerCase().split(/\s+/).some(w => w.length > 3 && text.includes(w)) ||
          v.slug.toLowerCase().split("-").some(w => w.length > 3 && text.includes(w))
        );
      });

      if (!x && chosen) x = data.find(v => v.software === chosen);

      if (!x) {
        x =
          data.find(v => text.includes("403") && v.slug.includes("403")) ||
          data.find(v => text.includes("401") && v.slug.includes("401")) ||
          data.find(v => text.includes("refresh") && v.slug.includes("refresh"));
      }

      const box = document.getElementById("diagnosis");

      if (!x) {
        box.innerHTML = `
          <div class="result-content">
            <div class="alert">
              <strong>No confident match.</strong>
              Try the AI Assistant or search the Error Code database.
            </div>
          </div>`;
        return;
      }

      box.innerHTML = `
        <div class="result-content">
          <div class="demo-banner">
            <strong>Demo diagnosis</strong>
            <span>This response came from the local troubleshooting database.</span>
          </div>

          <h2>${escapeHtml(x.title)}</h2>
          <p>${escapeHtml(x.problem)}</p>

          <h3>Symptoms</h3>
          <ul>${x.symptoms.map(v => `<li>${escapeHtml(v)}</li>`).join("")}</ul>

          <h3>Likely Causes</h3>
          <ul>${x.causes.map(v => `<li>${escapeHtml(v)}</li>`).join("")}</ul>

          <h3>Quick Fix</h3>
          <ul>${x.quickFix.map(v => `<li>${escapeHtml(v)}</li>`).join("")}</ul>

          <h3>Detailed Fix</h3>
          <ol>${x.detailedFix.map(v => `<li>${escapeHtml(v)}</li>`).join("")}</ol>

          <h3>Diagnostic Steps</h3>
          <ul>${x.diagnostics.map(v => `<li>${escapeHtml(v)}</li>`).join("")}</ul>

          <h3>Prevention</h3>
          <p>${escapeHtml(x.prevention)}</p>
        </div>`;
    });

  } catch (err) {
    console.error(err);
    alert("ERROR: " + err.message);
  }
})();
