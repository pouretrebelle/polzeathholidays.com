import { google } from 'googleapis'
import * as prettier from 'prettier'
import * as dotenv from 'dotenv'
import * as dayjs from 'dayjs'

import { Booking } from '../src/types/booking';
import { writeFile } from './utils';

dotenv.config()
const {
  GOOGLE_SHEETS_API_KEY,
  GOOGLE_SHEETS_SPREADSHEET_ID,
} = process.env

const sheetsService = google.sheets({ version: "v4", auth: GOOGLE_SHEETS_API_KEY })

const SEVEN_DAYS_AGO = dayjs().subtract(7, 'days')

sheetsService.spreadsheets.values.get({
  spreadsheetId: GOOGLE_SHEETS_SPREADSHEET_ID,
  range: 'B3:D300',
  valueRenderOption: 'UNFORMATTED_VALUE',
}, (err, result) => {
  if (err || !result?.data.values) {
    // Handle error
    console.log(err);
  } else {

    const bookings = result.data.values
      .map(([serialDate, price, status]): Booking => ({
        date: new Date(Date.UTC(0, 0, serialDate, -24)),
        price,
        status,
      }))
      .filter(({ date }) => dayjs(date).isAfter(SEVEN_DAYS_AGO))

    writeFile(
      'src/_data',
      'bookings.js',
      prettier.format(
        `/* eslint-disable */

    module.exports = ${JSON.stringify(bookings)}`,
        {
          parser: 'babel',
          semi: false,
          singleQuote: true,
          trailingComma: 'es5',
        }
      )
    )
  }
});
