const usdInput = document.getElementById("usd");
const idrInput = document.getElementById("idr");
const warningText = document.getElementById("warning");

const RATE = 16300;

usdInput.addEventListener("input", () => {
  const usd = parseFloat(usdInput.value);

  if (!usd || usd <= 0) {
    idrInput.value = "";
    warningText.style.display = "none";
    return;
  }

  if (usd < 5) {
    warningText.style.display = "block";
    idrInput.value = "—";
    return;
  }

  warningText.style.display = "none";

  const total = usd * RATE;
  idrInput.value = "Rp " + total.toLocaleString("id-ID");
});
