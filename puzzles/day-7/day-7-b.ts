import { readData } from '../../shared.ts';
import chalk from 'chalk';

const Rank = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"] as const

type Card = typeof Rank[number]

type CardNo<T extends 1|2|3|4|5> = [Card, T]

type FiveOfAKind = [CardNo<5>]
type FourOfAKind = [CardNo<4>, CardNo<1>]
type FullHouse = [CardNo<3>, CardNo<2>]
type ThreeOfAKind = [CardNo<3>, CardNo<1>, CardNo<1>]
type TwoPair = [CardNo<2>, CardNo<2>, CardNo<1>]
type OnePair = [CardNo<2>, CardNo<1>, CardNo<1>, CardNo<1>];
type HighCard = [CardNo<1>, CardNo<1>, CardNo<1>, CardNo<1>, CardNo<1>]

type Winning = FiveOfAKind | FourOfAKind | FullHouse | ThreeOfAKind | TwoPair | OnePair | HighCard
type Hand = [string, Winning]

const sortHandSameRank = ([originalA, a]: Hand, [originalB, b]: Hand): number => {
  console.log("sorting " + originalA + "-" + originalB)
  for(var i = 0; i < originalA.length; i++){
    const comparison = sortCard(originalA[i] as Card, originalB[i] as Card)
    if (comparison!==0) return comparison;
  }

  return 0;
}

const sortCard = (a: Card, b: Card) => Rank.indexOf(a) - Rank.indexOf(b)

const stringToHand = (str: string): Hand => {
  const hand: {[key in Card]?: number } = {}
  let jokers: number = 0;
  str.split('').forEach((card: Card) => {
    if (card === 'J') jokers++;
    else hand[card]? hand[card]++:hand[card]=1
  })

  const handTuple = Object.entries(hand).sort(([a,ai]: [Card, number], [b,bi]: [Card, number]) => {
    const i = bi - ai;
    if (i !== 0) return i;

    return sortCard(a,b)
  }) as Winning

  if (handTuple.length === 0) return [str, [["A", 5]]]

  handTuple[0][1] += jokers;

  return [str, handTuple]
}

const sortHand = (a: Hand, b: Hand): number => {
  if (a[1].length !== b[1].length) return a[1].length - b[1].length;

  if (a[1].length === 1 && b[1].length === 1) return sortHandSameRank(a, b)

  if ((a[1].length === 2 && b[1].length === 2) || (a[1].length === 3 && b[1].length === 3)) {
    const cmp = b[1][0][1] - a[1][0][1]
    if (cmp !== 0) return cmp
  }

  return sortHandSameRank(a,b);
}

const handToStr = ([original,a]: Hand): string => {
  return `${original}-${a.reduce((prev, [card, no]) => prev + card.repeat(no), "")}`
}

export async function day7b(dataPath?: string) {
  const data = await readData(dataPath);
  const result = data
    .map<[Hand, number]>(line => {
      const [hand, wager] = line.trim().split(' ')
      return [stringToHand(hand), Number.parseInt(wager)]
    })
    .sort(([a,_a], [b,_b])=>-sortHand(a,b))
    //.map<string>(([hand, _]) => handToStr(hand))
    .reduce<number>((prev, [_, wager], i) => wager * (i+1) + prev,0)
  return result
}

const answer = await day7b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
