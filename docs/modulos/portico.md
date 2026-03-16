---
id: portico
title: Pórtico Metálico 2D
sidebar_position: 8
---

# Pórtico Metálico 2D

Análisis y diseño de **pórticos metálicos bidimensionales** mediante análisis FEM (elementos finitos). Verifica capacidad de columnas y vigas bajo combinaciones de carga LRFD según **AISC 360-16** y **NSR-10**.

## Geometría del pórtico

```
        ┌────────────────┐
       /                  \
      /                    \
     /                      \
    │                        │
    │                        │
    │                        │
    ▼                        ▼
   ═══                      ═══
```

## Parámetros de entrada

| Parámetro | Unidad | Descripción | Por defecto |
|-----------|--------|-------------|-------------|
| `column_profile_id` | — | Perfil de columnas (ej: `W14X48`) | — |
| `rafter_profile_id` | — | Perfil de vigas/rafters (ej: `W18X35`) | — |
| `bay_width` | m | Ancho de crujía | 8.0 |
| `eave_height` | m | Altura de alero | 6.0 |
| `ridge_height` | m | Altura de cumbrera | 8.0 |
| `num_bays` | — | Número de crujías | 4 |
| `dead_load` | kg/m² | Carga muerta en cubierta | 25 |
| `live_load` | kg/m² | Sobrecarga de cubierta | 35 |
| `wind_load` | kN/m² | Presión de viento (o usar city_id) | — |
| `city_id` | — | ID de ciudad (alternativa a wind_load) | — |

## Endpoint API

```
POST /api/calc/frame
```

### Ejemplo cURL

```bash
curl -X POST https://api.comandoconstrucciones.com/api/calc/frame \
  -H "Content-Type: application/json" \
  -d '{
    "column_profile_id": "W14X48",
    "rafter_profile_id": "W18X35",
    "bay_width": 8.0,
    "eave_height": 6.0,
    "ridge_height": 8.0,
    "num_bays": 4,
    "dead_load": 25,
    "live_load": 35,
    "city_id": 100
  }'
```

### Respuesta

```json
{
  "geometry": {
    "bay_width": 8.0,
    "eave_height": 6.0,
    "ridge_height": 8.0,
    "num_bays": 4,
    "roof_slope_deg": 14.04
  },
  "profiles": {
    "column": "W14X48",
    "rafter": "W18X35"
  },
  "loads": {
    "dead_kgm2": 25,
    "live_kgm2": 35,
    "wind_kNm2": 0.82
  },
  "results": {
    "columns": {
      "max_axial_kN": 142.5,
      "max_moment_kNm": 85.2,
      "interaction_ratio": 0.78,
      "status": "OK"
    },
    "rafters": {
      "max_moment_kNm": 165.4,
      "max_shear_kN": 42.8,
      "moment_ratio": 0.72,
      "shear_ratio": 0.18,
      "status": "OK"
    },
    "drift": {
      "max_drift_ratio": 0.0028,
      "drift_limit": 0.0040,
      "status": "OK"
    }
  },
  "combinations": [
    "1.4D",
    "1.2D + 1.6L",
    "1.2D + 1.0L + 1.0W",
    "0.9D + 1.0W"
  ],
  "status": "OK",
  "governing": "Columna: interacción P-M"
}
```

## Combinaciones de carga

El módulo evalúa automáticamente las siguientes combinaciones LRFD:

| Combo | Expresión |
|-------|-----------|
| 1 | 1.4D |
| 2 | 1.2D + 1.6L |
| 3 | 1.2D + 1.0L + 1.0W |
| 4 | 0.9D + 1.0W |
| 5 | 1.2D + 1.0E + L |
| 6 | 0.9D + 1.0E |

## Límites de deriva

| Tipo de estructura | Límite |
|-------------------|--------|
| Edificios con elementos frágiles | H/400 |
| Edificios con elementos dúctiles | H/300 |
| Naves industriales | H/200 |

## Visualización SVG

La API retorna un campo `svg` con el diagrama del pórtico incluyendo:
- Geometría del pórtico
- Perfiles asignados
- Diagrama de momentos (escala)
- Deformada amplificada
