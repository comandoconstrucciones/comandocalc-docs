---
id: flexo-compresion
title: Flexo-compresión
sidebar_position: 11
---

# Flexo-compresión — Columna con Momento

Verificación de **interacción axial + flexión** en columnas bajo carga combinada, según AISC 360-16 Sección H1. Incluye amplificadores de momento de segundo orden B1.

## Parámetros de entrada

| Parámetro | Unidad | Descripción | Por defecto |
|-----------|--------|-------------|-------------|
| `Pu` | kg | Carga axial última de compresión | 20,000 |
| `Mux` | kg·m | Momento último eje X (eje fuerte) | 3,000 |
| `Muy` | kg·m | Momento último eje Y (eje débil) | 0 |
| `KLx` | m | Longitud efectiva eje X = Kx·Lx | 4.0 |
| `KLy` | m | Longitud efectiva eje Y = Ky·Ly | 4.0 |
| `Cm` | — | Factor de reducción de momento equivalente | 0.85 |
| `profile_id` | — | Perfil a verificar | — |

## Amplificación B1 (efectos P-δ)

El factor B1 amplifica el momento en miembros con curvatura simple/doble:

```
B1 = Cm / (1 - Pu/Pe1) ≥ 1.0

Pe1 = π²·E·I / (K1·L)²
```

Entonces el momento amplificado:

```
Mu_amp = B1 · Mux
```

## Interacción H1-1

**Cuando Pu/φPn ≥ 0.2:**
```
IR = Pu/(φPn) + 8/9 · [Mux_amp/(φMnx) + Muy/(φMny)]
```

**Cuando Pu/φPn < 0.2:**
```
IR = Pu/(2·φPn) + [Mux_amp/(φMnx) + Muy/(φMny)]
```

`IR ≤ 1.0` para que el elemento CUMPLA.

## Endpoint API

```
POST /api/calc/flexo-compression
```

### Ejemplo

```bash
curl -X POST https://api.comandoconstrucciones.com/api/calc/flexo-compression \
  -H "Content-Type: application/json" \
  -d '{
    "profile_id": "HEA-240",
    "Pu": 30000,
    "Mux": 4000,
    "Muy": 0,
    "KLx": 4.0,
    "KLy": 4.0,
    "Cm": 0.85
  }'
```
