import { resolveConfig, rewriteOptions } from './policy.js'

// Re-dispatch pattern inspired by dsh-plugin-auto-review-zh (MIT).
// No mutation of the official frozen request and no replacement of the parser.
export function registerReviewInterceptor(ctx, input) {
  let config
  try {
    config = resolveConfig(input)
  } catch {
    ctx.logger?.warn('better-auto-review: invalid configuration; official review remains active')
    return
  }
  const attempts = new WeakMap()
  ctx.effect(() => ctx.on('llm/stream', (options, next) => {
    let replacement
    try {
      if (options && typeof options === 'object') {
        const key = options.messages && typeof options.messages === 'object' ? options.messages : options
        // Bound pathological re-dispatch even if another plugin strips our marker.
        if ((attempts.get(key) ?? 0) < 3 && typeof ctx.llm?.stream === 'function') {
          replacement = rewriteOptions(options, config)
          if (replacement) attempts.set(key, (attempts.get(key) ?? 0) + 1)
        }
      }
    } catch {
      ctx.logger?.warn('better-auto-review: rewrite failed; using official request')
      replacement = undefined
    }
    if (!replacement) return next()
    // Do not catch or replay model/stream errors: the official reviewer handles failures.
    return ctx.llm.stream(replacement)
  }, { prepend: true }), 'better-auto-review: review preferences')
  ctx.logger?.info('better-auto-review: active (' + config.mode + ')')
}
