import { users } from 'config';

beforeEach(async () => {
  while (users.length) {
    users.pop();
  }
});
