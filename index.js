import Schema from '@deepseek-ai/schemastery'
import { DEFAULTS } from './src/policy.js'
import { registerReviewInterceptor } from './src/interceptor.js'

export const name = 'better-auto-review'
export const inject = ['llm']

// Cordis 原生配置 schema，默认值与纯逻辑模块一致。
export const Config = Schema.object({
  mode: Schema.union(['relaxed', 'standard', 'strict', 'custom']).default(DEFAULTS.mode).description('Review policy / 审查力度'),
  customPolicy: Schema.string().default('').description('Custom policy (custom mode only; official hard limits prevail) / 自定义策略'),
  language: Schema.string().default(DEFAULTS.language).description('auto or a language code, e.g. zh-CN, en, ja / 理由语言'),
  detail: Schema.union(['low', 'medium', 'high']).default(DEFAULTS.detail).description('Reason detail / 详细度'),
  professionalism: Schema.union(['low', 'medium', 'high']).default(DEFAULTS.professionalism).description('Technical vocabulary / 专业度'),
  clarity: Schema.union(['low', 'medium', 'high']).default(DEFAULTS.clarity).description('Reason clarity / 易懂度'),
})

export function apply(ctx, config) {
  registerReviewInterceptor(ctx, config)
}
