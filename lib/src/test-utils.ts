// test-utils.ts
import type { Root as MdastRoot, Node as MdastNode, Parent } from "mdast";
import type { Root as HastRoot, Element as HastElement, Node as HastNode } from "hast";

/**
 * Flatten all nodes recursively.
 */
function flattenMdast(node: MdastNode): MdastNode[] {
  if (!("children" in node)) return [node];
  return [node, ...(node as Parent).children.flatMap(flattenMdast)];
}

function flattenHast(node: HastNode): HastNode[] {
  if (!("children" in node)) return [node];
  return [node, ...(node as Parent).children.flatMap(flattenHast)];
}

/**
 * Expect MDAST tree to contain a specific node type.
 */
export function expectMdastToContain(mdast: MdastRoot, type: MdastNode["type"], expect?: Function) {
  const nodes = flattenMdast(mdast);
  const found = nodes.some(n => n.type === type);
  expect?.(found).toBe(true);
  return found;
}

/**
 * Expect HAST tree to NOT contain a specific tag.
 */
export function expectHastToExclude(hast: HastRoot, tagName: string, expect?: Function) {
  const nodes = flattenHast(hast);
  const found = nodes.some(n => n.type === "element" && (n as HastElement).tagName === tagName);
  expect?.(found).toBe(false);
  return !found;
}

/**
 * Expect exactly one instance of a node type in MDAST.
 */
export function expectSingleMdastNode(
  mdast: MdastRoot,
  type: MdastNode["type"],
  expect?: Function,
) {
  const nodes = flattenMdast(mdast);
  const count = nodes.filter(n => n.type === type).length;
  expect?.(count).toBe(1);
  return count === 1;
}
