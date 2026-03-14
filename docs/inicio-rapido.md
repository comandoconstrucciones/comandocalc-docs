---
id: inicio-rapido
title: Inicio rápido
sidebar_position: 2
---

# Inicio rápido

## Usar la app web

Abrir [calculadora.comandoconstrucciones.com](https://calculadora.comandoconstrucciones.com) en cualquier navegador.

![Pantalla principal de ComandoCalc](/img/screenshots/homepage.png)

1. **Seleccionar módulo** — en la pantalla principal aparecen los 13 módulos disponibles
2. **Ingresar datos** — cada módulo tiene un formulario con valores por defecto típicos
3. **Calcular** — clic en el botón azul "Calcular" o "Buscar perfil óptimo"
4. **Ver resultados** — tabla con demanda, capacidad, relación D/C y estado OK / NO CUMPLE
5. **Exportar PDF** — clic en "Descargar PDF" para obtener la memoria de cálculo lista para entrega

## Usar la API

La API REST está disponible en `https://api.comandoconstrucciones.com`. No requiere autenticación para uso estándar, pero sí aplica **rate limiting de 30 solicitudes/minuto** por IP.

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

### Rate limiting

| Tipo de endpoint | Límite |
|-----------------|--------|
| Cálculos (`/api/calc/*`) | 30 solicitudes/minuto por IP |
| Datos (`/api/profiles`, `/api/cities`) | 200 solicitudes/hora por IP |

Cuando se supera el límite, la API responde con `HTTP 429 Too Many Requests`.

Para integraciones de alto volumen o uso empresarial, contactar a [Comando Construcciones](https://www.comandoconstrucciones.com).

## Documentación interactiva (Swagger)

La API incluye documentación interactiva donde puede probar todos los endpoints directamente desde el navegador:

**→ [api.comandoconstrucciones.com/docs](https://api.comandoconstrucciones.com/docs)**
