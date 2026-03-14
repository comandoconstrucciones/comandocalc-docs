---
id: columna-compuesta
title: Columna Compuesta Acero–Concreto
sidebar_position: 12
---

# Columna Compuesta Acero–Concreto

Diseño de columnas compuestas tipo **CFT** (Concrete-Filled Tube) y **SRC** (Steel-Reinforced Concrete) bajo carga axial, según AISC 360-16 Capítulo I.

## Tipos de sección

| Tipo | Descripción |
|------|-------------|
| **CFT** | Tubo estructural (TR o RHS) relleno de concreto |
| **SRC** | Perfil de acero embebido en columna de concreto |

## Parámetros de entrada

| Parámetro | Unidad | Descripción | Por defecto |
|-----------|--------|-------------|-------------|
| `section_type` | — | `CFT` o `SRC` | `CFT` |
| `profile_id` | — | Perfil de acero | — |
| `fc` | kg/cm² | Resistencia concreto f'c | 210 |
| `height` | m | Longitud libre de la columna | 4.0 |
| `K` | — | Factor de longitud efectiva | 1.0 |
| `Pu` | kg | Carga axial última | 40,000 |
| `rebar_count` | — | Número de barras de refuerzo (SRC) | 4 |
| `rebar_diam_mm` | mm | Diámetro de barras (SRC) | 16 |

## Verificación AISC I2

La resistencia axial del miembro compuesto:

```
φPno = φc · [Fy·As + Fyr·Ar + 0.85·f'c·Ac]

Pn = φPno · (1 - λ²·e^(-0.419/λ²))    si λ ≤ 2.26
Pn = 0.877·Pe                            si λ > 2.26
```

Donde λ es la esbeltez modificada del compuesto y Pe la carga de pandeo de Euler usando el módulo de rigidez efectivo EIeff.

## Endpoint API

```
POST /api/calc/composite-column
```
