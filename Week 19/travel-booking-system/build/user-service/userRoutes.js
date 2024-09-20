import { Router } from "express";
let users = [];
const router = Router();
//CRUD
router.get('/', (req, res) => {
    res.send(users);
});
// Route to get a user by ID
router.get('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send(user); // Respond with the found user
});
router.post('/', (req, res) => {
    const { name, email } = req.body;
    const user = {
        id: users.length + 1,
        name,
        email
    };
    users.push(user);
    res.status(201).send(user);
});
// Route to update a user
router.put('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
        return res.status(404).send({ message: 'User not found' });
    }
    const { name, email } = req.body;
    users[userIndex] = { id: userId, name, email }; // Update user
    res.status(200).send(users[userIndex]); // Respond with the updated user
});
// Route to delete a user
router.delete('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    users = users.filter(u => u.id !== userId); // Remove user
    res.status(204).send(); // Respond with no content
});
export default router;
