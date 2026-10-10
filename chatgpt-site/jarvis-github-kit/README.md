# Bonga Bhengu Omni Route — Jarvis

Prepared for `bongabhenguai-art/zuxuru` on 7 October 2026.

Jarvis coordinates daily work across eight modules: sales, marketing, branding,
visibility/SEO, product discovery, opportunities/gaps, AI skills and career
rebuilding. The website workspace tracks tasks, customer records and measured
results on the user's device. A separate Jarvis Daily Route briefing is scheduled
in ChatGPT for mornings around 08:00 Africa/Johannesburg.

Installed in bongabhenguai-art/zuxuru. The first GitHub workflow run passed on 7 October 2026 and produced a downloadable plan. AI drafting still requires Copilot setup.

## Install and run inside GitHub

1. Copy `.github` and `jarvis` from this package into the root of
   `bongabhenguai-art/zuxuru`. Preserve existing files and workflows.
2. Commit the additions to the repository's default branch.
3. Open **Actions → Jarvis Omni Route → Run workflow**.
4. Choose `daily` for the three-module business route, or `creative` for the
   earlier brand/visual starting plan. Leave AI drafting off for the rules run.
5. Download the `jarvis-creative-plan` artifact from the completed run.

Once installed, the workflow also has a daily `06:00 UTC` cron trigger, around
08:00 Johannesburg time. GitHub scheduling can be delayed. This schedule is
installed in zuxuru; GitHub controls when scheduled runs start.

The daily algorithm always assigns a sales task and rotates two supporting
modules across the week. Every module receives a turn. It creates `tasks.json`,
`plan.md` and `ai-prompt.txt`; it assigns tasks rather than claiming completed
business results. Custom goals route by the visible keyword rules in the module
registry. Exact ties follow registry order; unmatched goals route to career.

## Module instructions and repository routing

- Registry: `jarvis/data/omni-modules.json`
- Module instructions: `jarvis/modules/*.md`
- Business router: `jarvis/omni_router.py`
- Creative/evidence planner: `jarvis/planner.py`
- Evidence snapshot: `jarvis/data/social-presence.json`

Each module specifies its purpose, capabilities, task, deliverable, estimated
work and evidence requirements. The instruction path travels with its task into
the optional AI drafting prompt. These are this project's module instructions;
they do not install or call external ChatGPT skills or other repositories.

## Optional AI drafting with Copilot

A Copilot-enabled account and a suitable token are required. Store the token as
an Actions repository secret called `COPILOT_PAT`. Enable `use_ai` for a manual
run. To enable it for scheduled runs, also set the repository variable
`JARVIS_ENABLE_AI` to `true`. No credential is included in this package.

The optional step uses GitHub's official Copilot CLI and the reviewed current
`ai-inference` implementation. It creates draft deliverables from the selected
module instructions and saves `ai-draft.txt`. It has no allowed tool list and
is instructed to produce text drafts, not execute actions. Keep outputs for
owner review. Authentication and model inference could not be tested without
account credentials; rules, routing, coverage and artifact generation were
tested locally. Requesting AI without its secret fails with a clear message.

The workflow pins verified GitHub action revisions. GitHub Models has been
retired; the older `ai-inference@v1` tag still points to that implementation, so
this package pins the reviewed Copilot implementation instead.

Official references:

- https://github.com/actions/ai-inference
- https://docs.github.com/en/copilot/how-tos/copilot-cli/install-copilot-cli
- https://docs.github.com/en/github-models

## Local execution and verification

Python 3.10 or later, standard library only:

```sh
python3 -m unittest discover -s jarvis -p 'test_*.py'
python3 jarvis/omni_router.py --out output/jarvis
python3 jarvis/omni_router.py --task 'Improve my brand bio and logo'
python3 jarvis/planner.py --brand ai --goal identity --out output/creative
```

## Bringing the work into the website

Open the Omni Route workspace:
https://bonga-bhengu.donlegendwear.chatgpt.site/#omni-workspace

Paste `tasks.json` into **Import a Jarvis plan**. The ChatGPT daily brief also
includes compatible task JSON. Mark tasks complete only when the work is done.
The workspace saves in the browser and can export/restore a JSON backup. It is
not connected to GitHub artifacts or ChatGPT delivery through a live endpoint.

Enter only real customer records and results. There is no seeded sales pipeline,
revenue, traffic, follower growth or conversion data. Unknown data stays unknown.

## Updating evidence and live research

The social data is a public snapshot checked 7 October 2026, not live analytics.
Preserve dates, source URLs, matching confidence and retrieval limitations when
updating it. Candidates and historical duplicates do not become confirmed links.

The GitHub runner does not scrape social media or discover private customer
contacts. The scheduled ChatGPT brief performs current public research, verifies
primary sources and prepares draft content. The GitHub AI prompt requests a
research task when current information is absent rather than inventing it.

No component sends outreach, publishes posts, spends money, applies to programmes,
changes social accounts, writes CRM, merges code or automatically deploys the
website. Repository installation, AI credentials and any external execution must
be explicitly configured; the current active automation delivers a founder brief.
