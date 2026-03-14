---
id: steeldeck
title: Steel Deck + Losa Compuesta
sidebar_position: 7
---

# Steel Deck + Losa Compuesta

Diseño de losas compuestas (steel deck + concreto) bajo cargas gravitacionales, verificando la **sección compuesta viga-losa** según AISC 360-16 Capítulo I.

## Parámetros de entrada

| Parámetro | Unidad | Descripción | Por defecto |
|-----------|--------|-------------|-------------|
| `deck_span` | m | Luz del deck | 3.0 |
| `deck_spacing` | m | Separación entre apoyos | 3.0 |
| `slab_thickness` | cm | Espesor total de losa | 12.0 |
| `deck_height` | cm | Altura del perfil de deck | 5.1 |
| `dead_load` | kg/m² | Carga muerta adicional | 100 |
| `live_load` | kg/m² | Carga viva | 300 |
| `fc` | kg/cm² | Resistencia del concreto | 210 |

## Endpoint API

```
POST /api/calc/steeldeck
```
