# js_map_workers

Playgrounds about running CPU bound operations using Workers.

## Benchmarks
### Map an array of x integers

- operation is `map(n => n * 10)`
- *main thread* uses the `Array.map` method directly
- *x workers* divides the task into x subtasks, runs them in separate workers and joins the results

#### 100 items
- **main thread 100: 0.02978515625ms**
- 1 worker 100: 26.240966796875ms
- 2 worker 100: 14.349853515625ms
- 3 worker 100: 15.72998046875ms
- 4 worker 100: 20.719970703125ms
- 5 worker 100: 28.970947265625ms

#### 1,000 items
- **main thread 1000: 0.042236328125ms**
- 1 worker 1000: 15.593017578125ms
- 2 worker 1000: 14.3798828125ms
- 3 worker 1000: 20.615966796875ms
- 4 worker 1000: 22.10498046875ms
- 5 worker 1000: 27.364013671875ms

#### 10,000 items
- **main thread 10000: 0.270263671875ms**
- 1 worker 10000: 21.98291015625ms
- 2 worker 10000: 15.679931640625ms
- 3 worker 10000: 16.824951171875ms
- 4 worker 10000: 22.414306640625ms
- 5 worker 10000: 33.989013671875ms

#### 100,000 items
- main thread 100000: 52.35107421875ms
- 1 worker 100000: 73.43798828125ms
- 2 worker 100000: 43.61572265625ms
- **3 worker 100000: 35.858154296875ms**
- 4 worker 100000: 36.52294921875ms
- 5 worker 100000: 40.840087890625ms

#### 1,000,000 items
- main thread 1000000: 321.670166015625ms
- 1 worker 1000000: 568.443115234375ms
- 2 worker 1000000: 358.592041015625ms
- 3 worker 1000000: 296.489990234375ms
- 4 worker 1000000: 265.904052734375ms
- **5 worker 1000000: 257.775146484375ms**

#### 10,000,000 items
- main thread 10000000: 3132.803955078125ms
- 1 worker 10000000: 5685.32470703125ms
- 2 worker 10000000: 3453.314208984375ms
- 3 worker 10000000: 2796.642822265625ms
- 4 worker 10000000: 2554.15283203125ms
- **5 worker 10000000: 2515.774169921875ms**