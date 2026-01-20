import { useTheme } from 'next-themes'
import { useEffect, useRef } from 'react'

/** —— 极简版动态样式工具 —— */
const updateCSS = (css: string, key: string) => {
  let style = document.getElementById(key) as HTMLStyleElement | null
  if (!style) {
    style = document.createElement('style')
    style.id = key
    document.head.appendChild(style)
  }
  style.innerHTML = css
}
const removeCSS = (key: string) => {
  const style = document.getElementById(key)
  style?.parentNode?.removeChild(style)
}

/** —— View‑Transition + clip‑path 动画 —— */
const viewTransitionStyle = `
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
.dark::view-transition-old(root) { z-index: 1; }
.dark::view-transition-new(root) { z-index: 999; }
::view-transition-old(root) { z-index: 999; }
::view-transition-new(root) { z-index: 1; }
`

const useThemeAnimation = () => {
  const { resolvedTheme } = useTheme()

  const isDarkRef = useRef(resolvedTheme === 'dark')

  /** 禁用全局过渡 + 执行 clip‑path 动画 */
  const startClipAnimation = (clipPath: string[], reverse = false) => {
    updateCSS('*{transition:none!important}', 'disable-transition')
    document.documentElement
      .animate(
        { clipPath: reverse ? [...clipPath].reverse() : clipPath },
        {
          duration: 500,
          easing: 'ease-in',
          pseudoElement: reverse
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
          fill: 'forwards',
        }
      )
      .addEventListener('finish', () => {
        removeCSS('disable-transition')
      })
  }

  /** 入口：在点击处触发动画并切换主题 */
  const toggleAnimationTheme = (
    e: React.MouseEvent<HTMLElement>
  ): Promise<boolean> => {
    if (typeof document.startViewTransition !== 'function') {
      return Promise.resolve(isDarkRef.current)
    }

    const wasDark = isDarkRef.current

    const { clientX: x, clientY: y } = e
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )

    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ]

    const transition = document.startViewTransition(() => {
      document.documentElement.classList.toggle('dark')
      document.documentElement.classList.toggle('light')
      isDarkRef.current = !wasDark
    })

    return new Promise<boolean>((resolve) => {
      transition.ready.then(() => {
        startClipAnimation(clipPath, wasDark)
        resolve(!wasDark)
      })
    })
  }

  /** 首次注入 ::view-transition-* 兼容样式 */
  useEffect(() => {
    if (
      document?.startViewTransition &&
      typeof document?.startViewTransition === 'function'
    ) {
      updateCSS(viewTransitionStyle, 'view-transition-style')
    }
  }, [])

  return toggleAnimationTheme
}

export default useThemeAnimation
