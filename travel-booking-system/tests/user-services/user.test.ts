import axios from 'axios';


describe('Testing User Routes', () =>{
    const userEndpoint = 'http://localhost:3000/api/users';
    const headers = {
        'Content-Type': 'application/json',
    };
    let testUserId:string;
    const timeout = 15000;
    const mockUser = {            
        name: 'temporary user 5',
        email: 'newemail3463@em5ail234.com'
    }
    beforeEach(async() => {
        const response = await axios.post(`${userEndpoint}/`, mockUser, {
            headers
        });
        testUserId = response.data._id;
    }, timeout);
    afterEach(async () => {
        if (testUserId) {
                const response = await axios.delete(`${userEndpoint}/${testUserId}`, { headers });
        }

    }, timeout);

    it('get a User by Id', async () => {
        const response = await axios.get(`${userEndpoint}/${testUserId}`,{headers}) ;
        expect(response.status).toBe(200);
        expect(response.data).toMatchObject(mockUser);
    }, timeout )

    it('updates the user by id', async () => {
        const updatedDetails = {
            name: 'updatedName',
            email: 'newemail6573@email.com'
        };
        const response = await axios.put(`${userEndpoint}/${testUserId}`,updatedDetails,{headers});
        expect(response.status).toBe(200);
        expect(response.data).toMatchObject(updatedDetails);
    }, timeout)
})