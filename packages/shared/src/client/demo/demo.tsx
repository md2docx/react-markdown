"use client";

import styles from "./demo.module.scss";
import { Md } from "@m2d/react-markdown";
import md from "../../../../../sample.md?raw";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkMath from "remark-math";

/** React live demo */
export function Demo() {
  return (
    <div className={styles.demo}>
      <Md
        remarkPlugins={[remarkGfm, remarkFrontmatter, remarkMath]}
        style={{ textAlign: "start", padding: "20px" }}>
        {md}
      </Md>
    </div>
  );
}
