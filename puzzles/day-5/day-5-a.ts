import { readData } from '../../shared.ts';
import chalk from 'chalk';

type Map = {
  srcStart: number;
  destStart: number;
  range: number;
}

export async function day5a(dataPath?: string) {
  const data = await readData(dataPath);
  const [seeds, ...inputMaps] = [...input(data)]
  const seedNos = seeds[0].split(':')[1].trim().split(" ").map(seed=>Number.parseInt(seed))
  const maps = inputMaps.map(inputToMaps)

  const result = seedNos.map(seed => maps.reduce(sourceToDest, seed)).reduce((prev, cur) => cur < prev ? cur : prev)

  return result;
}

function inputToMaps(input: string[]): Map[] {
  return input
    .filter((_,i) => i !==0 )
    .map(line=>line
      .trim()
      .split(' ')
      .map(str=>Number.parseInt(str))
    )
    .map(([destStart, srcStart, range])=>({
      destStart,
      srcStart,
      range
  }))
}

function sourceToDest(source: number, maps: Map[]): number {
  for (const {srcStart, destStart, range} of maps){
    if (source < srcStart || source >= srcStart + range ) continue;
    const diff = source - srcStart;
    return destStart + diff;
  }
  return source;
}

function* input(data: string[]):Generator<string[]> {
  let result:string[] = []
  for (const line of data){
    if (line.trim() === "") {
      yield result;
      result = []
      continue;
    }
    result.push(line)
  }
  yield result;
}

const answer = await day5a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
