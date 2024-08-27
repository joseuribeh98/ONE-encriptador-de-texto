// Seleccionar elementos del DOM
const textArea = document.querySelector("textarea");
const encriptarBtn = document.querySelector("button:nth-of-type(1)");
const desencriptarBtn = document.querySelector("button:nth-of-type(2)");
const resultadoSection = document.querySelector("section:nth-of-type(2)");

// Diccionario de encriptación
const encriptacionDict = {
  e: "enter",
  i: "imes",
  a: "ai",
  o: "ober",
  u: "ufat",
};

// Función para crear y mostrar un toast
function showToast(message, duration = 3000) {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-16 py-4 rounded-md shadow-lg transition-opacity duration-300 opacity-0';
  document.body.appendChild(toast);

  // Forzar un reflow para que la transición funcione
  toast.offsetHeight;

  // Mostrar el toast
  toast.style.opacity = '1';

  // Ocultar y remover el toast después de la duración especificada
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, duration);
}

// Función para encriptar texto
function encriptar(texto) {
  return texto
    .split("")
    .map((char) => encriptacionDict[char] || char)
    .join("");
}

// Función para desencriptar texto
function desencriptar(texto) {
  let textoDesencriptado = texto;
  Object.entries(encriptacionDict).forEach(([key, value]) => {
    textoDesencriptado = textoDesencriptado.replaceAll(value, key);
  });
  return textoDesencriptado;
}

// Función para mostrar el resultado
function mostrarResultado(texto) {
  resultadoSection.innerHTML = `
        <div class="flex flex-col p-6 gap-2 w-full h-full justify-between">
            <p class="text-[#0A3871] text-lg font-normal break-all">${texto}</p>
            <button id="copiarBtn" class="bg-[#D8DFE8] text-[#0A3871] border border-solid border-[#0A3871] w-full font-bold py-4 px-4 rounded-lg font-normal mt-4">Copiar</button>
        </div>
    `;

  // Agregar funcionalidad al botón de copiar
  document.getElementById("copiarBtn").addEventListener("click", () => {
    navigator.clipboard.writeText(texto).then(() => {
      showToast("Texto copiado al portapapeles");
    });
  });
}

// Event listeners para los botones
encriptarBtn.addEventListener("click", () => {
  const texto = textArea.value.toLowerCase();
  if (texto.trim() !== "") {
    const textoEncriptado = encriptar(texto);
    mostrarResultado(textoEncriptado);
  } else {
    showToast("Por favor, ingrese un texto para encriptar.");
  }
});

desencriptarBtn.addEventListener("click", () => {
  const texto = textArea.value.toLowerCase();
  if (texto.trim() !== "") {
    const textoDesencriptado = desencriptar(texto);
    mostrarResultado(textoDesencriptado);
  } else {
    showToast("Por favor, ingrese un texto para desencriptar.");
  }
});

// Validación de entrada (solo letras minúsculas y sin acentos)
textArea.addEventListener("input", (e) => {
  const regex = /^[a-z\s]*$/;
  if (!regex.test(e.target.value)) {
    e.target.value = e.target.value.replace(/[^a-z\s]/g, "");
    showToast("Solo se permiten letras minúsculas y espacios.");
  }
});