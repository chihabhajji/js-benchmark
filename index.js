const Benchmark = require('benchmark');

// Create a new benchmark suite
const suite = new Benchmark.Suite();

function junior(size) {
  const range = [];
  for (let i = 0; i < size; i++) range.push(i);
  return range;
}

function medior(size) {
  return Array(size).fill().map((_, i) => i);
}

function senior(size) {
  return [...Array(size).keys()];
}

// Add the benchmark for junior function
suite.add('junior', function () {
  junior(100000);
});

// Add the benchmark for medior function
suite.add('medior', function () {
  medior(100000);
});

// Add the benchmark for senior function
suite.add('senior', function () {
  senior(100000);
});

// Set up memory measurement
suite.on('cycle', function (event) {
  const stats = event.target.stats;
  console.log(
    event.target.name +
      ': ' +
      stats.mean +
      ' ops/sec ±' +
      stats.rme.toFixed(2) +
      '%, ' +
      stats.sample.length +
      ' sample(s), ' +
      stats.sample.length * stats.mean.toFixed(2) +
      ' ops/sec'
  );
  console.log('Memory usage:', process.memoryUsage().heapUsed / 1024 / 1024 + ' MB');
}).on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  });

// Run the benchmark
suite.run({ async: true });
