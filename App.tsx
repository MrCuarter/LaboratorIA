import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { FuturisticSelect } from './components/FuturisticSelect';
import { FuturisticInput } from './components/FuturisticInput';
import { FuturisticToggle } from './components/FuturisticToggle';
import { ColorPicker } from './components/ColorPicker';
import { TerminalOutput } from './components/TerminalOutput';
import { generatePrompt } from './services/geminiService';
import { CharacterParams, GeneratedData, LoadingState, Language } from './types';
import * as C from './constants';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ES');
  
  const [params, setParams] = useState<CharacterParams>({
    mode: 'image',
    promptFormat: 'midjourney',
    race: '',
    gender: '',
    age: '',
    role: '',
    subRole: '',
    bodyType: '',
    style: '',
    setting: '',
    background: '',
    emotion: '',
    pose: '',
    action: '',
    framing: '',
    lighting: '',
    atmosphere: '',
    colors: [],
    details: '',
    aspectRatio: '--ar 16:9',
  });

  const [generatedData, setGeneratedData] = useState<GeneratedData | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Translation Dictionary
  const T = {
    ES: {
      subtitle: "[ Sistema de Arquitectura de Personajes v3.0 ]",
      race: "Especie / Raza",
      gender: "Género",
      age: "Edad",
      bodyType: "Constitución",
      role: "Clase Principal",
      subRole: "Subclase (Opcional)",
      
      emotion: "Emoción",
      pose: "Pose (Estática)",
      action: "Acción (Dinámica)",
      
      style: "Estilo Visual",
      framing: "Encuadre / Cámara",
      lighting: "Iluminación",
      atmosphere: "Atmósfera",
      
      setting: "Entorno (Lugar)",
      background: "Tipo de Fondo",
      colors: "Paleta de Color",
      
      format: "Aspect Ratio",
      details: "Detalles Específicos",
      placeholderDetails: "Ojos brillantes, armadura dorada, pelo flotando...",
      
      btnGenerate: "GENERAR PROMPT",
      btnLoading: "PROCESANDO...",
      
      errorRequired: "Selecciona al menos Raza y Clase o añade detalles.",
      errorApi: "Error crítico en núcleo IA.",
      
      modeLabel: "Modo Generación",
      modeImg: "Imagen",
      modeVid: "Video",
      
      formatLabel: "Formato Prompt",
      fmtMJ: "Midjourney",
      fmtGen: "Genérico",
      
      secIdentity: "1. IDENTIDAD",
      secExpression: "2. EXPRESIÓN",
      secVisuals: "3. ESTILO Y AMBIENTE",

      designedBy: "Diseñada por",
    },
    EN: {
      subtitle: "[ Character Architecture System v3.0 ]",
      race: "Species / Race",
      gender: "Gender",
      age: "Age",
      bodyType: "Body Type",
      role: "Main Class",
      subRole: "Subclass (Optional)",
      
      emotion: "Emotion",
      pose: "Pose (Static)",
      action: "Action (Dynamic)",
      
      style: "Visual Style",
      framing: "Framing / Camera",
      lighting: "Lighting",
      atmosphere: "Atmosphere",
      
      setting: "Environment (Place)",
      background: "Background Type",
      colors: "Color Palette",
      
      format: "Aspect Ratio",
      details: "Specific Details",
      placeholderDetails: "Glowing eyes, golden armor, floating hair...",
      
      btnGenerate: "GENERATE PROMPT",
      btnLoading: "PROCESSING...",
      
      errorRequired: "Select at least Race and Class or add details.",
      errorApi: "Critical AI Core Error.",
      
      modeLabel: "Generation Mode",
      modeImg: "Image",
      modeVid: "Video",
      
      formatLabel: "Prompt Format",
      fmtMJ: "Midjourney",
      fmtGen: "Generic",
      
      secIdentity: "1. IDENTITY",
      secExpression: "2. EXPRESSION",
      secVisuals: "3. STYLE & MOOD",

      designedBy: "Designed by",
    }
  };

  const t = T[lang];

  const handleGenerate = async () => {
    if (!params.race && !params.role && !params.details) {
      setErrorMsg(t.errorRequired);
      return;
    }
    setLoadingState(LoadingState.LOADING);
    setErrorMsg(null);
    setGeneratedData(null);

    try {
      const result = await generatePrompt(params);
      setGeneratedData(result);
      setLoadingState(LoadingState.SUCCESS);
    } catch (error) {
      console.error(error);
      setErrorMsg(t.errorApi);
      setLoadingState(LoadingState.ERROR);
    }
  };

  // Helper for options
  const mapOpts = (list: any[]) => list.map(item => ({
    label: lang === 'ES' ? item.es : item.en,
    value: item.value
  }));

  return (
    <div className="min-h-screen w-full bg-[#030712] relative overflow-x-hidden selection:bg-cyan-500 selection:text-black flex flex-col font-sans">
      
      {/* Background FX */}
      <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#050505] to-black -z-10"></div>
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[100px] -z-10"></div>
      <div className="fixed top-20 left-0 w-[300px] h-[300px] bg-purple-900/10 rounded-full blur-[80px] -z-10"></div>
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none -z-5"></div>

      {/* Language Toggle */}
      <div className="absolute top-4 right-4 md:top-8 md:right-8 z-50">
        <button 
          onClick={() => setLang(prev => prev === 'ES' ? 'EN' : 'ES')}
          className="relative group px-4 py-2 overflow-hidden bg-slate-900 border border-slate-700 text-cyan-500 text-xs font-mono font-bold tracking-widest uppercase hover:text-white transition-colors"
        >
           <span className="absolute inset-0 w-full h-full bg-cyan-500/20 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
           <span className="relative">[ {lang} ]</span>
        </button>
      </div>

      <div className="flex-grow max-w-6xl mx-auto px-4 py-8 md:py-16 relative z-10 w-full">
        
        {/* Header */}
        <header className="mb-10 text-center relative">
           <h1 className="text-4xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 neon-text tracking-tighter mb-2">
             NEO<span className="text-white">GENESIS</span>
           </h1>
           <p className="text-slate-400 tracking-widest text-xs md:text-sm font-mono uppercase">
             {t.subtitle}
           </p>
           <div className="w-48 h-1 bg-cyan-500 mx-auto mt-6 shadow-[0_0_15px_rgba(6,182,212,1)]"></div>
        </header>

        {/* Global Controls (Toggles) */}
        <div className="flex flex-col md:flex-row justify-center gap-6 mb-8 max-w-3xl mx-auto">
          <FuturisticToggle 
            leftLabel={t.modeImg} rightLabel={t.modeVid}
            value={params.mode} leftValue="image" rightValue="video"
            onChange={(v) => setParams(prev => ({...prev, mode: v}))}
          />
          <FuturisticToggle 
             leftLabel={t.fmtMJ} rightLabel={t.fmtGen}
             value={params.promptFormat} leftValue="midjourney" rightValue="generic"
             onChange={(v) => setParams(prev => ({...prev, promptFormat: v}))}
          />
        </div>

        {/* Main Form Interface */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 p-6 md:p-8 rounded-lg relative shadow-2xl shadow-cyan-900/10">
           {/* Decorative Corners */}
           <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500 rounded-tl-lg"></div>
           <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500 rounded-tr-lg"></div>
           <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500 rounded-bl-lg"></div>
           <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500 rounded-br-lg"></div>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* SECTION 1: IDENTITY */}
              <div className="space-y-5">
                <div className="text-cyan-500 font-mono text-sm border-b border-slate-700 pb-2 mb-4">{t.secIdentity}</div>
                
                <div className="grid grid-cols-2 gap-3">
                  <FuturisticSelect label={t.race} value={params.race} onChange={(v) => setParams(prev => ({...prev, race: v}))} options={mapOpts(C.RACES)} />
                  <FuturisticSelect label={t.gender} value={params.gender} onChange={(v) => setParams(prev => ({...prev, gender: v}))} options={mapOpts(C.GENDERS)} />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                   <FuturisticSelect label={t.age} value={params.age} onChange={(v) => setParams(prev => ({...prev, age: v}))} options={mapOpts(C.AGES)} />
                   <FuturisticSelect label={t.bodyType} value={params.bodyType} onChange={(v) => setParams(prev => ({...prev, bodyType: v}))} options={mapOpts(C.BODY_TYPES)} />
                </div>

                <FuturisticSelect label={t.role} value={params.role} onChange={(v) => setParams(prev => ({...prev, role: v}))} options={mapOpts(C.ROLES)} />
                <FuturisticSelect label={t.subRole} value={params.subRole} onChange={(v) => setParams(prev => ({...prev, subRole: v}))} options={mapOpts(C.ROLES)} />
              </div>

              {/* SECTION 2: VISUALS & EXPRESSION */}
              <div className="space-y-5">
                <div className="text-cyan-500 font-mono text-sm border-b border-slate-700 pb-2 mb-4">{t.secExpression}</div>

                <FuturisticSelect label={t.emotion} value={params.emotion} onChange={(v) => setParams(prev => ({...prev, emotion: v}))} options={mapOpts(C.EMOTIONS)} />
                
                {params.mode === 'video' ? (
                  <FuturisticSelect label={t.action} value={params.action} onChange={(v) => setParams(prev => ({...prev, action: v}))} options={mapOpts(C.ACTIONS_VIDEO)} />
                ) : (
                  <FuturisticSelect label={t.pose} value={params.pose} onChange={(v) => setParams(prev => ({...prev, pose: v}))} options={mapOpts(C.POSES_IMAGE)} />
                )}

                <FuturisticSelect label={t.style} value={params.style} onChange={(v) => setParams(prev => ({...prev, style: v}))} options={mapOpts(C.STYLES)} />
                
                <ColorPicker 
                  label={t.colors}
                  selectedColors={params.colors}
                  onChange={(colors) => setParams(prev => ({...prev, colors}))}
                />
              </div>

              {/* SECTION 3: COMPOSITION & TECH */}
              <div className="space-y-5">
                 <div className="text-cyan-500 font-mono text-sm border-b border-slate-700 pb-2 mb-4">{t.secVisuals}</div>
                 
                 <div className="grid grid-cols-2 gap-3">
                    <FuturisticSelect label={t.framing} value={params.framing} onChange={(v) => setParams(prev => ({...prev, framing: v}))} options={mapOpts(C.FRAMINGS)} />
                    <FuturisticSelect label={t.lighting} value={params.lighting} onChange={(v) => setParams(prev => ({...prev, lighting: v}))} options={mapOpts(C.LIGHTINGS)} />
                 </div>
                 
                 <FuturisticSelect label={t.atmosphere} value={params.atmosphere} onChange={(v) => setParams(prev => ({...prev, atmosphere: v}))} options={mapOpts(C.ATMOSPHERES)} />

                 <div className="grid grid-cols-2 gap-3">
                    <FuturisticSelect label={t.setting} value={params.setting} onChange={(v) => setParams(prev => ({...prev, setting: v}))} options={mapOpts(C.SETTINGS)} />
                    <FuturisticSelect label={t.background} value={params.background} onChange={(v) => setParams(prev => ({...prev, background: v}))} options={mapOpts(C.BACKGROUNDS)} />
                 </div>

                 <FuturisticSelect 
                      label={t.format} 
                      value={params.aspectRatio} 
                      onChange={(v) => setParams(prev => ({...prev, aspectRatio: v}))} 
                      options={C.ASPECT_RATIOS.map(ar => ({ label: ar.label, value: ar.value }))}
                 />
              </div>
           </div>
           
           {/* DETAILS (FULL WIDTH) */}
           <div className="mt-6 border-t border-slate-800 pt-6">
              <FuturisticInput
                label={t.details}
                value={params.details}
                onChange={(v) => setParams(prev => ({...prev, details: v}))}
                placeholder={t.placeholderDetails}
                multiline={true}
              />
           </div>

           {/* GENERATE BUTTON */}
           <div className="mt-10 flex justify-center">
             <button
              onClick={handleGenerate}
              disabled={loadingState === LoadingState.LOADING}
              className={`
                relative px-16 py-5 bg-transparent overflow-hidden group
                text-cyan-400 font-bold uppercase tracking-[0.2em] text-sm transition-all
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
             >
               <span className="absolute inset-0 w-full h-full border border-cyan-500/50 group-hover:border-cyan-400 transition-colors"></span>
               <span className="absolute inset-0 w-full h-full bg-cyan-500/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
               <span className="relative z-10 flex items-center gap-3">
                 {loadingState === LoadingState.LOADING ? (
                    <>
                      <div className="w-3 h-3 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                      {t.btnLoading}
                    </>
                 ) : (
                    <>
                      {t.btnGenerate}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </>
                 )}
               </span>
             </button>
           </div>

           {/* Error Message */}
           {errorMsg && (
             <div className="mt-6 p-4 bg-red-950/40 border border-red-500/50 text-red-400 text-sm text-center font-mono">
               ⚠ SYSTEM ERROR: {errorMsg}
             </div>
           )}
        </div>

        {/* Output Section */}
        <TerminalOutput data={generatedData} loading={loadingState === LoadingState.LOADING} />

      </div>

      {/* Footer */}
      <footer className="w-full border-t border-slate-900 bg-slate-950/50 backdrop-blur-sm relative z-20 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
           
           <div className="flex flex-col items-center md:items-start space-y-1">
              <p className="text-slate-600 text-[10px] uppercase tracking-widest font-mono">
                {t.designedBy}
              </p>
              <h3 className="text-lg font-bold text-slate-300 font-mono tracking-tight hover:text-cyan-400 transition-colors cursor-default">
                Norberto Cuartero
              </h3>
              <a href="https://mistercuarter.es" target="_blank" className="text-cyan-600 text-xs hover:text-cyan-400 transition-colors font-mono">
                mistercuarter.es
              </a>
           </div>

           <div className="flex items-center gap-4">
              <SocialIcon href="https://instagram.com/MrCuarter" icon="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              <SocialIcon href="https://twitter.com/MrCuarter" icon="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              <SocialIcon href="mailto:hola@mistercuarter.es" icon="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
           </div>
        </div>
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-900 to-transparent"></div>
      </footer>
    </div>
  );
};

const SocialIcon: React.FC<{href: string, icon: string}> = ({href, icon}) => (
  <a href={href} target="_blank" className="w-10 h-10 flex items-center justify-center border border-slate-800 bg-slate-900 rounded-sm text-slate-500 hover:text-cyan-400 hover:border-cyan-500 hover:shadow-[0_0_10px_rgba(6,182,212,0.3)] transition-all group">
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d={icon}/>
    </svg>
  </a>
);

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);