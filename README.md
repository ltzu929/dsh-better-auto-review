# DSH Better Auto Review

[English](README.en.md)

为 DeepSeek Harness 的官方 Auto Review 提供审查偏好和拒绝理由表达配置。当前为 **0.1.0 测试版**，尚未完成真实 DSH 端到端验证，也未收录插件市场。

## 功能

- 宽松、标准、严格三档，自定义模式覆盖预设偏好。
- 标准模式保留运行时官方策略原文，仅追加理由表达要求。
- 自动识别用户语言，也支持手动填写语言标签（如 zh-CN、en、ja）。
- 详细度、专业度、易懂度三档可调。
- 不新增模型服务或调用，不接管审批、工具权限和 JSON 解析。
- 仅使用官方 llm/stream 接口，保留原请求的其他字段与取消信号。

## 本地试用

要求官方 Auto Review 已启用；不要同时启用其他改写 reviewer prompt 的插件。在独立测试 profile 使用，先确认当前 DSH 版本属于 0.2.x。

```sh
git clone https://github.com/ltzu929/dsh-better-auto-review.git
dsh plugin --profile demo add ./dsh-better-auto-review
dsh --profile demo --dump-config
```

桌面端可使用 plugin_manager 的 install_bundle 指向 checkout，重启后检查插件配置。当前未实测安装流程或原生设置界面。

在插件配置中选择 mode、customPolicy、language、detail、professionalism、clarity。默认 standard、auto、medium、medium、high。customPolicy 仅在 custom 模式生效；非空且不超过 12000 字符。语言使用 auto 或语言标签。配置错误会保留官方行为或由宿主拒绝加载。原生多行输入控件仍需实测。

## 安全边界

预设与自定义策略仅在官方允许的判断空间内表达偏好，不能授予工具权限或覆盖官方高风险拒绝规则。提示词不是强制执行机制；不能保证模型一定遵循，也不能保证标准模式附加表达要求后每次裁决都相同。使用官方审查器处理解析失败，不自动放行、不自动重试已派发的模型请求。未知请求指纹直接透传。

## 验证与贡献

```sh
npm run check
npm test
npm pack --dry-run
```

参见 [本地验收清单](docs/validation.md) 和 [市场投稿准备](docs/market.md)。本项目借鉴 [dsh-plugin-auto-review-zh](https://github.com/XavierMarquis93/dsh-plugin-auto-review-zh) 的重新派发方案（MIT），保留版权声明。官方 DSH 策略原文在运行时使用，不复制入仓库。

MIT License.
