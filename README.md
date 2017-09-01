# js_map_workers

Playgrounds about running CPU bound operations using Workers.

## Benchmarks
### Map an array of x integers

- operation is `map(n => n * 10)`
- *Main Thread* uses the `Array.map` method directly
- *x Web Workers* divides the task into x subtasks, runs them in separate workers and joins the results
- 1,000,000/10,000,000 items have a second implementation using `SharedArrayBuffer` for passing data to the workers
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
| 3 Web Workers | 18.49ms              | 20.26ms        | 31.76ms       |
| 4 Web Workers | 21.63ms              | 18.52ms        | 19.91ms       |
| 5 Web Workers | 25.36ms              | 21.36ms        | 43.16ms       |

#### 100,000 items
| Test          | Chrome 60.0.3112.101 | Firefox 55.0.3 | Safari 10.1.2 |
| ------------- | -------------------- | -------------- | ------------- |
| Main Thread   | 32.35ms              | 2.77ms         | 4.45ms        |
| 1 Web Worker  | 73.06ms              | 62.63ms        | 28.32ms       |
| 2 Web Workers | 34.30ms              | 46.84ms        | 25.36ms       |
| 3 Web Workers | 31.42ms              | 55.59ms        | 34.85ms       |
| 4 Web Workers | 35.99ms              | 54.88ms        | 32.40ms       |
| 5 Web Workers | 38.10ms              | 48.21ms        | 37.74ms       |

#### 1,000,000 items (Worker / Worker + SharedArrayBuffer)
| Test          | Chrome 60.0.3112.101 | Firefox 55.0.3    | Safari 10.1.2     |
| ------------- | -------------------- | ----------------- | ----------------- |
| Main Thread   | 321.18ms             | 10.10ms           | 45.36ms           |
| 1 Web Worker  | 548.60ms/99.58ms     | 429.95ms/172.17ms | 163.62ms/151.13ms |
| 2 Web Workers | 342.99ms/65.84ms     | 327.71ms/98.99ms  | 115.92ms/55.49ms  |
| 3 Web Workers | 360.71ms/60.17ms     | 328.98ms/85.90ms  | 117.22ms/51.30ms  |
| 4 Web Workers | 266.26ms/66.86ms     | 355.36ms/99.41ms  | 116.97ms/94.37ms  |
| 5 Web Workers | 259.22ms/76.78ms     | 319.85ms/72.46ms  | 116.30ms/59.76ms  |

#### 10,000,000 items (Worker / Worker + SharedArrayBuffer)
| Test          | Chrome 60.0.3112.101 | Firefox 55.0.3      | Safari 10.1.2      |
| ------------- | -------------------- | ------------------- | ------------------ |
| Main Thread   | 3127.18ms            | 127.83ms            | 470.45ms           |
| 1 Web Worker  | 5404.80ms/747.51ms   | 4738.69ms/1641.23ms | 1565.92ms/849.99ms |
| 2 Web Workers | 3372.53ms/423.98ms   | 3538.97ms/986.83ms  | 1079.56ms/394.46ms |
| 3 Web Workers | 2713.30ms/324.14ms   | 3272.95ms/670.99ms  | 972.53ms/327.34ms  |
| 4 Web Workers | 2519.60ms/300.90ms   | 3478.77ms/538.51ms  | 975.76ms/295.79ms  |
| 5 Web Workers | 2523.37ms/326.75ms   | 3160.04ms/643.82ms  | 980.84ms/357.67ms  |