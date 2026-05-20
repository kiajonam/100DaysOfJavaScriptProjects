// ====== DOM ELEMENTS ======
// Get main UI elements from the page
const qrContainer = document.getElementById("qr-code");
const light = document.querySelector(".light");
const dark = document.querySelector(".dark");
const qrText = document.querySelector(".qr-text");
const sizes = document.querySelector(".sizes");
const shareBtn = document.querySelector(".share-btn");
const download = document.querySelector(".download");


// ====== EVENT LISTENERS ======
// Attach handlers to UI events
light.addEventListener("input", handleLightColor);
dark.addEventListener("input", handleDarkColor);
qrText.addEventListener("input", handleQRText);
sizes.addEventListener("change", handleSize);
shareBtn.addEventListener("click", handleShare);


// ====== DEFAULT VALUES ======
// Default configuration for QR generation
const defaultUrl = "https://google.com";

let size = 100,
    text = "",
    colorDark = "#000",
    colorLight = "#fff";


// ====== GENERATE QR CODE ======
/**
 * Creates QR code and updates download link
 */
async function generateQRCode() {
  // Clear previous QR
  qrContainer.innerHTML = "";

  // Generate new QR using library
  new QRCode("qr-code", {
    width: size,
    height: size,
    colorLight,
    colorDark,
    text: text || defaultUrl
  });

  // Resolve image data for download
  try {
    const url = await resolveDataUrl();
    download.href = url;
  } catch (err) {
    console.error(err);
  }
}


// ====== HANDLE TEXT INPUT (DEBOUNCE) ======
/**
 * Handles user input with debounce to prevent excessive QR generation
 */
let timeOut;

function handleQRText(e) {
  text = e.target.value.trim();

  clearTimeout(timeOut);

  timeOut = setTimeout(() => {
    if (text.length > 200) {
      alert("Text is too long for QR Code");
      return;
    }

    generateQRCode();
  }, 300);
}


// ====== HANDLE LIGHT COLOR ======
/**
 * Updates light color of QR code
 */
function handleLightColor(e) {
  colorLight = e.target.value;
  generateQRCode();
}


// ====== HANDLE DARK COLOR ======
/**
 * Updates dark color of QR code
 */
function handleDarkColor(e) {
  colorDark = e.target.value;
  generateQRCode();
}


// ====== HANDLE SHARE ======
/**
 * Shares QR code using Web Share API
 */
async function handleShare() {
  try {
    const base64 = await resolveDataUrl();

    const blob = await (await fetch(base64)).blob();

    const file = new File([blob], "QRCode.png", {
      type: blob.type,
    });

    await navigator.share({
      files: [file],
      title: "MY QR Code"
    });

  } catch (error) {
    alert("Your browser doesn't support sharing.");
  }
}


// ====== HANDLE SIZE ======
/**
 * Changes QR code size
 */
function handleSize(e) {
  size = e.target.value;
  generateQRCode();
}


// ====== RESOLVE DATA URL ======
/**
 * Extracts QR output as image URL or canvas data URL
 */
function resolveDataUrl() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const container = document.querySelector("#qr-code");

      const img = container.querySelector("img");
      const canvas = container.querySelector("canvas");

      if (img && img.src) {
        resolve(img.src);
        return;
      }

      if (canvas) {
        resolve(canvas.toDataURL());
        return;
      }

      reject("QR not found");
    }, 100);
  });
}


// ====== INITIAL RENDER ======
// Generate QR on page load
generateQRCode();


// ====== GLOBAL ERROR HANDLER ======
// Catch unexpected runtime errors
window.addEventListener("error", (e) => {
  console.log("Global error:", e.message);
});