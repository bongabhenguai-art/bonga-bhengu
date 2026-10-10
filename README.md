# Bonga Bhengu App

The existing application's shared multi-tenant backend modules remain in their original folders. The complete source mirror of the existing ChatGPT site is in [chatgpt-site](chatgpt-site/README.md), including its frontend, Worker, migrations, tests and retained project files. This repository does not create a replacement application. Site publication uses the existing deployment process.

## Run

```bash
cd creative-studio
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app:app --reload
```

Use `POST /tenants`, `POST /jobs` and `GET /jobs/{id}`. Local lightweight banner rendering is supported; GPU/video providers require separately authorized adapters. Do not store credentials in tenant rows.
