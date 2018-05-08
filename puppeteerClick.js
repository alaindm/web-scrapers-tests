const puppeteer = require('puppeteer')

let dest = 'https://www.zapimoveis.com.br/fichaImovel?ID=16693465'
;(async function testPage() {
  let browser = await puppeteer.launch({
    headless: false,
    slowMo: 250,
    devtools: true,
  })
  let page = await browser.newPage()
  await page.setRequestInterception(true)
  page.on('request', interceptedRequest => {
    if (
      interceptedRequest.resourceType() == 'image' ||
      interceptedRequest.resourceType() == 'font' ||
      interceptedRequest.resourceType() == 'media' ||
      interceptedRequest.url().includes('gstatic') ||
      interceptedRequest.url().includes('SolicitarCalculo') ||
      interceptedRequest.url().includes('EnviarMensagem') ||
      interceptedRequest.url().includes('google') ||
      interceptedRequest.url().includes('facebook') ||
      interceptedRequest.url().includes('globo') ||
      interceptedRequest.url().includes('Publicidade') ||
      interceptedRequest.url().includes('cloudfront') ||
      interceptedRequest.url().includes('igodigital') ||
      interceptedRequest.url().includes('bing') ||
      interceptedRequest.url().includes('navdmp') ||
      interceptedRequest.url().includes('nspmotion') ||
      interceptedRequest.url().includes('.com/') ||
      interceptedRequest.url().includes('analytics') ||
      interceptedRequest.url().includes('creativecdn') ||
      interceptedRequest.url().includes('scorecardresearch') ||
      interceptedRequest.url().includes('carrosselGaleria') ||
      // interceptedRequest.url().includes('CarrosselGaleria') ||
      // interceptedRequest.url().includes('ColetorInsights') ||
      interceptedRequest.url().includes('bootstrap') ||
      interceptedRequest.url().includes('amplify') ||
      interceptedRequest.url().includes('tiqcdn') ||
      interceptedRequest.url().includes('newrelic') ||
      interceptedRequest.url().includes('google')
    ) {
      // console.log('abort', interceptedRequest.url());
      interceptedRequest.abort()
    } else {
      // console.log('continue', interceptedRequest.url());
      interceptedRequest.continue()
    }
  })
  await page.goto(dest)
  await page.waitFor('#liTelefone')
  page.click('#liTelefone')
  await page.waitFor('#recomendacoesTelefone > a')
  let phone = await page.$eval('#recomendacoesTelefone > a', e => e.innerHTML)
  console.log(phone)
  // console.time('page goto zap');
  // dest = 'http://www.zap.com.br';
  // await page.goto(dest);
  // console.timeEnd('page goto zap');
  browser.close()
})()
