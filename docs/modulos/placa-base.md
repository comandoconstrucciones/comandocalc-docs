---
id: placa-base
title: Placa Base
sidebar_position: 8
---

# Placa Base

Diseño de placas base de columnas de acero sobre concreto, bajo **carga axial de compresión** según AISC Design Guide 1.

## Parámetros de entrada

| Parámetro | Unidad | Descripción | Por defecto |
|-----------|--------|-------------|-------------|
| `axial_load` | kg | Carga axial de diseño | 15,000 |
| `profile_id` | — | Perfil de la columna | — |
| `fc` | kg/cm² | Resistencia del concreto del pedestal | 210 |
| `fy_plate` | kg/cm² | Fy de la placa | 2,530 |
| `plate_thickness` | cm | Espesor de la placa (modo verificación) | — |

## Diseño (AISC DG-1)

La presión de aplastamiento sobre el concreto:

```
fp = Pu / (B × N) ≤ φc·fp_max
φc·fp_max = 0.65 · 0.85 · f'c · √(A2/A1) ≤ 1.7 · φc · f'c
```

Espesor mínimo de placa:

```
tp = max(m, n, λn') · √(2·fp / (φ·Fy))
```

Donde m y n son las dimensiones de voladizo desde la huella del perfil.

## Endpoint API

```
POST /api/calc/baseplate
```
