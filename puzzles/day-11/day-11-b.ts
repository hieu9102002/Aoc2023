import { readData } from '../../shared.ts';
import chalk from 'chalk';

enum Symbol {
  Empty = "E",
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
  const newGalaxy:Symbol[][] = galaxy.map(line => line.some(x=>x===Symbol.Galaxy) ? line : line.map(_=>Symbol.Empty))

  for(var col = 0; col < newGalaxy[0].length; col++){
    let isEmpty = true;

    for (var row = 0; row < newGalaxy.length; row++){
      if (newGalaxy[row][col] === Symbol.Galaxy){
        isEmpty = false
        break;
      }
    }

    if (!isEmpty) continue;

    for (var row = 0; row < newGalaxy.length; row++){
      newGalaxy[row][col] = Symbol.Empty
    }
 
  }

  return newGalaxy
}

export async function day11a(dataPath?: string) {
  const data = await readData(dataPath);
  const space = expandGalaxy(data.map(line=>line.trim().split('').map(char=>char as Symbol)))
  const galaxy = indicesOf2dArray(space, Symbol.Galaxy)

  const distBetweenGalaxies = ([ax, ay]:[number, number], [bx,by]: [number, number]): number => {
    let dist = 0

    const verticalSign = Math.sign(bx-ax)
    const horizontalSign = Math.sign(by-ay)

    for (let i = 0; i < Math.abs(ax-bx); i++) {
      const symbol = space[ax+(i*verticalSign)][ay]
      if (symbol === Symbol.Empty) dist += 1000000
      else dist += 1
    }

    for (let j = 0; j < Math.abs(ay-by); j++) {
      const symbol = space[bx][ay+(j*horizontalSign)]
      if (symbol === Symbol.Empty) dist += 1000000
      else dist += 1
    }

    return dist;
  }

  const result = galaxy.reduce<number>((prev, cur) =>
    prev + galaxy.map((gal)=>distBetweenGalaxies(cur, gal))
        .reduce((prev, cur)=>prev+cur),0)
  return result/2;
}

const answer = await day11a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
