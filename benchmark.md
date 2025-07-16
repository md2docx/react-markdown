# 📊 Markdown Render Benchmark

<details><summary>🧠 System Info</summary>

- **platform:** win32
- **arch:** x64
- **cpu:** 11th Gen Intel(R) Core(TM) i5-1135G7 @ 2.40GHz
- **cores:** 8
- **node:** v20.10.0
- **memory:** 15.79 GB
- **Benchmark time:** Wed Jul 16 2025 08:33:26 GMT+0530 (India Standard Time)
</details>

## Benchmarks with no plugins.

~~~mermaid
xychart-beta
    title "Render Speed Comparison (Ops/sec)"
    x-axis ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]
    y-axis "Ops/sec (higher is better)"
    bar [10.19241185378493, 15.237887498464271, 39.713028229613265, 265.37261980873586, 454.19301624869837, 616.5809492411433, 724.1123046146485, 758.424039014117, 866.0574034095946, 1177.7567013493037, 1879.962645100728]  %% react-markdown
    bar [10.133560407898365, 18.23614021035891, 40.783066566324685, 288.63007354074966, 453.09569784380045, 708.6733907578804, 665.0317518751667, 733.2498839570549, 936.7250406151065, 1020.0592956469054, 1764.4388808432216]  %% @m2d/react-markdown
~~~

~~~mermaid
xychart-beta
    title "Render Speed Comparison (Ops/sec)"
    x-axis ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]
    y-axis "Δ from react-markdown (%)"
    line [0.5807578335517227, -16.441268148352485, -2.6237319230794918, -8.057876106500123, 0.24218248156401764, -12.995047185029781, 8.883869465314156, 3.433230009012398, -7.544117445510754, 15.459631256278012, 6.547337258987279]  %% difference percent
    line [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  %% Zero line
~~~

> **Labels:**
> 1: ***All files***;
> 2: ***long.md***;
> 3: ***sample.md***;
> 4: ***medium.md***;
> 5: ***tutorial.md***;
> 6: ***site-content.md***;
> 7: ***deeply-nested-lists.md***;
> 8: ***formatting.md***;
> 9: ***gfm-complexity.md***;
> 10: ***simple.md***;
> 11: ***short.md***;

<details><summary>Detailed Tables</summary>

### [sample.md](./lib/fixtures/sample.md)

| Library | Ops/sec | ±% | Δ from baseline | Memory (KB) |
|---|---:|--:|--:|--:|
| `@m2d/react-markdown` | 40.78 | 2.66 | 2.7% | coming... |
| `react-markdown` | 39.71 | 3.48 | 0.0% | coming... |

### [short.md](./lib/fixtures/short.md)

| Library | Ops/sec | ±% | Δ from baseline | Memory (KB) |
|---|---:|--:|--:|--:|
| `react-markdown` | 1879.96 | 3.00 | 0.0% | coming... |
| `@m2d/react-markdown` | 1764.44 | 3.87 | -6.1% | coming... |

### [medium.md](./lib/fixtures/medium.md)

| Library | Ops/sec | ±% | Δ from baseline | Memory (KB) |
|---|---:|--:|--:|--:|
| `@m2d/react-markdown` | 288.63 | 4.21 | 8.8% | coming... |
| `react-markdown` | 265.37 | 4.43 | 0.0% | coming... |

### [long.md](./lib/fixtures/long.md)

| Library | Ops/sec | ±% | Δ from baseline | Memory (KB) |
|---|---:|--:|--:|--:|
| `@m2d/react-markdown` | 18.24 | 5.28 | 19.7% | coming... |
| `react-markdown` | 15.24 | 7.47 | 0.0% | coming... |

### [simple.md](./lib/fixtures/simple.md)

| Library | Ops/sec | ±% | Δ from baseline | Memory (KB) |
|---|---:|--:|--:|--:|
| `react-markdown` | 1177.76 | 3.09 | 0.0% | coming... |
| `@m2d/react-markdown` | 1020.06 | 4.26 | -13.4% | coming... |

### [formatting.md](./lib/fixtures/formatting.md)

| Library | Ops/sec | ±% | Δ from baseline | Memory (KB) |
|---|---:|--:|--:|--:|
| `react-markdown` | 758.42 | 2.59 | 0.0% | coming... |
| `@m2d/react-markdown` | 733.25 | 2.89 | -3.3% | coming... |

### [tutorial.md](./lib/fixtures/tutorial.md)

| Library | Ops/sec | ±% | Δ from baseline | Memory (KB) |
|---|---:|--:|--:|--:|
| `react-markdown` | 454.19 | 2.85 | 0.0% | coming... |
| `@m2d/react-markdown` | 453.10 | 2.96 | -0.2% | coming... |

### [gfm-complexity.md](./lib/fixtures/gfm-complexity.md)

| Library | Ops/sec | ±% | Δ from baseline | Memory (KB) |
|---|---:|--:|--:|--:|
| `@m2d/react-markdown` | 936.73 | 2.99 | 8.2% | coming... |
| `react-markdown` | 866.06 | 2.78 | 0.0% | coming... |

### [deeply-nested-lists.md](./lib/fixtures/deeply-nested-lists.md)

| Library | Ops/sec | ±% | Δ from baseline | Memory (KB) |
|---|---:|--:|--:|--:|
| `react-markdown` | 724.11 | 3.27 | 0.0% | coming... |
| `@m2d/react-markdown` | 665.03 | 4.00 | -8.2% | coming... |

### [site-content.md](./lib/fixtures/site-content.md)

| Library | Ops/sec | ±% | Δ from baseline | Memory (KB) |
|---|---:|--:|--:|--:|
| `@m2d/react-markdown` | 708.67 | 3.61 | 14.9% | coming... |
| `react-markdown` | 616.58 | 2.62 | 0.0% | coming... |

### [All files](./lib/fixtures/All files)

| Library | Ops/sec | ±% | Δ from baseline | Memory (KB) |
|---|---:|--:|--:|--:|
| `react-markdown` | 10.19 | 3.95 | 0.0% | coming... |
| `@m2d/react-markdown` | 10.13 | 4.18 | -0.6% | coming... |

</details>

## Benchmarks with remark-gfm, remark-math, and remark-frontmatter plugins.

~~~mermaid
xychart-beta
    title "Render Speed Comparison (Ops/sec)"
    x-axis ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]
    y-axis "Ops/sec (higher is better)"
    bar [9.19456457767856, 14.578606252619634, 29.142933933555984, 158.88284646816587, 225.35154997154035, 421.93735395253873, 447.6945290689255, 477.49125840194716, 524.1407411477045, 650.0743277927277, 1089.0568990174372]  %% react-markdown
    bar [8.96118917853905, 14.860516873811127, 28.73244101557091, 195.387272610289, 215.75654174032388, 485.32158072860494, 480.0805799394233, 455.19895584073123, 525.698868676371, 603.6594901074635, 951.0962117337364]  %% @m2d/react-markdown
~~~

~~~mermaid
xychart-beta
    title "Render Speed Comparison (Ops/sec)"
    x-axis ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]
    y-axis "Δ from react-markdown (%)"
    line [2.6042905075413074, -1.8970445212999782, 1.4286740126347661, -18.68311362067747, 4.447145914474586, -13.060253096701071, -6.745961453925981, 4.897265750542659, -0.2963916457704525, 7.688910461260434, 14.505439679148207]  %% difference percent
    line [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  %% Zero line
~~~

> **Labels:**
> 1: ***All files***;
> 2: ***long.md***;
> 3: ***sample.md***;
> 4: ***medium.md***;
> 5: ***tutorial.md***;
> 6: ***gfm-complexity.md***;
> 7: ***deeply-nested-lists.md***;
> 8: ***formatting.md***;
> 9: ***site-content.md***;
> 10: ***simple.md***;
> 11: ***short.md***;

<details><summary>Detailed Tables</summary>

### [sample.md](./lib/fixtures/sample.md)

| Library | Ops/sec | ±% | Δ from baseline | Memory (KB) |
|---|---:|--:|--:|--:|
| `react-markdown` | 29.14 | 2.35 | 0.0% | coming... |
| `@m2d/react-markdown` | 28.73 | 2.53 | -1.4% | coming... |

### [short.md](./lib/fixtures/short.md)

| Library | Ops/sec | ±% | Δ from baseline | Memory (KB) |
|---|---:|--:|--:|--:|
| `react-markdown` | 1089.06 | 2.57 | 0.0% | coming... |
| `@m2d/react-markdown` | 951.10 | 3.39 | -12.7% | coming... |

### [medium.md](./lib/fixtures/medium.md)

| Library | Ops/sec | ±% | Δ from baseline | Memory (KB) |
|---|---:|--:|--:|--:|
| `@m2d/react-markdown` | 195.39 | 3.44 | 23.0% | coming... |
| `react-markdown` | 158.88 | 6.18 | 0.0% | coming... |

### [long.md](./lib/fixtures/long.md)

| Library | Ops/sec | ±% | Δ from baseline | Memory (KB) |
|---|---:|--:|--:|--:|
| `@m2d/react-markdown` | 14.86 | 4.59 | 1.9% | coming... |
| `react-markdown` | 14.58 | 4.55 | 0.0% | coming... |

### [simple.md](./lib/fixtures/simple.md)

| Library | Ops/sec | ±% | Δ from baseline | Memory (KB) |
|---|---:|--:|--:|--:|
| `react-markdown` | 650.07 | 1.95 | 0.0% | coming... |
| `@m2d/react-markdown` | 603.66 | 2.78 | -7.1% | coming... |

### [formatting.md](./lib/fixtures/formatting.md)

| Library | Ops/sec | ±% | Δ from baseline | Memory (KB) |
|---|---:|--:|--:|--:|
| `react-markdown` | 477.49 | 1.53 | 0.0% | coming... |
| `@m2d/react-markdown` | 455.20 | 2.22 | -4.7% | coming... |

### [tutorial.md](./lib/fixtures/tutorial.md)

| Library | Ops/sec | ±% | Δ from baseline | Memory (KB) |
|---|---:|--:|--:|--:|
| `react-markdown` | 225.35 | 3.12 | 0.0% | coming... |
| `@m2d/react-markdown` | 215.76 | 3.06 | -4.3% | coming... |

### [gfm-complexity.md](./lib/fixtures/gfm-complexity.md)

| Library | Ops/sec | ±% | Δ from baseline | Memory (KB) |
|---|---:|--:|--:|--:|
| `@m2d/react-markdown` | 485.32 | 3.18 | 15.0% | coming... |
| `react-markdown` | 421.94 | 3.04 | 0.0% | coming... |

### [deeply-nested-lists.md](./lib/fixtures/deeply-nested-lists.md)

| Library | Ops/sec | ±% | Δ from baseline | Memory (KB) |
|---|---:|--:|--:|--:|
| `@m2d/react-markdown` | 480.08 | 2.15 | 7.2% | coming... |
| `react-markdown` | 447.69 | 2.66 | 0.0% | coming... |

### [site-content.md](./lib/fixtures/site-content.md)

| Library | Ops/sec | ±% | Δ from baseline | Memory (KB) |
|---|---:|--:|--:|--:|
| `@m2d/react-markdown` | 525.70 | 1.38 | 0.3% | coming... |
| `react-markdown` | 524.14 | 0.90 | 0.0% | coming... |

### [All files](./lib/fixtures/All files)

| Library | Ops/sec | ±% | Δ from baseline | Memory (KB) |
|---|---:|--:|--:|--:|
| `react-markdown` | 9.19 | 3.37 | 0.0% | coming... |
| `@m2d/react-markdown` | 8.96 | 3.30 | -2.5% | coming... |

</details>

## Benchmarks with remark-gfm, and rehype-raw plugins.

~~~mermaid
xychart-beta
    title "Render Speed Comparison (Ops/sec)"
    x-axis ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]
    y-axis "Ops/sec (higher is better)"
    bar [8.02421290194737, 15.894618270681677, 25.173484977461364, 121.15251191659108, 186.6724887049371, 199.0681477924004, 209.0951917041034, 236.14592059014348, 468.8030153114202, 586.8802132888387, 1144.86793763487]  %% react-markdown
    bar [7.486454817065299, 16.15020671678501, 26.10507804986317, 116.25241644487154, 191.00768695360517, 207.25573796737376, 205.57262698376056, 235.46064957103835, 338.2600767452376, 649.8923806337748, 1073.6895157183899]  %% @m2d/react-markdown
~~~

~~~mermaid
xychart-beta
    title "Render Speed Comparison (Ops/sec)"
    x-axis ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]
    y-axis "Δ from react-markdown (%)"
    line [7.183080617226957, -1.5825707409534187, -3.5686277996272433, 4.215048273033731, -2.269645959181246, -3.9504769591770037, 1.713537824576767, 0.29103420055688933, 38.592475890822236, -9.695784905723412, 6.629330069303667]  %% difference percent
    line [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  %% Zero line
~~~

> **Labels:**
> 1: ***All files***;
> 2: ***long.md***;
> 3: ***sample.md***;
> 4: ***tutorial.md***;
> 5: ***medium.md***;
> 6: ***deeply-nested-lists.md***;
> 7: ***gfm-complexity.md***;
> 8: ***formatting.md***;
> 9: ***site-content.md***;
> 10: ***simple.md***;
> 11: ***short.md***;

<details><summary>Detailed Tables</summary>

### [sample.md](./lib/fixtures/sample.md)

| Library | Ops/sec | ±% | Δ from baseline | Memory (KB) |
|---|---:|--:|--:|--:|
| `@m2d/react-markdown` | 26.11 | 1.89 | 3.7% | coming... |
| `react-markdown` | 25.17 | 1.76 | 0.0% | coming... |

### [short.md](./lib/fixtures/short.md)

| Library | Ops/sec | ±% | Δ from baseline | Memory (KB) |
|---|---:|--:|--:|--:|
| `react-markdown` | 1144.87 | 0.88 | 0.0% | coming... |
| `@m2d/react-markdown` | 1073.69 | 1.33 | -6.2% | coming... |

### [medium.md](./lib/fixtures/medium.md)

| Library | Ops/sec | ±% | Δ from baseline | Memory (KB) |
|---|---:|--:|--:|--:|
| `@m2d/react-markdown` | 191.01 | 2.76 | 2.3% | coming... |
| `react-markdown` | 186.67 | 2.49 | 0.0% | coming... |

### [long.md](./lib/fixtures/long.md)

| Library | Ops/sec | ±% | Δ from baseline | Memory (KB) |
|---|---:|--:|--:|--:|
| `@m2d/react-markdown` | 16.15 | 3.46 | 1.6% | coming... |
| `react-markdown` | 15.89 | 3.85 | 0.0% | coming... |

### [simple.md](./lib/fixtures/simple.md)

| Library | Ops/sec | ±% | Δ from baseline | Memory (KB) |
|---|---:|--:|--:|--:|
| `@m2d/react-markdown` | 649.89 | 1.01 | 10.7% | coming... |
| `react-markdown` | 586.88 | 3.82 | 0.0% | coming... |

### [formatting.md](./lib/fixtures/formatting.md)

| Library | Ops/sec | ±% | Δ from baseline | Memory (KB) |
|---|---:|--:|--:|--:|
| `react-markdown` | 236.15 | 3.09 | 0.0% | coming... |
| `@m2d/react-markdown` | 235.46 | 3.17 | -0.3% | coming... |

### [tutorial.md](./lib/fixtures/tutorial.md)

| Library | Ops/sec | ±% | Δ from baseline | Memory (KB) |
|---|---:|--:|--:|--:|
| `react-markdown` | 121.15 | 2.98 | 0.0% | coming... |
| `@m2d/react-markdown` | 116.25 | 2.60 | -4.0% | coming... |

### [gfm-complexity.md](./lib/fixtures/gfm-complexity.md)

| Library | Ops/sec | ±% | Δ from baseline | Memory (KB) |
|---|---:|--:|--:|--:|
| `react-markdown` | 209.10 | 3.09 | 0.0% | coming... |
| `@m2d/react-markdown` | 205.57 | 3.01 | -1.7% | coming... |

### [deeply-nested-lists.md](./lib/fixtures/deeply-nested-lists.md)

| Library | Ops/sec | ±% | Δ from baseline | Memory (KB) |
|---|---:|--:|--:|--:|
| `@m2d/react-markdown` | 207.26 | 2.97 | 4.1% | coming... |
| `react-markdown` | 199.07 | 3.45 | 0.0% | coming... |

### [site-content.md](./lib/fixtures/site-content.md)

| Library | Ops/sec | ±% | Δ from baseline | Memory (KB) |
|---|---:|--:|--:|--:|
| `react-markdown` | 468.80 | 2.59 | 0.0% | coming... |
| `@m2d/react-markdown` | 338.26 | 5.69 | -27.8% | coming... |

### [All files](./lib/fixtures/All files)

| Library | Ops/sec | ±% | Δ from baseline | Memory (KB) |
|---|---:|--:|--:|--:|
| `react-markdown` | 8.02 | 3.11 | 0.0% | coming... |
| `@m2d/react-markdown` | 7.49 | 4.00 | -6.7% | coming... |

</details>
