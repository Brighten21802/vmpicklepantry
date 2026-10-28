const https = require('https');
const fs = require('fs');
const path = require('path');

const downloads = [
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwiNURiq2T3DZjNz2nYWa1SFy_Y3vYj3bsiWbruOgA0sDFqnpKoBpMcGn9tNa4Qe1NMrnrvm0SKGJ-V3u_YgNEhUZIW-JvfRz03-taBolXGDV4g3VmHwmoNxLKMoVmdOrUm08B33NfKs9mFxvj2zTJS2vBREHh0C3Rahy_npSJOACxnGx8efg_-3jWOQ8cMegyoCN-MmNe1gMRiavcmDfvg28KeFB5dbtf5KIQ0w6fGYIKtJu3xMspm2jxiyPgWX3KCg',
    dest: 'public/assets/hero-trio-jars.png'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMm9SiOGPFbOa1u-si6zDIm7-f1zoJ7OdT8UFjCEAQc5GZu7ACpoHzHA5WDOfqzzKvHhoQUrQY2DGlY9qCyao4tlC7k1C_Dk3m6_rAaZ602-dhqkxgh97IGke466GCIH-opPQwlO1xcMpCZ2kcGLRfennlud3i5-KwHXc7I8qn9uQiUZ2Wwj6zwgmYB0-VsKjmr4og8VQm-zXNN7jpKjA5w0wro18NWK1CyFZgGZzrlfU0mvQar3tsYYHJXLkB39FaAQ',
    dest: 'public/assets/jars/garlic-pickle-card.png'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHOBQ_bc36saqUBMg3WjS-zujY2V-w8XFklKU-UqOCfEWipwzfkA0dQRLHdBr6GbufdY5XsXfPy_G0aMUb95ehHT4X90WB_7ahPEzlsvBZswUdRoqSrcU2-XfF1EQGSc62-7CP0_QFl8JnzBQmi2FdyYgYZrSMifq9JWSuc092zWk8x_631Ie0bp5T3JWOWbMHGdblu1i4QDWWw5jMp6UdwMaWS6JPwQkX0HeW0L-1VOu_r9UPU_rZJuyuSaGHUHnFeg',
    dest: 'public/assets/jars/mixed-pickle-card.png'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCb1bJ0Q9nmnrLT_9bDyDpLKs_SkmnszCkhI3D2ugMGrecXYHm8xwc22sfqBTeHcxoPPnrmlx50C-_zzGrfxPwIzn2AJie3D_bHCQnGXmRLWBqmJQNkuX0NJY4rZav1iOCvRIhFpCOA1zrX82UMdm-uZdwFl9UOGXn7dUwCOMc4zORb2lC1fCPEWkkO0EGiWqQGkZS8JHp6xw_eu501-EuRS_Q0Tw5jrAkorYhS6k7l_5Vvu_ge19g1ZyaqRhQlp7jmQQ',
    dest: 'public/assets/jars/mango-pickle-card.png'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmUcLWoSswUTMiuczIw3o-v3Q4aN0hDg_K8bEE9PHWtx0NVBsDjrDUEyEuvGwY8fds21CW9uXLalLSm7zCO2AP7Z_j3I1x5qhY75WeH7gAKeRztCVeJ-6B15qEByWpJneJnO4BmYDD3CwUskvU0wSa79oSjjkhFRI0xcm4MN-1RqmztiDbX2rfZfHoZlr8gwtaeNXp6whkBI-hM1thGBXMeUAks3IDAEulxsZlawJtpBrS8ZhyyQ7S',
    dest: 'public/assets/jars/narthangai-citron.png'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnm5SWOC0npZ-yGy5Fv0SgPC_UFyfg4y_ddF0cHzxm7eH5UrMmxggXBXO1zmVfgVOCRe6Jy-4ypJOqurcISpa2yR4O6VdO2ZKX9utBRY_wn-WUYN1xpwWzuDUgNMIPYrhwmu6582vGMziokxRhDPJiUQmVfrk4JpWEW5YyrDUmUX5N1tESw9vnVIcALC_inYidnEM08nEEaMSb4HbLiyqUTnMnEi3EpN8jTTFjWO9cuSSBBqaFw5CW',
    dest: 'public/assets/jars/andhra-chicken.png'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmYcuEyDs9EqmhxwLS2RK0Xb7dEhDoi-Gkm7G0Ci9zIjdu0MddQpZOnPLukjSS_50m1v-2vVw4m8yv5_iVcXpwwshgm-Vrbwdos_uKrRHh5nRmnJAYGrNQO53WP3vA4GpQqCEyn564Mx7xnKtPYsqckosdbRrSijluQEcztwGAls7VOXWtIJ1BYAekvbZWXbOvwAAZk22kfHPAwzuKBFEm1J33wexrQXuaEbdwVC2OzUgf_LsOOJKbM-jr4wy0AYWFYQ',
    dest: 'public/assets/jars/garlic-inferno-card.png'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDO594xzL5Ron1S8Dt5Dj0vJAxfh6-obA505KpOitb3EnCnIKSUFXLcB2XGFcj5OxI6zjL1LVRWhYsoGaAG2HsQWj2MJJh_ILBvihrgllT-N6TlD2nzUWcs2LRuPEMng_0YrCQNgGvdvvChWdEBOkRjmodEIfSPa6Q9glZy0E_5iCdHAFUG5UumidYWkYfg6fwU423Fuc0uuU9u-LyeHAF5C8cUEFtGBiYUO6l9IhvVhYjHWyOTe-9BzHfd-4SEbAyNvw',
    dest: 'public/assets/founder-poster.png'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1UaismfryWrDK6n5XzgzH-wBghHe0baAZyu5kAj9UPrlXv-LsNBSrfe_xHluiFij8xdSABZ83vqOP3F_Q9SYqEqro9Q_GM1Yp9xXB_FdWMZTqRxT5Staceh-tQuqTz73bFw-rnTwI_De8b-lcVJ6TuKXXYm2dQVZt3ovb0YImhtHanCEeBlHuJY0-9mczJTU7-nh1nsqHQt7O6YDYahaOevnSJ23wnmJ6z38vNWfEnfRTbC8-6U8XJzgQyT-PnEfjKw',
    dest: 'public/assets/gallery-trio.png'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHmXtf2K95odauIel3kQA2eyPOekWn-sUdw6jwdc4isUMKv0E4AuZbmf1LLawDf12D2zGPYtbJEyiyoSNDXwCpVx0vuXHta8bUVWbPiLcX7ZN6EG_tKo62BxIpUhhmFI9FHNWDy2c6_28Y38Lhx-nAINYE-F1LHCaX9WtnP1-jy-9cXQ423-sh53VMinhZBY-qYgPKwCGqeodt2N_gTKlW0hKW0Ngd3BXCQZ0fKPVefjUohz1ZbEHPj0VhSNgGAYXPUQ',
    dest: 'public/assets/sticky-dock-thumb.png'
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
  console.log('All downloads completed!');
}

run();
