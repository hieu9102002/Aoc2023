import { readData } from '../../shared.ts';
import chalk from 'chalk';

const digitMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  zero: 0
}

const reverseMap = Object.fromEntries(Object.keys(digitMap).map(digit=>[digit.split("").reverse().join(""), digitMap[digit]]))

const regex = new RegExp(`[0-9]|${Object.keys(digitMap).join('|')}`)
const reverseRegex = new RegExp(`[0-9]|${Object.keys(reverseMap).join('|')}`)

const mapDigitToNum = (x: string): number => digitMap[x] ?? reverseMap[x] ?? Number.parseInt(x);

export async function day1b(dataPath?: string) {
  const data = await readData(dataPath);
  const result = data.map(line => [line.match(regex).toString(), line.split("").reverse().join("").match(reverseRegex).toString()])
                      .map(([a,b]) => mapDigitToNum(a)*10+mapDigitToNum(b))
                      .reduce((prev, cur) => prev+cur)
  return result;
}

const answer = await day1b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
