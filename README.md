# js_map_workers

Playgrounds about running CPU bound operations using Workers.

## Benchmarks
### Map an array of x integers

- operation is `map(n => n * 10)`
- *main thread* uses the `Array.map` method directly
- *x workers* divides the task into x subtasks, runs them in separate workers and joins the results
- MacBook Pro 2.2 GHz Intel Core i7 16 GB

#### 100 items
| Test          | Chrome 60.0.3112.101 | Firefox 55.0.3 | Safari 10.1.2 |
| ------------- | -------------------- | -------------- | ------------- |
| Main Thread   | 0.04ms               | 0.83ms         | 0.05ms        |
| 1 Web Worker  | 26.88ms              | 18.97ms        | 14.24ms       |
| 2 Web Workers | 13.95ms              | 8.25ms         | 18.44ms       |
| 3 Web Workers | 16.46ms              | 12.07ms        | 22.43ms       |
| 4 Web Workers | 19.12ms              | 15.05ms        | 39.70ms       |
| 5 Web Workers | 28.92ms              | 19.43ms        | 35.27ms       |

#### 1,000 items
| Test          | Chrome 60.0.3112.101 | Firefox 55.0.3 | Safari 10.1.2 |
| ------------- | -------------------- | -------------- | ------------- |
| Main Thread   | 0.10ms               | 0.88ms         | 0.36ms        |
| 1 Web Worker  | 29.48ms              | 19.53ms        | 14.36ms       |
| 2 Web Workers | 14.34ms              | 10.20ms        | 27.77ms       |
| 3 Web Workers | 16.71ms              | 12.68ms        | 17.24ms       |
| 4 Web Workers | 19.47ms              | 17.60ms        | 24.76ms       |
| 5 Web Workers | 24.63ms              | 17.03ms        | 40.24ms       |

#### 10,000 items
| Test          | Chrome 60.0.3112.101 | Firefox 55.0.3 | Safari 10.1.2 |
| ------------- | -------------------- | -------------- | ------------- |
| Main Thread   | 0.69ms               | 1.42ms         | 0.82ms        |
| 1 Web Worker  | 27.35ms              | 20.43ms        | 14.25ms       |
| 2 Web Workers | 17.65ms              | 12.49ms        | 9.36ms        |
| 3 Web Workers | 18.49ms              | 20.26ms        | 31.76ms       |
| 4 Web Workers | 21.63ms              | 18.52ms        | 19.91ms       |
| 5 Web Workers | 25.36ms              | 21.36ms        | 43.16ms       |

#### 100,000 items
| Test          | Chrome 60.0.3112.101 | Firefox 55.0.3 | Safari 10.1.2 |
| ------------- | -------------------- | -------------- | ------------- |
| Main Thread   | 32.35ms              | 2.77ms         | 4.45ms        |
| 1 Web Worker  | 73.06ms              | 62.63ms        | 28.32ms       |
| 2 Web Workers | 34.30ms              | 46.84ms        | 25.36ms       |
| 3 Web Workers | 31.42ms              | 55.59ms        | 34.85ms       |
| 4 Web Workers | 35.99ms              | 54.88ms        | 32.40ms       |
| 5 Web Workers | 38.10ms              | 48.21ms        | 37.74ms       |

#### 1,000,000 items
| Test          | Chrome 60.0.3112.101 | Firefox 55.0.3 | Safari 10.1.2 |
| ------------- | -------------------- | -------------- | ------------- |
| Main Thread   | 321.18ms             | 10.10ms        | 45.36ms       |
| 1 Web Worker  | 548.60ms             | 429.95ms       | 163.62ms      |
| 2 Web Workers | 342.99ms             | 327.71ms       | 115.92ms      |
| 3 Web Workers | 360.71ms             | 328.98ms       | 117.22ms      |
| 4 Web Workers | 266.26ms             | 355.36ms       | 116.97ms      |
| 5 Web Workers | 259.22ms             | 319.85ms       | 116.30ms      |

#### 10,000,000 items
| Test          | Chrome 60.0.3112.101 | Firefox 55.0.3 | Safari 10.1.2 |
| ------------- | -------------------- | -------------- | ------------- |
| Main Thread   | 3127.18ms            | 127.83ms       | 470.45ms      |
| 1 Web Worker  | 5404.80ms            | 4738.69ms      | 1565.92ms     |
| 2 Web Workers | 3372.53ms            | 3538.97ms      | 1079.56ms     |
| 3 Web Workers | 2713.30ms            | 3272.95ms      | 972.53ms      |
| 4 Web Workers | 2519.60ms            | 3478.77ms      | 975.76ms      |
| 5 Web Workers | 2523.37ms            | 3160.04ms      | 980.84ms      |