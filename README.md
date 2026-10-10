# JAMA

Primera versión del frontend de JAMA: ofertas de cierre de pastelerías y panaderías en Ayacucho. React 19, TypeScript, Vite, Tailwind CSS 4 y Lucide React.

## Identidad y modelo de negocio

Se revisaron las 15 páginas de `jAMA/JAMA_Brand_Kit-1.pdf`. El Brand Kit y los dos archivos originales permanecen intactos.

- Eslogan principal: **Comida rica de hoy, más barata y cerca de ti.**
- Paleta oficial: lima `#D4DC31`, azul marino `#1E2B4D`, crema `#FAF8EF`, blanco `#FFFFFF` y gris pizarra `#5B6478`.
- Tipografía: Nunito, servida localmente; pesos 400, 700, 800 y 900.
- Logo: copia sin alteraciones del recurso oficial `upscalemedia-transformed (1) (1).webp`. Se conserva su proporción y color, sin rotaciones, filtros ni sombras; el marco recorta únicamente el espacio transparente exterior.
- Propuesta: producto del mismo día, descuentos transparentes y recojo en el local. Público inicial: familias, trabajadores y estudiantes de Ayacucho.
- El Brand Kit plantea reserva y pago anticipado para una etapa posterior. Comisión o créditos por pedido son hipótesis pendientes de validación; no se presentan como un modelo ya aprobado.

## Desarrollo

Requiere Node.js 24 y npm 11. No necesita credenciales ni servicios externos para funcionar.

```sh
npm ci
npm run dev
```

```sh
npm run build
npm test
```

`npm run preview` sirve la compilación de producción. Para desplegar, publicar `dist/` en un alojamiento de archivos estáticos.

## Alcance de la demo

- Diseño mobile-first, navegación inferior móvil, versión de escritorio, búsqueda y filtros por categoría.
- Detalles de productos en un diálogo nativo con navegación por teclado, Escape y devolución del foco.
- Catálogo de **tres ejemplos**, sin nombres de negocios reales, inventario real, reseñas ni sellos de verificación ficticios.
- Fotografías **ilustrativas generadas con IA**, convertidas a WebP. No representan productos ni locales reales.
- Formulario de aliados con validación nativa. Los datos permanecen en los campos de la página: **no se envían ni se guardan**. Su mensaje indica explícitamente esta limitación.
- Sin pagos, autenticación, reservas confirmadas, geolocalización ni backend.
- Fuente local, imágenes locales, estados de carga, error y resultados vacíos, y respeto a `prefers-reduced-motion`.

## Arquitectura y futura integración con Supabase

```text
src/
  components/    OfferCard, OfferDialog, PartnerForm
  data/          catálogo demostrativo
  services/      adaptador de ofertas
  types/         Offer, Category, OfferRepository
  App.tsx        composición de secciones y filtros
  styles.css     tokens oficiales y diseño responsive
```

`OfferRepository.list()` es la frontera de acceso a datos. Un adaptador de Supabase podrá reemplazar `src/services/offers.ts` sin acoplar las tarjetas al cliente de base de datos. La integración deberá definir tablas, fotos reales, fechas con zona horaria, precios verificados y políticas RLS antes de habilitar ofertas reales. El formulario necesita un servicio de alta de aliados con consentimiento y protección contra abuso. No se incluyeron claves de ejemplo ni dependencias de Supabase que todavía no se utilizan; nunca colocar una clave `service_role` en el frontend.

## Pruebas de navegador

```sh
npx playwright install --with-deps chromium webkit
npm run test:e2e
```

Hay proyectos para escritorio Chromium, Android (Pixel 7) y iPhone (WebKit, perfil iPhone 13). Son emulaciones; no sustituyen pruebas en dispositivos físicos. Los tests comprueban imágenes cargadas, ausencia de desbordamiento, catálogo, filtros, búsqueda, cierre del diálogo, foco, formulario inválido/válido y errores de JavaScript.

En este entorno, Chromium ya está instalado:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE=/usr/bin/chromium npm run test:e2e -- --project=desktop-chromium --project=android-chromium
```

Para guardar los navegadores descargados dentro del workspace, usar `PLAYWRIGHT_BROWSERS_PATH=/workspace/.cache/ms-playwright` tanto en la instalación como al ejecutar pruebas. La integración continua instala los navegadores y ejecuta build, pruebas de componentes y los tres proyectos E2E.

## Recursos

Los originales de la marca se conservan en `jAMA/`. `public/images/jama-logo.webp` es una copia del logotipo. Las otras tres imágenes en `public/images/` se generaron para esta demo; deben sustituirse por fotografías verificadas cuando se conecten ofertas reales. Nunito proviene de `@fontsource/nunito` y utiliza SIL Open Font License. Los iconos Lucide utilizan licencia ISC.
