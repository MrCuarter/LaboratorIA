# Guía de Replicación: Generador de Mapas y Lugares

Esta guía te permite crear una aplicación gemela a "NeoGenesis" pero enfocada en la creación de **Mapas, Entornos y Lugares** (Battlemaps, Ciudades, Regiones, etc.).

## 1. Estructura del Proyecto

La aplicación utiliza **React + Vite + TypeScript**. Si quieres crear el nuevo proyecto desde cero en tu ordenador:

```bash
npm create vite@latest map-architect -- --template react-ts
cd map-architect
npm install @google/genai react-dom tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## 2. Archivos a Copiar/Modificar

Para replicar la funcionalidad, necesitas mantener la estructura de archivos que ya tienes en `neogenesis`, pero cambiando el **contenido** lógico (Constantes y Prompt de IA).

### Estructura de carpetas recomendada:
- `src/components/` (Reutiliza FuturisticSelect, FuturisticInput, etc. Son agnósticos)
- `src/services/geminiService.ts` (Aquí está el cerebro IA)
- `src/constants.ts` (Aquí están las listas de opciones)
- `src/App.tsx` (La interfaz principal)

## 3. EL PROMPT MAESTRO (Copia y pega esto a la IA)

Para generar la nueva app, abre un chat nuevo con tu IA de confianza (o conmigo) y dale la siguiente instrucción. Esto convertirá automáticamente la lógica de Personajes en Lógica de Mapas.

---
**[INICIO DEL PROMPT]**

Actúa como un Senior Frontend Engineer. Tengo una aplicación en React + Vite + TypeScript que genera prompts para personajes. Quiero crear una **nueva aplicación** con la misma estética Cyberpunk/Futurista y la misma estructura de archivos, pero enfocada en **GENERAR MAPAS Y LUGARES** (Worldbuilding).

**Estructura de archivos requerida:**
Reutiliza los componentes UI existentes (FuturisticSelect, FuturisticInput, TerminalOutput, ColorPicker).

**Cambios Lógicos Requeridos:**

1.  **Actualiza `src/types.ts`**:
    *   En lugar de `race/gender/class`, usa parámetros de mapas:
        *   `biome`: (Desierto, Tundra, Cyberpunk City, Space Station, Fantasy Forest...)
        *   `locationType`: (Battlemap, Regional Map, City Map, Solar System, Interior Tavern...)
        *   `viewPerspective`: (Top-Down, Isometric, First Person, Drone View)
        *   `gridType`: (Square Grid, Hex Grid, No Grid)
        *   `mood`: (Ominous, Peaceful, War-torn, Mystical)
        *   `timeOfDay`: (Day, Night, Sunset, Eclipse)
        *   `weather`: (Clear, Rainy, Foggy, Ash Storm)
        *   `scale`: (Huge, Tiny/Room, Continent)
        *   `elements`: (Ruins, Rivers, Crystals, Neon Signs, Lava)

2.  **Actualiza `src/constants.ts`**:
    *   Crea listas constantes (`BIOMES`, `LOCATION_TYPES`, `PERSPECTIVES`, `GRIDS`, etc.) con valores en Inglés y Español, igual que en la app original.
    *   Asegúrate de incluir estilos artísticos relevantes para mapas (Dyson Logos style, Inkarnate style, Satellite Imagery, Blueprint, Neon Schematic).

3.  **Actualiza `src/services/geminiService.ts`**:
    *   Modifica el `systemInstruction` para que la IA actúe como un **Cartógrafo Experto y Diseñador de Niveles**.
    *   El prompt generado debe estar optimizado para IAs de imagen (Midjourney, DALL-E 3).
    *   Para Midjourney, enfatiza parámetros como `--tile` (si es textura) o `--ar` (aspect ratio).
    *   Si el usuario selecciona "Battlemap", el prompt debe forzar "Top-down view, 90 degree angle, flat, 2d game map".

4.  **Actualiza `src/App.tsx`**:
    *   Cambia los textos de la UI (Título: "GEO-ARCHITECT" o "ATLAS-CORE").
    *   Reorganiza los selectores para que tengan sentido (Sección 1: Geografía, Sección 2: Estilo, Sección 3: Detalles).

Por favor, genérame el código completo de los archivos modificados (`types.ts`, `constants.ts`, `geminiService.ts`, `App.tsx`) manteniendo la calidad y el diseño visual de la app original.

**[FIN DEL PROMPT]**
---

## 4. Consejos de Diseño para la App de Mapas

*   **Battlemaps (Mapas de batalla):** Son muy demandados para D&D. Asegúrate de que tu generador tenga una opción clara para "Vista Cenital Perfecta" (Top-down perfect 90 degrees), ya que si la IA mete perspectiva, las fichas de los jugadores no encajan bien.
*   **Grid (Cuadrícula):** A veces es mejor pedirle a la IA que **NO** dibuje la cuadrícula en la imagen, porque la IA suele dibujarla deforme. Es mejor generar el mapa limpio y poner la cuadrícula luego en software tipo Roll20 o FoundryVTT.
*   **Estilos:** Incluye estilos como "Pergamino antiguo" (Old Paper), "Cianotipo" (Blueprint) y "Radar Táctico" para darle variedad.