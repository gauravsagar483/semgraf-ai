# Semgraf API

Metric plane + relationship stubs. From **repo root**:

```bash
uv sync --all-packages --group dev
uv run --package semgraf-api semgraf-api
uv run --package semgraf-api pytest apps/api/tests
```

Env:

- `SEMGRAF_FIXTURE` — default `ecommerce`
- `SEMGRAF_ROOT` — repo root (auto-detected if unset)
- `PORT` — default `8080`
