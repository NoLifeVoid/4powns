export class Chip{
    constructor(color:Color){
        this.color=color
    }

    equals(other: Chip): boolean {
        return this.color === other.color;
      }

    color!:Color
}

export enum Color{red,blue}

