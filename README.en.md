# DSH Better Auto Review

[中文](README.md)

Configurable review preferences and localized denial reasons for the official DeepSeek Harness Auto Review. **0.1.0 experimental development version; real DSH integration is not yet verified.**

Standard mode retains the original runtime policy and appends presentation instructions only. Relaxed, strict and custom modes express preferences within the official policy. Auto language detection, language tags, detail, professionalism and clarity are configurable. No extra reviewer model, permission grant or parser is introduced.

Test using an isolated profile with the official Auto Review already enabled:

```sh
git clone https://github.com/ltzu929/dsh-better-auto-review.git
dsh plugin --profile demo add ./dsh-better-auto-review
dsh --profile demo --dump-config
npm --prefix ./dsh-better-auto-review test
```

Do not combine with other reviewer-prompt interceptors until interoperability is verified. Prompt instructions cannot guarantee equivalent model decisions or enforce hard limits independently. Official review errors are not converted into approval. See [validation checklist](docs/validation.md).

MIT. Inspired by the redispatch approach in [dsh-plugin-auto-review-zh](https://github.com/XavierMarquis93/dsh-plugin-auto-review-zh).
