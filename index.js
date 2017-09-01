(async function() {
  const blobURL = URL.createObjectURL(
    new Blob(
      [
        "(",
        function() {
          onmessage = function(e) {
            const input = e.data[0] || [];
            const operation = e.data[1]
              ? eval("(" + e.data[1] + ")")
              : function() {};
            const output = input.map(operation);
            postMessage(output);
          };
        }.toString(),
        ")()"
      ],
      { type: "application/javascript" }
    )
  );

  const blobURLShared = URL.createObjectURL(
    new Blob(
      [
        "(",
        function() {
          onmessage = function(e) {
            const { iaIn, iaOut, start, end } = e.data;
            const operation = eval("(" + e.data.operation + ")");

            for (let i = start; i <= end; i++) {
              Atomics.store(iaOut, i, operation(iaIn[i]));
            }

            Atomics.wake(iaOut, end);
          };
        }.toString(),
        ")()"
      ],
      { type: "application/javascript" }
    )
  );

  const blobURLSharedMaster = URL.createObjectURL(
    new Blob(
      [
        "(",
        function() {
          onmessage = function(e) {
            const { iaOut, end } = e.data;

            Atomics.wait(iaOut, end, 0);
            postMessage(true);
          };
        }.toString(),
        ")()"
      ],
      { type: "application/javascript" }
    )
  );

  function asyncMap(input, operation, threads = 5) {
    return new Promise((resolve, reject) => {
      const length = input.length;
      const tasks = [];

      if (threads > length) {
        threads = length;
      }

      const itemsPerThread = Math.ceil(length / threads);
      let i = 0;

      for (let t = 1; t <= threads; t++) {
        const task = input.slice(i, i + itemsPerThread);
        i = i + itemsPerThread;
        const promise = createPromisifiedWorker([task, operation.toString()]);
        tasks.push(promise);
      }

      Promise.all(tasks).then(res => {
        resolve(res.reduce((all, current) => all.concat(current), []));
      });
    });
  }

  function asyncMapShared(input, operation, threads = 5) {
    return new Promise((resolve, reject) => {
      const length = input.length;
      const tasks = [];
      const sabIn = new SharedArrayBuffer(
        Int32Array.BYTES_PER_ELEMENT * length
      );
      const iaIn = new Int32Array(sabIn);
      const sabOut = new SharedArrayBuffer(
        Int32Array.BYTES_PER_ELEMENT * length
      );
      const iaOut = new Int32Array(sabOut);

      for (let i = 0; i < length; i++) {
        iaIn[i] = input[i];
      }

      if (threads > length) {
        threads = length;
      }

      const itemsPerThread = Math.ceil(length / threads);
      let i = 0;

      for (let t = 1; t <= threads; t++) {
        const promise = createPromisifiedSharedWorker({
          iaIn,
          iaOut,
          operation: operation.toString(),
          start: i,
          end: Math.min(i + itemsPerThread - 1, length - 1)
        });
        tasks.push(promise);
        i = i + itemsPerThread;
      }

      Promise.all(tasks).then(res => {
        resolve(iaOut);
      });
    });
  }

  function createPromisifiedSharedWorker(message) {
    const promise = new Promise((resolve, reject) => {
      const master = new Worker(blobURLSharedMaster);
      const worker = new Worker(blobURLShared);

      master.onmessage = function(e) {
        resolve(e.data);
        worker.terminate();
        master.terminate();
      };

      master.postMessage(message);
      worker.postMessage(message);
    });

    return promise;
  }

  function createPromisifiedWorker(message) {
    const promise = new Promise((resolve, reject) => {
      const worker = new Worker(blobURL);

      worker.onmessage = function(e) {
        resolve(e.data);
        worker.terminate();
      };

      worker.postMessage(message);
    });

    return promise;
  }

  async function benchmark(length, operation) {
    const array = [];

    for (let i = 0; i < length; i++) {
      array.push(i);
    }

    console.time("main thread " + length);
    array.map(operation);
    console.timeEnd("main thread " + length);

    console.time("1 worker " + length);
    await asyncMap(array, operation, 1);
    console.timeEnd("1 worker " + length);

    console.time("2 worker " + length);
    await asyncMap(array, operation, 2);
    console.timeEnd("2 worker " + length);

    console.time("3 worker " + length);
    await asyncMap(array, operation, 3);
    console.timeEnd("3 worker " + length);

    console.time("4 worker " + length);
    await asyncMap(array, operation, 4);
    console.timeEnd("4 worker " + length);

    console.time("5 worker " + length);
    await asyncMap(array, operation, 5);
    console.timeEnd("5 worker " + length);
  }

  async function benchmarkShared(length, operation) {
    const array = [];

    for (let i = 0; i < length; i++) {
      array.push(i);
    }

    console.time("main thread " + length);
    array.map(operation);
    console.timeEnd("main thread " + length);

    console.time("1 worker shared " + length);
    await asyncMapShared(array, operation, 1);
    console.timeEnd("1 worker shared " + length);

    console.time("2 worker shared " + length);
    await asyncMapShared(array, operation, 2);
    console.timeEnd("2 worker shared " + length);

    console.time("3 worker shared " + length);
    await asyncMapShared(array, operation, 3);
    console.timeEnd("3 worker shared " + length);

    console.time("4 worker shared " + length);
    await asyncMapShared(array, operation, 4);
    console.timeEnd("4 worker shared " + length);

    console.time("5 worker shared " + length);
    await asyncMapShared(array, operation, 5);
    console.timeEnd("5 worker shared " + length);
  }

  const operation = function(n) {
    return n * 10;
  };

  await benchmark(100, operation);
  await benchmark(1000, operation);
  await benchmark(10000, operation);
  await benchmark(100000, operation);
  await benchmark(1000000, operation);
  await benchmark(10000000, operation);
  await benchmarkShared(100, operation);
  await benchmarkShared(1000, operation);
  await benchmarkShared(10000, operation);
  await benchmarkShared(100000, operation);
  await benchmarkShared(1000000, operation);
  await benchmarkShared(10000000, operation);
})();
