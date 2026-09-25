import assert from "node:assert"
import { test } from "node:test"
import { format } from "./format.ts"
import { parse } from "./parse.ts"

test("format", () => {
  const text = `
hi

<x> hi </x>

hi

<x a="1"> hi </x>
`
  const nodes = parse(text)

  assert(format(nodes) === text)
})
