import { replaceMongoURICredentials } from '../mongo-uri';

describe('replaceMongoURICredentials', () => {
  const mongoURI = 'mongodb+srv://<username>:<password>@testURI';
  const username = 'testUsername';
  const password = 'testPassword';

  it('should replace mongo uri credentials', () => {
    const updatedMongoURI = replaceMongoURICredentials(
      mongoURI,
      username,
      password
    );

    expect(updatedMongoURI).toMatchInlineSnapshot(
      '"mongodb+srv://testUsername:testPassword@testURI"'
    );
  });
});
