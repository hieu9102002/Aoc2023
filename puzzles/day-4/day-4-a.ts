import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day4a(dataPath?: string) {
  const data = await readData(dataPath);
  const result = data.map(line => {
    const [,input] = line.split(':')
    const [winning, mine] = input.split('|')
    const winningNumbers = [...winning.matchAll(/[0-9]+/g)].map(([val])=>Number.parseInt(val))
    const myNumbers = [...mine.matchAll(/[0-9]+/g)].map(([val])=>Number.parseInt(val))
    const matches = myNumbers.reduce((prev, cur) => winningNumbers.includes(cur) ? prev + 1 : prev, 0)
    return matches === 0 ? 0 : Math.pow(2, matches - 1)
  }).reduce((prev,cur)=> prev+cur)
  return result;
}

const answer = await day4a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
