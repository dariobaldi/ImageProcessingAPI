import app from '../../../index';
import supertest from 'supertest';

const request = supertest(app);

describe('Test /api/images endpoint', () => {
  describe('Calls with correct parameters', () => {
    it('Call for basic image get 200 status and image reponse type', async () => {
      const response = await request.get(
        '/api/images?filename=fjord&width=50&height=50&format=jpg'
      );
      expect(response.status).toBe(200);
      expect(response.type).toBe('image/jpeg');
    });

    it('Format should default to jpg when not indicated', async () => {
      const response = await request.get(
        '/api/images?filename=fjord&width=500&height=500'
      );
      expect(response.status).toBe(200);
      expect(response.type).toBe('image/jpeg');
    });

    it('Convert a png file', async () => {
      const response = await request.get(
        '/api/images?filename=logo&width=500&height=500&format=png'
      );
      expect(response.status).toBe(200);
      expect(response.type).toBe('image/png');
    });
  });

  describe('Calls with wrong parameters in endpoint', () => {
    it('Image doesn\'t exists when wrong format is provided', async () => {
      const response = await request.get(
        '/api/images?filename=fjord&width=500&height=500&format=png'
      );
      expect(response.status).toBe(500);
      expect(response.type).toBe('text/html');
      expect(response.text).toBe(
        "File fjord.png doesn't exists on the assets folder."
      );
    });

    it('Providing no width parameter should result in error', async () => {
      const response = await request.get(
        '/api/images?filename=logo&height=500&format=png'
      );
      expect(response.status).toBe(400);
      expect(response.type).toBe('text/html');
      expect(response.text).toBe(
        'Incorrect height or width (should be a number over 0)'
      );
    });
  });
});
