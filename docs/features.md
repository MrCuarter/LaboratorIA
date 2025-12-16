
# Características Técnicas (Features)

NeoGenesis v7.0 incluye las siguientes capacidades técnicas:

## Motor de Audio (Services/AudioEngine)
*   **Web Audio API:** Sintetizador en tiempo real sin archivos MP3 externos (carga instantánea).
*   **SFX:** Sonidos de tecleo, hover, clicks y éxito generados procedimentalmente con osciladores.

## Integración IA (Services/GeminiService)
*   **Modelo:** Google Gemini 2.5 Flash.
*   **Safety Margins:** Instrucciones específicas en el *System Prompt* para evitar que las figuras se solapen en las hojas de personaje ("Distinct separation", "Wide spacing").
*   **JSON Enforcement:** La IA siempre responde en JSON estructurado, garantizando que la aplicación nunca se rompa por un formato de texto incorrecto.

## Componentes UI
*   **ColorPicker Inteligente:** Permite selección múltiple de colores Hexadecimales con previsualización visual.
*   **FuturisticSelect:** Componente de selección personalizado con decoraciones CSS puras.
*   **TerminalOutput:** Visor de resultados con efecto de escaneo y botones de copiado rápido.

## Gestión de Estado
*   **Local Storage:** Persistencia de historial (últimos 20 items) en el navegador del usuario.
*   **React State:** Gestión reactiva de más de 50 parámetros simultáneos sin lag en la interfaz.
