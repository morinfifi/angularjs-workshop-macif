import HomeController from './HomeController';

export default {
  controller: HomeController,
  template: `
    <div>
      <p id='nom'>Nom: {{$ctrl.nom}}</p>
      <p>Millesime: {{$ctrl.millesime}}</p>
    </div>
  `,
};
