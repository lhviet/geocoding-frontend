# Geocoding Frontend
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Introduction
- The project includes two parts: Frontend (React/Redux) and Backend (Ruby on Rails).
- The frontend part provides features including: Search (geocoding), save the location (Markers), and visualize the data (maps, marker).

#### Demo
Live at (AWS S3 & Cloudfront)

http://d6a0lx3aavn7k.cloudfront.net

#### Features
**1. Backend communication**
- Address search (Geocoding)
- Markers retrieving, CRUD

**2. Frontend & Google Maps API**
- Search & Locate a location (Marker)
- Display Marker information & support CRUD actions
- Design: scrolling, navigation & sidebar layout...

#### Technology
- ARc - Atomic design
- CSS-in-JS - styled-component
- jest, storybook
- rxjs, redux-observable (epic)
- lodash
- Google Maps API (frontend) & Bing Maps API (backend)
- typescript, tslint

#### How to start (available scripts)
- install packages `yarn`
- run in local `yarn start`, remember to modify `src/5_constants/api.ts` to connect to the backend
- test UI/UX `yarn storybook`
- jest test `yarn tests`
- build & deploy `yarn build`

## Philosophy
#### Structure
1. Components - [ARc](https://arc.js.org/) Atomic design
- `atoms` contains very basic (principle) components
- `molecules` contains components comprising from `atoms`
- `organisms` contains components comprising from `atoms`, `molecules`, and `organisms`  

**`Components` contains no-container-components only, there are no containers mapped to `components`.**
Any component which requires logic & data will be located in `containers`.

2. Containers  
Components in `containers` including both UI & its logic  
- `pages` contains pages in routes
- `components` contains components

The relationship between `Components` and `Containers` is Uni-direction, because I believe this way will make the logic & state clearer.  
- `Containers` --self-refs--> `Containers`.
- `Containers` -------refs--> `Components`.

#### Code Comment
Not many comments given in the source code, but only the part hard to understand or need more actions.
I believe that the code itself explaining what it does (meaningful function name, variables).

