import { readData } from '../../shared.ts';
import chalk from 'chalk';

const scanToNumber = (pos: number, line: number, text: string[]): number => {
  const lineStr = text[line];
  let start = pos;
  let end = pos;
  while (start > 0 && /[0-9]/.test(lineStr[start - 1])) {
    start--;
  }
  while (end < lineStr.length - 1 && /[0-9]/.test(lineStr[end + 1])) {
    end++;
  }
  return Number.parseInt(lineStr.substring(start, end+1))
}

const scanForNumberInLine = (pos: number, line: number, text: string[]): number[] => {
  if (/[0-9]/.test(text[line][pos])) return [scanToNumber(pos, line, text)]
  
  const arr = [];
  if (pos > 0 && /[0-9]/.test(text[line][pos-1])) arr.push(scanToNumber(pos-1,line,text));
  if (pos < text[line].length - 1 && /[0-9]/.test(text[line][pos+1])) arr.push(scanToNumber(pos+1,line,text));
  return arr;
}

const scanForNumber = (pos: number, line: number, text: string[]): number[] => {
  const arr: number[] = []
  if (line > 0) {
    arr.push(...scanForNumberInLine(pos, line-1, text))
  }
  arr.push(...scanForNumberInLine(pos, line, text))
  if (line < text.length - 1) {
    arr.push(...scanForNumberInLine(pos, line+1, text))
  }
  return arr;
}

export async function day3b(dataPath?: string) {
  const data = await readData(dataPath);
  const result = data
    .flatMap<number[]>((line, lineNumber)=>[...line.matchAll(/\*/g)].map(({index})=>scanForNumber(index, lineNumber, data)))
    .filter<[number, number]>((arr): arr is [number, number] => arr.length === 2)
    .map<number>(([x, y])=>x*y)
    .reduce((prev,cur)=>prev+cur);
    
  return result;
}

const answer = await day3b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
