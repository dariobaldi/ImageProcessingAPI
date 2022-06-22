import app from '../index';
import supertest from 'supertest';
import { exists } from 'fs';

const request = supertest(app);

describe('Test /api/images endpoint', () => {
  describe('Calls with correct parameters in endpoint', () => {
    it('Get basic 50x50 pixels lowres image', async () => {
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

    it('Get resized image from png file', async () => {
      const response = await request.get(
        '/api/images?filename=logo&width=500&height=500&format=png'
      );
      expect(response.status).toBe(200);
      expect(response.type).toBe('image/png');
    });
  });

  describe('Calls with wrong parameters in endpoint', () => {
    it('Call for fjord.jpg with format=png', async () => {
      const response = await request.get(
        '/api/images?filename=fjord&width=500&height=500&format=png'
      );
      // console.log(response)
      expect(response.status).toBe(500);
      expect(response.type).toBe('text/html');
      expect(response.text).toBe("Error: File fjord.png doesn't exists.");
    });

    // it('call for logo.png without width parameter', async () => {
    //   const response = await request.get(
    //     '/api/images?filename=logo&height=500&format=png'
    //   );
    //   // console.log(response)
    //   expect(response.status).toBe(400);
    //   expect(response.type).toBe('text/html');
    //   expect(response.text).toBe(
    //     'Error: incorrect height or width (should be a number over 0)'
    //   );
    // });

    it('call for logo.png without width parameter', async () => {
        const response = await request.get(
          '/api/images?width=500&height=500&format=png'
        );
        // console.log(response)
        expect(response.status).toBe(400);
        expect(response.type).toBe('text/html');
        expect(response.text).toBe(
          'Error: incorrect height or width (should be a number over 0)'
        );
      });
  });
});
