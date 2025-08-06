const canvas = new fabric.Canvas("canvas");
const fileInput = document.getElementById("fileInput");
const codeOutput = document.getElementById("codeOutput");
const generateBtnWrapper = document.getElementById("generateBtnWrapper");

fileInput.addEventListener("change", handleFile);

function handleFile(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  const type = file.type;

  if (type.includes("image")) {
    reader.onload = function (f) {
      fabric.Image.fromURL(f.target.result, function (img) {
        canvas.clear();
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          scaleX: canvas.width / img.width,
          scaleY: canvas.height / img.height,
        });
        showGenerateButton();
      });
    };
    reader.readAsDataURL(file);
  } else if (type === "application/pdf") {
    reader.onload = function (f) {
      const typedarray = new Uint8Array(f.target.result);
      pdfjsLib.getDocument(typedarray).promise.then((pdf) => {
        pdf.getPage(1).then((page) => {
          const viewport = page.getViewport({ scale: 1 });
          const tempCanvas = document.createElement("canvas");
          const context = tempCanvas.getContext("2d");
          tempCanvas.width = viewport.width;
          tempCanvas.height = viewport.height;

          page.render({ canvasContext: context, viewport: viewport }).promise.then(() => {
            const imgData = tempCanvas.toDataURL("image/png");
            fabric.Image.fromURL(imgData, function (img) {
              canvas.clear();
              canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                scaleX: canvas.width / img.width,
                scaleY: canvas.height / img.height,
              });
              showGenerateButton();
            });
          });
        });
      });
    };
    reader.readAsArrayBuffer(file);
  } else {
    alert("Unsupported file type.");
  }
}

function showGenerateButton() {
  generateBtnWrapper.classList.remove("d-none");
}

function generateCode() {
  const includeBase64 = document.getElementById("includeBase64").checked;
  const canvasJSON = canvas.toJSON();

  if (canvasJSON.backgroundImage) {
    if (!includeBase64) {
      canvasJSON.backgroundImage.src = "https://example.com/image.png"; // Replace with actual hosted image if needed
    } else {
      const base64String = canvasJSON.backgroundImage.src;
      const base64SizeKB = (base64String.length * (3 / 4)) / 1024;
      if (base64SizeKB > 500) {
        alert("⚠ Base64 image is too large (~" + Math.round(base64SizeKB) + " KB). Consider using a URL instead for better performance.");
      }
    }
  }

  const json = JSON.stringify(canvasJSON, null, 2);
  codeOutput.value = `const canvas = new fabric.Canvas('canvas');\ncanvas.loadFromJSON(${json})`;
}

function copyCode() {
  codeOutput.select();
  document.execCommand("copy");
  alert("Canvas.js code copied to clipboard!");
}

function clearCode() {
  codeOutput.value = "";
}

async function generateImageFromPrompt() {
  const prompt = document.getElementById("promptInput").value.trim();
  if (!prompt) {
    alert("Please enter a prompt.");
    return;
  }

  try {
    const response = await fetch("https://san-soni30.app.n8n.cloud/webhook/image-generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: prompt })
    });

    if (!response.ok) throw new Error("Image generation failed.");

    const imageBlob = await response.blob();
    const imageUrl = URL.createObjectURL(imageBlob);

    fabric.Image.fromURL(imageUrl, function (img) {
      canvas.clear();
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        scaleX: canvas.width / img.width,
        scaleY: canvas.height / img.height,
      });
      showGenerateButton();
    }, { crossOrigin: 'anonymous' });

  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}