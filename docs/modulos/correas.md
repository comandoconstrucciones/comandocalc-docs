---
id: correas
title: Correas de Cubierta
sidebar_position: 3
---

# Correas de Cubierta

Diseño de correas (secundarias) para cubiertas metálicas. Verifica **flexión biaxial, cortante y deflexión** bajo peso propio de cubierta + sobrecargas + viento.

## Parámetros de entrada

| Parámetro | Unidad | Descripción | Por defecto |
|-----------|--------|-------------|-------------|
| `profile_id` | — | Perfil a verificar (ej: `COL-C-200X80X20X3`) | — |
| `span` | m | Longitud de la correa | 6.0 |
| `spacing` | m | Separación entre correas | 1.5 |
| `roof_angle` | ° | Pendiente de cubierta en grados | 10 |
| `roof_type` | — | Tipo de cubierta (`metalica`, `fibrocemento`, `teja`) | `metalica` |
| `city_id` | — | ID de ciudad para carga de viento | — |
| `dead_load` | kg/m² | Carga muerta de cubierta | 15 |
| `live_load` | kg/m² | Sobrecarga de cubierta | 35 |

## Flexión biaxial

Las correas en cubiertas inclinadas reciben carga en **dos ejes simultáneamente**:

```
wx = w_total · sin(α)   (paralela a cubierta — eje débil)
wy = w_total · cos(α)   (perpendicular a cubierta — eje fuerte)
```

Verificación combinada (AISC H1-1b):
```
Mux/φMnx + Muy/φMny ≤ 1.0
```

## Endpoint API

```
POST /api/calc/purlin
```

### Ejemplo cURL

```bash
curl -X POST https://api.comandoconstrucciones.com/api/calc/purlin \
  -H "Content-Type: application/json" \
  -d '{
    "profile_id": "COL-C-200X80X20X3",
    "span": 6.0,
    "spacing": 1.5,
    "roof_angle": 15,
    "roof_type": "metalica",
    "city_id": 100,
    "dead_load": 15,
    "live_load": 35
  }'
```

### Respuesta

```json
{
  "profile_id": "COL-C-200X80X20X3",
  "profile_designation": "C 200x80x20x3.0",
  "weight_kg_m": 5.89,
  "loads": {
    "dead_total": 23.84,
    "live": 52.5,
    "wind_suction": -45.2,
    "wind_pressure": 28.6
  },
  "results": {
    "Mux_kgm": 215.4,
    "Muy_kgm": 38.2,
    "phi_Mnx_kgm": 312.8,
    "phi_Mny_kgm": 58.4,
    "combined_ratio": 0.85,
    "shear_ratio": 0.22,
    "deflection_mm": 18.5,
    "deflection_limit_mm": 25.0
  },
  "status": "OK",
  "governing": "Flexión combinada"
}
```

## Selección óptima automática

```
POST /api/calc/purlin/optimal
```

Evalúa todos los perfiles tipo `perlin_c` y retorna el más liviano que cumple.

```bash
curl -X POST https://api.comandoconstrucciones.com/api/calc/purlin/optimal \
  -H "Content-Type: application/json" \
  -d '{
    "span": 6.0,
    "spacing": 1.5,
    "roof_angle": 15,
    "roof_type": "metalica",
    "city_id": 100,
    "dead_load": 15,
    "live_load": 35
  }'
```

## Tipos de cubierta

| Tipo | Peso (kg/m²) | Descripción |
|------|--------------|-------------|
| `metalica` | 8-12 | Teja metálica galvanizada o termo-acústica |
| `fibrocemento` | 18-25 | Teja de fibrocemento (Eternit) |
| `teja` | 45-60 | Teja de barro o concreto |
