import { resizeImage } from '../../../routes/api/imagesProcessing';

describe('Test resizeImage function', () => {
  it('Resize jpg image', async () => {
    expect(await resizeImage('paisaje', 500, 500, 'jpg')).toBe(
      'paisaje_500x500.jpg'
    );
  });

  it('Throw error when file does not exists', async () => {
    await expectAsync(resizeImage('udacity', 500, 500, 'jpg')).toBeRejectedWith(
      "File udacity.jpg doesn't exists on the assets folder."
    );
  });

  it('Throw error when width is incorrect', async () => {
    await expectAsync(resizeImage('paisaje', 500, 0, 'jpg')).toBeRejectedWith(
      new Error(
        'Expected positive integer for height but received 0 of type number'
      )
    );
  });

  it('Throw error when format is not supported', async () => {
    await expectAsync(resizeImage('ima', 100, 50, 'tga')).toBeRejectedWith(
      new Error('Input file contains unsupported image format')
    );
  });
});
