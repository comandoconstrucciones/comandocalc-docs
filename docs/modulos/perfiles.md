---
sidebar_position: 16
title: Propiedades de Secciones
---

# Propiedades de Secciones de Acero

El módulo de **Propiedades de Secciones** es una base de datos interactiva con 393 perfiles de acero estructural, incluyendo dimensiones, propiedades geométricas y mecánicas.

![Propiedades de Secciones](/img/screenshots/perfiles.png)

## Familias de perfiles

| Familia | Norma | Perfiles |
|---------|-------|---------|
| **IPE** | EN 10034 | 17 (IPE 80 – IPE 600) |
| **IPN** | DIN 1025 | 21 (IPN 80 – IPN 550) |
| **HEA** | EN 10034 | 18 (HEA 100 – HEA 600) |
| **HEB** | EN 10034 | 18 (HEB 100 – HEB 600) |
| **HEM** | EN 10034 | 19 (HEM 100 – HEM 600) |
| **W americano** | AISC / ASTM A992 | 134 (W6×9 – W36×300) |
| **Canal C americano** | AISC / ASTM A36 | 28 (C3×4.1 – C15×50) |
| **UPN** | EN 10279 | 12 (UPN 50 – UPN 400) |
| **Ángulo igual L** | AISC | 17 |
| **Ángulo desigual L** | AISC | 31 |
| **Tubular cuadrado** | ASTM A500 Gr.C | 20 (Colmena) |
| **Tubular rectangular** | ASTM A500 Gr.C | 15 (Colmena) |
| **Perlín C** | ASTM A653 | 43 |

**Total: 393 perfiles**

## Propiedades reportadas

### Dimensiones
- `h` — altura de la sección (mm)
- `b` — ancho del ala (mm)
- `tw` — espesor del alma (mm)
- `tf` — espesor del ala (mm)
- `t` — espesor de pared (tubulares y ángulos, mm)

### Eje fuerte (X)
- `Ix` — momento de inercia (cm⁴)
- `Sx` — módulo elástico de sección (cm³)
- `Zx` — módulo plástico de sección (cm³)
- `rx` — radio de giro (cm)

### Eje débil (Y)
- `Iy`, `Sy`, `Zy`, `ry`

### Torsión
- `J` — constante de torsión de St. Venant (cm⁴)
- `Cw` — constante de alabeo (cm⁶)

### Material
- `Fy` — tensión de fluencia (kg/cm²)
- `Fu` — tensión última (kg/cm²)
- `E` — módulo de elasticidad (kg/cm²)

## Funcionalidades

- **Búsqueda** por nombre o designación
- **Filtro** por familia (IPE, W, HEB, tubular, etc.)
- **Clic para copiar** cualquier valor a portapapeles
- **Copiar todo** — exporta el perfil como JSON
- **Ver página** — abre la página SEO individual del perfil
- **Deep-link** a calculadora de vigas o columnas con el perfil pre-cargado

## Páginas SEO individuales

Cada perfil tiene su propia URL con tabla completa, sección transversal SVG, texto descriptivo y FAQ:

```
/calc/perfiles/ipe-200
/calc/perfiles/heb-300
/calc/perfiles/w12x26
```

## API

```bash
# Todos los perfiles
GET /api/sections/profiles

# Por tipo
GET /api/sections/profiles?type=ipe

# Perfil específico
GET /api/sections/profile/IPE-200
```

Respuesta de ejemplo:
```json
{
  "id": "IPE-200",
  "type": "ipe",
  "designation": "IPE 200",
  "family": "IPE — Perfil en I europeo (EN 10034)",
  "height": 200,
  "width": 100,
  "flange_thickness": 8.5,
  "web_thickness": 5.6,
  "area": 28.5,
  "weight": 22.4,
  "Ix": 1940,
  "Sx": 194,
  "Zx": 221,
  "rx": 8.26,
  "Iy": 142,
  "Sy": 28.5,
  "Zy": 44.6,
  "ry": 2.24,
  "J": 6.98,
  "Cw": 13000,
  "Fy": 2530,
  "Fu": 4080,
  "E": 2040000
}
```
