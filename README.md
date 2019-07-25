# Performon REST API v1

REST API implemented using expressJS, objectionJS, and Postgres.  Under heavy development.  Do not expect any consistency.

## Accepted Requests

### Users

- `get, post` - /v1/users/
- `get, put, delete` - /v1/users/{userUUID}
- `get` - /v1/users/{userUUID}/devices

### Devices

- `get, post` - /v1/device/{userUUID}
- `get, put, delete` - /v1/device/{deviceHash}
- `get` - /v1/device/{deviceHash}/metrics
