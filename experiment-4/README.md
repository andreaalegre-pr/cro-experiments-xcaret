## Experimento 4:
Home: Ficha de beneficios en el cotizador

## Hipótesis
Si incorporamos una ficha de beneficios en el cotizador del home, mostrando las principales diferencias entre las opciones, entonces los usuarios podrán comparar y elegir con mayor claridad sin necesidad de abandonar el flujo para buscar información adicional, aumentando la interacción con el CTA de cotización y favoreciendo el avance dentro del funnel..

## Objetivo
Incrementar la interacción con el CTA "Cotiza tu entrada" reduciendo la incertidumbre durante la selección de productos, mediante la incorporación de información clave de beneficios dentro del cotizador.

## Dispositivos
Mobile

## Ubicación
- Español:
  https://www.xcaret.com/es/

- Inglés:
  https://www.xcaret.com/en/

## Cambios
Mobile: Cambios a detalle

- Ficha de beneficios dinámica que se inserta dentro del cotizador y debajo del CTA "Cotiza tu entrada", justo antes del link "Más información".

      Contenido de ejemplo (por definir con cliente):
    
      Xcaret: 🎟️ Entrada al parque · 🌴 +50 actividades · 🎭 México Espectacular
    
      Xcaret Plus: 🎟️ Entrada al parque · 🍴 Buffet incluido · 🔒 Lockers incluidos · 🤿 Equipo de snorkel

- La información se actualiza dinámicamente según la opción seleccionada en el selector:

- Degradar "Más información" de botón a link de texto, pasa de botón con borde a link simple ("Más información →", sin borde, centrado, en azul de marca). Esto para reducir su peso visual y que no compita con el CTA principal "Cotiza tu entrada", ahora que la ficha ya resuelve gran parte de la necesidad de "saber más" sin salir de la página.

- La ficha utiliza estilos consistentes con el cotizador actual:

      Fondo gris claro: #f7f7f7
      Título azul marca: #214387
      Texto descriptivo gris: #5c5c5c
      Bordes redondeados para integrarse con las cards existentes

## Script
- JavaScript ES/EN (incluye los estilos CSS)
