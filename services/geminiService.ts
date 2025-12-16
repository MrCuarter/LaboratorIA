
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { CharacterParams, GeneratedData, ExpressionEntry } from "../types";

const modelId = "gemini-2.5-flash";

// Helper para obtener la instancia de IA de forma segura
const getAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey || typeof apiKey !== 'string' || apiKey.trim() === "") {
    console.error("DEBUG: La API Key es inválida.");
    throw new Error("API Key no configurada.");
  }
  return new GoogleGenAI({ apiKey });
};

export const generatePrompt = async (params: CharacterParams): Promise<GeneratedData> => {
  let ai;
  try {
    ai = getAI();
  } catch (e: any) {
    console.error("Failed to initialize AI:", e);
    throw new Error(e.message);
  }
  
  const isVideo = params.mode === 'video';
  const isMJ = params.promptFormat === 'midjourney';

  const systemInstruction = `
    Eres un Arquitecto de Prompts IA experto (Prompt Engineer).
    Tu tarea es generar un prompt optimizado EN INGLÉS basado en los parámetros del usuario.
    
    MODO: ${params.mode.toUpperCase()}
    FORMATO: ${params.promptFormat.toUpperCase()}

    === REGLAS CRÍTICAS DE FORMATO ===
    SI EL FORMATO ES "MIDJOURNEY":
    1. Comienza con "/imagine prompt:".
    2. Usa sintaxis de parámetros: añade "${params.aspectRatio} --v 6.0" al final.

    SI EL FORMATO ES "GENERIC":
    1. PROHIBIDO usar comandos que empiecen por "--".
    2. Convierte el Aspect Ratio a lenguaje natural.
    3. Usa palabras clave de calidad: "masterpiece, best quality, ultra-detailed".

    === GESTIÓN DE COLORES (CRÍTICO) ===
    - Si se especifican colores HEX, descríbelos con nombres artísticos (ej: #FF0000 -> "Crimson Red").
    - Si hay 2 colores para un elemento (pelo, ojos, piel), descríbelo como "Two-toned [Color1] and [Color2]" o "Heterochromia".
  `;

  // Construcción de la descripción física compleja
  const physParts = [];
  
  const hairC = params.hairColors?.join(" & ");
  if (params.hairStyle) physParts.push(`${hairC || ''} ${params.hairStyle} hair`);
  
  const eyeC = params.eyeColors?.join(" & ");
  const eyeF = params.eyeFeature || "eyes";
  physParts.push(`${eyeC || ''} ${eyeF}`);
  
  const skinC = params.skinColor?.join(" & ");
  if (skinC) physParts.push(`${skinC} colored skin`);
  else if (params.skinTone) physParts.push(`${params.skinTone}`);

  if (params.faceMarkings && params.faceMarkings !== 'None') physParts.push(`${params.faceMarkings}`);
  if (params.denture) physParts.push(`with ${params.denture}`);
  
  // Construcción del Outfit
  const outfitParts = [];
  const outfitC = params.outfitColors?.join(" & ");
  const colorContext = outfitC ? `(Color Palette: ${outfitC})` : "";

  if (params.headwear && params.headwear !== 'None') outfitParts.push(`wearing ${params.headwear}`);
  
  if (params.fullBody) outfitParts.push(`dressed in ${params.fullBody}`);
  else {
      if (params.upperBody) outfitParts.push(`wearing ${params.upperBody}`);
      if (params.lowerBody) outfitParts.push(`${params.lowerBody}`);
  }
  
  if (params.classExtras) outfitParts.push(`equipped with ${params.classExtras}`);
  if (params.footwear) outfitParts.push(`${params.footwear}`);
  if (params.heldItem && params.heldItem !== 'Nothing') outfitParts.push(`holding ${params.heldItem}`);

  let roleDesc = params.role;
  if (params.secondaryRole) roleDesc += ` / ${params.secondaryRole}`;
  
  const userPrompt = `
    Genera un prompt con estos datos:
    - Sujeto: ${params.race} ${roleDesc} (${params.classCategory})
    - Género: ${params.gender}, Edad: ${params.age}, Cuerpo: ${params.bodyType}
    - RASGOS DETALLADOS: ${physParts.join(", ")}
    - EQUIPAMIENTO: ${outfitParts.join(", ")} ${colorContext}
    - Emoción: ${params.emotion}
    - Acción/Pose: ${isVideo ? params.action : params.pose}
    - Estilo: ${params.style}
    - Entorno: ${params.setting} (${params.atmosphere}, ${params.lighting})
    - Fondo: ${params.background}
    - Colores Ambiente: ${params.colors.join(", ")}
    - Detalles extra: ${params.details}
    - Formato: ${params.aspectRatio}
    
    Output JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            prompt: { type: Type.STRING },
            negativePrompt: { type: Type.STRING },
          },
          required: ["prompt", "negativePrompt"],
        },
      },
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No response text from Gemini");
    return JSON.parse(jsonText) as GeneratedData;

  } catch (error) {
    console.error("Error generating prompt:", error);
    throw error;
  }
};

/**
 * PROTOCOLO PSYCHE 6.0: 7 Hojas Maestras con SAFETY MARGINS.
 */
export const generateExpressionSheet = async (params: CharacterParams): Promise<ExpressionEntry[]> => {
  let ai;
  try {
    ai = getAI();
  } catch (e: any) {
    console.error("Failed to initialize AI:", e);
    throw new Error(e.message);
  }

  const isMJ = params.promptFormat === 'midjourney';
  
  let roleDesc = params.role;
  if (params.secondaryRole) roleDesc += ` / ${params.secondaryRole}`;

  const hairC = params.hairColors?.join(" and ");
  const outfitC = params.outfitColors?.join(" and ");

  const systemInstruction = `
    Eres un Director de Arte de Concept Art (Protocolo PSYCHE v6.0).
    Tu objetivo es crear un "Character Design Kit" de 7 Prompts EN INGLÉS.
    
    ESTRATEGIA VISUAL:
    1. ESTILO: ${params.style}.
    2. SUJETO: ${params.race} ${roleDesc}, ${params.gender}.
    3. DETALLES: ${hairC} ${params.hairStyle}, ${params.eyeFeature}.
    4. ROPA: ${params.fullBody || params.upperBody}, Colors: ${outfitC}.
    5. CLASS ITEM: ${params.classExtras}.
    
    REGULACIÓN DE ESPACIO (SAFETY MARGIN):
    Es CRÍTICO que las figuras NO SE TOQUEN NI SE SOLAPEN en los sheets.
    - Usa keywords: "distinct separation", "wide spacing", "isolated figures", "grid layout".
    - Negative Prompt Implícito: "overlapping, touching, merged bodies".

    LOS 7 PROMPTS MAESTROS:
    1. "ARCHITECTURE VIEW": Triptych (Front, Side, Back). Wide spacing. A-Pose.
    2. "CINEMATIC NARRATIVE": Bust shot. Cinematic lighting.
    3. "ACTION POSES A": 3 Dynamic Poses (Fighting/Confident). Distinct separation.
    4. "ACTION POSES B": 3 Interaction/Movement Poses. Distinct separation.
    5. "EXPRESSIONS GRID": 2x3 grid of facial expressions.
    6. "RPG TOKEN": Head inside decorative border. Square format.
    7. "VICTORY POSE": Full body dynamic victory pose. No background scenery.
  `;

  const userPrompt = `Genera el Kit (7 Prompts) para ${roleDesc}. Include physical traits: ${hairC} ${params.hairStyle}, ${params.eyeFeature}.`;

  const responseSchema: Schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        label: { type: Type.STRING },
        prompt: { type: Type.STRING }
      },
      required: ["label", "prompt"]
    }
  };

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No response text");
    return JSON.parse(jsonText) as ExpressionEntry[];

  } catch (error) {
    console.error("Error generating sheets:", error);
    throw error;
  }
};

export const generateInventoryPrompt = async (params: CharacterParams): Promise<GeneratedData> => {
    let ai;
    try {
        ai = getAI();
    } catch (e: any) {
        throw new Error(e.message);
    }
    const isMJ = params.promptFormat === 'midjourney';
    const outfitC = params.outfitColors?.join(" and ");

    const systemInstruction = `
        Eres un Diseñador de Assets de Videojuegos.
        Genera una Hoja de Inventario (Sprite Sheet, Knolling style) para: ${params.race} ${params.role}.
        Estilo: ${params.style}.
        Items clave: ${params.heldItem}, ${params.headwear}, ${params.footwear}, ${params.classExtras}.
        Paleta de items: ${outfitC}.
        Fondo: Solid White. Objetos separados.
        Format: ${isMJ ? '/imagine prompt: ... --ar 3:2' : 'Detailed description without --ar'}.
        OUTPUT ENGLISH.
    `;
    
    const response = await ai.models.generateContent({
        model: modelId,
        contents: "Genera prompt inventario.",
        config: { systemInstruction, responseMimeType: "application/json", responseSchema: { type: Type.OBJECT, properties: { prompt: {type: Type.STRING}, negativePrompt: {type:Type.STRING} } } }
    });
    return JSON.parse(response.text!) as GeneratedData;
};
