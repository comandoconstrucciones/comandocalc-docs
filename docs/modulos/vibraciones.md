---
id: vibraciones
title: Vibraciones de Piso
sidebar_position: 10
---

# Vibraciones de Piso

Evaluación de **vibraciones inducidas por caminata** en entrepisos de acero según **AISC Design Guide 11**. Verifica que la frecuencia natural del piso sea adecuada para el uso previsto.

## Principio de diseño

Un piso de acero es aceptable cuando:

```
fn > fl × 1.3   (criterio conservador)
```

Donde:
- **fn** = Frecuencia natural del sistema viga-losa (Hz)
- **fl** = Frecuencia límite según ocupación (Hz)

## Parámetros de entrada

| Parámetro | Unidad | Descripción | Por defecto |
|-----------|--------|-------------|-------------|
| `profile_id` | — | Perfil de la viga (ej: `W16X40`) | — |
| `span` | m | Luz libre de la viga | 8.0 |
| `spacing` | m | Separación entre vigas | 2.5 |
| `dead_load` | kg/m² | Carga muerta total | 400 |
| `live_load` | kg/m² | Carga viva (para masa efectiva) | 200 |
| `occupancy` | — | Tipo de ocupación | `oficina` |
| `damping` | — | Relación de amortiguamiento | 0.03 |

## Ocupaciones y límites

| Ocupación | fl (Hz) | Descripción |
|-----------|---------|-------------|
| `oficina` | 4.0 | Oficinas, espacios de trabajo |
| `residencial` | 5.0 | Viviendas, apartamentos |
| `comercial` | 3.0 | Centros comerciales, tiendas |
| `gimnasio` | 8.0 | Gimnasios, centros deportivos |
| `hospital` | 6.0 | Hospitales, laboratorios sensibles |
| `restaurante` | 4.5 | Restaurantes, comedores |

## Endpoint API

```
POST /api/calc/vibration
```

### Ejemplo cURL

```bash
curl -X POST https://api.comandoconstrucciones.com/api/calc/vibration \
  -H "Content-Type: application/json" \
  -d '{
    "profile_id": "W16X40",
    "span": 8.0,
    "spacing": 2.5,
    "dead_load": 400,
    "live_load": 200,
    "occupancy": "oficina",
    "damping": 0.03
  }'
```

### Respuesta

```json
{
  "profile_id": "W16X40",
  "profile_designation": "W16X40",
  "weight_kg_m": 59.5,
  "results": {
    "fn_Hz": 5.82,
    "fl_Hz": 4.0,
    "ratio_fn_fl": 1.455,
    "effective_weight_kg": 4250,
    "peak_acceleration": 0.0042,
    "acceleration_limit": 0.005
  },
  "status": "OK",
  "governing": "fn/fl = 1.46 > 1.3 ✓"
}
```

## Selección óptima

```
POST /api/calc/vibration/optimal
```

Evalúa todos los perfiles tipo `w` y retorna el más liviano que cumple el criterio de vibraciones.

```bash
curl -X POST https://api.comandoconstrucciones.com/api/calc/vibration/optimal \
  -H "Content-Type: application/json" \
  -d '{
    "span": 8.0,
    "spacing": 2.5,
    "dead_load": 400,
    "live_load": 200,
    "occupancy": "oficina",
    "damping": 0.03,
    "profile_type": "w"
  }'
```

## Evaluar todos los perfiles

```
POST /api/calc/vibration/all
```

Retorna una lista de todos los perfiles evaluados, ordenados por peso.

## Factores que mejoran vibraciones

1. **Mayor inercia (Ix)**: Perfiles más altos
2. **Mayor masa**: Losa de concreto más gruesa
3. **Menor luz**: Reducir distancia entre apoyos
4. **Mayor amortiguamiento**: Pisos alfombrados, cielos rasos
