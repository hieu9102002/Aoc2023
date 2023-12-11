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

export async function day10b(dataPath?: string) {
  const data = await readData(dataPath);

  const map: Tile[][] = data.map(line=>line.trim().split('').map(char=>char as Tile))
  const loop: number[][] = map.map(line=>line.map(_=>-1))

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
  loop[startPosX][startPosY] = 0
  const adjPos:[number, number][] = [[startPosX+1, startPosY], [startPosX-1, startPosY], [startPosX, startPosY+1], [startPosX, startPosY-1]]

  const [south, north, east, west]: boolean[] = adjPos.map(pos=>{
    const x = findAll(pos)
    if (!x) return false
    return x.some(([x,y])=>x===startPosX&&y===startPosY)
  })


  let originPos: [number, number] = [startPosX, startPosY];
  let firstPos = adjPos.find(pos=>findAll(pos).some(([x,y])=>x===startPosX&&y===startPosY))
  loop[firstPos[0]][firstPos[1]] = 1
  let count = 1
 
  while(map[findNext(firstPos, originPos)[0]][findNext(firstPos, originPos)[1]]!==Tile.START) {
    count++
    let originorigin = originPos;
    originPos = firstPos;
    firstPos = findNext(originPos, originorigin);
    loop[firstPos[0]][firstPos[1]] = count
  }

  if (north && south) map[startPosX][startPosY] = Tile.VER
  if (north && east) map[startPosX][startPosY] = Tile.NE
  if (north && west) map[startPosX][startPosY] = Tile.NW
  if (east && west) map [startPosX][startPosY] = Tile.HOR
  if (south && east) map[startPosX][startPosY] = Tile.SE
  if (south && west) map[startPosX][startPosY] = Tile.SW

  const handleLine = (line: number[], lineNumber: number): number => {
    let result = 0
    let trace = 0

    let starter: Tile.NE | Tile.SE = null

    for (const [i, val] of line.entries()){
      if (val !== -1){
        const symbol = map[lineNumber][i];
        switch (symbol) {
          case Tile.NE:
          case Tile.SE:
            starter = symbol;
            break;
          case Tile.HOR: 
            break;
          case Tile.VER:
            trace++;
            break;
          case Tile.NW:
            if (starter===Tile.SE) trace++
            starter = null
            break;
          case Tile.SW:
            if (starter===Tile.NE) trace++
            starter = null
            break;
        }
      } else {
        if (trace%2===1) {
          result ++
        }
      }
    }

    return result
  }
  
  return loop.map(handleLine).reduce((prev,cur)=>prev+cur);
}

const answer = await day10b();
console.log(chalk.green(answer));
