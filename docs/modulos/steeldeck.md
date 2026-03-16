---
id: steeldeck
title: Steel Deck (Losa Mixta)
sidebar_position: 11
---

# Steel Deck (Losa Mixta)

Diseño de **losas compuestas** con lámina Steel Deck y concreto según **AISC 360-16 Capítulo I** y especificaciones del fabricante.

## Principio de funcionamiento

El Steel Deck actúa en dos etapas:
1. **Construcción**: La lámina soporta el peso del concreto fresco (sin apuntalamiento)
2. **Servicio**: El sistema compuesto (lámina + concreto) soporta cargas de uso

## Parámetros de entrada

| Parámetro | Unidad | Descripción | Por defecto |
|-----------|--------|-------------|-------------|
| `span` | m | Luz libre entre vigas | 2.5 |
| `dead_load` | kg/m² | Carga muerta adicional (piso, cielo raso) | 300 |
| `live_load` | kg/m² | Carga viva de diseño | 500 |
| `concrete_thickness` | cm | Espesor total de losa | 10 |
| `deck_type` | — | Tipo de lámina | `2x12` |
| `shored` | bool | ¿Apuntalado durante construcción? | `false` |

## Endpoint API

```
POST /api/calc/steeldeck
```

### Ejemplo cURL

```bash
curl -X POST https://api.comandoconstrucciones.com/api/calc/steeldeck \
  -H "Content-Type: application/json" \
  -d '{
    "span": 2.5,
    "dead_load": 300,
    "live_load": 500,
    "concrete_thickness": 10,
    "deck_type": "2x12",
    "shored": false
  }'
```

### Respuesta

```json
{
  "deck_type": "2x12",
  "deck_gauge": 20,
  "span_m": 2.5,
  "results": {
    "construction_phase": {
      "Mu_kgm": 85.4,
      "phi_Mn_kgm": 142.0,
      "ratio": 0.60,
      "status": "OK"
    },
    "composite_phase": {
      "Mu_kgm": 312.5,
      "phi_Mn_kgm": 485.0,
      "ratio": 0.64,
      "status": "OK"
    },
    "deflection": {
      "delta_mm": 6.2,
      "limit_mm": 8.3,
      "ratio": 0.75,
      "status": "OK"
    },
    "shear": {
      "Vu_kg": 420,
      "phi_Vn_kg": 680,
      "ratio": 0.62,
      "status": "OK"
    }
  },
  "status": "OK",
  "governing": "Deflexión"
}
```

## Selección óptima

```
POST /api/calc/steeldeck/optimal
```

Evalúa todos los tipos de lámina y calibres disponibles, retorna la opción más económica que cumple.

```bash
curl -X POST https://api.comandoconstrucciones.com/api/calc/steeldeck/optimal \
  -H "Content-Type: application/json" \
  -d '{
    "span": 2.5,
    "dead_load": 300,
    "live_load": 500,
    "concrete_thickness": 10,
    "shored": false
  }'
```

## Evaluar todas las láminas

```
POST /api/calc/steeldeck/all
```

Retorna comparativa de todas las láminas evaluadas.

## Tipos de lámina disponibles

| Tipo | Altura (mm) | Ancho de cresta | Luces típicas |
|------|-------------|-----------------|---------------|
| `1.5x6` | 38 | 152 mm | 1.2 - 2.0 m |
| `2x12` | 51 | 305 mm | 1.8 - 2.8 m |
| `3x12` | 76 | 305 mm | 2.5 - 3.5 m |

## Calibres disponibles

| Calibre | Espesor (mm) | Uso |
|---------|--------------|-----|
| 22 | 0.76 | Luces cortas, cargas ligeras |
| 20 | 0.91 | Uso general |
| 18 | 1.22 | Luces largas, cargas pesadas |
| 16 | 1.52 | Cargas especiales |
