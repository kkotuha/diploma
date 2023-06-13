import express from 'express';
import { Trip } from './express-route/trip.js';
import { Stop } from './express-route/stop.js';
import { Vehicle } from './express-route/vehicle.js';
import nodemailer from 'nodemailer';
import qrcode from 'qrcode';
import SMTPTransport from 'nodemailer/lib/smtp-transport/index.js';

const transporter = nodemailer.createTransport(new SMTPTransport({
  service: 'gmail',
  secure: false, // use SSL
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_CODE_SMTP,
  },
  tls: {
      rejectUnauthorized: false
  }
}));


export async function getExpress() {
  const app = express();
  const trip = new Trip();
  const stop = new Stop();
  const vehicle = new Vehicle();


  app.use('*', (err, req, res, next) => {
    if (err) {
      console.log(err);
      res.status(500).send(err.message);
      return;
    }
    next()
  });

  app.get('/api/suggestion_stop', stop.suggestionStop.bind(stop));
  app.get('/api/info_stop', stop.infoStop.bind(stop));
  app.get('/api/build_trip', trip.buildTrip.bind(trip));
  app.get('/api/build_trip2', trip.buildTrip2.bind(trip));
  app.get('/api/info_trip', trip.infoTrip.bind(trip));
  app.get('/api/suggestion_trip', vehicle.suggestionTrip.bind(vehicle));
  app.get('/api/info_vehicle', vehicle.infoVehicle.bind(vehicle));
  app.get('/api/email', async(req, res) => {
    const email = req.query.email;
    if (!email && typeof email !== 'string') {
      res.status(400).send('Bad request');
      return;
    }
    const code = req.query.code;
    if (!code && typeof code !== 'string') {
      res.status(400).send('Bad request');
      return;
    }
    console.log(email);
    const qr = await qrcode.toDataURL(code, { errorCorrectionLevel: 'H' });
    console.log(qr);
    transporter.sendMail({
      from: `"Громадський транспот" <${process.env.EMAIL}>`, // sender address
      to: email, // list of receivers
      subject: "Квиток для проїзду", // Subject line
      text: "Ваш квиток:", // plain text body
      html: `Ваш квиток:<img src="${qr}" alt="img"/>`,
      attachDataUrls: true
    }).then(info => {
      console.log({info});
    }).catch(console.error);
   // res.send('ok')
  });
  app.all('*', (req, res) => {
    res.status(404).send('Not found');
  });

  return app;
}