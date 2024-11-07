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
        email: 'newemail@em5ail234.com'
    }
    beforeEach(async() => {
        const response = await axios.post(`${userEndpoint}/`, mockUser, {
            headers
        });
        // console.log('beforeEach', response)
        testUserId = response.data._id;
    }, timeout);
    // afterEach(async()=> {
    //     console.log(testUserId);
    //     const response = await axios.delete(`${userEndpoint}/${testUserId}`, {
    //         headers
    //     })
    //     // console.log('afterEach', response)

    // }, timeout);
    
    it('get a User by Id', async () => {
        const response = await axios.get(`${userEndpoint}/${testUserId}`,{headers}) ;
        // console.log('response', response)
        expect(response.status).toBe(200);
        expect(response.data).toMatchObject(mockUser);
    }, timeout )
})