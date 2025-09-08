# 🎨 File to Canvas.js Converter

Convert PNG, JPEG, or PDF files into a **Canvas.js** (Fabric.js) object and view the generated code for easy use in your web projects.  
This tool also supports **AI-powered image generation** through an integrated **n8n workflow**, allowing you to generate visuals from text prompts directly on the canvas.

---

## 🚀 Features

- 🖼 Upload image files (`.png`, `.jpg`, `.jpeg`) or PDF documents.  
- 🤖 Generate images from text prompts via **n8n workflow** integration.  
- 📄 Render files directly onto an HTML5 `<canvas>` using **Fabric.js**.  
- 💻 Export canvas state as **Canvas.js code** (JSON format).  
- 🔗 Option to embed images as **base64** or external URL.  
- 📋 Copy or clear generated code easily from the UI.  
- 🧼 Clean **Bootstrap 5.3 UI** with responsive layout.  

---

## 📂 File Structure


file-to-canvasjs-converter/
│
├── index.html          # Main HTML structure
├── style.css           # Custom styles
├── app.js              # Core logic (Fabric.js, PDF.js, n8n workflow integration)
└── README.md           # Project documentation


---

## 📸 Screenshot

![Preview](preview.png)

---

## 🧰 Technologies Used

- **HTML5, CSS3, JavaScript (ES6)**  
- [Bootstrap 5.3](https://getbootstrap.com/)  
- [Fabric.js 5.3](http://fabricjs.com/)  
- [PDF.js](https://mozilla.github.io/pdf.js/)  
- **n8n** for AI image generation workflow  

---

## 🔧 How It Works

1. **Upload File**: Choose any supported file type (`.png`, `.jpg`, `.jpeg`, `.pdf`).  
2. **Generate Image**: (Optional) Enter a text prompt and generate an image via **n8n workflow**.  
3. **Preview Canvas**: The canvas displays the uploaded background image, first page of a PDF, or generated AI image.  
4. **Generate Code**: Click **"Generate Code"** to view the `canvas.loadFromJSON()` object.  
5. **Copy/Use Code**: Toggle the **base64** option or copy the code to reuse in your projects.  

---

## 📦 Setup

1. Clone or download this repository:  
   - git clone https://github.com/san-soni30/FileToCanvas.git


2. Open `index.html` in your browser.
3. Upload a file or generate an AI image, then generate Canvas.js code for your projects.

---

## ⚠️ Notes

* PDF rendering only displays the **first page**.
* Image background is scaled to fit the canvas.
* Use the **Include Base64** checkbox to decide how the image is embedded.
* n8n workflow requires a configured webhook endpoint for AI image generation.

---

## 🙌 Contributions

Pull requests and improvements are welcome! If you'd like to add more file format support, AI features, or workflow enhancements, feel free to fork this project.

---

## 🎥 Demo

🌐 [Watch Live Demo](https://youtu.be/7ngcZvR5Jd8)

---

Happy coding! 💻✨