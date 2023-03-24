# mern-stack-example
Mern Stack code for the [Mern Tutorial](https://www.mongodb.com/languages/mern-stack-tutorial)

[![CI](https://github.com/mongodb-developer/mern-stack-example/actions/workflows/main.yaml/badge.svg)](https://github.com/mongodb-developer/mern-stack-example/actions/workflows/main.yaml)

## How To Run
Create an Atlas URI connection parameter in `mern/server/config.env` with your Atlas URI:
```
ATLAS_URI=mongodb+srv://jeremyzgagnon:sonic95@cluster0.4gwuftx.mongodb.net/test
PORT=5000
```
//Pour utiliser notre application
Start server:
```
cd mern/server
npm install
npm start
```

Start Web server
```
cd mern/client
npm install
npm start
```

## Disclaimer

Use at your own risk; not a supported MongoDB product

Composants reactjs: Un composant React est un morceau de code réutilisable qui décrit une partie d'une interface utilisateur. Il peut être considéré comme un bloc de construction que vous pouvez utiliser pour créer un site Web ou une application.

Props: Les accessoires (props) sont un moyen de transmettre des données d'un composant à un autre dans React. Ils sont comme des paramètres dans un appel de fonction.

States:  L'état dans React est un objet qui représente l'état actuel d'un composant. Il est utilisé pour stocker des données qui peuvent changer au fil du temps, telles que les entrées de l'utilisateur ou les données extraites d'une API.