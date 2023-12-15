import { readData } from '../../shared.ts';
import chalk from 'chalk';

function isReflect(left: string[][], right: string[][]): boolean {
  let i = 0
  while (i < left.length && i < right.length){
    const leftX = left.at((-i-1)).join('')
    const rightX = right.at(i).join('')

    if (leftX !== rightX) return false;

    i++
  }
  return true;
}

function sliceVerticalMap(map: string[], index: number): [string[][], string[][]] {
  const cols = [...getCols(map)]

  return [cols.slice(0, index), cols.slice(index)]
}

function sliceHorizontalMap(map: string[], index: number): [string[][], string[][]] {
  const mapped = map.map(x=>x.split(''))
  return [mapped.slice(0,index), mapped.slice(index)]
}

function checkMap(map: string[]): [number, boolean] {
  // checking horizontal is easier so we start first
  for (let i = 1; i < map.length; i++) {
    if (isReflect(...sliceHorizontalMap(map, i))) return [i, true]
  }

  for (let i = 1; i < map[0].length; i++) {
    if (isReflect(...sliceVerticalMap(map, i))) return [i, false]
  }
}

export async function day13a(dataPath?: string) {
  const data = await readData(dataPath);
  const result = [...readMaps(data)].reduce<number>((prev, cur) => {
    const [index, isRow] = checkMap(cur)

    return prev + (isRow ? 100 : 1)*index
  },0)
  return result
}

function* getCols(map: string[]): Generator<string[]> {
  const map2d = map.map(x=>x.split(''))

  for(let i = 0; i < map2d[0].length; i++) {
    yield map2d.map(x=>x[i])
  }
}

function* readMaps(data: string[]): Generator<string[]> {
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

const answer = await day13a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
