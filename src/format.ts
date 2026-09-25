import { type XElement, type XNode } from "./x-node.ts"

export function format(nodes: Array<XNode>): string {
  return nodes
    .map((node) => {
      if (typeof node === "string") {
        return node
      } else {
        return formatElement(node)
      }
    })
    .join("")
}

export function formatElement(element: XElement): string {
  const { tag, children } = element

  const attributes = Object.entries(element.attributes)
    .map(([key, value]) => `${key}="${value}"`)
    .join(" ")

  if (attributes.length === 0) {
    return `<${tag}>${format(children)}</${tag}>`
  } else {
    return `<${tag} ${attributes}>${format(children)}</${tag}>`
  }
}
