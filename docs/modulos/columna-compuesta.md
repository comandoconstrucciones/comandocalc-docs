---
id: columna-compuesta
title: Columna Compuesta
sidebar_position: 13
---

# Columna Compuesta CFT/SRC

Diseño de **columnas compuestas** de acero y concreto según **AISC 360-16 Capítulo I**. Soporta dos tipos:

- **CFT** (Concrete-Filled Tube): Tubo de acero relleno de concreto
- **SRC** (Steel Reinforced Concrete): Perfil de acero embebido en concreto

## Ventajas de columnas compuestas

| Aspecto | CFT | SRC |
|---------|-----|-----|
| Capacidad axial | Muy alta | Alta |
| Ductilidad | Excelente | Buena |
| Protección al fuego | El concreto protege | Requiere recubrimiento |
| Facilidad constructiva | Sin formaleta | Requiere formaleta |
| Conexiones | Más complejas | Estándar |

## Parámetros de entrada

| Parámetro | Unidad | Descripción | Por defecto |
|-----------|--------|-------------|-------------|
| `steel_profile_id` | — | Perfil de acero (tubo o W) | — |
| `column_type` | — | Tipo: `CFT` o `SRC` | `CFT` |
| `height` | m | Altura de la columna | 4.0 |
| `axial_load` | kgf | Carga axial mayorada (Pu) | — |
| `moment_x` | kgf-m | Momento eje X (Mux) | 0 |
| `moment_y` | kgf-m | Momento eje Y (Muy) | 0 |
| `concrete_fc` | MPa | Resistencia del concreto f'c | 28 |
| `Kx` | — | Factor de longitud efectiva X | 1.0 |
| `Ky` | — | Factor de longitud efectiva Y | 1.0 |

## Endpoint API

```
POST /api/calc/composite-column
```

### Ejemplo cURL — Columna CFT

```bash
curl -X POST https://api.comandoconstrucciones.com/api/calc/composite-column \
  -H "Content-Type: application/json" \
  -d '{
    "steel_profile_id": "COL-TR-300X300X10",
    "column_type": "CFT",
    "height": 4.0,
    "axial_load": 200000,
    "moment_x": 5000,
    "moment_y": 2000,
    "concrete_fc": 28,
    "Kx": 1.0,
    "Ky": 1.0
  }'
```

### Respuesta

```json
{
  "steel_profile": "COL-TR-300X300X10",
  "column_type": "CFT",
  "materials": {
    "steel_Fy_MPa": 317,
    "concrete_fc_MPa": 28
  },
  "geometry": {
    "height_m": 4.0,
    "Kx": 1.0,
    "Ky": 1.0,
    "KL_x_m": 4.0,
    "KL_y_m": 4.0
  },
  "capacity": {
    "phi_Pno_kN": 4250,
    "phi_Mnx_kNm": 385,
    "phi_Mny_kNm": 385,
    "slenderness_x": 28.5,
    "slenderness_y": 28.5
  },
  "demands": {
    "Pu_kN": 1962,
    "Mux_kNm": 49.05,
    "Muy_kNm": 19.62
  },
  "interaction": {
    "Pu_ratio": 0.46,
    "Mu_ratio": 0.18,
    "combined_ratio": 0.64,
    "equation_used": "H1-1b"
  },
  "status": "OK",
  "governing": "Interacción P-M"
}
```

## Selección óptima

```
POST /api/calc/composite-column/optimal
```

Evalúa tubos cuadrados y rectangulares, retorna el más liviano que cumple.

```bash
curl -X POST https://api.comandoconstrucciones.com/api/calc/composite-column/optimal \
  -H "Content-Type: application/json" \
  -d '{
    "column_type": "CFT",
    "height": 4.0,
    "axial_load": 200000,
    "moment_x": 5000,
    "moment_y": 2000,
    "concrete_fc": 28,
    "Kx": 1.0,
    "Ky": 1.0
  }'
```

## Grados de concreto

| f'c (MPa) | Uso típico |
|-----------|------------|
| 21 | Estructuras livianas |
| 28 | Uso general (recomendado) |
| 35 | Alta capacidad |
| 42 | Edificios altos |

## Ecuaciones de interacción

Para columnas compuestas, AISC 360 Cap. I usa las mismas ecuaciones H1 que columnas de acero, pero con propiedades modificadas considerando el aporte del concreto.

### CFT — Capacidad axial

```
Pno = As·Fy + 0.85·f'c·Ac + Asr·Fyr
```

Donde:
- As = Área de acero del tubo
- Ac = Área de concreto
- Asr = Área de refuerzo longitudinal (si aplica)

### SRC — Capacidad axial

```
Pno = As·Fy + 0.85·f'c·Ac + Asr·Fyr
```

La capacidad a flexión se calcula mediante diagramas de interacción P-M del sistema compuesto.
