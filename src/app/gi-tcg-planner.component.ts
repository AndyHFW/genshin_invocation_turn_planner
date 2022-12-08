import { Component } from '@angular/core';
import { DiceElement, Die } from './gi-tcg-planner.domain';

@Component({
  selector: 'gi-tcg-planner',
  templateUrl: './gi-tcg-planner.component.html',
  styleUrls: ['./gi-tcg-planner.component.scss']
})
export class GiTcgPlannerComponent {

  public keepOriginalOrder = (a: { key: any; }) => a.key;

  public DiceElement = DiceElement;
  public dice: Array<Die> = [];
  public totalDice: number = 0;
  public selected: number = 0;
  public cards: number = 5;
  public convertElement: string = "pyro";
  public cardInput: number = 0;
  public textField: string = "";

  // TODO: undo function?
  // TODO: accessibility
  // TODO: beautify
  // TODO: what's a test?
  private diceMap: Map<DiceElement, number> = new Map<DiceElement, number>();

  ngOnInit() {
    this.resetDiceMap();
  }

  resetDiceMap() {
    for (const element in DiceElement) {
      this.diceMap.set(element as DiceElement, 0);
    }
  }

  addDie(diceElement: string) {
    // @ts-ignore
    this.diceMap.set(diceElement as DiceElement, this.diceMap.get(diceElement as DiceElement) + 1);
    this.getDiceForDisplay();
  }

  removeAll() {
    this.resetDiceMap();
    this.dice = [];
    this.selected = 0;
    this.totalDice = 0;
  }

  getDiceForDisplay() {
    this.totalDice = 0;
    let diceArray: Array<Die> = [];
    this.diceMap.forEach((value: number, key: DiceElement) => {
      if (value > 0) {
        for (let i = value; i > 0; i--) {
          diceArray.push({
            element: key,
            selected: false
          });
          this.totalDice++;
        }
      }
    });
    console.log(diceArray);
    this.dice = diceArray;
  }

  getDiceCountByElement(element: DiceElement): number {
    console.log(element);
    return this.diceMap.get(element.toLocaleUpperCase() as DiceElement)!;
  }

  dieSelected(event: Event, i: number) {
    if (this.dice[i].selected) {
      this.selected--;
    } else {
      this.selected++;
    }
    console.log(this.selected);
    this.dice[i].selected = !this.dice[i].selected;
    console.log(this.dice);
  }

  removeSelected(endTurn: boolean) {
    this.dice.forEach((die: Die) => {
      if (die.selected) {
        // @ts-ignore
        this.diceMap.set(die.element as DiceElement, this.diceMap.get(die.element as DiceElement) - 1);
      }
    });
    this.getDiceForDisplay();
    this.textField += "Consumed " + this.selected + " dice.\n";
    if (endTurn) {
      this.textField += "Performed an attack.\n------End turn------\n";
      this.cards += 2;
    }
    this.selected = 0;
  }

  convert(element: string) {
    let backupMap = new Map(this.diceMap);
    if (this.selected > this.cards) {
      this.textField += "Not enough cards to convert selected dice.\n";
      this.diceMap = backupMap;
    } else {
      if (Object.values(DiceElement).includes(element as DiceElement)) {
        this.dice.forEach((die: Die) => {
          if (die.selected) {
            // @ts-ignore
            this.diceMap.set(die.element as DiceElement, this.diceMap.get(die.element as DiceElement) - 1);
          }
        });
        element = element.toLocaleUpperCase();
        console.log(element as DiceElement);
        console.log(this.diceMap.get(element as DiceElement));
        // @ts-ignore
        this.diceMap.set(element as DiceElement, this.diceMap.get(element as DiceElement) + this.selected);
        this.cards -= this.selected;
        console.log(this.diceMap);
        this.textField += "Converted " + this.selected + " dice into " + element + " dice.\n";
        this.selected = 0;
        this.getDiceForDisplay();
      } else {
        this.textField += "Please enter a valid element for tuning.\n";
      }
    }
  }

  alterHand(numCards: number, add: boolean) {
    if (add) {
      this.cards += numCards;
      this.textField += "Drew " + numCards + " cards.\n";
    } else {
      if (numCards > this.cards) {
        this.textField += "Cannot discard " + numCards + " cards when you only have " + this.cards + " in your hand.\n";
      } else {
        this.cards -= numCards;
        this.textField += "Discarded " + numCards + " cards.\n";
      }
    }
  }

  addCard() {
    this.cards++;
  }

  swapChar(hasCost: boolean) {
    if (hasCost) {
      if (this.selected === 1) {
        let element;
        this.dice.forEach((die: Die) => {
          if (die.selected) {
            element = die.element;
            // @ts-ignore
            this.diceMap.set(die.element as DiceElement, this.diceMap.get(die.element as DiceElement) - 1);
          }
        });
        this.textField += "Swapped character using a " + element + " die.\n------End turn------\n"
        this.cards += 2;
        this.selected = 0;
        this.getDiceForDisplay();
      } else {
        this.textField += "Please select exactly one gem to consume.\n"
      }
    } else {
      this.textField += "Swapped character without consuming a die.\n------End turn------\n"
      this.cards+=2;
    }
  }
}
