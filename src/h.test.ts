import assert from "node:assert"
import { test } from "node:test"
import { h } from "./h.ts"

test("h", () => {
  assert.deepStrictEqual(h("question", { color: "red" }, ["Why?"]), {
    tag: "question",
    attributes: { color: "red" },
    children: ["Why?"],
  })

  assert.deepStrictEqual(h("question", ["Why?"]), {
    tag: "question",
    attributes: {},
    children: ["Why?"],
  })

  assert.deepStrictEqual(h("question", { color: "red" }), {
    tag: "question",
    attributes: { color: "red" },
    children: [],
  })

  assert.deepStrictEqual(h("question", { color: "red" }, "Why?"), {
    tag: "question",
    attributes: { color: "red" },
    children: ["Why?"],
  })
})
