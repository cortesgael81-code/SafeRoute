(function(){
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('menu');
  if(toggle && menu){
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Guardar datos del formulario directamente en Google Sheets mediante un Web App de Apps Script
  // 1) Crea una hoja de cálculo en Google Drive.
  // 2) Abre Extensiones → Apps Script y pega el script que te doy en el README abajo.
  // 3) Publica → Implementar como aplicación web → “Cualquiera, incluso anónimo”. Copia la URL.
  // 4) Pega la URL en GOOGLE_SHEETS_WEB_APP_URL.
  const GOOGLE_SHEETS_WEB_APP_URL = 'https://eduuag-my.sharepoint.com/:x:/g/personal/gael_cortes_edu_uag_mx/IQC0EQcd8EW0TIjHZ4tRtTUoAYOPj-YTgFiD3so87A9fjTk?e=TePo4g&nav=MTVfezIzNTZFNEZCLTE2OTktNDRDMS04QTE5LTc1QzJDNDNBRkYyQn0';

  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const payload = {};
    formData.forEach((value, key) => {
      payload[key] = value;
    });

    try {
      const response = await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }

      alert('¡Gracias! Tus datos se guardaron en Google Sheets.');
      form.reset();
    } catch (error) {
      console.error(error);
      alert('Error al guardar los datos en Google Sheets. Revisa la consola para más detalles.');
    }
  });
})();
