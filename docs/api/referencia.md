---
id: referencia
title: Referencia completa de endpoints
sidebar_position: 3
---

# Referencia completa de endpoints

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

---

## GET `/`

Health check del servicio.

**Respuesta:**
```json
{
  "app": "ComandoCalc",
  "version": "0.1.0",
  "status": "ok"
}
```

---

## POST `/api/calc/beam`

Verificar si un perfil específico cumple bajo cargas de flexión.

**Request:**
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
  "profile_weight": 22.4,
  "Mu": 2531.25,
  "Vu": 2025.0,
  "deflection_total": 1.21,
  "deflection_live": 0.92,
  "phi_Mn": 3843.2,
  "phi_Vn": 24710.4,
  "deflection_limit": 1.39,
  "moment_ratio": 0.659,
  "shear_ratio": 0.082,
  "deflection_ratio": 0.664,
  "status": "OK",
  "governing": "Momento"
}
```

---

## POST `/api/calc/beam/optimal`

Seleccionar el perfil más liviano de una familia que cumpla.

**Request:**
```json
{
  "dead_load": 150,
  "live_load": 300,
  "span": 5.0,
  "unbraced_length": 5.0,
  "Cb": 1.0,
  "profile_type": "ipe",
  "use": "floor"
}
```

**profile_type válidos:** `ipe`, `hea`, `heb`, `w`, `c`, `l`, `tr`, `rhs`

**Response:** misma estructura que `/api/calc/beam`

---

## POST `/api/calc/column`

Verificar columna a compresión axial.

**Request:**
```json
{
  "profile_id": "HEA-200",
  "axial_load": 25000,
  "height": 4.0,
  "Kx": 1.0,
  "Ky": 1.0
}
```

**Response:**
```json
{
  "profile_designation": "HEA 200",
  "Pu": 25000,
  "phi_Pn": 68420.0,
  "slenderness_x": 62.4,
  "slenderness_y": 74.1,
  "ratio": 0.365,
  "status": "OK",
  "governing": "Eje Y"
}
```

---

## POST `/api/calc/wind`

Calcular cargas de viento por ciudad colombiana (NSR-10).

**Request:**
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

**roof_type:** `dos_aguas`, `plana`  
**exposure:** `B`, `C`, `D`  
**enclosure:** `closed`, `open`, `partially_open`  
**topography:** `flat`, `hill`, `ridge`, `escarpment`

**Response:**
```json
{
  "city_name": "Bogotá",
  "department": "Cundinamarca",
  "Vb": 27.0,
  "S1": 1.0,
  "S2": 1.0,
  "S3": 0.97,
  "Vd": 26.2,
  "qh": 42.1,
  "p_windward": 28.4,
  "p_leeward": -16.2,
  "p_roof": -24.8,
  "p_sidewall": -21.3
}
```

---

## POST `/api/calc/truss`

Analizar y diseñar cercha metálica plana.

**Request:**
```json
{
  "span": 12.0,
  "height": 1.5,
  "num_panels": 6,
  "truss_type": "pratt",
  "dead_load": 15,
  "live_load": 50,
  "wind_load": 30,
  "tributary_width": 5.0,
  "chord_profile_id": "TR-100x100x4",
  "web_profile_id": "TR-80x80x3"
}
```

**truss_type:** `pratt`, `warren`, `howe`

**Response:**
```json
{
  "status": "OK",
  "max_deflection_cm": 0.89,
  "deflection_limit_cm": 3.33,
  "members": [
    {
      "member_id": "CS1",
      "type": "chord_top",
      "force": -8420.0,
      "phi_Pn": 12350.0,
      "ratio": 0.682,
      "status": "OK"
    }
  ]
}
```

---

## POST `/api/calc/frame`

Analizar pórtico metálico 2D con combinaciones de carga.

**Request:**
```json
{
  "bay_width": 12.0,
  "column_height": 6.0,
  "roof_angle": 10.0,
  "dead_load": 30,
  "live_load": 50,
  "wind_pressure": 60,
  "tributary_width": 5.0,
  "column_profile_id": "HEA-260",
  "rafter_profile_id": "IPE-300"
}
```

**Response:**
```json
{
  "status": "OK",
  "max_drift_ratio": 0.0021,
  "drift_limit": 0.0025,
  "governing_combo": "1.2D + 1.0W + 1.0L",
  "members": [
    {
      "member_id": "COL-L",
      "type": "column",
      "Pu": 12450,
      "Mu": 8320,
      "interaction_ratio": 0.74,
      "status": "OK"
    }
  ]
}
```

---

## POST `/api/calc/budget`

Generar presupuesto de estructura metálica.

Ver ejemplo completo en el [módulo de Presupuesto](/docs/modulos/presupuesto#ejemplo).

---

## POST `/api/calc/flexo-compression`

Verificar interacción axial + flexión AISC H1.

**Request:**
```json
{
  "profile_id": "HEA-240",
  "Pu": 30000,
  "Mux": 4000,
  "Muy": 0,
  "KLx": 4.0,
  "KLy": 4.0,
  "Cm": 0.85
}
```

**Response:**
```json
{
  "profile_designation": "HEA 240",
  "Pu": 30000,
  "phi_Pn": 98420,
  "Mux_amplified": 4180,
  "phi_Mnx": 14320,
  "B1": 1.045,
  "interaction_ratio": 0.621,
  "status": "OK"
}
```

---

## POST `/api/calc/composite-column`

Diseño de columna compuesta CFT o SRC.

**Request:**
```json
{
  "section_type": "CFT",
  "profile_id": "TR-200x200x8",
  "fc": 210,
  "height": 4.0,
  "K": 1.0,
  "Pu": 60000
}
```

**Response:**
```json
{
  "section_type": "CFT",
  "profile_designation": "TR 200×200×8",
  "As_cm2": 59.2,
  "Ac_cm2": 340.8,
  "phi_Pno": 142800,
  "phi_Pn": 118600,
  "ratio": 0.506,
  "status": "OK"
}
```
