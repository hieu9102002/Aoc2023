import { readData } from '../../shared.ts';
import chalk from 'chalk';

type Color = 'blue' | 'red' | 'green'
type Bag = Record<Color, number|undefined>
export async function day2a(dataPath?: string) {
  const initial: Bag = {
    blue: 14,
    red: 12,
    green: 13
  }
  const data = await readData(dataPath);
  const result = data
    .map(line => {
      const [,data] = line.split(":")
      const pulls = data.split(";")
                        .map<Bag>(pull=>{
                          const colorPairs = pull.split(',')
                                                  .map<[Color, number]>(pair => {
                                                    const [no, col] = pair.trim().split(' ')
                                                    return [col as Color, Number.parseInt(no)]
                                                  })
                          return Object.fromEntries(colorPairs) as Bag
                        })
      return pulls.every(pull=>Object.keys(initial).every(color => initial[color] >= (pull[color] ?? 0)))
    })
    .reduce((prev, cur, i) => cur ? prev + i + 1 : prev, 0)
    
  return result;
}

const answer = await day2a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
