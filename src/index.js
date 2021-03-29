import axios from 'axios';
import cheerio from 'cheerio';
import {sendMessage} from './send-message.js';

const baseUrl = 'https://www.brady-software.com/vaccine-hunter';
const url = `${baseUrl}?zipcodeStr=50014&withinSelect=100&brandSelect=any&showWithNoAppointments=&ignoreLimitations=&onlyIncludeIowa=1&numRows=60`;

(async () => {
    const {data} = await axios.get(url);
    const $ = cheerio.load(data);
    const appointmentCards = $('#location-card');
    const appointments = [];

    appointmentCards.map(function() {
      const location = $(this).find('.card-title').text().replace(/\s+/g, ' ').replace(/\(\d.+/, '').trim();
      const url = $(this).find('.card-footer').find('a').attr('href');

      appointments.push({location, url});
    });

    const message = appointments.length > 2 ?
      baseUrl :
      appointments.reduce((acc, {location, url}) => `\n\n${acc}\n\n${location}\n${url}`, '').trim();

    sendMessage(message);
})();
