# Vendored Semgrep rulesets

Downloaded 2026-11-11 from the Semgrep Registry so CI results only change
when this repo changes (no silent rule drift):

- p-javascript.json     <- https://semgrep.dev/c/p/javascript     (pack p/javascript, 74 rules)
- p-security-audit.yml  <- https://semgrep.dev/c/p/security-audit (pack p/security-audit)

To refresh: re-download both URLs over these files in a PR; the PR diff is
the review of what changed.
