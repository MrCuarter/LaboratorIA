
import { CharacterParams } from "../types";

// Helper to ensure we don't add empty strings or double spaces
const joinParts = (parts: (string | undefined | null)[], separator: string = " ") => {
  return parts.filter(p => p && p.trim() !== "").join(separator).trim();
};

export const buildLocalPrompt = (params: CharacterParams): string => {
  const isMJ = params.promptFormat === 'midjourney';
  
  // --- 1. SUBJECT CONSTRUCTION ---
  // "A [Age] [Gender] [Race] [Role] [SubRole] [BodyType] [SkinTone] wearing [Details]..."
  const subjectAdjectives = joinParts([params.age, params.gender, params.race]);
  const roleStr = params.subRole ? `${params.role} (${params.subRole})` : params.role;
  
  let subjectSegment = `A ${subjectAdjectives} ${roleStr}`;
  if (params.skinTone) subjectSegment += `, ${params.skinTone}`;
  if (params.bodyType) subjectSegment += `, with a ${params.bodyType}`;
  if (params.details) subjectSegment += `, wearing ${params.details}`;

  // --- 2. ACTION & EMOTION ---
  // "looking [Emotion], [Pose/Action]..."
  let actionSegment = "";
  if (params.emotion) actionSegment += `looking ${params.emotion}`;
  
  const movement = params.mode === 'video' ? params.action : params.pose;
  if (movement) {
    actionSegment += actionSegment ? `, while ${movement}` : `while ${movement}`;
  }

  // --- 3. ENVIRONMENT & LIGHTING ---
  // "situated in [Setting], [Background], illuminated by [Lighting]..."
  let envSegment = "";
  if (params.setting) envSegment += `in a ${params.setting}`;
  if (params.background && !params.background.includes("Detailed")) envSegment += `, with ${params.background}`;
  if (params.lighting) envSegment += `. The scene is illuminated by ${params.lighting}`;
  if (params.atmosphere) envSegment += `, creating a ${params.atmosphere}`;

  // --- 4. STYLE & TECHNICAL ---
  // "Style: [Style]. [Framing]. [Colors]. [Quality]"
  let styleSegment = "";
  if (params.style) styleSegment += `Artstyle: ${params.style}`;
  if (params.framing) styleSegment += `, shot as ${params.framing}`;
  
  if (params.colors.length > 0) {
    styleSegment += `. Dominant colors: ${params.colors.join(", ")}`;
  }

  // --- ASSEMBLY ---
  
  let finalPrompt = "";

  if (isMJ) {
    // Midjourney prefers: /imagine prompt: Subject + Action + Env + Style + Params
    const corePrompt = joinParts([subjectSegment, actionSegment, envSegment, styleSegment], ". ");
    finalPrompt = `/imagine prompt: ${corePrompt} ${params.aspectRatio} --v 6.0`;
    // Cleanup double periods
    finalPrompt = finalPrompt.replace(/\.\./g, ".").replace(/\s\./g, ".");
  } else {
    // Generic (Stable Diffusion) prefers: Subject, Action, Env, Style, Keywords
    const qualityTags = "masterpiece, best quality, 8k, ultra-detailed, cinematic lighting, sharp focus";
    const corePrompt = joinParts([subjectSegment, actionSegment, envSegment, styleSegment], ", ");
    finalPrompt = `${corePrompt}, ${qualityTags}`;
  }

  return finalPrompt;
};

/**
 * Generates 6 consistent prompts for a character sheet (Identity Matrix).
 * Forces white background and studio lighting for consistency.
 */
export const generateCharacterSheet = (baseParams: CharacterParams): { label: string, prompt: string }[] => {
  // We create a "Core" params object that overrides environment for consistency
  const coreParams = {
    ...baseParams,
    background: "Isolated on Solid White background",
    setting: "", // Remove setting to avoid distractions
    atmosphere: "Clear atmosphere",
    lighting: "Studio lighting",
    mode: 'image' as const
  };

  const variations = [
    { 
      label: "FRONT VIEW (REFERENCE)",
      overrides: { 
        pose: "Full body Front View, A-Pose, symmetrical", 
        framing: "Full Body",
        emotion: "Neutral expression"
      } 
    },
    { 
      label: "SIDE PROFILE",
      overrides: { 
        pose: "Full body Side Profile View", 
        framing: "Full Body",
        emotion: "Neutral expression"
      } 
    },
    { 
      label: "BACK VIEW",
      overrides: { 
        pose: "Full body Back View", 
        framing: "Full Body",
        emotion: ""
      } 
    },
    { 
      label: "THREE-QUARTER PORTRAIT",
      overrides: { 
        pose: "Standing confidently, 3/4 angle", 
        framing: "Medium Shot",
        emotion: baseParams.emotion || "Confident"
      } 
    },
    { 
      label: "CLOSE-UP (FACE)",
      overrides: { 
        pose: "Looking straight at camera", 
        framing: "Extreme close-up on face",
        emotion: baseParams.emotion || "Intense gaze"
      } 
    },
    { 
      label: "ACTION POSE",
      overrides: { 
        pose: "Dynamic Action Pose, Fighting Stance", 
        framing: "Full Body",
        emotion: "Determined" // Override emotion for action
      } 
    }
  ];

  return variations.map(v => {
    const params = { ...coreParams, ...v.overrides };
    return {
      label: v.label,
      prompt: buildLocalPrompt(params)
    };
  });
};
