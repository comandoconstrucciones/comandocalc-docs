---
id: vibraciones
title: Vibraciones de Piso
sidebar_position: 6
---

# Vibraciones de Piso

Verificación de confort por vibración en entrepisos de acero siguiendo la **AISC Design Guide 11** (Floor Vibrations Due to Human Activity).

## Parámetros de entrada

| Parámetro | Unidad | Descripción | Por defecto |
|-----------|--------|-------------|-------------|
| `beam_span` | m | Luz de la viga secundaria | 9.0 |
| `girder_span` | m | Luz de la viga principal | 9.0 |
| `beam_spacing` | m | Separación entre vigas | 3.0 |
| `slab_thickness` | cm | Espesor de la losa | 12.0 |
| `beam_profile_id` | — | Perfil de viga secundaria | — |
| `girder_profile_id` | — | Perfil de viga principal | — |
| `occupancy` | — | Tipo de uso | `office` |
| `damping_ratio` | — | Razón de amortiguamiento | 0.03 |

### Tipos de ocupación (ap/g límite)

| Código | Descripción | ap/g límite |
|--------|-------------|-------------|
| `office` | Oficinas | 0.005 |
| `residential` | Residencial | 0.005 |
| `church` | Iglesias / salones | 0.005 |
| `shopping` | Centros comerciales | 0.015 |
| `footbridge` | Pasarelas | 0.015 |
| `dance` | Pistas de baile, aeróbicos | 0.050 |

## Metodología (AISC DG-11)

La aceleración pico del sistema se calcula como:

```
ap/g = (Po / βW) · e^(-0.35·fn·t)
```

Donde:
- **Po** — fuerza de excitación (0.29 kN para actividad de caminar)
- **β** — razón de amortiguamiento total
- **W** — peso efectivo del sistema viga-losa
- **fn** — frecuencia natural del sistema combinado
- **t** — duración del impulso

La frecuencia natural del sistema combinado:

```
fn = 0.18 · √(g / Δtotal)
Δtotal = Δviga + Δprincipal + Δcolumna
```

## Endpoint API

```
POST /api/calc/vibration
```
