const express = require('express');
const pool = require('../share/pool');
const bcrybtjs = require('bcryptjs');
const router = express.Router();
const jwtoken = require('jsonwebtoken');
router.post('/signup', (req, res) => {

    try {
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let address = req.body.address;
        let city = req.body.city;
        let state = req.body.state;
        let pin = req.body.pin;
        let email = req.body.email;
        let password = req.body.password;
        pool.query(
            `select count(*) as count from users where email like '${email}'`,
            (error, resultCount) => {
                if (error) {
                    res.status(500).send({
                        error: error.code,
                        message: error.message
                    });
                } else {
                    if (resultCount[0].count > 0) {
                        res.status(200).send({ message: 'Email already exists' });
                    } else {
                        bcrybtjs.hash(password, 10).then((hashedPassword) => {
                            const query = `Insert into users (email,firstName,lastName,address,city,state,pin,password)
                          values
                          ('${email}','${firstName}','${lastName}','${address}','${city}','${state}','${pin}','${hashedPassword}')`;
                            pool.query(query, (error, result) => {
                                if (error) {
                                    res.status(401).send({
                                        error: error.code,
                                        message: error.message
                                    });
                                } else {
                                    res.status(201).send({ message: 'success' });
                                }
                            });
                        });
                    }
                }
            }
        );

    } catch (error) {
        res.status(404).send({
            error: error.code,
            message: error.message
        });
    }

});


router.post("/login", (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        pool.query(`select * from users where email like '${email}'`, (error, result) => {
            if (error) {
                res.status(500).send({
                    error: error.code,
                    message: error.message,
                });
            } else {
                if (result.length > 0) {
                    bcrybtjs.compare(password, result[0].password).then((compareResult) => {
                        if (compareResult) {
                            const token = jwtoken.sign(
                                { id: result[0].id, email: result[0].email },
                                'estore-secret-key',
                                { expiresIn: '1h' }
                            );
                            res.status(200).send({
                                token: token,
                                expireInSeconds: 3600,
                                user: {
                                    firstName:result[0].firstName,
                                    lastName:result[0].lastName,
                                    address: result[0].address,
                                    city:result[0].city,
                                    state: result[0].state,
                                    pin:result[0].pin,
                                }
                            });
                        } else {
                            res.status(401).send({
                                message: `Invalid password.`,
                            });
                        }


                    });
                } else {
                    res.status(401).send({
                        message: `User doesn't exist.`,
                    });
                }
            }
        })
    } catch (error) {
        res.status(400).send({
            error: error.code,
            message: error.message,
        });
    }
});


module.exports = router

