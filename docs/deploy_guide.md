# Guía de Despliegue: NeoGenesis Prompt Architect

Esta guía detalla cómo publicar tu aplicación web en internet utilizando tu dominio **mistercuarter.es**.

## ⚠️ Antes de empezar: El proceso de "Build"

Tu código actual son archivos fuente (`.tsx`, `.ts`). Los navegadores no pueden leer esto directamente. Antes de subir tu web a cualquier sitio, debes generar la versión de producción.

1.  Asegúrate de tener **Node.js** instalado en tu ordenador.
2.  En la carpeta de tu proyecto, abre una terminal y ejecuta:
    ```bash
    npm install
    npm run build
    ```
3.  Esto creará una carpeta llamada **`dist`** (o `build`). **ESTA es la carpeta que contiene tu página web lista para subir** (tendrá un `index.html` y archivos `.js` y `.css`).

---

## 🛑 ADVERTENCIA DE SEGURIDAD (API KEYS)
Tu aplicación usa una API Key de Google Gemini.
*   **En aplicaciones Frontend (como esta):** La API Key será visible para cualquiera que sepa inspeccionar el código de la web ("Inspeccionar elemento").
*   **Recomendación:** Google permite restringir las API Keys. Ve a **Google AI Studio > Get API Key** y edita tu llave para restringirla solo a tu dominio: `mistercuarter.es` y `www.mistercuarter.es`. Así, si alguien te roba la llave, no podrá usarla desde otro sitio.

---

## Opción 1: Hostinger (Hostingly) - ⭐ Recomendada para ti

Dado que ya tienes el dominio y el correo allí, esta es la opción más lógica para centralizar todo.

**Pros:**
*   Todo en un solo lugar (Dominio, Correo, Web).
*   Soporte técnico incluido.
*   Panel de control (hPanel) fácil de usar.

**Contras:**
*   El despliegue es manual (tienes que subir archivos) a menos que configures pipelines avanzados.
*   Coste: Ya lo estás pagando, pero si se te acaba el plan, hay que renovar.

### Pasos:
1.  **Generar la web:** Ejecuta `npm run build` en tu ordenador.
2.  **Entrar al Panel:** Loguéate en Hostinger y ve al **Administrador de Archivos** de tu dominio `mistercuarter.es`.
3.  **Limpiar:** Entra en la carpeta `public_html`. Borra el archivo `default.php` si existe.
4.  **Subir:** Sube **todo el contenido** de tu carpeta `dist` (la que creaste en el paso 1) dentro de `public_html`.
    *   *Nota:* No subas la carpeta `dist` entera, sino *lo que hay dentro* (el index.html debe quedar directamente dentro de public_html).
5.  **Configurar Rutas (Importante para React):**
    *   Crea un archivo nuevo en `public_html` llamado `.htaccess`.
    *   Pega este código para que React funcione bien al recargar la página:
    ```apache
    <IfModule mod_rewrite.c>
      RewriteEngine On
      RewriteBase /
      RewriteRule ^index\.html$ - [L]
      RewriteCond %{REQUEST_FILENAME} !-f
      RewriteCond %{REQUEST_FILENAME} !-d
      RewriteRule . /index.html [L]
    </IfModule>
    ```
6.  **Listo:** Tu web ya debería verse en `mistercuarter.es`.

---

## Opción 2: GitHub Pages

Ideal si tienes el código alojado en GitHub. Es un hosting estático gratuito y muy popular para desarrolladores.

**Pros:**
*   **Gratis** de por vida (para repositorios públicos).
*   Se actualiza automáticamente cada vez que subes código a GitHub (si configuras una Acción).
*   HTTPS (candado verde) automático y gratis.

**Contras:**
*   El código fuente debe ser público (a menos que tengas GitHub Pro).
*   Configurar el dominio `mistercuarter.es` requiere tocar las DNS.

### Pasos:
1.  Sube tu código a un repositorio en GitHub.
2.  Ve a la pestaña **Settings > Pages** del repositorio.
3.  En "Build and deployment", selecciona "GitHub Actions" (Vite o Static HTML).
4.  **Configurar Dominio:**
    *   En "Custom domain", escribe `mistercuarter.es`.
    *   GitHub te dará unos números (IPs).
5.  **Configurar DNS en Hostinger:**
    *   Ve a Hostinger > Zona DNS de tu dominio.
    *   Borra los registros "A" actuales.
    *   Añade los registros "A" que te dio GitHub.
    *   Añade un registro "CNAME" con nombre `www` apuntando a `tu-usuario.github.io`.

---

## Opción 3: Google Cloud Run

Esta opción es "Serverless". Empaquetas tu app en un contenedor Docker y Google la ejecuta.

**Pros:**
*   Escalabilidad infinita (aguanta millones de visitas).
*   Entorno profesional. Permite ocultar la API Key si creas un servidor backend (proxy) en el mismo contenedor.

**Contras:**
*   **Muy complejo** para una web estática sencilla.
*   Requiere saber Docker.
*   **Coste:** Tiene una capa gratuita generosa, pero si pasas el tráfico, te cobran.
*   Overkill (matar moscas a cañonazos) para este proyecto actual.

### Pasos (Resumidos):
1.  Crear un archivo `Dockerfile` en tu proyecto.
2.  Instalar Google Cloud CLI.
3.  Ejecutar: `gcloud run deploy --source .`
4.  En Hostinger, tendrías que mapear el dominio al servicio de Cloud Run (requiere configuración DNS avanzada).

---

## Resumen de Costes y Recomendación

| Opción | Coste Extra | Dificultad | Recomendación |
| :--- | :--- | :--- | :--- |
| **Hostinger** | 0€ (Ya incluido) | Baja | **⭐⭐⭐ (Haz esto)** |
| **GitHub** | 0€ | Media (DNS) | ⭐⭐ (Si quieres automatizar) |
| **Cloud Run** | Variable | Alta | ⭐ (Solo si añades Backend) |

### Mi consejo para @MrCuarter
Usa la **Opción 1 (Hostinger)**.
1.  Haz el `npm run build` en tu PC.
2.  Abre el File Manager de Hostinger.
3.  Arrastra los archivos generados.
4.  ¡A funcionar! Es lo más rápido y aprovechas el dominio que ya pagas.
