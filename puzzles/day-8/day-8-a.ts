import { readData } from '../../shared.ts';
import chalk from 'chalk';

type Map = Record<string, [string, string]>

export async function day8a(dataPath?: string) {
  const data = await readData(dataPath);
  const [path,,...mapStr] = data;

  const map = Object.fromEntries(mapStr.map(line=>{
    const [[pt], [left], [right]] = [...line.matchAll(/[A-Z]{3}/g)]
    return [pt, [left, right]]
  })) as Map

  let count = 0;
  let current = "AAA";

  while(current !== "ZZZ") {
    const [left, right] = map[current];

    if (path[count%path.length] === "L") current = left
    else current = right

    count++
  }
  
  return count;
}

const answer = await day8a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
