import { readData } from '../../shared.ts';
import chalk from 'chalk';

type Map = {
  srcStart: number;
  destStart: number;
  range: number;
}

export async function day5b(dataPath?: string) {
  const data = await readData(dataPath);
  const [seeds, ...inputMaps] = [...input(data)]
  const seedPairs:[number, number][] = [...seeds[0].split(':')[1].trim().matchAll(/[0-9]+ [0-9]+/g)].map(([pair])=>pair.split(" ").map(indiv=>Number.parseInt(indiv)) as [number, number])
  const maps = inputMaps.map(inputToMaps)

  for (var i = 0; ;i++) {
    if (i%100000===0) console.log(i)
    const x = maps.reduceRight(destToSource, i)
    if (seedPairs.some(([start, range])=>checkInRange(x, start, range))) return i;
  }
}

function checkInRange(no:number, start:number, range:number):boolean {
  return no >= start && no < start + range
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

function destToSource(source: number, maps: Map[]): number {
  for (const {srcStart, destStart, range} of maps){
    if (source < destStart || source >= destStart + range ) continue;
    const diff = source - destStart;
    return srcStart + diff;
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

const answer = await day5b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
