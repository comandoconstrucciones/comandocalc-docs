---
id: conexiones
title: Conexiones Estructurales
sidebar_position: 9
---

# Conexiones Estructurales

Diseño y verificación de conexiones de acero según **AISC 360-16 Capítulo J**. El módulo cubre tres tipos de conexiones con visualización 3D interactiva en cada uno.

## Tipos disponibles

### 1. Conexión simple a cortante — Shear Tab

Conexión viga-columna con placa lateral (shear tab) soldada a la columna y pernada al alma de la viga. Transmite **solo cortante**.

#### Parámetros

| Parámetro | Descripción | Por defecto |
|-----------|-------------|-------------|
| `Vu` | Cortante último (kg) | — |
| `bolt_type` | Tipo de perno: `A307-3/4`, `A325-3/4`, `A490-7/8`, etc. | `A325-3/4` |
| `n_bolts` | Número de pernos (2 a 10) | 3 |
| `connection_type` | `bearing` (apoyo) o `slip_critical` (sin desliz.) | `bearing` |
| `plate_steel` | `A36` o `A572-50` | `A36` |
| `plate_thickness` | Espesor de la placa (cm) | 0.953 (3/8") |
| `beam_web_thickness` | Espesor alma de viga (cm) | 0.60 |
| `edge_dist` | Distancia borde-perno (cm) | 3.81 (1.5") |
| `bolt_spacing` | Separación entre pernos (cm) | 7.62 (3") |
| `weld_size` | Tamaño del filete placa-columna (cm) | 0.635 (1/4") |
| `electrode` | `E60`, `E70` o `E80` | `E70` |
| `n_weld_lines` | Cordones de soldadura (1 o 2) | 2 |

#### Verificaciones (AISC J3, J4)

| # | Verificación | Referencia |
|---|---|---|
| 1 | Cortante de pernos | AISC J3.6 |
| 2 | Aplastamiento en placa | AISC J3.10 |
| 3 | Aplastamiento en alma de viga | AISC J3.10 |
| 4 | Fluencia a cortante en placa bruta | AISC J4.2a |
| 5 | Ruptura a cortante en placa neta | AISC J4.2b |
| 6 | Block shear en placa | AISC J4.3 |
| 7 | Soldadura placa-columna | AISC J2.4 |

### 2. Soldadura en filete

Verifica un cordón de soldadura en filete bajo carga de cortante y/o normal simultáneos.

#### Parámetros

| Parámetro | Descripción | Por defecto |
|-----------|-------------|-------------|
| `Vu` | Fuerza de cortante (kg) | — |
| `Nu` | Fuerza normal simultánea (kg) | 0 |
| `weld_size` | Tamaño del filete a (cm) | 0.635 |
| `weld_length` | Longitud total de soldadura (cm) | 20 |
| `n_welds` | Número de cordones | 1 |
| `electrode` | `E60`, `E70` o `E80` | `E70` |
| `base_metal_thickness` | Espesor del metal base más delgado (cm) | 1.0 |
| `base_metal_Fu` | Fu del metal base (kg/cm²) | 4,080 |

#### Verificaciones (AISC J2)

- Resistencia de la soldadura: `φRn = 0.75 · 0.6 · FEXX · Aw`
- Resistencia del metal base a cortante: `φRn = 0.75 · 0.6 · Fu · t · L`
- Gobierna el menor de los dos
- Tamaño mínimo de filete según AISC Table J2.4

#### Tamaños mínimos de filete (AISC J2.4)

| Espesor metal base | Tamaño mínimo |
|---|---|
| ≤ 1/4" (0.635 cm) | 1/8" (0.318 cm) |
| 1/4" a 3/4" | 3/16" (0.476 cm) |
| 3/4" a 1-1/4" | 1/4" (0.635 cm) |
| > 1-1/4" | 3/8" (0.952 cm) |

### 3. Conexión a momento soldada

Conexión momento viga-columna con **alas soldadas** (CJP o filete) y **alma pernada** (shear tab). Transmite momento + cortante.

#### Parámetros

| Parámetro | Descripción |
|-----------|-------------|
| `Mu` | Momento último (kg·m) |
| `Vu` | Cortante último (kg) |
| `beam_depth` | Peralte de viga d (cm) |
| `beam_flange_width` | Ancho ala de viga bf (cm) |
| `beam_flange_thickness` | Espesor ala de viga tf (cm) |
| `beam_web_thickness` | Espesor alma tw (cm) |
| `column_flange_thickness` | Espesor ala de columna (cm) |
| `electrode` | Electrodo de soldadura | 
| `bolt_type` | Perno para la conexión de alma |
| `n_bolts_web` | Pernos en el alma |

#### Verificaciones (AISC J2, J4, J10)

- **Alas:** fuerza de ala = Mu / (d - tf); verificación de soldadura de filete/CJP
- **Alma:** conexión shear tab con sus 7 verificaciones (ver arriba)
- **Ala de columna:** fluencia local φRfl = 0.90 · 6.25 · t²cf · Fu (AISC J10.1). Si no cumple, se requiere rigidizador.

## Pernos estructurales disponibles

| Tipo | FEXX / Fnt | Fnv (bearing) |
|------|-----------|---------------|
| A307-3/4" | — / 3,234 kg/cm² | 2,531 kg/cm² |
| A325-3/4" | — / 6,329 kg/cm² | 3,727 kg/cm² |
| A490-3/4" | — / 7,914 kg/cm² | 4,640 kg/cm² |

12 combinaciones disponibles: A307/A325/A490 × 1/2", 5/8", 3/4", 7/8", 1"

## Visualización 3D

Los tres tipos de conexión incluyen visualizador 3D interactivo (React Three Fiber):

- **Shear Tab**: columna verde + placa gris + pernos dorados + cordones naranja
- **Filete**: sección T con indicador de garganta efectiva
- **Momento**: alas soldadas + shear tab en alma + pernos

Controles: arrastrar para rotar · scroll para zoom · clic derecho para desplazar.

## Endpoints API

```
POST /api/calc/connection/shear-tab     → Conexión simple a cortante
POST /api/calc/connection/fillet-weld   → Soldadura en filete
POST /api/calc/connection/moment        → Conexión a momento
GET  /api/calc/connection/bolt-types    → Tipos de pernos disponibles
GET  /api/calc/connection/electrodes    → Electrodos disponibles
```

### Ejemplo — Shear Tab

```bash
curl -X POST https://api.comandoconstrucciones.com/api/calc/connection/shear-tab \
  -H "Content-Type: application/json" \
  -d '{
    "Vu": 8000,
    "bolt_type": "A325-3/4",
    "n_bolts": 4,
    "plate_thickness": 0.953,
    "beam_web_thickness": 0.6,
    "weld_size": 0.635,
    "electrode": "E70",
    "n_weld_lines": 2
  }'
```

### Ejemplo — Soldadura en filete

```bash
curl -X POST https://api.comandoconstrucciones.com/api/calc/connection/fillet-weld \
  -H "Content-Type: application/json" \
  -d '{
    "Vu": 5000,
    "weld_size": 0.794,
    "weld_length": 25.0,
    "n_welds": 2,
    "electrode": "E70",
    "base_metal_thickness": 1.27
  }'
```

### Ejemplo — Conexión a momento

```bash
curl -X POST https://api.comandoconstrucciones.com/api/calc/connection/moment \
  -H "Content-Type: application/json" \
  -d '{
    "Mu": 12000,
    "Vu": 3000,
    "beam_depth": 24.0,
    "beam_flange_width": 12.0,
    "beam_flange_thickness": 0.98,
    "beam_web_thickness": 0.60,
    "column_flange_thickness": 1.50,
    "electrode": "E70",
    "bolt_type": "A325-3/4",
    "n_bolts_web": 3
  }'
```

:::warning Rigidizadores de columna
Si el resultado muestra `column_flange_status: "REQUIERE RIGIDIZADOR"`, debe diseñarse un rigidizador transversal en la columna a la altura de las alas de la viga, o aumentar el espesor del ala de la columna.
:::

:::tip Selección de electrodo
Para acero A-36 usar **E70XX** (el más común en Colombia). Para acero A572 Grado 50 se recomienda también E70XX o E80XX. Nunca usar E60XX con A572-50.
:::
