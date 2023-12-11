import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day9a(dataPath?: string) {
  const data = await readData(dataPath);
  const result = data.map(line=>line.trim().split(' ').map(n=>Number.parseInt(n)))
    .map(predictNext)
    .reduce((prev, cur)=>prev+cur)
  return result;
}

function predictNext(arr: number[]): number {
  const gap:number[] = []

  for (var i = 1; i < arr.length; i++)
    gap.push(arr[i]-arr[i-1])

  if (gap.every(x=>x===0)){
    return arr.at(-1)
  }


  return arr.at(-1) + predictNext(gap)
}

const answer = await day9a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
