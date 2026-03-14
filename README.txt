# SafeRoute GDL — sitio estático

Este paquete contiene un sitio estático listo para publicar (GitHub Pages, Netlify, Vercel o su propio hosting).

## Contenido
- `index.html`: página principal con secciones de resumen, problema, solución, funcionalidades, modelo y valor.
- `styles.css`: estilos responsivos, accesibles y con tema oscuro.
- `script.js`: JavaScript mínimo para el menú móvil.
- `assets/`: íconos SVG (logo, hero, favicon).

## Publicación rápida (GitHub Pages)
1. Cree un repositorio y suba la carpeta `saferoute-gdl-site/`.
2. En Settings → Pages, seleccione la rama principal y la carpeta raíz.
3. Guarde y espere a que se construya.

## Personalización
- Colores de marca: edite variables CSS en `:root`.
- Texto: modifique las secciones dentro de `index.html`.
- Imágenes: reemplace los SVG en `assets/` por su branding.

## Guardar el formulario en Google Sheets (sin descargar archivos)
1. Cree una hoja de cálculo nueva en Google Drive.
2. En la hoja, vaya a **Extensiones → Apps Script**.
3. Reemplace el contenido con este script (cambie `HOJA` si desea otra hoja):

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
    // Ajusta el orden de columnas según tu formulario
    const row = [
      new Date(),
      data.nombre || '',
      data.email || '',
      data.mensaje || ''
    ];
    sheet.appendRow(row);
    return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: err.message })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Publique → **Implementar como aplicación web**.
   - Ejecutar la aplicación como: "Yo".
   - Acceso a la app: "Cualquiera, incluso anónimo" (o el que prefiera).
   - Copie la URL de implementación.
5. En `script.js`, reemplace `GOOGLE_SHEETS_WEB_APP_URL` con esa URL.

> 📝 Con esto, al enviar el formulario, los datos se guardarán automáticamente en la hoja de cálculo y podrás verlos abriendo el archivo en Google Sheets.

## Notas
- Este sitio es informativo; agregue un backend para formularios o use servicios de terceros.
