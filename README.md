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

Quelle est la différence entre React et React Native ?

React est destiné à la création d'applications Web tandis que React Native est destiné à la création d'applications mobiles. React utilise des composants Web et React Native utilise des composants natifs pour créer une application mobile.



React est-il un framework ou une bibliothèque ?

React est une bibliothèque JavaScript, et non un framework.



Quelle est la différence entre un framework et une bibliothèque ?

Une bibliothèque fournit des fonctions spécifiques qui peuvent être utilisées indépendamment, tandis qu'un framework fournit une structure globale et des conventions que les développeurs doivent suivre. Une bibliothèque est utilisée pour résoudre un problème spécifique, tandis qu'un framework est utilisé pour construire une application entière.


Quelles sont les différences entre HTML et JSX ? En quelques phrases, comparez et opposez HTML et JSX.


HTML est un langage de balisage autonome utilisé pour créer des pages Web, tandis que JSX est une extension de syntaxe pour JavaScript utilisée avec React pour définir la structure et le comportement des composants de l'interface utilisateur. Bien qu'ils partagent certaines similitudes dans la syntaxe et les fonctionnalités, JSX offre une flexibilité et des fonctionnalités supplémentaires non disponibles en HTML.

Ce qui rend React attractif?




Quelles sont les alternatives à la pile MERN ?


1. Pile MEAN : MEAN signifie MongoDB, Express, Angular et Node.js. Angular est un framework frontal populaire pour la création d'applications d'une seule page, et il offre une approche différente de la création d'interfaces utilisateur que React.
2. Pile LAMP : LAMP signifie Linux, Apache, MySQL et PHP. Il s'agit d'une pile de développement Web open source populaire qui existe depuis de nombreuses années. PHP est un langage de script côté serveur et MySQL est un système de gestion de base de données relationnelle.
3. Pile Django : Django est un framework Web basé sur Python qui suit le modèle architectural Model-View-Controller (MVC). Il fournit une solution complète pour créer des applications Web, y compris un système de mappage objet-relationnel (ORM) et un moteur de modèles.
4. Pile Ruby on Rails : Ruby on Rails est un framework d'application Web populaire écrit en Ruby. Il suit le modèle architectural Model-View-Controller (MVC) et fournit une solution complète pour la création d'applications Web.
5. Pile .NET : .NET est un framework gratuit, open source et multiplateforme pour la création d'applications Web. Il prend en charge plusieurs langages, dont C# et F#, et fournit un riche ensemble de bibliothèques et d'outils pour créer des applications Web hautes performances.


En résumé, la pile MERN n'est qu'une des nombreuses options disponibles pour créer des applications Web. Le choix de la pile dépend des exigences spécifiques du projet, des compétences et des préférences de l'équipe de développement et des ressources disponibles.


Pourquoi MERN est-il un bon choix pour le développement de end-to-end ?

MERN est est un choix populaire pour son évolutivité, son code modulaire et réutilisable, sa communauté nombreuse et active et son développement rapide.

2 Referentiel GITHUB intéressant

1:https://github.com/hita03/EmployeeManagement-MERN/tree/main/src

2:https://github.com/kmaryam27/Employee-Management-System

Ceci sont d'autres example de projet utiliser pour la gestion des employées.