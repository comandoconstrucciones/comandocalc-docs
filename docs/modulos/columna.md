---
id: columna
title: Columna
sidebar_position: 2
---

# Columna

![Módulo de columnas en ComandoCalc](/img/screenshots/column.png)

Diseño de columnas de acero bajo **carga axial y momento** según AISC 360-16 Capítulos E y H.

## Modos de cálculo

| Modo | Descripción |
|------|-------------|
| **Selección óptima** | Elige el perfil más liviano que cumple la ecuación de interacción |
| **Verificación** | Verifica un perfil específico bajo Pu + Mux + Muy |

## Parámetros de entrada

| Parámetro | Unidad | Descripción | Por defecto |
|-----------|--------|-------------|-------------|
| `Pu` | kg | Carga axial última | 10,000 |
| `Mux` | kg·m | Momento flector eje X | 0 |
| `Muy` | kg·m | Momento flector eje Y | 0 |
| `height` | m | Altura libre de la columna | 3.5 |
| `Kx` | — | Factor de longitud efectiva eje X | 1.0 |
| `Ky` | — | Factor de longitud efectiva eje Y | 1.0 |
| `profile_type` | — | Familia de perfiles (modo óptimo) | `hea` |
| `profile_id` | — | ID del perfil (modo verificación) | — |

### Factores K típicos

| Condición de apoyo | K |
|---|---|
| Ambos extremos articulados | 1.0 |
| Empotrado-articulado | 0.7 |
| Ambos extremos empotrados | 0.65 |
| Ménsula (empotrado-libre) | 2.0 |

## Verificaciones realizadas

### Esbeltez máxima (AISC E2)
```
KL/r ≤ 200
```

### Compresión (AISC E3)
```
φPn ≥ Pu     φ = 0.90
```
Tensión crítica según pandeo:
- **Inelástico** (KL/r ≤ 4.71√(E/Fy)): `Fcr = 0.658^(Fy/Fe) · Fy`
- **Elástico** (KL/r > 4.71√(E/Fy)): `Fcr = 0.877 · Fe`

### Ecuación de interacción (AISC H1)

Cuando hay momento simultáneo:

**H1-1a** (Pu/φPn ≥ 0.2):
```
Pu/φPn + 8/9·(Mux/φMnx + Muy/φMny) ≤ 1.0
```

**H1-1b** (Pu/φPn < 0.2):
```
Pu/(2·φPn) + (Mux/φMnx + Muy/φMny) ≤ 1.0
```

## Visualización

El módulo incluye el **Diagrama de Interacción P-M** (AISC H1) con:

- Curva φPn–φMn normalizada (Pu/φPn vs Mu/φMn)
- Punto de demanda coloreado según D/C (verde / ámbar / rojo)
- Líneas de referencia que muestran los márgenes disponibles
- Indicador del punto de transición H1-1a / H1-1b

## Resultados

| Campo | Descripción |
|-------|-------------|
| `phi_Pn` | Capacidad axial de diseño (kg) |
| `phi_Mnx` | Capacidad a momento eje X (kg·m) |
| `phi_Mny` | Capacidad a momento eje Y (kg·m) |
| `axial_ratio` | Pu / φPn |
| `interaction_ratio` | Relación de interacción H1 |
| `interaction_eq` | Ecuación aplicada (`H1-1a` o `H1-1b`) |
| `KLr_max` | Máxima esbeltez KL/r |
| `status` | `OK` o `FALLA` |

## Endpoint API

```
POST /api/calc/column
POST /api/calc/column/optimal
```

### Ejemplo

```bash
curl -X POST https://api.comandoconstrucciones.com/api/calc/column \
  -H "Content-Type: application/json" \
  -d '{
    "profile_id": "HEA-200",
    "Pu": 25000,
    "Mux": 800,
    "height": 4.0,
    "Kx": 1.0,
    "Ky": 1.0
  }'
```

:::tip Perfiles recomendados para columnas
Los perfiles **HEA** y **HEB** tienen buena inercia en ambas direcciones. Los perfiles **W** (estándar americano) son más eficientes en resistencia axial por su mayor área de alma.
:::
