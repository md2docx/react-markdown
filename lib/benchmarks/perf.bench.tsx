import Benchmark, { Suite } from "benchmark";
import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import { renderToString } from "react-dom/server";
import { Md } from "../dist";
import chalk from "chalk";
import Table from "cli-table3";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { EOL } from "os";

const render = (component: React.ReactElement) => renderToString(component);

const fixturesDir = path.resolve("fixtures");
const files = ["sample.md", "short.md", "medium.md", "long.md"];

const markdowns = files.map(file => fs.readFileSync(path.join(fixturesDir, file), "utf8"));

type BenchResult = { name: string; ops: number; margin: number };
const benchmarkResults: Record<string, BenchResult[]> = {};

files.forEach((file, index) => {
  const markdown = markdowns[index];

  console.log(`\n📄 Benchmarking: ${file}\n`);
  const suite = new Benchmark.Suite();

  suite
    .add(
      "@m2d/react-markdown",
      () => {
        render(<Md>{markdown}</Md>);
      },
      { minSamples: 100 },
    )
    .add(
      "@m2d/react-markdown with remark-math and remark-gfm",
      () => {
        render(<Md remarkPlugins={[remarkGfm, remarkMath]}>{markdown}</Md>);
      },
      { minSamples: 100 },
    )
    .add(
      "react-markdown",
      () => {
        render(<ReactMarkdown>{markdown}</ReactMarkdown>);
      },
      { minSamples: 100 },
    )
    .add(
      "react-markdown with remark-math and remark-gfm",
      () => {
        render(<ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]}>{markdown}</ReactMarkdown>);
      },
      { minSamples: 100 },
    )
    .on("cycle", (event: any) => {
      console.log(String(event.target));
    })
    .on("complete", function (this: Suite) {
      const table = new Table({
        head: [chalk.bold("Library"), chalk.bold("Ops/sec"), chalk.bold("±%")],
        colAligns: ["left", "right", "right"],
      });

      const results: BenchResult[] = [];
      this.forEach((bench: Benchmark) => {
        const name = bench.name ?? "";
        const ops = bench.hz;
        const margin = bench.stats.rme;
        table.push([name, ops.toFixed(2), margin.toFixed(2)]);
        results.push({ name, ops, margin });
      });

      const testName = file;
      benchmarkResults[testName] = results;

      console.log(table.toString());
      console.log(chalk.greenBright("Fastest:"), this.filter("fastest").map("name").join(", "));
    })
    .run({ async: false });
});

console.log(`\n📄 Benchmarking: All files rendering together \n`);
const suite = new Benchmark.Suite();

suite
  .add(
    "react-markdown",
    () => {
      render(
        <>
          {markdowns.map((markdown, i) => (
            <ReactMarkdown key={i}>{markdown}</ReactMarkdown>
          ))}
        </>,
      );
    },
    { minSamples: 100 },
  )
  .add(
    "@m2d/react-markdown",
    () => {
      render(
        <>
          {markdowns.map((markdown, i) => (
            <Md key={i}>{markdown}</Md>
          ))}
        </>,
      );
    },
    { minSamples: 100 },
  )
  .add(
    "@m2d/react-markdown as nested jsx",
    () => {
      render(
        <Md>
          {markdowns.map((markdown, i) => (
            <section key={i}>{markdown}</section>
          ))}
        </Md>,
      );
    },
    { minSamples: 100 },
  )
  .on("cycle", (event: any) => {
    console.log(String(event.target));
  })
  .on("complete", function (this: Suite) {
    const table = new Table({
      head: [chalk.bold("Library"), chalk.bold("Ops/sec"), chalk.bold("±%")],
      colAligns: ["left", "right", "right"],
    });

    const results: BenchResult[] = [];
    this.forEach((bench: Benchmark) => {
      const name = bench.name ?? "";
      const ops = bench.hz;
      const margin = bench.stats.rme;
      table.push([name, ops.toFixed(2), margin.toFixed(2)]);
      results.push({ name, ops, margin });
    });

    const testName = "All files";
    benchmarkResults[testName] = results;

    console.log(table.toString());
    console.log(chalk.greenBright("Fastest:"), this.filter("fastest").map("name").join(", "));
  })
  .run({ async: false });

const md = [`# 📊 Markdown Renderer Benchmark\n`, `> Generated on ${new Date().toISOString()}\n\n`];

for (const [name, results] of Object.entries(benchmarkResults)) {
  md.push(`## 📄 ${name}\n`);
  md.push(`| Library | Ops/sec | ±% |`);
  md.push(`|---------|---------:|----:|`);
  for (const { name, ops, margin } of results.sort((a, b) => b.ops - a.ops)) {
    md.push(`| ${name} | ${ops.toFixed(2)} | ${margin.toFixed(2)} |`);
  }
  md.push(""); // newline
}

fs.writeFileSync("benchmark.md", md.join(EOL));
console.log(chalk.green(`\n✅ Written to benchmark.md`));
