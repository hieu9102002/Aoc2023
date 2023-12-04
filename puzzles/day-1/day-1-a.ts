import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day1a(dataPath?: string) {
  const data = await readData(dataPath);
  const result = data.map(line => [...line.matchAll(/[0-9]/g)])
                      .map(arr=>Number.parseInt(arr.at(0).toString())*10+Number.parseInt(arr.at(-1).toString()))
                      .reduce((prev, cur)=>prev+cur)
  return result;
}

const answer = await day1a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
