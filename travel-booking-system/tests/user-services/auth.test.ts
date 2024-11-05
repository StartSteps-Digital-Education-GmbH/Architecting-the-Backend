import axios from 'axios';

describe('User API', () => {
    const userEndpoint = 'http://localhost:3000/api/users';
    const mockUserDetails = {
        name: 'test user5',
        email: 'testuser563277@test5.com',
        password: 'password123',
    }

    const headers = {
        'Content-Type': 'application/json',
    };

    const timeout = 15000;

  it('should create a new user', async () => {
    const response = await axios.post(`${userEndpoint}/signup`, {
        name: mockUserDetails.name,
        email: mockUserDetails.email,
        password: mockUserDetails.password,
    }, {
      headers
    },);
    // Access only `status` and `data` to avoid circular references
    expect(response).toMatchObject({
        status: 201,
        data: {
          // Match specific properties in `data`
          message: 'User created',
        },
      });
  },
  timeout
);

  it('Should Login when details are correct', async () => {
    const response = await axios.post(`${userEndpoint}/signin`, {
        email: mockUserDetails.email,
        password: mockUserDetails.password
    },
    {
        headers
    });
        expect(response).toMatchObject({
            status: 200,
        })
        expect(response.data).toHaveProperty("token")
        expect(response.data).toHaveProperty("refreshToken")

  },
  timeout
);

it('Should recive Unauthorized when tring to access a secure route without proving auth token', async() => {
    axios.get(`${userEndpoint}/`, {
        headers
    }).catch((
        response
    )=> {
        expect(response).toMatchObject({
            status:401,
        })
    });
}, 
timeout
)
});
