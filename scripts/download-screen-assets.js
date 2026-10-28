const https = require('https');
const fs = require('fs');

const downloads = [
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVRuw5QK9jgwyjvRD9W-WWXFz9HSjFmzrkdw69uzSjlMwXBxg-mwRKyqL-YBacUAxSAfYP0j-bTlEvnSrSeDQ4fXgNKJ2ui6kjumkEdsVKvcGL0qhTRm2OiwaHy6E8ZXSbkbNRpU2mOFllTsJSzwZzBUY7AjXa3lgINtozPZx7GAOWIuud8SMBu1oCQyk-IKRdw1YomKvvyYsgEXi3EErudqC8al1EtxztzynenzuGebnY9bJk7ONUJb_SZU4dFvq2JQ',
    dest: 'public/assets/hero-floating-trio.png'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCujH2GCozo5eGuPBlL6clq7qOazkDTIetMwGrwXZTwW2o7Yy4hqsX0_6Xs_A09WbjJRuHlIzxK36JEqLNfnsdOlbztrJJlTVInTmEfaLT-24r3QHrT-yHg-17Rb1jP7lXcRm0D_npQEVsrXsqY1qvhtI3GNUNwbib4_zwqMi9oUekvJNbNnGRpLrA4AAlg0tt_H8-v6PbYLrcdq4l7k3WQ7a4YiMLLQPHRyPRCRTMOUhqqrEQKnyvgDIQk7b2XLjK7ZA',
    dest: 'public/assets/jars/trio-garlic-crop.png'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWg9HDWeUtqRCj_3vNAq554JpAf7FICnhuYC2oVnmMUbfHnq7YgGB5bQ6qFb7WPvML92k2zeOKhM05m5bqurj2wTkXR2rTbakfFdpsAdOweD_dH0asiu5nKOxayphl-O4PRwsUp7jVF8qCTsqi7BCFmldYMww2sbEjmUrX2vxkiil8lwg2VEfVAC2-hpUWerafhZ_KQ7vIGaX5NkwySR4uB97b3blum54HT4RsxJk_bZULDMQFUelw2q7E_p9Bw_r1XQ',
    dest: 'public/assets/jars/trio-mixed-crop.png'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9PNGm6ShmbajxmAEuWqGyf4zNhnCcxrL6506RdtGM6-URAryRNejrzRJlFkpUrx6cwAcsRDOcGWRjDM4uOuWPjkUl3d1gj03RR3H_j9i1OMVw3AjOJwFqcVgWQ5HSA4nlzD52bsI9xJXwqaUin8yJ22QTs_TNdeaZ_mSMBAYWOOJ0m1jONmlVaa6uB7_kQUAMHPupgJgmxzc595vY5IclqY_gIchneq3iDdjx1Wfx0-qAh4xBX4F6TF1-bVKeIHJ8iQ',
    dest: 'public/assets/jars/trio-mango-crop.png'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsuhdHqIN7soR7U2Sxv1fsd0qHVfdQxpVs5v63fimywpGLWb4fJ3Xh-jQdto2TK1aBcqGTgXgk_1M4HPLzPCuFZkXg6hZT6lPjCqmErG0EXQNcw9Wr4EKjoXYE3SlWEf3HStzUfSFtO8QqgsWrQ_rg_azwoub--gVW6c1k1v6v3mPCFim5hJ2FswcIHv3Ajj5O_6PJlypiz9rplwQOMW41g8cujSurQpzx630Chtfn7wOoyv0_JtVHWPVfiM1rMhs3sA',
    dest: 'public/assets/poster-garlic-inferno.png'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC770MOut9nz5yjYn3LxgvO1CUWqmTd9_rlSKfByF3cv5YZBfXglrq7gU8vNdJZgWFB7DpdpazblOpQjx3U98R5Gcm-XPzPASKa18VPJB_sSHSMIDeSFFEBg9EjyhqtRhnSAZ946Qfja93T4yaxpCeO1QhKyWDwO7WXCLEIAMBkXI9ZIfA6KcrpDUqfpBVtugfSVJbjz5rdnapvYAS5IEmQ2I9tE6zwXjv5rqEOiCr4IQyaIAmKciVFQMMucTwq5zcP5A',
    dest: 'public/assets/gallery-trio-showcase.png'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPGedbaT6p-u5IBUqkMMsdTB3mgd2C_LsKWnPGj5xttajEDp_N0yr2OYQIRKAkyWhhH63SE2r-jTl3xfh8dB6QCDdVPTOIGYxiW0c9Vp_sIedrxiDw-od12MDBNWujg12Ztrq4j1rARKkn7V_tOQNUnZRJ8p5GdjF67dcpvGd0RaOTsDV5JORUknFnMMBP3sRAfHp_NbIcR2-0l_I0tLhWviIGTGADkH3wgNuxBP0ug1VnxNcweBf_3Z04IepFOetxHg',
    dest: 'public/assets/sticky-dock-trio.png'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqnvUEewNu0b4y3wfZRj_ztlqHNbl_Hudo1T8aRtP9XFjZlqqxpqnKB2Mqe34mABWBifvJf8J0aBQEi5i3A6VAp0gzY1ZLVnGC4B04LGl-Hwrk_6VGKJn2JwntS0ixfKB5h1tCALqqacz7uEDC9Iuo7G4h9ySW6JGRAtDK3jszsBYtaHvl9OxM-cBmjH6D1l00pcwA2gZxiZa5oLQ5A0F-O3MazhOTHuoVSfYeqXDUtEbCYtXpoT_rGmB--WJ8H56lXw',
    dest: 'public/assets/logo-nav.png'
  }
];

function downloadFile(item) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(item.dest);
    https.get(item.url, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode} for ${item.url}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log(`Saved: ${item.dest} (${fs.statSync(item.dest).size} bytes)`);
          resolve();
        });
      });
    }).on('error', (err) => {
      fs.unlink(item.dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  for (const item of downloads) {
    try {
      await downloadFile(item);
    } catch (e) {
      console.error('Failed:', item.dest, e.message);
    }
  }
  console.log('Done downloading screen 1189c37c2af14d6888a56488e9b47771 assets!');
}

run();
