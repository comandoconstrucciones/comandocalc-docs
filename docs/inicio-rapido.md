---
id: inicio-rapido
title: Inicio rápido
sidebar_position: 2
---

# Inicio rápido

## Usar la app web

La forma más sencilla: abrir [calculadora.comandoconstrucciones.com](https://calculadora.comandoconstrucciones.com) en cualquier navegador.

1. **Seleccionar módulo** — en la pantalla principal aparecen los 13 módulos disponibles
2. **Ingresar datos** — cada módulo tiene un formulario con valores por defecto típicos
3. **Calcular** — clic en el botón azul "Calcular"
4. **Ver resultados** — tabla con demanda, capacidad, relación D/C y estado OK / NO CUMPLE
5. **Exportar PDF** — clic en "Descargar PDF" para obtener la memoria de cálculo

## Usar la API

La API REST no requiere autenticación. Todos los endpoints reciben y devuelven JSON.

### Ejemplo: diseño de viga

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

**Respuesta:**

```json
{
  "profile_id": "IPE-200",
  "profile_designation": "IPE 200",
  "profile_weight": 22.4,
  "Mu": 3375.0,
  "phi_Mn": 3843.2,
  "moment_ratio": 0.878,
  "deflection_ratio": 0.934,
  "status": "OK",
  "governing": "Deflexión"
}
```

### Ejemplo: carga de viento (ciudad colombiana)

```bash
curl -X POST https://api.comandoconstrucciones.com/api/calc/wind \
  -H "Content-Type: application/json" \
  -d '{
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
  }'
```

## Instalar y correr localmente

### Requisitos

- Python 3.11+
- Node.js 18+
- Cuenta Supabase (o variables de entorno ya configuradas)

### Backend (API)

```bash
git clone https://github.com/comandoconstrucciones/comandocalc.git
cd comandocalc/backend

pip install -r requirements.txt

# Variables de entorno
cp .env.example .env
# Editar .env con SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY

uvicorn main:app --reload --port 8000
```

La API queda en `http://localhost:8000`. Swagger UI en `http://localhost:8000/docs`.

### Frontend

```bash
cd comandocalc/frontend

npm install

# Variables de entorno
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

npm run dev
```

La app queda en `http://localhost:3000`.

### Verificar instalación

```bash
curl http://localhost:8000/
# {"app":"ComandoCalc","version":"0.1.0","status":"ok"}
```
