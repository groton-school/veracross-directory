# @groton/veracross-directory

A directory for Veracross configurable by audience and embeddable in the portal

## Install

See [scripts/deploy](./scripts/deploy) for notes on thing not covered by the deploy script.

```
pnpm install
pnpm run deploy
```

On a Veracross portal, add a content page in the portal with an embed:

```html
<iframe
  width="100%"
  height="600"
  scrolling="yes"
  frameborder="no"
  src="https://<cloud-run-service-url>/audience/<audience>"
></iframe>
```

The first visit to the page should be by a service account user to authorize API access.
