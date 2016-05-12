# Etape 0 - Installation de l'environnement, création d'un module Angular et du premier TU

## Hello {{AngularJS}}

Créez une page HTML basique :

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <title>Workshop AngularJS</title>
</head>
<body ng-app>
    {{'Bienvenue' + ' dans ce ' + 'workshop !'}}

    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.min.js"></script>
</body>
</html>
```

Ouvrez la page dans votre navigateur, le template est résolu. L'attribut `ng-app` dans l'élément `<body>` permet de bootstraper l'application `AngularJS` (le framework étant chargé depuis un **CDN**).

## package.json

Nous allons à présent créer l'application AngularJS qui sera mise en oeuvre dans ce workshop. Créez un nouveau dossier pour votre application. Une fois dans ce dossier lancez la commande `npm init`.
Répondez aux diverses questions de l'assistant afin d'initialiser votre fichier `package.json`.

Une fois le fichier créé, installez les dépendances de la manière suivante :

```
npm install --save angular@1.5.5
```

avec cette commande, vous spécifiez à `npm` d'aller chercher la dernière version du paquet `angular` sur `npmjs.com`, de l'installer en local dans le dossier `node_modules` local et de le déclarer comme dépendance dans le fichier `package.json` (via l'argument --save).

Une autre possibilité est de créez un fichier `package.json` et de déclarer manuellement les dépendances `angular` :

```json
{
    "name": "angularjs-workshop",
    "description": "Workshop AngularJS",
    "version": "0.1.0",
    "dependencies": {
        "angular": "1.5.5"
    }
}
```

Lancez maintenant la commande `npm install` afin de télécharger localement les dépendances (elles se trouvent dans le répertoire `node_modules`)

## Build avec Webpack

Nous utilisons l'outil [Webpack](https://webpack.github.io/) afin de construire notre application.

En complément de Webpack, nous utilisons [Babel](https://babeljs.io/), un compilateur Javascript qui permet de traduire les futures versions de JS en ES5.
Dans notre cas, nous utilisons le plugin `es2015`.

Installez les dépendances de développement nécessaires au build Webpack à l'aide de la ligne de commande suivante :

```
npm install --save-dev webpack@1.13.0 babel-loader@6.2.4 babel-preset-es2015@6.6.0
```


Une autre possibilité est de mettre à jour directement le fichier `package.json`, en ajoutant le block suivant :

```json
"devDependencies": {
    "webpack": "1.13.0",
    "babel-loader": "6.2.4",
    "babel-preset-es2015": "6.6.0"
}
```

Ici l'argument `--save-dev` indique que le dépendance doit être inscrite dans les dépendances du build et non du projet lui-même. Dans la suite de ce workshop, nous utiliserons l'outil en ligne de commande pour installer les dépendances. Si vous préférez, éditer directement le fichier `package.json`, n'hésitez pas (sans oublier de lancer la commande `npm install` après chaque modification).

Créez le fichier `webpack.config.js` permettant de configurer Webpack et Babel :

```javascript
var webpack = require('webpack');

module.exports = {
    output: {
        path: './public/js/',
        publicPath: '/js/',
        filename: 'bundle.js'
    },
    entry: {
        app: ['./app/app.js']
    },
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};
```

La configuration de Webpack est simple :

* Le point d'entrée est le fichier `app/app.js`
* Le fichier `bundle.js` est généré dans le répertoire `public/js`
* Le build exécute le lanceur `babel` avec le plugin `es2015`
    * *Remarque : les plugins babel peuvent également être définis dans le fichier de configuration `.babelrc`*

Vous pouvez ajouter les commandes Webpack sous forme de scripts dans le fichier `package.json`. Par exemple :

```json
"scripts": {
    "bundle": "webpack -p --colors --progress"
}
```

Ainsi, la commande `npm run bundle` permet de construire le fichier `bundle.js`

## Création du module principal

### index.html

Dans le répertoire `public`. Dans ce répertoire, créez une page HTML basique :

```html
<!DOCTYPE html>
<html>
  <head>
      <meta charset="UTF-8"/>
      <title>Workshop AngularJS</title>
  </head>
  <body>
    {{'Bienvenue' + ' dans ce ' + 'workshop !'}}

    <script src="./js/bundle.js"></script>
  </body>
</html>
```

A la différence de la version précédente de `index.html` l'ensemble des ressources **JavaScript** (propres au projet et librairies externes) sont regroupées dans un unique fichier `bundle.js` produit par la build **webpack**.

### app/app.js

Dans le répertoire `app`, créez le fichier `app.js` qui sera le module principal, cette solution est une alternative à l'utilisation de `ng-app` vue précédement, qui est généralement préférée car plus souple :  

```javascript
import angular from 'angular';

angular.module('aw-wine', []);
angular.element(document).ready(() => {
  angular.bootstrap(document, ['aw-wine']);
});
```

## Exécution avec Webpack Dev Server

Afin de rendre la page `index.html` dans un navigateur, nous utilisons [Webpack Dev Server](http://webpack.github.io/docs/webpack-dev-server.html).

Ajoutez la dépendance à `webpack-dev-server` via la ligne de commande :

 ```
 npm install --save-dev webpack-dev-server@1.14.1
 ```

Ajoutez un nouveau script permettant de lancer le serveur Webpack :

```
"scripts": {
    "start": "webpack-dev-server -d --colors --inline --content-base public"
}
```

Lancez enfin la commande `npm start` et ouvrez la page `http://localhost:8080`.

## ESLint

[ESLint](http://eslint.org/) est un outil qui permet d'analyser votre code Javascript selon un certains nombre de règles.

Dans notre cas, nous allons suivre la configuration de base AirBnB.

Pour commencer, ajoutez les dépendances permettant d'utiliser ESLint :

```
npm install --save-dev eslint@2.8.0 eslint-config-airbnb-base@1.0.4 eslint-plugin-import@1.6.0
```

Créez ensuite le fichier `.eslintrc` à la racine du projet qui permet de configurer ESLint :

```json
{
  "extends": "airbnb-base"
}
```

* L'attribut `extends` permet d'hériter d'une configuration existante. Par exemple, `eslint:recommended` contient les règles recommandée par ESLint.

Nous allons maintenant créer un fichier `.eslintignore` permettant d'exclure certains fichiers de l'analyse.
Dans notre cas, nous allons exclure les fichiers suivants :

* `node_modules` : les dépendances externes
* `webpack.config.js` : le fichier de configuration `webpack`
* `public` : le répertoire d'output de `webpack`

Le contenu du fichier `.eslintignore` est le suivant :
```
node_modules
webpack.config.js
public
```

Enfin, ajoutez un script dans le fichier `package.json` permettant d'exécuter ESLint grâce à la commande `npm run lint` :

```json
"scripts": {
  "lint": "eslint app"
}
```

Cette opération peut également être prise en charge par webpack à l'aide d'un preloader `npm install --save-dev eslint-loader@1.3.0` que l'on configure avant les loaders :

```javascript
var path = require('path');
...
preLoaders: [
  {
    test: /\.js$/,
    include: path.resolve(__dirname, "app"),
    loader: "eslint-loader"
  }
],
```

## Tests

Pour finir la configuration de l'environnement de développement, nous allons maintenant configurer l'environnement de tests.
Nous vous conseillons de réaliser ce workshop en [Test Driven Development](https://fr.wikipedia.org/wiki/Test_driven_development).

Nous utiliserons [Karma](https://karma-runner.github.io/0.13/index.html) comme runner, [Jasmine](http://jasmine.github.io/) pour créer des tests [BDD](https://fr.wikipedia.org/wiki/Behavior_driven_development) et [Chai](http://chaijs.com/) pour les assertions. Les mocks sont fournis par angular-mocks.

Ajoutez les dépendances de développement suivantes :
```
npm install --save-dev angular-mocks@1.5.5 chai@3.5.0 html-loader@0.4.3 jasmine@2.4.1 karma@0.13.22 karma-chai@0.1.0 karma-jasmine@0.3.8 karma-mocha-reporter@2.0.2 karma-phantomjs-launcher@1.0.0 karma-webpack@1.7.0 phantomjs-prebuilt@2.1.7
```

Comme le code souce à tester est en ES6, nous utilisons webpack, afin qu'il transpile et génère un bundle regroupant tous les tests.
A cette fin, nous allons ajouter le fichier `webpack.karma.context.js` qui permet de sélectionner l'ensemble des fichiers `.spec.js` comme sources de tests :

```javascript
let context = require.context('./app', true, /\.spec\.js/);
context.keys().forEach(context);
```

Nous allons configurer `Karma`, qui a pour tâche de lancer les tests, en créant le fichier `karma.conf.js` à la racine du projet :

```javascript
var webpack = require('webpack');

module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['jasmine', 'chai'],

    files: ['webpack.karma.context.js'],

    preprocessors: {
      'webpack.karma.context.js': ['webpack']
    },

    webpack: {
      module: {
        loaders: [
          {
          test: /.js?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['es2015']
          }
        }
        ]
      },
      watch: true
    },

    webpackMiddleware: {
      noInfo: true
    },

    reporters: ['mocha'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['PhantomJS'],

    singleRun: false,

    concurrency: Infinity
  })
}
```

Pensez à ajouter les ligne suivante dans le fichier `.eslintignore`:
```
karma.conf.js
webpack.karma.context.js
```

La configuration de Karma est la suivante :

* Le point d'entrée est le fichier `webpack.karma.context.js`
* Webpack est utilisé pour générer le bundle de test
* On déclare les frameworks de test et d'assertion (Jasmine et Chai)
* Nous activons l'autowatch pour observer le progrès de notre implémentation

Il reste à créer le premier test. Dans le répertoire app, nous allons créer le répertoire components et dans ce dernier, le répertoire home.
Dans ce repertoire home, nous devons créer notre premier composant Angular. Ce composant fera appel à un contrôleur.
Pour les besoins du test nous créons un fichier vide `HomeController.js`.
Enfin, nous créons le fichier `HomeComponent.spec.js` :

```javascript
/* eslint no-undef:0 */
import { assert } from 'chai';
import HomeController from './HomeController';

describe('Home Component', () => {

  let controller;
  beforeEach(() => {
    controller = new HomeController();
  });

  it('should define basic model', () => {
    assert.equal(controller.millesime, '2005');
    assert.equal(controller.nom, 'Chateau Poitevin');
  });
});
```

Ajoutez une nouveau script dans le fichier `package.json`, ce script permet de lancer les tests :
```
"scripts": {
  ...
  "test" : "karma start"
}
```

Vous pouvez à présent lancer votre contexte de test :
```
  npm test
```

Vous l'avez remarqué, l'exécution des tests provoque une erreur, ce qui est normal dans la mesure où le fichier `HomeController.js` n'a pas été implémenté. La configuration mise en oeuvre démarre le contexte de tests et surveille les changements des fichiers afin de relancer les tests automatiquement lorsque les fichiers sont modifiés. Dans le cadre de l'industrialisation vous pouvez modifier ce comportement en modifiant la valeur du paramètre `singleRun` à `true`dans le fichier `karma.conf.js`.

A présent, vous pouvez implémenter `HomeController.js` :
```
export default class HomeController {
  constructor() {
    this.nom = 'Chateau Poitevin';
    this.millesime = '2005';
  }
}
```

## Prochaine étape

Une fois cette étape terminée, vous pouvez aller consulter la [version corrigée](../step-0-done) puis aller jusqu'à [l'étape suivante](../step-1)
