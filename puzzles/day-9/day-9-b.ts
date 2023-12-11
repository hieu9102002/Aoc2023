import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day9b(dataPath?: string) {
  const data = await readData(dataPath);
  const result = data.map(line=>line.trim().split(' ').map(n=>Number.parseInt(n)))
    .map(numbers=>predictNext(numbers, true))
    .reduce((prev, cur)=>prev+cur)
  return result;
}

function predictNext(arr: number[], prev: boolean): number {
  const gap:number[] = []

  for (var i = 1; i < arr.length; i++)
    gap.push(arr[i]-arr[i-1])

  if (gap.every(x=>x===0)){
    return arr.at(prev?0:-1)
  }


  return arr.at(prev?0:-1) + (prev?-1:1) * predictNext(gap, prev)
}

const answer = await day9b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
