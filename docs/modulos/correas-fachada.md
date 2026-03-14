---
id: correas-fachada
title: Correas de Fachada
sidebar_position: 4
---

# Correas de Fachada

Diseño de correas (girts) en paneles de fachada metálica. Similar a correas de cubierta pero con carga de **viento lateral** como acción principal.

## Parámetros de entrada

| Parámetro | Unidad | Descripción | Por defecto |
|-----------|--------|-------------|-------------|
| `wind_pressure` | kg/m² | Presión de viento de diseño | 60 |
| `dead_load` | kg/m² | Peso propio del panel de fachada | 10 |
| `span` | m | Longitud de la correa | 6.0 |
| `spacing` | m | Separación vertical entre correas | 1.5 |
| `profile_id` | — | Perfil a verificar | — |

## Notas

:::tip Presión de viento
Usar el valor de **presión de diseño** obtenido del módulo de [Cargas de Viento](/docs/modulos/viento), específicamente la presión sobre muros a barlovento (zona D o E según NSR-10 Título B).
:::

## Endpoint API

```
POST /api/calc/facade-purlin
```
