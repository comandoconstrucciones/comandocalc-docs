---
id: cercha
title: Cercha Metálica
sidebar_position: 9
---

# Cercha Metálica

Análisis y diseño de cerchas planas (armaduras 2D) mediante **elementos finitos** (FEM). Verifica cada miembro a tensión o compresión según AISC 360-16.

## Parámetros de entrada

| Parámetro | Unidad | Descripción | Por defecto |
|-----------|--------|-------------|-------------|
| `span` | m | Luz total de la cercha | 12.0 |
| `height` | m | Altura de la cercha en el centro | 1.5 |
| `num_panels` | — | Número de paneles | 6 |
| `truss_type` | — | Tipo: `pratt`, `warren`, `howe` | `pratt` |
| `dead_load` | kg/m² | Carga muerta de cubierta | 15 |
| `live_load` | kg/m² | Sobrecarga de cubierta | 50 |
| `wind_load` | kg/m² | Carga de viento sobre cubierta | 30 |
| `tributary_width` | m | Ancho tributario de la cercha | 5.0 |
| `chord_profile_id` | — | Perfil de cordones (superior e inferior) | — |
| `web_profile_id` | — | Perfil de diagonales y montantes | — |

### Tipos de cercha

| Tipo | Descripción |
|------|-------------|
| `pratt` | Diagonales en tensión bajo carga gravitacional (más común) |
| `warren` | Diagonales alternas sin montantes |
| `howe` | Diagonales en compresión (menos eficiente) |

## Análisis FEM

El módulo arma automáticamente la matriz de rigidez de la estructura usando **elementos barra 2D** (2 grados de libertad por nodo: Ux, Uy).

```
[K] · {u} = {F}
```

Cada miembro recibe la fuerza axial:

```
F_miembro = EA/L · (u₂ - u₁) · cos(θ)
```

## Verificaciones por miembro

Para cada barra se verifica:

**Tensión** (AISC D2):
```
φPn = φ · Fy · Ag    (φ = 0.90)
```

**Compresión** (AISC E3):
```
φPn = φ · Fcr · Ag   (φ = 0.90, con reducción por esbeltez)
```

## Resultados

La respuesta incluye una tabla por cada miembro:

| Campo | Descripción |
|-------|-------------|
| `member_id` | Identificador del miembro (C1, D1, V1...) |
| `type` | `chord_top`, `chord_bottom`, `diagonal`, `vertical` |
| `force` | Fuerza axial (kg) — positivo = tensión, negativo = compresión |
| `phi_Pn` | Capacidad de diseño (kg) |
| `ratio` | Fuerza / φPn |
| `status` | `OK` o `FALLA` |

## Exportación DXF

El módulo incluye **exportación DXF** con la geometría de la cercha y etiquetas de cada miembro, lista para importar en AutoCAD o Revit.

## Endpoint API

```
POST /api/calc/truss
```

### Ejemplo

```bash
curl -X POST https://api.comandoconstrucciones.com/api/calc/truss \
  -H "Content-Type: application/json" \
  -d '{
    "span": 12.0,
    "height": 1.5,
    "num_panels": 6,
    "truss_type": "pratt",
    "dead_load": 15,
    "live_load": 50,
    "wind_load": 30,
    "tributary_width": 5.0,
    "chord_profile_id": "TR-100x100x4",
    "web_profile_id": "TR-80x80x3"
  }'
```
