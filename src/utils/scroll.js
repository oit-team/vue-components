export function getScroller(el, root = window) {
  let node = el

  while (
    node
    && node.tagName !== 'HTML'
    && node.tagName !== 'BODY'
    && node.nodeType === 1
    && node !== root
  ) {
    const { overflowY } = window.getComputedStyle(node)
    if (/scroll|auto|overlay/i.test(overflowY)) {
      return node
    }
    node = node.parentNode
  }

  return root
}
