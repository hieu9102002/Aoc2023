import { readData } from '../../shared.ts';
import chalk from 'chalk';

enum Symbol {
  Space = ".",
  Galaxy = "#"
}

function indicesOf2dArray<T>(arr: T[][], find: T): [number, number][] {
  const result: [number, number][] = []
  for (const [i, line] of arr.entries())
    for (const [j, val] of line.entries())
      if (val === find)
        result.push([i,j])
  return result
}

function expandGalaxy(galaxy: Symbol[][]) {
  const newGalaxy:Symbol[][] = galaxy.flatMap(line => line.some(x=>x===Symbol.Galaxy) ? [line] : [line,line])
  const cols = []

  for(var col = 0; col < newGalaxy[0].length; col++){
    let isEmpty = true;

    for (var row = 0; row < newGalaxy.length; row++){
      if (newGalaxy[row][col] === Symbol.Galaxy){
        isEmpty = false
        break;
      }
    }

    if (!isEmpty) continue;

    cols.push(col)
  }

  const result = newGalaxy.map(line => line.flatMap((val, i)=>cols.includes(i)?[val,val]:[val]))

  return result
}

export async function day11a(dataPath?: string) {
  const data = await readData(dataPath);
  const space = expandGalaxy(data.map(line=>line.trim().split('').map(char=>char as Symbol)))
  const galaxy = indicesOf2dArray(space, Symbol.Galaxy)
  const distBetweenGalaxies = ([ax, ay]:[number, number], [bx,by]: [number, number]): number => {
    return Math.abs(ax-bx) + Math.abs(ay-by)
  }
  const result = galaxy.reduce<number>((prev, cur) =>
    prev + galaxy.map((gal)=>distBetweenGalaxies(cur, gal))
        .reduce((prev, cur)=>prev+cur),0)



  return result/2
}

const answer = await day11a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
