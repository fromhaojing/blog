export const seo = {
  title: '好景 | 开发者、设计师、细节控、探索者',
  description:
    '我叫 HaoJing，一名开发者、设计师、细节控、探索者',
  url: new URL(
    process.env.NODE_ENV === 'production'
      ? 'https://hjverser.com'
      : 'http://localhost:3000'
  ),
} as const
