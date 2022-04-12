import fs from 'fs';

const DIR = '';

fs.readdir(DIR, (err, files) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
});
