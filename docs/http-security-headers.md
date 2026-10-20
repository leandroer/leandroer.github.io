# Static-site browser protections

Every exported page receives a per-page hash-based CSP before deployment. Required
Next.js bootstrap scripts are authorized by their exact SHA-256 hashes; arbitrary
inline code, evaluation, off-site scripts, plugins, forms, and embedded frames are
not permitted. Inline style attributes, where generated, use exact hashes rather
than broad unsafe-inline permission. Runtime navigation and diagrams are tested.
A referrer policy is supplied through document metadata.

GitHub Pages currently returns HTTPS and HSTS but no configurable per-repository
CSP, X-Frame-Options, or X-Content-Type-Options response headers. HTML meta CSP
cannot enforce frame-ancestors. A repository file named `_headers` would not
activate those protections on this hosting platform, so none is presented as an
active control.

If a response-header-capable proxy/CDN is placed in front of the custom domain,
apply the following additional response headers without removing the per-page
meta CSP or allowing unsafe-inline/unsafe-eval:

```text
Content-Security-Policy: frame-ancestors 'none'; object-src 'none'; base-uri 'self'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

The HTTP CSP and per-page meta CSP are both enforced; the narrow header above
supplies the anti-framing control while each document retains its own script
hashes. A static global script-src header must not omit those hashes, since that
would block the framework bootstrap.

Verify actual production responses with `curl -I https://lrinfosec.com/` and
browser navigation tests before reporting these optional HTTP headers as enabled.
Changing DNS, proxy ownership, or paid hosting is a separate infrastructure step.
