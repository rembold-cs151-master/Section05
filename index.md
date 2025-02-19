---
title: "Section 5: Midterm Review"
author: Jed Rembold and Eric Roberts
date: Week of February 17th
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
  - Mystery2Trace.css
tracejs:
  - Mystery
  - Mystery2
content_url: https://github.com/rembold-cs151-master/Section05
---

## Midterm Reviews
- These section slides go through the solutions to the practice midterms so that you can see how to approach these problems.
- The actual Midterm 1 will have the same number of questions, each with the same topics.

# Practice 1 - Prob 1
## Part A: Numeric Expressions

![](./images/exam1_p1a.svg)


## Part B: Boolean Expressions

![](./images/exam1_p1b.svg)


## Part C: String Expressions

![](./images/exam1_p1c.svg)


# Practice 1 - Prob 2
## Practicing tracing {data-state="MysteryTrace"}
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

# Practice 1 - Prob 3
## Summing odd numbers
One approach might look like:

```mypython
def sum_odds(N):
    total = 0
    for i in range(1, 2*N, 2):
        total += i
    return total
```

# Practice 1 - Prob 4
## Removing duplicate letters

```mypython
def remove_dups(word):
    new = ""
    for i in range(len(word)):
        if not (i > 0 and word[i] == word[i-1]):
            new += word[i]
    return new
```


# Practice 2 - Prob 1
## Part A: Numeric Expressions

![](./images/exam2_p1a.svg)

## Part B: Boolean Expressions

![](./images/exam2_p1b.svg)

## Part C: String Expressions

![](./images/exam2_p1c.svg)


# Practice 2 - Prob 2
## Practicing Tracing {data-state="Mystery2Trace"}
<table id="Mystery2Table">
<tbody style="border:none;">
<tr><td><div id="Mystery2Trace" style="margin:0px;"></div></td></tr>
<tr><td>
<div id="Mystery2Banner" style="margin:0px; padding:0px;">Console</div>
</td></tr>
<tr><td><div id="Mystery2Console"></div></td></tr>
<tr>
<td style="text-align:center;">
<table class="CTControlStrip">
<tbody>
<tr>
<td>
<img id=Mystery2TraceStepInButton
     class="CTButton"
     src="images/StepInControl.png"
     alt="StepInButton" />
</td>
<td>
<img id=Mystery2TraceResetButton
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

# Practice 2 - Prob 3
## Perfect Squares
- We need to be checking all possibilities between two different values, which would imply nested loops
- One approach might look like:
```mypython
def perfect_squares(N):
    count = 0
    for a in range(N):
        for b in range(N):
            if a ** 2 + b ** 2 == N ** 2:
                print(f"A={A}, B={b}")
                count += 1
    return count
```

# Practice 2 - Prob 4
## Pluralizing Words
- This is mostly just practicing conditional statements and string operations to check the needed constraints
- One solution:
```mypython
def create_regular_plural(word):
    if ( word[-1] in "sxz" or 
         word[-2:] == "ch" or word[-2:] == "sh"
       ): # Condition 1
        return word + "es"
    elif word[-1] == "y" and word[-2] not in "aeiou": # C2
        return word[:-1] + "ies"
    else: # Condition 3 (all else)
        return word + "s"
```

# Good luck on your midterm!
