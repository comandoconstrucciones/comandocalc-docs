---
id: changelog
title: Changelog
sidebar_position: 99
---

# Changelog

## v0.2.0 — Marzo 2026

### Módulo de Conexiones Estructurales (nuevo)

- ✅ **Conexión simple a cortante — Shear Tab** (AISC J3, J4)
  - 7 verificaciones independientes: cortante de pernos, aplastamiento placa/alma, fluencia/ruptura placa, block shear, soldadura
  - 12 tipos de pernos: A307/A325/A490 × 5 diámetros (1/2" a 1")
- ✅ **Soldadura en filete** (AISC J2.4)
  - Verificación de garganta + metal base
  - Aviso automático de tamaño mínimo según espesor (AISC Table J2.4)
- ✅ **Conexión a momento soldada** (AISC J2, J4, J10)
  - Alas soldadas (CJP/filete) + alma pernada
  - Verificación de fluencia local del ala de columna
  - Aviso de rigidizador cuando se requiere
- ✅ 3 electrodos: E60, E70, E80
- ✅ 5 nuevos endpoints API

### Visualizaciones nuevas

- ✅ **Diagramas M–V–δ en vigas** — SVG dinámico con parábola de momento, diagrama lineal de cortante y curva de deflexión
- ✅ **Diagrama de interacción P-M en columnas** — curva AISC H1 normalizada con punto de demanda coloreado
- ✅ **Vista en planta 2D de placa base** — placa achurada + sección del perfil + pernos dorados con cotas
- ✅ **Gráfico de presupuesto** — barras horizontales por categoría + tarjetas de subtotal/IVA/total/$/m²
- ✅ **Visualización 3D de conexiones** (React Three Fiber)
  - Shear tab: columna + placa + pernos + cordones
  - Filete: sección T con indicador de garganta
  - Momento: alas soldadas + alma pernada

### UI / UX

- ✅ Nueva paleta corporativa verde: `#386640` / `#6a9851` / `#a7c958`
- ✅ Navbar verde oscuro en calculadora y documentación
- ✅ Ícono ComandoCalc (fondo transparente) como favicon en ambos sitios
- ✅ Logo clickeable redirige al inicio
- ✅ Banner de documentación en la homepage de la calculadora
- ✅ Open Graph + metadatos para vista previa al compartir en redes sociales

---

## v0.1.0 — Marzo 2026

### Lanzamiento inicial — 14 módulos

**Módulos de cálculo:**
- ✅ Viga de entrepiso / mezanine (AISC F, G)
- ✅ Columna a compresión + flexo-compresión (AISC E, H1)
- ✅ Correas de cubierta (flexión biaxial)
- ✅ Correas de fachada (presión de viento)
- ✅ Cargas de viento NSR-10 (916 ciudades)
- ✅ Vibraciones de piso (AISC DG-11)
- ✅ Steel deck + losa compuesta (AISC I)
- ✅ Placa base (AISC DG-1)
- ✅ Cercha metálica FEM 2D (AISC D/E, tipos Pratt/Warren/Howe/Fink)
- ✅ Pórtico metálico 2D FEM 2D (AISC H, NSR-10 deriva)
- ✅ Flexo-compresión con amplificadores B1 (AISC H1)
- ✅ Columna compuesta CFT/SRC (AISC I2)
- ✅ Presupuesto de estructura metálica

**Visualizaciones 3D:**
- ✅ Cercha — miembros coloreados tensión/compresión (React Three Fiber)
- ✅ Pórtico — deformada exagerada ×200 + flechas de carga + indicador de deriva

**API REST:**
- ✅ 20 endpoints
- ✅ 160 perfiles de acero (IPE, HEA, HEB, W, C, L, TR, RHS)
- ✅ 916 ciudades colombianas con velocidad de viento NSR-10
- ✅ Rate limiting: 30 req/min por IP en cálculos
- ✅ Swagger UI y ReDoc en `/docs` y `/redoc`

**Exportación:**
- ✅ PDF en todos los módulos (memoria de cálculo)
- ✅ DXF en cercha y pórtico

---

## Roadmap v0.3 (Q2 2026)

- [ ] Historial de cálculos con autenticación (Supabase Auth)
- [ ] API Keys para integraciones de alto volumen
- [ ] Módulo de nave industrial completa (llave en mano)
- [ ] Conexiones con ángulos (clip angles) y doble ángulo
- [ ] Exportación Excel del presupuesto
- [ ] Análisis sísmico simplificado NSR-10 Título A

## Roadmap v0.4 (Q3 2026)

- [ ] Diseño de escaleras metálicas
- [ ] Módulo NSR-22 (cuando sea publicada)
- [ ] App móvil (PWA)
