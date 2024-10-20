
const { auth } = require('../config/firebaseClient'); 
const { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } = require('firebase/auth');


const login = (req, res) => {
    res.send(`
        <form action="/auth/login" method="POST">
            <input type="email" name="email" placeholder="Email" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit">Login</button>
        </form>
    `);
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        res.redirect('/dashboard');
    } catch (err) {
        console.error('Error al iniciar sesión:', err);
        res.send('Error al iniciar sesión: ' + err.message);
    }
};


const register = (req, res) => {
    res.send(`
        <form action="/auth/register" method="POST">
            <input type="email" name="email" placeholder="Email" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit">Register</button>
        </form>
    `);
};


const registerUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        res.redirect('/auth/login');
    } catch (err) {
        console.error('Error al registrar el usuario:', err);
        res.send('Error al registrar el usuario: ' + err.message);
    }
};


const logoutUser = async (req, res) => {
    try {
        await signOut(auth);
        res.redirect('/'); 
    } catch (err) {
        console.error('Error al cerrar sesión:', err);
        res.send('Error al cerrar sesión: ' + err.message);
    }
};


module.exports = { login, loginUser, register, registerUser, logoutUser };
