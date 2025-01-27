const express = require('express');
const app = express();

app.use(express.json());

app.get('/signup', (req, res) => {
    const { username, password, dob, email } = req.query;

    //username
    if (username && !/^[a-zA-Z]+$/.test(username)) {
        return res.status(400).json({ error: "username cannot be empty" });
    }

    //email
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: "Email cannot be empty" });
    }

//password
    if (password && !/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/.test(password)) {
        return res.status(400).json({
            error: "Password length should be greater than 8 or less than or equal to 16"
        });
    }

//date of birth
    if (dob) {
        const birthDate = new Date(dob);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - birthDate.getFullYear();

        if (age < 18 || (age === 18 && (currentDate.getMonth() < birthDate.getMonth() || 
            (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())))) {
            return res.status(400).json({ error: "Users must be 18 or older." });
        }
    }

    res.status(200).json({ message: "Signup successful!" });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running live on http://localhost:${PORT}`);
});