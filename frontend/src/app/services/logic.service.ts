import { Injectable } from '@angular/core';
import { Chip, Color } from '../Classes';

@Injectable({
  providedIn: 'root'
})
export class LogicService {

  buttons: number[] = [0, 1, 2, 3, 4, 5, 6]

  count: number = 1
  even: boolean = true

  //winning
  won: boolean = false
  red: boolean = false
  blue: boolean = false


  //x=7
  //y=6
  //board[0][0] as x/y as 1/1 till board [6/5] as x/y as 7/6

  /*
        Vision: We select one from the array (1-6) and then push in its sub array.

        Note: Array to subarray as x to y

        Foregoing: We evaluate whether its even or not.

        Then: We add a loop to check whether we have a winning pattern.It should be around 3 functions. Let's see..

            Color.red:   translates as 0 due to its Enum Color
            Color.blue:  trnaslates as 1 due to its Enum Color

        Retro: The 3 main-functions.

        o isEven: Determines the player's turn.
        o act: Adds a Chip to the Board.
        o hasWon: Determines whether a winning condition has occured and identifes the winning color.
            -> HasWon uses sub-functions for easier readbility. The sub-functions are discribative and commented.
        
        Enjoy the game :)


  */

  board: Chip[][] = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],

  ]



  constructor() { }



  isEven() {
    if (this.count % 2 == 0) { this.even = true } else { this.even = false }
  }



  act(number: number) {
    if (this.won === false) {

      if ((number >= 0 && number <= 6) && this.board[number].length < 6) {

        this.isEven()
        switch (this.even) {
          case true: this.board[number].push(new Chip(Color.red))
            break
          case false: this.board[number].push(new Chip(Color.blue))
        }

        this.hasWon()

        if (this.won === false) {
          this.count = this.count + 1
        }
      }
    }
  }
  hasWon() {

    if (this.hasBlueWon()) {
      this.won = true
      this.blue = true
      return true
    }

    if (this.hasRedWon()) {
      this.won = true
      this.red = true
      return true
    }
    return false


  }

  hasRedWon(): boolean {
 
    if (this.xOneToSixVertGameRedWins() || this.yOneToSevenHorGameRedWins() || this.xyGameRedWins()) {

      return true
    }
    return false
  }


  hasBlueWon(): boolean {

    if (this.xOneToSixVertGameBlueWins() || this.yOneToSevenHorGameBlueWins() || this.xyGameBlueWins()) {

      return true
    }
    return false
  }



  xOneToSixVertGameBlueWins(): boolean {

  //checking for vertical 4 blue coins x=n kinda type 

    for (let n = 0; n < 7; n++) {
      for (let m = 0; m < 6; m++) {
        try {

          if (
            this.board[n][m].equals(new Chip(Color.blue)) &&
            this.board[n + 1][m].equals(new Chip(Color.blue)) &&
            this.board[n + 2][m].equals(new Chip(Color.blue)) &&
            this.board[n + 3][m].equals(new Chip(Color.blue))
          ) { return true }

          continue
        } catch (error) {
          continue
        }

      }
    }
    return false
  }
  
  xOneToSixVertGameRedWins(): boolean {

    //checking for vertical 4 red coins x=n kinda type 

    for (let n = 0; n < 7; n++) {
      for (let m = 0; m < 6; m++) {
        try {

          if (
            this.board[n][m].equals(new Chip(Color.red)) &&
            this.board[n + 1][m].equals(new Chip(Color.red)) &&
            this.board[n + 2][m].equals(new Chip(Color.red)) &&
            this.board[n + 3][m].equals(new Chip(Color.red))
          ) { return true }

          continue
        } catch (error) {
          continue
        }

      }
    }
    return false
  }

  yOneToSevenHorGameRedWins(): boolean {

//checking for horizontal 4 red coins y=n kinda type 

    for (let n = 0; n < 7; n++) {
      for (let m = 0; m < 6; m++) {
        try {

          if (
            this.board[n][m].equals(new Chip(Color.red)) &&
            this.board[n][m + 1].equals(new Chip(Color.red)) &&
            this.board[n][m + 2].equals(new Chip(Color.red)) &&
            this.board[n][m + 3].equals(new Chip(Color.red))
          ) { return true }

          continue
        } catch (error) {
          continue
        }

      }
    }
    return false
  }

  yOneToSevenHorGameBlueWins(): boolean {

//checking for horizontal 4 blue coins y=n kinda type 

    for (let n = 0; n < 7; n++) {
      for (let m = 0; m < 6; m++) {
        try {

          if (
            this.board[n][m].equals(new Chip(Color.blue)) &&
            this.board[n][m + 1].equals(new Chip(Color.blue)) &&
            this.board[n][m + 2].equals(new Chip(Color.blue)) &&
            this.board[n][m + 3].equals(new Chip(Color.blue))
          ) { return true }

          continue
        } catch (error) {
          continue
        }

      }
    }
    return false
  }



  xyGameRedWins() {
  
    for (let n = 0; n < 7; n++) {

      for (let m = 0; m < 6; m++) {
     //checking for rising red coins y=x kinda type
        try {
          if (

            this.board[n][m].equals(new Chip(Color.red)) &&
            this.board[n + 1][m + 1].equals(new Chip(Color.red)) &&
            this.board[n + 2][m + 2].equals(new Chip(Color.red)) &&
            this.board[n + 3][m + 3].equals(new Chip(Color.red))

          ) { return true }

        } catch (error) {
          // do nothing lol
        }

         //checking for falling red coins y=-x kinda type
         try {
          if (

            this.board[n][m].equals(new Chip(Color.red)) &&
            this.board[n + 1][m - 1].equals(new Chip(Color.red)) &&
            this.board[n + 2][m - 2].equals(new Chip(Color.red)) &&
            this.board[n + 3][m - 3].equals(new Chip(Color.red))

          ) { return true }


        } catch (error) {
          //do nothing lol
        }


      }
    }

    return false

  }


  xyGameBlueWins() {

     
    for (let n = 0; n < 7; n++) {

      for (let m = 0; m < 6; m++) {
        //checking for rising blue coins y=x kinda type
        try {
          if (

            this.board[n][m].equals(new Chip(Color.blue)) &&
            this.board[n + 1][m + 1].equals(new Chip(Color.blue)) &&
            this.board[n + 2][m + 2].equals(new Chip(Color.blue)) &&
            this.board[n + 3][m + 3].equals(new Chip(Color.blue))

          ) { return true }

        } catch (error) {
          // do nothing lol
        }

        //checking for falling blue coins y=-x kinda type
        try {
          if (

            this.board[n][m].equals(new Chip(Color.blue)) &&
            this.board[n + 1][m - 1].equals(new Chip(Color.blue)) &&
            this.board[n + 2][m - 2].equals(new Chip(Color.blue)) &&
            this.board[n + 3][m - 3].equals(new Chip(Color.blue))

          ) { return true }


        } catch (error) {
          //do nothing lol
        }

      }
    }


    return false

  }


}


