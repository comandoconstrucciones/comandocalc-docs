---
id: changelog
title: Changelog
sidebar_position: 99
---

# Changelog

## v0.1.0 — Marzo 2026

### Lanzamiento inicial — 13 módulos

**Módulos de cálculo:**
- ✅ Viga de entrepiso / mezanine (flexión + cortante + deflexión, AISC F/G)
- ✅ Columna a compresión (AISC E)
- ✅ Correas de cubierta (flexión biaxial)
- ✅ Correas de fachada (presión de viento)
- ✅ Cargas de viento (NSR-10 Título B, 916 ciudades)
- ✅ Vibraciones de piso (AISC DG-11)
- ✅ Steel deck + losa compuesta (AISC I)
- ✅ Placa base (AISC DG-1)
- ✅ Cercha metálica — FEM 2D (AISC D/E, tipos Pratt/Warren/Howe)
- ✅ Pórtico metálico 2D — FEM 2D (AISC H, combinaciones LRFD, deriva)
- ✅ Flexo-compresión con amplificadores B1 (AISC H1)
- ✅ Columna compuesta CFT/SRC (AISC I2)
- ✅ Presupuesto de estructura metálica

**API REST:**
- ✅ 18 endpoints documentados
- ✅ 160 perfiles de acero en base de datos (IPE, HEA, HEB, W, C, L, TR, RHS)
- ✅ 916 ciudades colombianas con velocidad de viento NSR-10
- ✅ Swagger UI y ReDoc automáticos

**Exportación:**
- ✅ PDF en todos los módulos (memoria de cálculo)
- ✅ DXF en cercha y pórtico (geometría + etiquetas)

**Infraestructura:**
- ✅ Frontend Next.js + TypeScript en Vercel
- ✅ API FastAPI + Python en Vercel (serverless)
- ✅ Supabase PostgreSQL para perfiles y ciudades
- ✅ 430 tests automáticos (pytest)
- ✅ 39 pruebas E2E con Playwright

---

## Roadmap v0.2 (Q2 2026)

- [ ] Módulo de conexiones (pernos ASTM A325/A490, soldaduras)
- [ ] Visualización 3D de estructuras (Three.js)
- [ ] Exportación Excel del presupuesto
- [ ] Historial de cálculos con autenticación (Supabase Auth)
- [ ] API Keys para integraciones

## Roadmap v0.3 (Q3 2026)

- [ ] Módulo NSR-22 (cuando sea publicada oficialmente)
- [ ] Análisis sísmico simplificado (NSR-10 Título A)
- [ ] Diseño de conexiones viga-columna (AISC DG-24)
