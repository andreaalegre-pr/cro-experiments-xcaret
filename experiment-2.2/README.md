## Experimento 2.2:
PDP: Parques y Tours - CTA Sticky

## Hipótesis
Si mantenemos visible el CTA de “Cotiza tu entrada” durante todo el recorrido de las PDPs, reduciremos la fricción generada por la pérdida de visibilidad del CTA durante el scroll, entonces facilitaremos el avance del usuario hacia la intención de compra, incrementando la tasa de add to cart y favoreciendo el avance hacia las siguientes etapas del funnel.

## Objetivo
Incrementar la tasa de usuarios que avanzan desde las PDPs hacia al add to cart mediante una mayor disponibilidad del CTA durante toda la navegación de la página.

## Dispositivos
Desktop & Mobile

## Ubicación
Español: https://www.xcaret.com/es/parques-y-tours/.*

Inglés: https://www.xcaret.com/en/parks-and-tours/.*

## Cambios
Desktop: Se crea un banner sticky con el CTA, que aparece al avanzar un porcentaje definido de scroll de la página.
El banner se debe ocultar automáticamente en cuanto el usuario hace scroll up, y vuelve a aparecer solo si continúa haciendo scroll down y ya se superó el %scroll definido.
El banner incluye un copy dinámico generado a partir del H1 de cada PDP (ejemplo: "Ready to experience Xel-Há?"), acompañando al botón de cotización dentro de la misma barra.

Mobile: Se crea un banner sticky con el CTA, que aparece al avanzar un porcentaje definido de scroll de la página.
A diferencia de desktop, en mobile el banner permanece visible tanto al hacer scroll up como hacia scroll down, dado que en pantallas pequeñas facilita al usuario cotizar desde cualquier punto de su navegación.
El banner ajusta su posición para ubicarse justo encima del menú de navegación inferior del sitio cuando el usuario hace scroll up, evitando que ambos elementos se superpongan.

Importante: El banner desaparece por completo en el momento en que se abre el modal de compra, tanto en desktop como en mobile.

## Script
- JavaScript EN/ES (incluye los estilos CSS)
