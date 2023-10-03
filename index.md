---
title: "Section 5: Graphics and Midterm Review"
author: Jed Rembold and Eric Roberts
date: Week of October 2nd
slideNumber: true
theme: monokai
highlightjs-theme: monokai
width: 1920
height: 1080
transition: fade
css:
  - css/codetrace.css
  - css/roberts.css
  - MysteryTrace.css
tracejs:
  - Mystery
---


## The Classic Game
- Write a graphical program `TicTacToeBoard.py` that draws a Tic-Tac-Toe board centered in the graphics window, as shown in the following image:
  
  ![](./images/TicTacToeBoard-out.png){width=50%}

  The size of the board should be specified as a constant, and the diagram should be centered in the window, both horizontally and vertically.


## Coordinate Calculations
- One of the problems that people often have is calculating the coordinates for each `GObject` on the screen given the constants provided in the template.

::::::cols
::::{.col style='flex-grow:1.2'}
:::{style='font-size:.8em'}
<ul>
  <li class='fragment' data-fragment-index=1>Here are some useful steps:</li>
  <ul>
    <li class='fragment' data-fragment-index=2>Find a sheet of graph paper</li>
    <li class='fragment' data-fragment-index=3>Draw the figure you want</li>
    <li class='fragment' data-fragment-index=4>Compute the coordinates of the center of the window</li>
    <li class='fragment' data-fragment-index=5>Compute the coordinates of each point in terms of defined constants and the center</li>
    <ul>
      <li class='fragment' data-fragment-index=6>The <em>x</em> coordinate of the first vertical line is shifted left by one-sixth of the board size</li>
      <li class='fragment' data-fragment-index=7>The <em>y</em> coordinate of that line is shifted up by half the size of the board</li>
    </ul>
  </ul>
</ul>
:::
::::

::::col
![](./images/tictactoe.svg)

::::
::::::


## Tic-Tac-Solution
```{.mypython style='font-size:.8em; max-height:900px'}
# File: TicTacToeBoard.py

"""
This program draws a Tic-Tac-Toe board in the center of the
graphics window.
"""

from pgl import GWindow, GLine

# Constants

GWINDOW_WIDTH = 500
GWINDOW_HEIGHT = 300
BOARD_SIZE = 240

# Main program

def tic_tac_toe_board():
    """
    Draws a Tic-Tac-Toe board.  The program centers the board
    on the window and computes the coordinates of the lines
    from the constant BOARD_SIZE.
    """
    gw = GWindow(GWINDOW_WIDTH, GWINDOW_HEIGHT)
    cx = gw.get_width() / 2
    cy = gw.get_height() / 2
    half = BOARD_SIZE / 2
    sixth = BOARD_SIZE / 6
    gw.add(GLine(cx - half, cy - sixth, cx + half, cy - sixth))
    gw.add(GLine(cx - half, cy + sixth, cx + half, cy + sixth))
    gw.add(GLine(cx - sixth, cy - half, cx - sixth, cy + half))
    gw.add(GLine(cx + sixth, cy - half, cx + sixth, cy + half))

# Startup code

if __name__ == "__main__":
    tic_tac_toe_board()
```

## Midterm 1 Review
- The rest of section slides go through the solutions to the first practice midterm so that you can see how to approach these problems.
- The actual Midterm 1 will have the same number of questions, each with the same topics.


## Practice Midterm: 1a


## Practice Midterm: 1b


## Practice Midterm: 1c


## Practice Midterm: 2 {data-state="MysteryTrace"}
<table id="MysteryTable">
<tbody style="border:none;">
<tr><td><div id="MysteryTrace" style="margin:0px;"></div></td></tr>
<tr><td>
<div id="MysteryBanner" style="margin:0px; padding:0px;">Console</div>
</td></tr>
<tr><td><div id="MysteryConsole"></div></td></tr>
<tr>
<td style="text-align:center;">
<table class="CTControlStrip">
<tbody>
<tr>
<td>
<img id=MysteryTraceStepInButton
     class="CTButton"
     src="images/StepInControl.png"
     alt="StepInButton" />
</td>
<td>
<img id=MysteryTraceResetButton
     class="CTButton"
     src="images/ResetControl.png"
     alt="ResetButton" />
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</table>
