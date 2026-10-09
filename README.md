# Bonga Bhengu Creative Studio

Independent shared multi-tenant backend layer. This repository does not replace the existing ChatGPT Work website. No deployment is configured.

## Run

```bash
cd creative-studio
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app:app --reload
```

Use `POST /tenants`, `POST /jobs` and `GET /jobs/{id}`. Local lightweight banner rendering is supported; GPU/video providers require separately authorized adapters. Do not store credentials in tenant rows.
