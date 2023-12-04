import { readData } from '../../shared.ts';
import chalk from 'chalk';

const checkSymbol = (char: string) => /[^0-9.]/.test(char)

const searchSymbol = (startpos: number, length: number, line: number, data: string[]): boolean => {
  for (let l = line - 1; l <= line + 1; l++) {
    if (l < 0 || l >= data.length) continue;
    for (let i = startpos-1; i <= startpos + length; i++) {
      if (i < 0 || i >= data[l].length) continue;
      if (checkSymbol(data[l][i])) return true;
    }
  }
  return false
}

export async function day3a(dataPath?: string) {
  const data = await readData(dataPath);
  let result = 0;
  data.forEach((line, i) => {
    const numberMatches = [...line.matchAll(/[0-9]+/g)]
    numberMatches.forEach(match => {
      if (searchSymbol(match.index, match[0].length, i, data)) result += Number.parseInt(match[0])
    })
  })
  return result;
}

const answer = await day3a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
