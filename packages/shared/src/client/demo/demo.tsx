"use client";

import styles from "./demo.module.scss";
import { Md, AstArrayElement } from "@m2d/react-markdown";
import md from "../../../../../sample.md?raw";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkMath from "remark-math";
import { useRef } from "react";
import { toDocx } from "mdast2docx";

/** React live demo */
export function Demo() {
  const astRef = useRef<AstArrayElement[]>(undefined);
  return (
    <div className={styles.demo}>
      {astRef.current?.[0].mdast && (
        <button
          onClick={async () => {
            if (!astRef.current?.[0].mdast) return;
            const docxBlob = (await toDocx(astRef.current[0].mdast)) as Blob;
            const url = URL.createObjectURL(docxBlob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "sample.docx";
            a.click();
            URL.revokeObjectURL(url);
          }}>
          Download Docx
        </button>
      )}
      <Md
        remarkPlugins={[remarkGfm, remarkFrontmatter, remarkMath]}
        astRef={astRef}
        style={{ textAlign: "start", padding: "20px" }}>
        {md}
      </Md>
    </div>
  );
}
