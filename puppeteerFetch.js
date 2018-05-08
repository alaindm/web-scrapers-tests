const puppeteer = require('puppeteer');

let dest = 'https://www.zapimoveis.com.br/fichaImovel?ID=16166909';
(async function testPage() {
  let browser = await puppeteer.launch({
    // headless: false
    // slowMo: 1000,
    // devtools: true
  });

  let page = await browser.newPage();
  page.setJavaScriptEnabled(false);
  await page.setRequestInterception(false);
  // page.on('request', interceptedRequest => {
  //   // if (interceptedRequest.url().endsWith(dest || dest.split('=').pop())) {
  //   //   // console.log('continue', interceptedRequest.url());
  //   //   interceptedRequest.continue();
  //   // } else {
  //   //   // console.log('aborted', interceptedRequest.url());
  //   //   interceptedRequest.abort();
  //   // }
  //   // if (interceptedRequest.url().endsWith('9')) console.log(interceptedRequest);
  //   interceptedRequest.continue();
  // });

  await page.goto(dest);
  await page.waitFor('.favoritar');
  const textTag = await page.$eval('.favoritar', e => e.innerHTML);
  let token = await page.$eval(
    'body > div.content.main.content-ficha > input[type="hidden"]',
    e => e.value
  );
  let ImovelID = textTag.slice(
    textTag.indexOf('ofertaID') + 9,
    textTag.indexOf('tipoOferta') - 2
  );
  let parametros = JSON.stringify({
    ImovelID,
    TipoOferta: textTag.slice(
      textTag.indexOf('tipoOferta') + 13,
      textTag.indexOf('transacao') - 3
    ),
    OrigemLead: 'Ficha',
    IndiceContatoCampanha: '0',
    Transacao: textTag.slice(
      textTag.indexOf('transacao') + 12,
      textTag.indexOf(`btnFavorito${ImovelID}'`) - 6
    )
  });

  page.setJavaScriptEnabled(true);

  let fetchResponse = await page.evaluateHandle(
    (_path, parametros, token) => {
      let formData1 = new URLSearchParams();
      formData1.set('parametros', parametros);
      formData1.set('__RequestVerificationToken', token);
      return fetch(_path, {
        body: formData1,
        // body: 'test',
        method: 'POST',
        headers: {
          'x-requested-with': 'XMLHttpRequest'
        },
        credentials: 'include'
      })
        .then(res => res.json())
        .then(resp => {
          // console.log(resp);
          return resp;
        })
        .catch(error => console.error(error));
    },
    'https://www.zapimoveis.com.br/VerTelefone/Buscar/',
    parametros,
    token
  );
  console.dir(await fetchResponse.jsonValue());
  page.setJavaScriptEnabled(false);
  // console.time('page goto zap');
  // dest = 'http://www.zap.com.br';
  // await page.goto(dest);
  // console.timeEnd('page goto zap');
  browser.close();
})();

// let lastRedirectResponse = undefined;
// page.setRequestInterceptionEnabled(true);

// page.on('response', response => {
//     // if this response is a redirect
//     if ([301, 302, 303, 307, 308].includes(response.status)
//             && response.request().resourceType === 'document') {
//         lastRedirectResponse = response;
//     }
// });

// page.on('request', interceptedRequest => {
//     // if this request is the one related to the lastRedirect
//     if (lastRedirectResponse
//             && lastRedirectResponse.headers.location === interceptedRequest.url) {
//         interceptedRequest.abort();
//     }
// });
