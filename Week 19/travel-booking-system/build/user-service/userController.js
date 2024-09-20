import users from "./userModel.js";
const get = (req, res) => {
    res.send(users);
};
const getByID = (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send(user); // Respond with the found user
};
const create = (req, res) => {
    const { name, email } = req.body;
    const user = {
        id: users.length + 1,
        name,
        email
    };
    users.push(user);
    res.status(201).send(user);
};
const update = (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
        return res.status(404).send({ message: 'User not found' });
    }
    const { name, email } = req.body;
    users[userIndex] = { id: userId, name, email }; // Update user
    res.status(200).send(users[userIndex]); // Respond with the updated user
};
const remove = (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    users.splice(userIndex, 1);
    res.status(204).send(); // Respond with no content
};
export default { get, getByID, create, update, remove };
