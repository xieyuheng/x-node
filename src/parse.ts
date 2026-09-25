import {
  parseXml,
  type XmlElement,
  type XmlNode,
  type XmlText,
} from "@rgrove/parse-xml"
import { h } from "./h.ts"
import { type XElement, type XNode } from "./x-node.ts"

interface ParsingErrorOptions {
  column: number
  excerpt: string
  line: number
  pos: number
}

export class ParsingError extends Error {
  column: number
  excerpt: string
  line: number
  pos: number

  constructor(message: string, options: ParsingErrorOptions) {
    super(message)
    this.column = options.column
    this.excerpt = options.excerpt
    this.line = options.line
    this.pos = options.pos
  }
}

export function parse(input: string): Array<XNode> {
  try {
    const root = parseXml(`<root>${input}</root>`, {
      ignoreUndefinedEntities: true,
    })

    return fromNodes((root.children[0] as any).children)
  } catch (error) {
    if (!(error instanceof Error)) throw error
    if (
      error.hasOwnProperty("column") &&
      error.hasOwnProperty("excerpt") &&
      error.hasOwnProperty("line") &&
      error.hasOwnProperty("pos")
    ) {
      throw new ParsingError(error.message, error as any)
    } else {
      throw error
    }
  }
}

function fromNodes(childNodes: Array<XmlNode>): Array<XNode> {
  const nodes = []
  for (const node of childNodes) {
    if (node.type === "element") nodes.push(fromElement(node as XmlElement))
    if (node.type === "text") nodes.push(fromText(node as XmlText))
  }

  return nodes
}

function fromText(node: XmlText): string {
  return node.text
}

function fromElement(node: XmlElement): XElement {
  return h(node.name, node.attributes, fromNodes(node.children))
}
