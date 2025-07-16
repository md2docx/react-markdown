import fs from "fs";
import path from "path";
import { BenchResults } from "./perf.bench";
import benchMarkResults from "../../benchmark.json";

interface Results {
  results: BenchResults;
  envInfo: {
    platform: string;
    arch: string;
    cpu: string;
    cores: number;
    node: string;
    memory: string;
    "Benchmark time": string;
  };
}

export function writeBenchmarkMarkdown(
  benchResults: Results = benchMarkResults,
  outPath = "benchmark.md",
) {
  const { results, envInfo } = benchResults;
  fs.writeFileSync(
    path.resolve("..", outPath.slice(0, -2) + "json"),
    JSON.stringify(benchResults, null, 2),
  );

  const logsDir = path.resolve("..", "benchmark-logs");
  const logsOutPath =
    outPath.slice(0, -3) +
    "_" +
    new Date(envInfo["Benchmark time"]).toISOString().replace(/:/g, "_");

  if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);

  fs.writeFileSync(
    path.resolve(logsDir, logsOutPath + ".json"),
    JSON.stringify(benchResults, null, 2),
  );

  const md: string[] = [];
  md.push(`# 📊 Markdown Render Benchmark`);

  md.push(`\n<details><summary>🧠 System Info</summary>\n`);

  Object.entries(envInfo).forEach(([param, val]) => {
    md.push(`- **${param}:** ${val}`);
  });

  md.push("</details>");

  Object.entries(results).forEach(([pluginDescription, fileResults]) => {
    md.push(`\n## Benchmarks with ${pluginDescription} plugins.\n`);

    const chart1Files = Object.keys(fileResults).sort(
      (f1, f2) =>
        fileResults[f1].reduce((acc, curr) => acc + curr.ops, 0) -
        fileResults[f2].reduce((acc, curr) => acc + curr.ops, 0),
    );
    const res1: number[] = [];
    const res2: number[] = [];
    const res3: number[] = [];
    chart1Files.forEach(testName => {
      const r1 = fileResults[testName].find(row => row.name === "react-markdown")?.ops ?? 0;
      const r2 = fileResults[testName].find(row => row.name === "@m2d/react-markdown")?.ops ?? 0;
      res1.push(r1);
      res2.push(r2);
      res3.push(((r1 - r2) / r2) * 100);
    });

    md.push(`~~~mermaid
xychart-beta
    title "Render Speed Comparison (Ops/sec)"
    x-axis ["${chart1Files.map((_, i) => i + 1).join('", "')}"]
    y-axis "Ops/sec (higher is better)"
    bar [${res1.join(", ")}]  %% react-markdown
    bar [${res2.join(", ")}]  %% @m2d/react-markdown
~~~\n`);

    md.push(`~~~mermaid
xychart-beta
    title "Render Speed Comparison (Ops/sec)"
    x-axis ["${chart1Files.map((_, i) => i + 1).join('", "')}"]
    y-axis "Δ from react-markdown (%)"
    line [${res3.join(", ")}]  %% difference percent
    line [${res3.map(() => 0).join(", ")}]  %% Zero line
~~~\n`);

    md.push(
      `> **Labels:**\n> ${chart1Files.map((name, i) => `${i + 1}: ***${name}***;`).join("\n> ")}\n`,
    );

    md.push(`<details><summary>Detailed Tables</summary>`);

    Object.entries(fileResults).forEach(([file, rows]) => {
      md.push(`\n### [${file}](./lib/fixtures/${file})\n`);
      const baseline = rows.find(r => r.name === "react-markdown")?.ops ?? rows[0].ops;

      md.push(`| Library | Ops/sec | ±% | Δ from baseline | Memory (KB) |`);
      md.push(`|---|---:|--:|--:|--:|`);

      rows
        .sort((a, b) => b.ops - a.ops)
        .forEach(r => {
          const delta = ((r.ops - baseline) / baseline) * 100;
          md.push(
            `| \`${r.name}\` | ${r.ops.toFixed(2)} | ${r.margin.toFixed(2)} | ${delta.toFixed(1)}% | coming... |`,
          );
        });
    });
    md.push(`\n</details>`);
  });

  fs.writeFileSync(path.resolve("..", outPath), md.join("\n") + "\n", "utf8");
  fs.writeFileSync(path.resolve(logsDir, logsOutPath + ".md"), md.join("\n") + "\n", "utf8");
}
