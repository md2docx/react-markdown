import Benchmark, { Suite } from "benchmark";
import ReactMarkdown from "react-markdown";
import { renderToString } from "react-dom/server";
import { Md } from "../dist";
import chalk from "chalk";
import Table from "cli-table3";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkFrontmatter from "remark-frontmatter";
import rehypeRaw from "rehype-raw";
import { files, markdowns } from "../fixtures";
import { writeBenchmarkMarkdown } from "./writer";
import { PluggableList } from "unified";

const log = console.log;

console.log = () => {};
console.debug = () => {};
console.info = () => {};
console.error = () => {};

const render = (component: React.ReactElement) => renderToString(component);

export type BenchResult = { name: string; ops: number; margin: number };
export type BenchResults = { [pluginDescription: string]: { [file: string]: BenchResult[] } };
const benchmarkResults: BenchResults = {};

const pluginLists: {
  [pluginDescription: string]: { remarkPlugins?: PluggableList; rehypePlugins?: PluggableList };
} = {
  no: {},
  "remark-gfm, remark-math, and remark-frontmatter": {
    remarkPlugins: [remarkGfm, remarkMath, remarkFrontmatter],
  },
  "remark-gfm, and rehype-raw": { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeRaw] },
};

Object.entries(pluginLists).forEach(([pluginDescription, plugins]) => {
  benchmarkResults[pluginDescription] = {};

  files.forEach((file, index) => {
    const markdown = markdowns[index];

    log(`\n📄 Benchmarking: ${file} with ${pluginDescription} plugins. \n`);
    const suite = new Benchmark.Suite();

    suite
      .add(
        "@m2d/react-markdown",
        () => {
          render(<Md {...plugins}>{markdown}</Md>);
        },
        { minSamples: 100 },
      )
      .add(
        "react-markdown",
        () => {
          render(<ReactMarkdown {...plugins}>{markdown}</ReactMarkdown>);
        },
        { minSamples: 100 },
      )
      .on("cycle", (event: any) => {
        log(String(event.target));
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
        benchmarkResults[pluginDescription][testName] = results;

        log(table.toString());
        log(chalk.greenBright("Fastest:"), this.filter("fastest").map("name").join(", "));
      })
      .run({ async: false });
  });

  log(`\n📄 Benchmarking: All files rendering together \n`);
  const suite = new Benchmark.Suite();
  suite
    .add(
      "react-markdown",
      () => {
        render(
          <>
            {markdowns.map((markdown, i) => (
              <ReactMarkdown key={i} {...plugins}>
                {markdown}
              </ReactMarkdown>
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
              <Md key={i} {...plugins}>
                {markdown}
              </Md>
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
          <Md {...plugins}>
            {markdowns.map((markdown, i) => (
              <section key={i}>{markdown}</section>
            ))}
          </Md>,
        );
      },
      { minSamples: 100 },
    )
    .on("cycle", (event: any) => {
      log(String(event.target));
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
      benchmarkResults[pluginDescription][testName] = results;

      log(table.toString());
      log(chalk.greenBright("Fastest:"), this.filter("fastest").map("name").join(", "));
    })
    .run({ async: false });
});

writeBenchmarkMarkdown(benchmarkResults);

log(chalk.green(`\n✅ Written to benchmark.md`));
