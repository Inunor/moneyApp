/* istanbul ignore file */
import app from './app';

export const port = 3000;

app.listen(port, () => {
  console.log('Listening on port: ' + port);
});
