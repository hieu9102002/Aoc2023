import { readData } from '../../shared.ts';
import chalk from 'chalk';

type Map = Record<string, [string, string]>
type Walk = [string, number]
export async function day8b(dataPath?: string) {
  const data = await readData(dataPath);
  const [path,,...mapStr] = data;

  const map = Object.fromEntries(mapStr.map(line=>{
    const [[pt], [left], [right]] = [...line.matchAll(/[A-Z0-9]{3}/g)]
    return [pt, [left, right]]
  })) as Map

  let current = Object.keys(map).filter(key=>key.match(/[A-Z0-9]{2}A/));

  const walks = current.map(node=>{
    const walked: Walk[] = []

    const zIndex: number[] = [];

    let curNode = node
    let i = 0
    let index = 0

    while(!walked.some(([n,p])=> n === curNode && p === index)){
      if (curNode.match(/[A-Z0-9]{2}Z/)) zIndex.push(i)
      const [left, right] = map[curNode];

      if (path[index] === "L") {
        walked.push([curNode, index])
        curNode = left
      }
      else {
        walked.push([curNode, index])
        curNode = right
      }
      i++
      index = (index + 1) % path.length
    }
    const loopAt = walked.findIndex(([n,p])=>n===curNode && p===index)
    const length = i - loopAt
    console.log(zIndex, loopAt, length)
    return [zIndex, loopAt, length]
  })

  // Find LCM of length
  return walks;
}

const answer = await day8b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
