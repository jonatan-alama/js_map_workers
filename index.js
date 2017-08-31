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
        const promise = createPromisifiedWorker(blobURL, [
          task,
          operation.toString()
        ]);
        tasks.push(promise);
      }
      
      Promise.all(tasks).then(res => {
        resolve(res.reduce((all, current) => all.concat(current), []));
      });
    });
  }
  
  function createPromisifiedWorker(blobUrl, message) {
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

  const operation = function(n, i) {
    return n * 10;
  };

  await benchmark(100, operation);
  await benchmark(1000, operation);
  await benchmark(10000, operation);
  await benchmark(100000, operation);
  await benchmark(1000000, operation);
  await benchmark(10000000, operation);
  

})();
