# Athletes

No responsive app displaying athletes data

## Table of contents

- [General info](#general-info)
- [Screenshots](#screenshots)
- [Technologies](#technologies)
- [Setup](#setup)

## General info

[demo](https://radeth.github.io/athletes/) </br>
this project was my first junior frontend recruitment task. I did not complete the task in the required time but i return to this recently and finish all features

### Training projects

- using scss in react first time [react-scss](https://github.com/radeth/react-scss)

## Screenshots

![](https://raw.githubusercontent.com/radeth/athletes/finalVersion/screenshootOne.png =250X250)
![](https://raw.githubusercontent.com/radeth/athletes/finalVersion/Untitled%20Diagram%20(1).png)

## Technologies

- JavaScript EcmaScript 6
- React v16.7 with tools:
  - node-sass v4.11
  - reveal v1.22

## Setup

To run this project, install it locally using npm

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>

## Features

1. Add buttons for displaying previous and next athlete profiles
2. Display Section as tabs instead of the list (Overview, Predictions, Hints)
3. Improve "Skillset" display in "Overview"

- display items horizontally
- use icons from assets/ directory instead of names
- use green & red to mark the highest and lowest values (with Simone Biles upperBody and endurance should be in red, aesthetics in green)

4. Add Filters to "Predictions" based on discipline tags and 'isIndividual' flag
5. Add sort options alphabetical & based on overall score
6. Improve display of diciplines in "Predictions"

- add discipline photo
- add 'Individual sport' / 'Team sport' based on 'isIndividual' flag
- add disciplines tags
- make each discipline collapsible (toggle when clicked)
- animate fold / unfold effect
- display drilldown of score per skill (similar to skills in "Profile" but this time with skillScore)

7. Extract common style values into reusable variables set (eg. primary color) and use it throughout the project
8. Implement Hints
   Display 2 columns "Should try" & "Should avoid" with at least three disciplines each.
   It should be those disciplines, that are not native for the athlete and have highest & lowest overall score respectively.
   If more then 3 disciplines share the same score display them as well.
