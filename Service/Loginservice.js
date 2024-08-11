import {client,dbname1,dbname2} from '../Model/index.js';
import auth from '../auth/auth.js';
const login = async (req, res) => {
    try {
        await client.connect();
        let db = client.db(dbname1);
        console.log(req.body.email);
        let data = await db.collection("userdetails").findOne({ email: req.body.email });
        if (data) {
            const passwordMatch = await auth.compare(req.body.Password, data.Password);
            if (passwordMatch) {
                let payload = {
                    _id: data._id,
                    Name: data.Name,
                    email: data.email,
                    role: data.role
                };
                let token = auth.createToken(payload);
                res.status(200).send({
                    message: 'Logged in successfully',
                    token,
                    Name:data.Name,
                    role: data.role,
                    city:data.City
                });
            } else {
                res.status(400).send({
                    message: 'Password wrong'
                });
            }
        } else {
            res.status(500).send({
                message: "Invalid email"
            });
        }
    } catch (err) {
        res.status(400).send({
            message: err.message || 'Internal server error'
        });
    } finally {
        await client.close();
    }
}

const create_login = async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbname1);
        const { Name, email, Password, con_password, Age, District, City } = req.body;
        if (Password !== con_password) {
            res.status(400).send({
                message: "Passwords do not match"
            });
            return;
        }

        const hashedPassword = await auth.encrypt(Password);

        await db.collection("userdetails").insertOne({
            Name,
            email,
            Password: hashedPassword,
            Age,
            District,
            City,
            role: 'user'
        });

        res.status(201).send({
            message: 'Account created successfully'
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Internal server error'
        });
    } finally {
        await client.close();
    }
}

const offl_login = async (req, res) => {
    try {
        await client.connect();
        let db = client.db(dbname1);
        let data = await db.collection("officialsdetails").findOne({ email: req.body.email });
        if (data) {
            const passwordMatch = await auth.compare(req.body.Password, data.Password);
            if (passwordMatch) {
                let payload = {
                    _id: data._id,
                    Name: data.Name,
                    email: data.email,
                    role: data.role,
                    city:data.City
                };
                let token = auth.createToken(payload);
                res.status(200).send({
                    message: 'Logged in successfully',
                    token,
                    city:data.City,
                    role: data.role
                });
            } else {
                res.status(400).send({
                    message: 'Password wrong'
                });
            }
        } else {
            res.status(500).send({
                message: "Invalid email"
            });
        }
    } catch (err) {
        res.status(400).send({
            message: err.message || 'Internal server error'
        });
    } finally {
        await client.close();
    }
}

const create_offllogin = async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbname1);
        const { Name, email, Password, con_password, Age, District,City,type,designation} = req.body;
        if (Password !== con_password) {
            res.status(400).send({
                message: "Passwords do not match"
            });
            return;
        }

        const hashedPassword = await auth.encrypt(Password);

        await db.collection("officialsdetails").insertOne({
            Name,
            email,
            Password: hashedPassword,
            Age,
            District,
            City,
            type,
            designation,
            role: 'official'
        });

        res.status(201).send({
            message: 'Account created successfully'
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Internal server error'
        });
    } finally {
        await client.close();
    }
}
const login_admin = async (req, res) => {
    try {
        await client.connect();
        let db = client.db(dbname1);
        let data = await db.collection("admindetails").findOne({ email: req.body.email });
        if (data) {
            const passwordMatch = await auth.compare(req.body.Password, data.Password);
            if (passwordMatch) {
                let payload = {
                    _id: data._id,
                    name: data.name,
                    email: data.email,
                    role: data.role
                };
                let token = auth.createToken(payload);
                res.status(200).send({
                    message: 'Logged in successfully',
                    token,
                    role: data.role
                });
            } else {
                res.status(400).send({
                    message: 'Password wrong'
                });
            }
        } else {
            res.status(500).send({
                message: "Invalid email"
            });
        }
    } catch (err) {
        res.status(400).send({
            message: err.message || 'Internal server error'
        });
    } finally {
        await client.close();
    }
}
export default{
    login,
    create_login,
    offl_login,
    create_offllogin,
    login_admin
}