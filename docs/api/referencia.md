---
id: referencia
title: Referencia completa de endpoints
sidebar_position: 3
---

# Referencia completa de endpoints

**Base URL:** `https://api.comandoconstrucciones.com`

## Resumen

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Health check |
| GET | `/api/profiles` | Listar perfiles de acero |
| GET | `/api/profiles/{id}` | Obtener un perfil |
| GET | `/api/cities` | Listar ciudades |
| GET | `/api/cities/{id}` | Obtener una ciudad |
| POST | `/api/calc/beam` | Verificar viga |
| POST | `/api/calc/beam/optimal` | Viga óptima |
| POST | `/api/calc/column` | Verificar columna |
| POST | `/api/calc/column/optimal` | Columna óptima |
| POST | `/api/calc/purlin` | Correas de cubierta |
| POST | `/api/calc/facade-purlin` | Correas de fachada |
| POST | `/api/calc/wind` | Cargas de viento |
| POST | `/api/calc/vibration` | Vibraciones de piso |
| POST | `/api/calc/steeldeck` | Steel deck + losa |
| POST | `/api/calc/baseplate` | Placa base |
| POST | `/api/calc/truss` | Cercha metálica |
| POST | `/api/calc/frame` | Pórtico 2D |
| POST | `/api/calc/flexo-compression` | Flexo-compresión |
| POST | `/api/calc/composite-column` | Columna compuesta |
| POST | `/api/calc/budget` | Presupuesto |
| POST | `/api/calc/connection/shear-tab` | Conexión simple (Shear Tab) |
| POST | `/api/calc/connection/fillet-weld` | Soldadura en filete |
| POST | `/api/calc/connection/moment` | Conexión a momento |
| GET | `/api/calc/connection/bolt-types` | Tipos de pernos |
| GET | `/api/calc/connection/electrodes` | Electrodos disponibles |

**Total: 25 endpoints**

---

## Rate Limiting

| Tipo | Límite |
|------|--------|
| Cálculos (`/api/calc/*`) | **30 solicitudes/minuto** por IP |
| Datos (`/api/profiles`, `/api/cities`) | 200 solicitudes/hora por IP |

Responde `HTTP 429 Too Many Requests` al superarlo.

---

## GET `/`

Health check.

```json
{ "app": "ComandoCalc", "version": "0.1.0", "status": "ok" }
```

---

## POST `/api/calc/beam`

Verificar viga bajo flexión + cortante + deflexión (AISC F, G).

```json
{
  "profile_id": "IPE-200",
  "dead_load": 150,
  "live_load": 300,
  "span": 5.0,
  "unbraced_length": 5.0,
  "Cb": 1.0,
  "use": "floor"
}
```

**Response:**
```json
{
  "profile_id": "IPE-200",
  "profile_designation": "IPE 200",
  "Mu": 2531.25,
  "phi_Mn": 3843.2,
  "Vu": 2025.0,
  "phi_Vn": 24710.4,
  "deflection_live": 0.92,
  "deflection_limit": 1.39,
  "moment_ratio": 0.659,
  "shear_ratio": 0.082,
  "deflection_ratio": 0.661,
  "status": "OK",
  "governing": "Momento"
}
```

---

## POST `/api/calc/beam/optimal`

Selecciona el perfil más liviano que cumple.

```json
{
  "dead_load": 250,
  "live_load": 500,
  "span": 6.0,
  "unbraced_length": 6.0,
  "profile_type": "ipe",
  "use": "floor"
}
```

---

## POST `/api/calc/column`

Columna bajo compresión + momento (AISC E, H1).

```json
{
  "profile_id": "HEA-200",
  "Pu": 25000,
  "Mux": 800,
  "Muy": 0,
  "height": 4.0,
  "Kx": 1.0,
  "Ky": 1.0
}
```

**Response:**
```json
{
  "phi_Pn": 48320,
  "phi_Mnx": 9840,
  "phi_Mny": 4210,
  "axial_ratio": 0.517,
  "interaction_ratio": 0.773,
  "interaction_eq": "H1-1a",
  "KLr_max": 68.4,
  "status": "OK",
  "governing": "Interacción H1-1a"
}
```

---

## POST `/api/calc/wind`

Cargas de viento NSR-10 Título B para una ciudad colombiana.

```json
{
  "city_id": 150,
  "building_height": 8.0,
  "building_width": 20.0,
  "building_length": 40.0,
  "roof_angle": 15.0,
  "roof_type": "dos_aguas",
  "exposure": "C",
  "enclosure": "closed",
  "use_group": 2,
  "topography": "flat"
}
```

---

## POST `/api/calc/baseplate`

Placa base bajo carga axial y momento (AISC DG-1).

```json
{
  "Pu": 30000,
  "Mux": 0,
  "column_depth": 20.0,
  "column_bf": 20.0,
  "concrete_fc": 210,
  "pedestal_width": 50,
  "pedestal_length": 50,
  "plate_steel": "A36",
  "bolt_size": "3/4",
  "num_bolts": 4
}
```

**Response:**
```json
{
  "N": 35.0,
  "B": 35.0,
  "t_req": 1.83,
  "t_recommended": 1.905,
  "phi_Pp": 54123,
  "bearing_ratio": 0.554,
  "bolt_size": "3/4",
  "num_bolts": 4,
  "bolt_tension": 0,
  "bolt_ratio": 0,
  "status": "OK",
  "governing": "Aplastamiento concreto"
}
```

---

## POST `/api/calc/truss`

Cercha metálica 2D por FEM (AISC D, E).

```json
{
  "span": 12.0,
  "height": 2.0,
  "num_panels": 6,
  "truss_type": "pratt",
  "dead_load": 80,
  "live_load": 100,
  "wind_load": 40,
  "profile_id": "L-75x75x6"
}
```

---

## POST `/api/calc/frame`

Pórtico metálico 2D bajo cargas gravitacionales + viento (AISC H, NSR-10 deriva).

```json
{
  "num_bays": 2,
  "bay_width": 6.0,
  "height": 4.5,
  "dead_load": 150,
  "live_load": 300,
  "wind_pressure": 80,
  "column_id": "HEA-200",
  "beam_id": "IPE-300",
  "support_type": "fixed"
}
```

---

## POST `/api/calc/connection/shear-tab`

Conexión simple a cortante con pernos (AISC J3, J4).

```json
{
  "Vu": 8000,
  "bolt_type": "A325-3/4",
  "n_bolts": 4,
  "connection_type": "bearing",
  "plate_steel": "A36",
  "plate_thickness": 0.953,
  "beam_web_thickness": 0.6,
  "beam_Fu": 4080,
  "edge_dist": 3.81,
  "bolt_spacing": 7.62,
  "weld_size": 0.635,
  "electrode": "E70",
  "n_weld_lines": 2
}
```

**Response:**
```json
{
  "bolt_type": "A325-3/4",
  "n_bolts": 4,
  "plate_width": 9.6,
  "plate_height": 30.5,
  "plate_thickness": 0.953,
  "weld_size": 0.635,
  "weld_length": 30.5,
  "checks": [
    { "name": "Cortante de pernos (J3.6)", "demand": 8000, "capacity": 38015, "ratio": 0.210, "status": "OK" },
    { "name": "Aplastamiento en placa (J3.10)", "demand": 8000, "capacity": 41880, "ratio": 0.191, "status": "OK" }
  ],
  "max_ratio": 0.391,
  "status": "OK",
  "governing": "Block shear en placa (J4.3)"
}
```

---

## POST `/api/calc/connection/fillet-weld`

Soldadura en filete bajo cortante y/o normal (AISC J2.4).

```json
{
  "Vu": 5000,
  "Nu": 0,
  "weld_size": 0.794,
  "weld_length": 25.0,
  "n_welds": 2,
  "electrode": "E70",
  "base_metal_thickness": 1.27,
  "base_metal_Fu": 4080
}
```

**Response:**
```json
{
  "weld_size": 0.794,
  "throat": 0.5614,
  "Aw": 28.07,
  "phi_Rn_weld": 62230,
  "phi_Rn_shear_base": 97524,
  "phi_Rn": 62230,
  "ratio": 0.0803,
  "status": "OK",
  "governing": "Soldadura",
  "min_size_req": 0.476,
  "size_ok": true
}
```

---

## POST `/api/calc/connection/moment`

Conexión momento soldada viga-columna (AISC J2, J4, J10).

```json
{
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
}
```

**Response:**
```json
{
  "flange_force": 52830,
  "weld_size_flange": 0.82,
  "phi_Rn_flange_weld": 53940,
  "flange_weld_ratio": 0.979,
  "flange_weld_status": "OK",
  "phi_Rfl": 127800,
  "column_flange_ratio": 0.413,
  "column_flange_status": "OK",
  "max_ratio": 0.979,
  "status": "OK",
  "governing": "Soldadura alas"
}
```

---

## GET `/api/calc/connection/bolt-types`

Lista de pernos estructurales disponibles con área y diámetro.

---

## GET `/api/calc/connection/electrodes`

Lista de electrodos disponibles con FEXX en kg/cm².

---

## GET `/api/profiles`

Lista todos los perfiles disponibles. Soporta filtros por familia.

**Parámetros query:**
- `family`: `ipe`, `hea`, `heb`, `w`, `c`, `l`, `tr`, `rhs`

```
GET /api/profiles?family=ipe
```

---

## GET `/api/cities`

Lista ciudades colombianas con velocidad de viento NSR-10.

**Parámetros query:**
- `department`: nombre del departamento
- `search`: búsqueda por nombre

```
GET /api/cities?department=Antioquia
GET /api/cities?search=bogota
```
