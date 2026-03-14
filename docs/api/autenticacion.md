---
id: autenticacion
title: Autenticación
sidebar_position: 2
---

# Autenticación

## Estado actual

La API de ComandoCalc es **pública y no requiere autenticación** en su versión actual. Cualquier cliente puede hacer solicitudes directamente.

```bash
# Sin headers de autenticación
curl -X POST https://api.comandoconstrucciones.com/api/calc/beam/optimal \
  -H "Content-Type: application/json" \
  -d '{"dead_load": 200, "live_load": 400, "span": 5}'
```

## CORS

La API acepta solicitudes desde cualquier origen (`*`). Esto permite llamarla desde JavaScript del lado del cliente en cualquier dominio.

```javascript
const response = await fetch('https://api.comandoconstrucciones.com/api/calc/beam/optimal', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ dead_load: 200, live_load: 400, span: 5, Cb: 1.0 })
});
const result = await response.json();
```

## Roadmap de autenticación (v2)

En versiones futuras se planea implementar:

- **API Keys** para integraciones de terceros
- **JWT** para usuarios autenticados con historial de cálculos
- **Rate limiting** por IP y por API Key
