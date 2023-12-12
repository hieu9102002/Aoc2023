import { readData } from '../../shared.ts';
import chalk from 'chalk';

type Tree = {
  dot?: Tree
  hash?: Tree
}

type State = "Consuming" | "JustConsumed" | "Idle"

function generateTree(input: string, index: number = 0): Tree {
  const last = index === input.length-1
  const i = input[index]

  switch (i) {
    case '.':
      if (last) return {dot: {}}
      return {dot: generateTree(input, index+1)}
    case '#':
      if (last) return {hash: {}}
      return {hash: generateTree(input, index+1)}
    case '?':
      if (last) return {hash: {}, dot: {}}
      return {dot: generateTree(input, index+1), hash: generateTree(input, index+1)}
  }
}

function traverse(input: Tree, filter:number[], consuming: State = "Idle"): number {
  if (input.dot === undefined && input.hash === undefined) {
    if (filter.length === 0 && consuming!=='Consuming') return 1
    return 0
  }
  if (input.hash === undefined) {
    // we are consuming but hit a dot so bail early
    if (consuming === 'Consuming') return 0
    return traverse(input.dot, filter, "Idle")
  }
  if (input.dot === undefined) {
    // meet a hash while none more to consume
    if (filter.length === 0 || consuming === 'JustConsumed') return 0
    const [cur, ...rest] = filter;
    const newCur = cur-1;
    if (newCur == 0) return traverse(input.hash, [...rest], 'JustConsumed');
    return traverse(input.hash, [newCur, ...rest], 'Consuming');
  }

  // both dot and hash path available
  const {dot, hash} = input;
  return traverse({dot}, filter, consuming) + traverse({hash}, filter, consuming)
}

export async function day12a(dataPath?: string) {
  const data = await readData(dataPath);
  const result = data.map(line => {
    const [input, report] = line.trim().split(' ')
    return traverse(generateTree(input), report.split(',').map(x=>Number.parseInt(x)))
  }).reduce((prev, cur)=>prev+cur)
  return result
}

const answer = await day12a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
