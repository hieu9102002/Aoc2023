import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day6a(dataPath?: string) {
  const [timeStr, distanceStr] = await readData(dataPath);

  const times = [...timeStr.matchAll(/[0-9]+/g)].map(([time])=>Number.parseInt(time))
  const distances = [...distanceStr.matchAll(/[0-9]+/g)].map(([time])=>Number.parseInt(time))

  const result = times
    .map((time, i) => buttonHoldRange(time, distances[i]))
    .map(range=>range.length===1?1:rangeToCount(range))
    .reduce((prev, cur)=>prev*cur)

  return result;
}

function rangeToCount([lower, higher]: [number, number]): number {
  const low = Math.ceil(lower) === lower ? lower + 1 : Math.ceil(lower);
  const high = Math.floor(higher) === higher ? higher - 1 : Math.floor(higher);
  return high - low + 1
}
function buttonHoldRange(time: number, distance: number): [number, number] | [number] {
  const a = -1;
  const b = time;
  const c = -distance;
  // calculate discriminant
  const discriminant = b * b - 4 * a * c;

  // condition for real and different roots
  if (discriminant > 0) {
      const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);

      console.log(`The roots of quadratic equation ${a}x^2+${b}x+${c} are ${root1} and ${root2}`);

      return [root1, root2]
  }

  // condition for real and equal roots
  else if (discriminant == 0) {
      const root1 = -b / (2 * a);

      // result
      return [root1];
  }

  return [0]
}

const answer = await day6a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
