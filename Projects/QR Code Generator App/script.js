const qrInput = document.getElementById("qrInput");

const generateBtn = document.getElementById("generateBtn");

const qrSection = document.getElementById("qrSection");

const qrBox = document.querySelector(".qr-box");

const downloadBtn = document.getElementById("downloadBtn");

let qr;

generateBtn.addEventListener("click", () => {
  const text = qrInput.value.trim();

  if (!text) {
    alert("Please enter text or URL.");

    return;
  }

  // Remove old QR

  qrBox.innerHTML = "";

  // Generate instantly

  qr = new QRCode(qrBox, {
    text: text,

    width: 220,

    height: 220,

    colorDark: "#000000",

    colorLight: "#ffffff",

    correctLevel: QRCode.CorrectLevel.H,
  });

  qrSection.classList.remove("hidden");
});

downloadBtn.addEventListener("click", () => {
  const qrImage = qrBox.querySelector("img");

  if (!qrImage) return;

  const link = document.createElement("a");

  link.href = qrImage.src;

  link.download = "qr-code.png";

  link.click();
});
