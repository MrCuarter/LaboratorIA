
# Guía de Arquitectura: Cambio de Temática (Re-skinning)

NeoGenesis está construido sobre una arquitectura modular "Input -> IA -> Output". Esto significa que el núcleo de la aplicación es agnóstico al contenido. Puedes transformar este **Generador de Personajes** en un **Generador de Coches**, **Edificios**, **Zapatillas** o **Mapas** cambiando solo los datos, sin tocar la lógica visual.

Sigue estos pasos para realizar una conversión total (Total Conversion Mod).

---

## Paso 1: Definir el Modelo de Datos (`src/types.ts`)

Aquí defines "qué es" tu objeto.
*   **Actual:** `CharacterParams` tiene `race`, `gender`, `class`.
*   **Cambio (Ej. Vehículos):** Crea `VehicleParams` con `chassisType`, `engine`, `wheels`, `paintJob`, `era`.

```typescript
// Antes
export interface CharacterParams { race: string; gender: string; ... }

// Después (Ejemplo Vehículos)
export interface VehicleParams {
  type: 'Car' | 'Motorcycle' | 'Spaceship';
  brandStyle: string; // "Ferrari-like", "Cyberpunk", "Retro"
  color: string[];
  environment: string; // "Race track", "Showroom", "Mars"
  ...
}
```

---

## Paso 2: Actualizar las Constantes (`src/constants.ts`)

Este es el "menú" de opciones. Los componentes UI leen de aquí automáticamente.

1.  Borra las constantes de personajes (`RACES`, `ROLES`, etc.).
2.  Crea las nuevas listas para tu temática.

```typescript
// src/constants.ts

export const VEHICLE_TYPES = [
  { es: "Deportivo", en: "Sports Car", value: "Sports Car" },
  { es: "Tanque", en: "Tank", value: "Military Tank" },
  { es: "Hovercraft", en: "Hovercraft", value: "Anti-gravity Hovercraft" }
];

export const PAINT_JOBS = [
  { es: "Mate", en: "Matte Finish", value: "Matte finish paint" },
  { es: "Cromado", en: "Chrome", value: "Chrome plated" },
  { es: "Oxidado", en: "Rusted", value: "Rusted post-apocalyptic texture" }
];
```

---

## Paso 3: Re-entrenar al Cerebro (`src/services/geminiService.ts`)

Debes decirle a Gemini que ya no es un diseñador de personajes.

1.  **System Instruction:** Cambia el prompt del sistema.
    *   *De:* "Eres un experto en diseño de personajes..."
    *   *A:* "Eres un ingeniero automotriz y diseñador conceptual experto..."
2.  **User Prompt:** Actualiza la interpolación de variables.
    *   *De:* `Sujeto: ${params.race} ${params.role}`
    *   *A:* `Sujeto: ${params.type} estilo ${params.brandStyle}`

---

## Paso 4: Ajustar la Lógica de Prompt Local (`src/services/promptBuilder.ts`)

Esta función crea el prompt "en bruto" que se ve en el *Live Preview* antes de llamar a la IA.

```typescript
// src/services/promptBuilder.ts

export const buildLocalPrompt = (params: VehicleParams): string => {
  // Construye la frase gramaticalmente
  // Ej: "A [Color] [Type] with [PaintJob], driving in [Environment]..."
  const subject = `A ${params.color.join("/")} ${params.type}`;
  const details = `featuring ${params.paintJob}`;
  // ... unir partes ...
  return finalString;
}
```

---

## Paso 5: Conectar la Interfaz (`src/App.tsx` y `QuickDesignWizard.tsx`)

Finalmente, actualiza los componentes visuales para que usen tus nuevas constantes.

1.  **Estado Inicial:** Cambia el `useState` inicial en `App.tsx` para que coincida con tu nueva interfaz de Tipos.
2.  **Selectores:** Reemplaza los `<FuturisticSelect />`.
    *   *De:* `options={C.RACES}`
    *   *A:* `options={C.VEHICLE_TYPES}`
3.  **Wizard:** Si usas el modo rápido, actualiza los pasos (`stepsConfig`) en `QuickDesignWizard.tsx`.

---

## Resumen de Archivos a Tocar

| Archivo | Propósito | Complejidad del Cambio |
| :--- | :--- | :--- |
| `types.ts` | Definir la nueva entidad | Baja |
| `constants.ts` | Listas de opciones (contenido) | Baja (Solo copiar/pegar texto) |
| `geminiService.ts` | El "cerebro" IA | Media (Ingeniería de Prompts) |
| `promptBuilder.ts` | Constructor de strings | Media |
| `App.tsx` | La vista principal | Media (Reemplazar componentes) |
| `components/*` | UI (Botones, Inputs) | **Nula** (Son reutilizables) |

Siguiendo esta estructura, puedes crear clones infinitos de la herramienta para nichos específicos (Joyas, Arquitectura, UI Design, Cartas Magic, etc.) en menos de 1 hora.
