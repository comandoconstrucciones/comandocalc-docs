---
id: correas
title: Correas de Cubierta
sidebar_position: 3
---

# Correas de Cubierta

Diseño de correas (secundarias) para cubiertas metálicas. Verifica **flexión biaxial, cortante y deflexión** bajo peso propio de cubierta + sobrecargas.

## Parámetros de entrada

| Parámetro | Unidad | Descripción | Por defecto |
|-----------|--------|-------------|-------------|
| `dead_load` | kg/m² | Carga muerta de cubierta | 15 |
| `live_load` | kg/m² | Sobrecarga de cubierta | 50 |
| `span` | m | Longitud de la correa | 6.0 |
| `spacing` | m | Separación entre correas | 1.5 |
| `slope_deg` | ° | Pendiente de cubierta en grados | 10 |
| `profile_id` | — | Perfil a verificar | — |

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
