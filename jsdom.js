const rp = require('request-promise-native')
const tough = require('tough-cookie')
const jsdom = require('jsdom')
const { JSDOM } = jsdom

const baseRequest = rp.defaults({
  jar: true,
  gzip: true,
  headers: {
    'User-Agent':
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/65.0.3325.181 Chrome/65.0.3325.181 Safari/537.36',
  },
})

let options = {
  method: 'GET',
  url: 'https://www.zapimoveis.com.br/fichaImovel?ID=17891521',
}

baseRequest(options)
  .then(body => {
    const { document } = new JSDOM(body).window
    console.log(document.getElementsByTagName('body')[0].innerHTML)
    let textTag = document.getElementsByClassName('favoritar')[0].innerHTML
    let ImovelID = textTag.slice(
      textTag.indexOf('ofertaID') + 9,
      textTag.indexOf('tipoOferta') - 2,
    )
    let options = {
      method: 'POST',
      url: 'https://www.zapimoveis.com.br/VerTelefone/Buscar/',
      form: {
        parametros: JSON.stringify({
          ImovelID,
          TipoOferta: textTag.slice(
            textTag.indexOf('tipoOferta') + 13,
            textTag.indexOf('transacao') - 3,
          ),
          OrigemLead: 'Ficha',
          IndiceContatoCampanha: '0',
          Transacao: textTag.slice(
            textTag.indexOf('transacao') + 12,
            textTag.indexOf(`btnFavorito${ImovelID}'`) - 6,
          ),
        }),
        __RequestVerificationToken: document.querySelector(
          'body > div.content.main.content-ficha > input[type="hidden"]',
        ).value,
      },
    }
    let newRequest = baseRequest(options)
    return newRequest
  })
  .then(body => {
    console.log(body)
  })
  .catch(err => console.error(err))
