---
id: viga
title: Viga de Entrepiso / Mezanine
sidebar_position: 1
---

# Viga de Entrepiso / Mezanine

![Módulo de diseño de vigas en ComandoCalc](/img/screenshots/beam.png)

Diseño de vigas de acero bajo cargas gravitacionales. Verifica **flexión, cortante y deflexión** según AISC 360-16 Capítulos F y G.

## Modos de cálculo

| Modo | Descripción |
|------|-------------|
| **Selección óptima** | El sistema elige el perfil más liviano que cumple |
| **Verificación** | Ingresa un perfil específico y verifica si cumple |

## Parámetros de entrada

| Parámetro | Unidad | Descripción | Por defecto |
|-----------|--------|-------------|-------------|
| `dead_load` | kg/m² | Carga muerta (CM) | 150 |
| `live_load` | kg/m² | Carga viva (CV) | 300 |
| `span` | m | Luz libre de la viga | 5.0 |
| `tributary_width` | m | Ancho tributario | 3.0 |
| `unbraced_length` | m | Longitud no arriostrada Lb | igual a span |
| `Cb` | — | Factor de modificación de pandeo lateral | 1.0 |
| `use` | — | Uso: `floor` (entrepiso) o `roof` (cubierta) | `floor` |
| `profile_type` | — | Familia de perfiles en modo óptimo | `ipe` |
| `profile_id` | — | ID del perfil en modo verificación | — |

### Familias de perfiles disponibles

`ipe`, `hea`, `heb`, `w`, `c`, `l`, `tr`, `rhs`

## Combinaciones de carga

El módulo aplica **LRFD** (Load and Resistance Factor Design):

```
Mu = 1.2·CM + 1.6·CV    (mayorada — diseño)
Ms = CM + 0.5·CV         (servicio — deflexión)
```

## Verificaciones realizadas

### Flexión (AISC F2 / F3)

```
φMn ≥ Mu     donde φ = 0.90
```

El momento nominal Mn se reduce por **pandeo lateral-torsional (LTB)** si Lb > Lp:

- **Zona plástica** (Lb ≤ Lp): Mn = Mp = Fy·Zx
- **Zona inelástica** (Lp < Lb ≤ Lr): interpolación lineal con Cb
- **Zona elástica** (Lb > Lr): Mn basado en módulo elástico crítico Fcr

### Cortante (AISC G2)

```
φVn ≥ Vu     donde φ = 1.00 (perfiles laminados)
Vn = 0.6·Fy·Aw·Cv1
```

### Deflexión

```
δviva    ≤  L/360   (entrepiso)
δtotal   ≤  L/240   (entrepiso)
δviva    ≤  L/300   (cubierta)
```

## Visualización

El módulo incluye **diagramas interactivos** generados automáticamente al calcular:

- **Diagrama de Momento (M)** — parábola con valor Mu y relación D/C
- **Diagrama de Cortante (V)** — distribución lineal con valores en extremos
- **Diagrama de Deflexión (δ)** — curva elástica con comparación al límite admisible

Los tres diagramas se colorean según el estado: verde (D/C ≤ 0.85), ámbar (D/C ≤ 1.0), rojo (D/C > 1.0).

## Resultados

| Campo | Descripción |
|-------|-------------|
| `Mu` | Momento último mayorado (kg·m) |
| `phi_Mn` | Resistencia de diseño φMn (kg·m) |
| `Vu` | Cortante último (kg) |
| `phi_Vn` | Resistencia al cortante φVn (kg) |
| `deflection_live` | Deflexión bajo carga viva (cm) |
| `deflection_limit` | Deflexión admisible (cm) |
| `moment_ratio` | Mu / φMn |
| `shear_ratio` | Vu / φVn |
| `deflection_ratio` | δviva / δadm |
| `status` | `OK` o `FALLA` |
| `governing` | Verificación que gobierna |

## Endpoint API

```
POST /api/calc/beam          → verifica un perfil específico
POST /api/calc/beam/optimal  → selección óptima de perfil
```

### Ejemplo — Selección óptima

```bash
curl -X POST https://api.comandoconstrucciones.com/api/calc/beam/optimal \
  -H "Content-Type: application/json" \
  -d '{
    "dead_load": 250,
    "live_load": 500,
    "span": 6.0,
    "unbraced_length": 6.0,
    "Cb": 1.0,
    "profile_type": "ipe",
    "use": "floor"
  }'
```

:::tip Longitud no arriostrada
Si la viga tiene arriostramiento en el punto medio, usar `unbraced_length = span / 2` para un diseño más económico.
:::

:::note Factor Cb
Para viga con carga distribuida y apoyo en extremos, Cb = 1.14. Para diseño conservador usar Cb = 1.0.
:::
