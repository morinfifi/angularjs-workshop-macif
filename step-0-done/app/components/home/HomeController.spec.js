/* eslint no-undef:0 */

import { assert } from 'chai';
import HomeController from './HomeController';

describe('Home Controller', () => {
  let controller;
  beforeEach(() => {
    controller = new HomeController();
  });

  it('should define basic model', () => {
    assert.equal(controller.millesime, '2005');
    assert.equal(controller.nom, 'Chateau Poitevin');
  });
});
