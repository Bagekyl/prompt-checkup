# Backend

Backend was planned for v0.2.

v0.1 does not include a backend implementation.
The v0.2 local wrapper implementation lives in `server/`.

The wrapper acts as a minimal local server for calling the Dify API.
It keeps API keys on the server side and avoids exposing secrets in browser-side code.
