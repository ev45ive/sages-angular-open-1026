
# Instalacje

node -v
npm -v
git -v

v24.15.0
11.12.1
git version 2.40.1.windows.1

# VS Code
Ctrl+Shift+P -> Clone

# GIT
https://github.com/ev45ive/sages-angular-open-1026.git


# Angular CLI
npm install -g @angular/cli@latest

ng version
ng -help

ng new -help
ng s -help

https://angular.dev/update-guide?v=18.0-19.0&l=2

# Translate
- ???

# new workspace

ng new sages  --ai-config vscode --directory "." --inline-style  --inline-template --skip-tests  --routing  --style tailwind  --zoneless --ssr false

# ng serve
npm i 
// oraz:

npm start 

// lub:
ng serve -o

// lub:
ng s - o

http://localhost:4200/


# Material
ng add @angular/

# DevTools
https://angular.dev/tools/devtools




# Design Tokens

https://m3.material.io/foundations/design-tokens/overview
https://v21.primeng.org/theming/styled#architecture

# Flex
https://css-tricks.com/snippets/css/a-guide-to-flexbox/

http://www.flexboxdefense.com/
https://flexboxfroggy.com/


# CSS GRID
https://css-tricks.com/complete-guide-css-grid-layout/
https://cssgridgarden.com/


# CSS Specifity
https://css-tricks.com/specifics-on-css-specificity/ 

# CSS Selectors
https://flukeout.github.io/

# CSS 2022 Selectors

https://css-tricks.com/what-css-do-you-absolutely-have-to-know-in-2022/

https://caniuse.com/?search=container

https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries

https://web-platform-dx.github.io/baseline/

https://tailwindcss.com/docs/responsive-design#container-queries

https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-parent-state


# Schematics - ng g component ...
ng g --help 
ng g c --help 

ng g c features/deals/pages/deals-search --type page

ng g s features/deals/data/deals-source

ng g interface features/deals/model/deal 

npm run ng -- g interface features/deals/model/deal 
