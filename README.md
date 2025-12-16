
# NeoGenesis v7.0 - Character Prompt Architect

NeoGenesis es una aplicación web avanzada diseñada para optimizar la creación de **prompts para IA Generativa** (Midjourney, DALL-E 3, Stable Diffusion). Enfocada en la creación de personajes (Character Design), utiliza la potencia de **Google Gemini 2.5** para enriquecer descripciones básicas y convertirlas en instrucciones artísticas profesionales.

![Version](https://img.shields.io/badge/version-7.0-cyan) ![Status](https://img.shields.io/badge/status-stable-green) ![Tech](https://img.shields.io/badge/tech-React%20%7C%20TypeScript%20%7C%20Gemini-blue)

## 🚀 Características Principales

*   **Doble Motor de Diseño:**
    *   **Quick Mode (Wizard):** Asistente paso a paso para usuarios móviles o creaciones rápidas.
    *   **Advanced Mode (Grid):** Panel de control profesional con acceso total a 50+ parámetros simultáneos.
*   **Gestión de Colores Simétrica:** Control preciso de colores (Hex) para Piel, Pelo, Ojos y Equipo (soportando heterocromía y tonos duales).
*   **Protocolo PSYCHE:** Genera automáticamente un "Character Design Kit" de 7 imágenes coherentes (Vistas técnicas, cinemáticas, expresiones y tokens VTT).
*   **Generador de Inventario:** Crea hojas de sprites o "knolling" del equipamiento del personaje.
*   **Live Buffer:** Previsualización en tiempo real del prompt crudo antes de enviarlo a la IA.
*   **Memory Core:** Historial local persistente de tus últimas creaciones.

## 🛠️ Instalación y Despliegue

### Requisitos
*   Node.js v18+
*   Una API Key de Google Gemini (Gratuita en AI Studio).

### Desarrollo Local
```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/neogenesis.git

# 2. Instalar dependencias
npm install

# 3. Configurar API Key
# Crea un archivo .env en la raíz y añade:
# API_KEY=tu_clave_de_google_ai_studio

# 4. Iniciar servidor
npm run dev
```

### Build para Producción
```bash
npm run build
# La carpeta 'dist' contendrá tu web estática lista para subir a Hostinger, Vercel o GitHub Pages.
```

## 📚 Documentación
*   [Guía de Usuario](docs/user_guide.md)
*   [Características Detalladas](docs/features.md)
*   [Manual Funcional](docs/manual_funcional.md)

## 🎨 Créditos
Desarrollado con pasión utilizando la pila tecnológica moderna de React.
Diseño visual inspirado en interfaces Cyberpunk/Sci-Fi.
