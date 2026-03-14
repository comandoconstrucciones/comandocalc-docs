---
id: portico
title: Pórtico Metálico 2D
sidebar_position: 10
---

# Pórtico Metálico 2D

Análisis y diseño de pórticos planos (una crujía) bajo cargas gravitacionales y de viento. Usa **FEM 2D** con elementos viga-columna (6 GDL por nodo) y verifica **flexo-compresión** según AISC 360-16 Capítulo H.

## Parámetros de entrada

| Parámetro | Unidad | Descripción | Por defecto |
|-----------|--------|-------------|-------------|
| `bay_width` | m | Ancho de la crujía | 12.0 |
| `column_height` | m | Altura de columnas | 6.0 |
| `roof_angle` | ° | Ángulo de cubierta | 10.0 |
| `dead_load` | kg/m² | Carga muerta de cubierta | 30 |
| `live_load` | kg/m² | Sobrecarga de cubierta | 50 |
| `wind_pressure` | kg/m² | Presión de viento de diseño | 60 |
| `tributary_width` | m | Ancho tributario del pórtico | 5.0 |
| `column_profile_id` | — | Perfil de columnas | — |
| `rafter_profile_id` | — | Perfil de vigas de cubierta (rafters) | — |

## Análisis estructural

Se plantea la ecuación matricial del sistema:

```
[K] · {u} = {F}
```

Con elementos **viga-columna Euler-Bernoulli** en 2D (3 GDL por nodo: Ux, Uy, Rz).

### Casos de carga analizados

1. **CM** — Carga muerta uniforme sobre rafters
2. **CV** — Sobrecarga de cubierta
3. **W+** — Viento desde la izquierda (presión barlovento + succión sotavento)
4. **W-** — Viento desde la derecha

### Combinaciones LRFD (NSR-10 B.2.4)

```
1.4D
1.2D + 1.6L
1.2D + 1.0W + 1.0L
0.9D + 1.0W
```

## Verificación de miembros (AISC H1)

Para cada miembro con carga combinada axial + momento:

**Cuando Pu/φPn ≥ 0.2:**
```
Pu/(φPn) + 8/9 · [Mux/(φMnx) + Muy/(φMny)] ≤ 1.0
```

**Cuando Pu/φPn < 0.2:**
```
Pu/(2φPn) + [Mux/(φMnx) + Muy/(φMny)] ≤ 1.0
```

### Amplificación de momentos (AISC C2)

Se aplican los **factores B1 y B2** para efectos de segundo orden:

```
Mu = B1·Mnt + B2·Mlt
```

### Verificación de deriva (drift)

```
Δ / h ≤ 1/400   (servicio)
```

## Exportación DXF

Geometría del pórtico con deformada exagerada, diagramas de momentos y etiquetas de miembros.

## Endpoint API

```
POST /api/calc/frame
```
