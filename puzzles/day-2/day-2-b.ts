import { readData } from '../../shared.ts';
import chalk from 'chalk';

type Color = 'blue' | 'red' | 'green'
type Bag = Record<Color, number | undefined>
export async function day2b(dataPath?: string) {
  const data = await readData(dataPath);
  const result = data
    .map(line => {
      const [,data] = line.split(":")
      const {blue, red, green} = data.split(";")
                        .map<Bag>(pull=>{
                          const colorPairs = pull.split(',')
                                                  .map<[Color, number]>(pair => {
                                                    const [no, col] = pair.trim().split(' ')
                                                    return [col as Color, Number.parseInt(no)]
                                                  })
                          return Object.fromEntries(colorPairs) as Bag
                        })
                        .reduce<Bag>((prev, cur) => {
                          return {
                            blue: prev.blue < (cur.blue ?? 0) ? cur.blue : prev.blue,
                            red: prev.red < (cur.red ?? 0) ? cur.red : prev.red,
                            green: prev.green < (cur.green ?? 0) ? cur.green : prev.green
                          }
                        }, {blue: 0, red: 0, green: 0})
      return blue*red*green
    }).reduce((prev, cur)=>prev+cur)
    
  return result;
}

const answer = await day2b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
