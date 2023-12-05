import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day4b(dataPath?: string) {
  const data = await readData(dataPath);
  const winningMap: Record<number, number> = Object.fromEntries(
    data.map((line, i) => {
      const [,input] = line.split(':')
      const [winning, mine] = input.split('|')
      const winningNumbers = [...winning.matchAll(/[0-9]+/g)].map(([val])=>Number.parseInt(val))
      const myNumbers = [...mine.matchAll(/[0-9]+/g)].map(([val])=>Number.parseInt(val))
      const matches = myNumbers.reduce((prev, cur) => winningNumbers.includes(cur) ? prev + 1 : prev, 0)
      return [i, matches]
    })
  )
  const cards: Record<number, number> = Object.fromEntries(Object.keys(winningMap).map(key=>[key,1]));
  Object.entries(winningMap).forEach(([i, no])=>{
    const noTickets = cards[i]
    for (let j = 1; j <= no; j++){
      cards[Number.parseInt(i)+j] += noTickets;
    }
  })
  const result = Object.values(cards).reduce((prev,cur)=>prev+cur)
  return result;
}

const answer = await day4b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
