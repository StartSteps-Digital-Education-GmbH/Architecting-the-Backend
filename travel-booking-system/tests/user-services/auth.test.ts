import axios from 'axios';

describe('User API', () => {
  it('should create a new user', async () => {
    const response = await axios.post('http://localhost:3000/api/users/signup', {
      name: 'test user5',
      email: 'test158114555@test5.com',
      password: 'password123',
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Access only `status` and `data` to avoid circular references
    expect(response).toMatchObject({
        status: 201,
        data: {
          // Match specific properties in `data`
          message: 'User created',
        },
      });
  });
});
