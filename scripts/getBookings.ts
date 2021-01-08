import { google } from 'googleapis'
import * as prettier from 'prettier'
import * as dotenv from 'dotenv'

import { Booking } from '../src/types/booking';
import { writeFile } from './utils';

dotenv.config()
const {
  GOOGLE_SHEETS_API_KEY,
  GOOGLE_SHEETS_SPREADSHEET_ID,
} = process.env

const sheetsService = google.sheets({ version: "v4", auth: GOOGLE_SHEETS_API_KEY })

sheetsService.spreadsheets.values.get({
  spreadsheetId: GOOGLE_SHEETS_SPREADSHEET_ID,
  range: 'B3:D54',
  valueRenderOption: 'UNFORMATTED_VALUE',
}, (err, result) => {
  if (err || !result?.data.values) {
    // Handle error
    console.log(err);
  } else {

    const bookings = result.data.values.map(([serialDate, price, status]): Booking => ({ date: new Date(Date.UTC(0, 0, serialDate)), price, status }))

    writeFile(
      'src/_data',
      'bookings.js',
      prettier.format(
        `/* eslint-disable */

    export default ${JSON.stringify(bookings)}`,
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
