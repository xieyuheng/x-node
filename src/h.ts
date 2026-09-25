import { type XElement, type XNode } from "./x-node.ts"

type Args = NormalArgs | TagArgs | TagChildrenArgs | TagAttributesRestArgs

export function h(...args: Args): XElement {
  if (isNormalArgs(args)) {
    const [tag, attributes, children] = args
    return { tag, attributes, children }
  }

  if (isTagArgs(args)) {
    const [tag] = args
    return { tag, attributes: {}, children: [] }
  }
  if (isTagChildrenArgs(args)) {
    const [tag, children] = args
    return { tag, attributes: {}, children }
  }

  if (isTagAttributesRestArgs(args)) {
    const [tag, attributes, ...rest] = args
    return { tag, attributes, children: rest }
  }

  throw new Error(
    `[x-node internal error] unknown args: ${JSON.stringify(args)}`,
  )
}

type NormalArgs = [
  tag: string,
  attributes: Record<string, string>,
  children: Array<XNode>,
]

function isNormalArgs(args: Args): args is NormalArgs {
  return args.length === 3 && args[2] instanceof Array
}

type TagArgs = [tag: string]

function isTagArgs(args: Args): args is TagArgs {
  return args.length === 1
}

type TagChildrenArgs = [tag: string, children: Array<XNode>]

function isTagChildrenArgs(args: Args): args is TagChildrenArgs {
  return args.length === 2 && args[1] instanceof Array
}

type TagAttributesRestArgs = [
  tag: string,
  attributes: Record<string, string>,
  ...rest: Array<XNode>,
]

function isTagAttributesRestArgs(args: Args): args is TagAttributesRestArgs {
  return args.length == 2 || (args.length >= 3 && !(args[2] instanceof Array))
}
