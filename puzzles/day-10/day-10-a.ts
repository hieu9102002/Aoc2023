import { readData } from '../../shared.ts';
import chalk from 'chalk';

enum Tile {
  VER = '|',
  HOR = '-',
  NE = 'L',
  NW = 'J',
  SW = '7',
  SE = 'F',
  GROUND = '.',
  START = 'S'
}

function indexOf2dArray<T>(arr: T[][], find: T): [number, number] {
  for (const [i, line] of arr.entries())
    for (const [j, val] of line.entries())
      if (val === find)
        return [i,j]
  return [-1,-1]
}

export async function day10a(dataPath?: string) {
  const data = await readData(dataPath);

  const map: Tile[][] = data.map(line=>line.trim().split('').map(char=>char as Tile))

  const findAll = ([x,y]: [number, number]): [[number, number], [number, number]] | null => {
    let result: [[number, number], [number, number]] = [[x,y],[x,y]]

    switch(map[x][y]) {
      case Tile.GROUND:
      case Tile.START:
        return null;
      case Tile.VER:
        result[0][0]++;
        result[1][0]--;
        break;
      case Tile.HOR:
        result[0][1]++;
        result[1][1]--;
        break;
      case Tile.NE:
        result[0][0]--;
        result[1][1]++;
        break;
      case Tile.NW:
        result[0][0]--;
        result[1][1]--;
        break;
      case Tile.SE:
        result[0][0]++;
        result[1][1]++;
        break;
      case Tile.SW:
        result[0][0]++;
        result[1][1]--;
        break;
    }

    return result;
  }

  const findNext = ([x,y]: [number, number], [originX, originY]: [number, number]): [number, number] | null => {
    let result = findAll([x,y])

    if (!result) return null

    const [actual] = result.filter(([x,y])=>x!==originX || y!==originY)

    return actual
  }

  const [startPosX, startPosY]: [number, number] = indexOf2dArray(map, Tile.START)
  const adjPos:[number, number][] = [[startPosX+1, startPosY], [startPosX-1, startPosY], [startPosX, startPosY+1], [startPosX, startPosY-1]]

  let originPos: [number, number] = [startPosX, startPosY];
  let firstPos = adjPos.find(pos=>findAll(pos).some(([x,y])=>x===startPosX&&y===startPosY))
  let count = 1;

  while(map[findNext(firstPos, originPos)[0]][findNext(firstPos, originPos)[1]]!==Tile.START) {
    console.log(firstPos)
    count++;
    let originorigin = originPos;
    originPos = firstPos;
    firstPos = findNext(originPos, originorigin);
  }
  
  return Math.ceil(count/2);
}

const answer = await day10a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
