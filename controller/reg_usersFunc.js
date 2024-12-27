import { getUsersDB, getUserDB, addUserDB, updateUserDB, deleteUserDB } from "../model/reg_usersDB.js";
import { hash } from "bcrypt";

const fetchUsers = async (req, res) => {
    try {
        const users = await getUsersDB();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching users" });
    }
};

const fetchUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await getUserDB(id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
        } else {
            res.json(user);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching user" });
    }
}

const addUser = async (req, res) => {
    try {
        const {firstName, lastName, gender, country, city, region, email, password} = req.body;
        if (!firstName || !lastName || !email || !password) {
            res.status(400).send("Please fill in all fields");
        } else {
            hash(password, 10, async (err, hashedP) => {
                if (err) {
                    console.error('Error hashing password:', err);
                    res.status(500).send('Failed to add user')
                } else {
                    await addUserDB(firstName, lastName, gender, country, city, region, email, hashedP)
                    res.status(201).send('User was successfully added')
                }
            })
        }
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).send('Failed to add user');
    }
}

const updateUser = async (req, res) => {
    try {
        let {firstName, lastName, gender, country, city, region, email, password} = req.body;
        let user = await getUserDB(req.params.id)
        if (!user) {
            res.status(404).send("User not found");
        } else {
            firstName ? firstName = firstName : firstName = user.firstName;
            lastName ? lastName = lastName : lastName = user.lastName;
            gender ? gender = gender : gender = user.gender;
            country ? country = country : country = user.country;
            city ? city = city : city = user.city;
            region ? region = region : region = user.region;
            email ? email = email : email = user.email;
            password ? password = password : password = user.password;
            
            hash(password, 10, async (err, hashedP) => {
                if (err) {
                    console.error('Error hashing password:', err);
                    res.status(500).send('Failed to update user')
                } else {
                    await updateUserDB(firstName, lastName, gender, country, city, region, email, hashedP, req.params.id)
                    res.status(200).send('User info was successfully updated')
                }
            })
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Failed to update user');
    }
}

const deleteUser = async (req, res) => {
    try {
        let user = await getUserDB(req.params.id)
        if (!user) {
            res.status(404).send("User not found");
        } else {
            await deleteUserDB(req.params.id)
            res.status(200).send('User was successfully deleted')
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Failed to delete user');
    }
}

const loginUser = async (req, res) => {
    try {
        res.json({
            message: 'You have signed in successfully',
            token: req.body.token
        })
    } catch (error) {
        console.error('Error loggin in user:', error);
        res.status(500).send('Failed to log in user')
    }
}


export { fetchUsers, fetchUser, addUser, updateUser, deleteUser, loginUser }