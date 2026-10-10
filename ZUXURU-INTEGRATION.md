# Zuxuru source in Bonga Bhengu App

Zuxuru is included as the `zuxuru` Git submodule. This retains its complete source and binary assets without replacing the existing Bonga Bhengu application.

Pinned source: `17e26c3cbaebd85eaa8e46ddbddb73efd1c3db3e` in https://github.com/bongabhenguai-art/zuxuru.
Published Zuxuru Site: https://zuxuru.donlegendwear.chatgpt.site
Site version: 9; deployed Site source commit: `6fb1b18522c213b8ea692608aaa40d83ff78b9eb`.
The GitHub snapshot includes the dashboard, evidence-driven intelligence, business memory, AI gateway adapters, source inventory and tests from that publication.

Retrieve the complete project:

```sh
git clone --recurse-submodules https://github.com/bongabhenguai-art/bonga-bhengu.git
```

For an existing checkout:

```sh
git submodule update --init --recursive
```

This is a source integration, not a runtime merge. Existing Bonga Bhengu routes, hosting configuration, identity and storage are preserved. Zuxuru retains its existing Site identity and must not be deployed as a replacement for Bonga Bhengu. No credentials or private business records are copied. Its live AI, search and publishing adapters still require their own authorized service connections. Continuous Jarvis automation is not included.

The local development environment was unavailable during this source integration; no new build or runtime tests were executed. The pinned source retains its previous verification tests.
