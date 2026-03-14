---
id: introduccion
title: Introducción a la API
sidebar_position: 1
---

# API REST de ComandoCalc

La API de ComandoCalc expone todos los motores de cálculo como endpoints HTTP. Está construida con **FastAPI** (Python) y sigue el estándar **OpenAPI 3.0**.

## URL base

```
https://api.comandoconstrucciones.com
```

## Documentación interactiva

FastAPI genera automáticamente dos interfaces interactivas:

| Interfaz | URL |
|----------|-----|
| **Swagger UI** | https://api.comandoconstrucciones.com/docs |
| **ReDoc** | https://api.comandoconstrucciones.com/redoc |
| **OpenAPI JSON** | https://api.comandoconstrucciones.com/openapi.json |

## Formato de solicitudes

Todos los endpoints de cálculo usan `POST` con cuerpo JSON:

```
Content-Type: application/json
```

## Formato de respuestas

Todas las respuestas son JSON:

```json
{
  "status": "OK",
  "profile_designation": "IPE 200",
  ...
}
```

### Errores de validación (422)

Cuando los parámetros son inválidos o faltan campos requeridos:

```json
{
  "detail": [
    {
      "type": "missing",
      "loc": ["body", "span"],
      "msg": "Field required",
      "input": {}
    }
  ]
}
```

### Error de diseño (422 semántico)

Cuando ningún perfil cumple las condiciones:

```json
{
  "detail": "Ningún perfil disponible cumple con las cargas indicadas"
}
```

## Versionado

La API actual es **v0.1** (sin prefijo en la URL). Las versiones futuras usarán `/api/v2/...`.

## Límites de uso

Actualmente la API no requiere autenticación ni tiene límites de tasa. Para integraciones de producción en alto volumen, contactar a Comando Construcciones.

## Health check

```bash
curl https://api.comandoconstrucciones.com/
```

```json
{
  "app": "ComandoCalc",
  "version": "0.1.0",
  "status": "ok"
}
```
