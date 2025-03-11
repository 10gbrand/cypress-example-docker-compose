// tests/geotjanster.cypress.spec.js
describe('Geotjanster API Tests', () => {
    const BASE_URL = Cypress.env('geotjanster') || 'http://geotjanster';
    const COMMON_PARAMS = {
      north: '6498599',
      east: '508826',
      srs: 'epsg:3006'
    };
  
    it('should verify MO layer contains endpoint', () => {
      cy.request({
        method: 'GET',
        url: `${BASE_URL}/Relation/v5/RelationService.svc/rest/contains`,
        qs: {
          layer: 'MO',
          ...COMMON_PARAMS
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('features').that.is.an('array');
      });
    });
  
    it('should retrieve layers description', () => {
      cy.request({
        method: 'GET',
        url: `${BASE_URL}/Relation/v4/RelationService.svc/rest/layersdescription`
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('layers').that.is.an('array');
      });
    });
  
    it('should verify LLD layer contains endpoint', () => {
      cy.request({
        method: 'GET',
        url: `${BASE_URL}/Relation/v5/RelationService.svc/rest/contains`,
        qs: {
          layer: 'LLD',
          ...COMMON_PARAMS
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.features).to.satisfy(features => 
          features.every(f => f.properties.layer === 'LLD')
        );
      });
    });
  
    it('should verify FASTIGHET layer contains endpoint', () => {
      cy.request({
        method: 'GET',
        url: `${BASE_URL}/Relation/v5/RelationService.svc/rest/contains`,
        qs: {
          layer: 'FASTIGHET',
          ...COMMON_PARAMS
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.nested.property('features[0].geometry.type', 'Polygon');
      });
    });
  });
  