import express from 'express';
import cors from 'cors';
import session from 'express-session';
import { getEventos, getEvento } from './database.js';
import AWS from 'aws-sdk';
import AmazonCognitoIdentity from 'amazon-cognito-identity-js';

const app = express();
const port = 3000;

AWS.config.update({
  region: 'us-east-2',
});

app.use(express.json());

app.use(cors());

//sesion para guarda el usuario actual
app.use(
  session({
    secret: 'usuario',
    resave: false,
    saveUninitialized: true,
  })
);

//cognito
const { CognitoUser, AuthenticationDetails, CognitoUserPool } = AmazonCognitoIdentity;
const poolData = {
  UserPoolId: 'us-east-2_Kqr4czpLR',
  ClientId: '6p7ca36hhv3viqj68og2shf7tq',
};

const userPool = new CognitoUserPool(poolData);

//registro
app.post('/api/signUp', (req, res) => {
  const { username, password, email } = req.body;
  const attributeList = [];

  const dataEmail = {
    Name: 'email',
    Value: email,
  };

  attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail));

  userPool.signUp(username, password, attributeList, null, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });
    } else {
      res.json({ message: 'User registered successfully' });
    }
  });
});

//login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const authenticationData = {
    Username: username,
    Password: password,
  };

  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (result) => {
      // guarda el nombre de usuario en la sesion
      req.session.user = {
        username: result.idToken.payload['cognito:username'],
      };

      const accessToken = result.getAccessToken().getJwtToken();
      res.json({ message: 'Login successful', accessToken, user: req.session.user });
    },
    onFailure: (err) => {
      res.status(400).json({ message: err.message });
    },
  });
});

//verificacion
app.post('/api/confirmRegistration', (req, res) => {
  const { username, confirmationCode } = req.body;

  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });
    } else {
      res.json({ message: 'User registration confirmed successfully' });
    }
  });
});

//listado de eventos
app.get('/api/getEventos', (req, res) => {
  getEventos((err, eventos) => {
    if (err) {
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
    res.json(eventos);
  });
});

app.get('/api/getEvento/:id', (req, res) => {
  const id = req.params.id;
  getEvento((err, evento) => {
    if (err) {
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
    res.json(evento);
  }, id);
});

app.post('/api/comprar', (req, res) => {
  const data = req.body
  console.log('Compra exitosa', data)
  return res.json({ message: 'Compra exitosa' })
});

app.listen(port, () => {
  console.log(`Server up on port: ${port}`);
});

