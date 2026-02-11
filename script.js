const usdInput = document.getElementById("usd");
const feeInput = document.getElementById("fee");
const idrInput = document.getElementById("idr");
const warningText = document.getElementById("warning");
const noteText = document.getElementById("note");
const waBtn = document.getElementById("waBtn");

const RATE = 15100;
const WA_NUMBER = "6281119566667"; // ganti nomor admin

usdInput.addEventListener("input", () => {
  const usd = parseFloat(usdInput.value);
  waBtn.disabled = true;

  if (!usd || usd <= 0) {
    idrInput.value = "";
    feeInput.value = "";
    warningText.style.display = "none";
    noteText.style.display = "none";
    return;
  }

  if (usd < 5) {
    warningText.style.display = "block";
    idrInput.value = "—";
    feeInput.value = "—";
    noteText.style.display = "none";
    return;
  }

  warningText.style.display = "none";

  let feeUSD = 0;
  if (usd < 10) feeUSD = 0.7;
  else if (usd < 50) feeUSD = 1;
  else if (usd < 100) feeUSD = 1.7;
  else if (usd < 150) feeUSD = 2;
  else if (usd < 200) feeUSD = 2.5;
  else feeUSD = 3;

  feeInput.value = `$${feeUSD}`;
  const totalIDR = (usd - feeUSD) * RATE;
  idrInput.value = "Rp " + totalIDR.toLocaleString("id-ID");
  noteText.style.display = "block";
  waBtn.disabled = false;
});

waBtn.addEventListener("click", () => {
  const usd = parseFloat(usdInput.value);
  if (usd < 5) return;

  const feeUSD = parseFloat(feeInput.value.replace("$","")) || 0;
  const totalIDR = (usd - feeUSD) * RATE;

  const message = `
Halo Admin PayRupiah 👋

Saya ingin melakukan penukaran saldo PayPal:

• Nominal USD : $${usd}
• Fee         : $${feeUSD}
• Total IDR   : Rp ${totalIDR.toLocaleString("id-ID")}

Mohon info langkah selanjutnya 🙏
  `.trim();

  const url = `https://wa.me/${6281119566667}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
});
