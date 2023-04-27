const getPoemBtn = document.getElementById('get-poem')
const poemEl = document.getElementById('poem')
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json'

const getJSON = url => fetch(url).then(res => res.json())

const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg)

const makeTag = tag => str => `<${tag}>${str}</${tag}>`

const makePoemHTML = (data) => {
  const { title, author, lines } = data[0];
  const h2 = makeTag('h2');
  const h3 = makeTag('h3');
  const em = makeTag('em');
  const p = makeTag('p');
  const poemTitle = h2(title);
  const poemAuthor = em(`by ${author}`);
  const authorHeader = h3(poemAuthor);
  let currentStanza = [];
  let poemStanzas = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === '') {
      const stanzaText = currentStanza.join('<br>');
      const stanzaElement = p(stanzaText);
      poemStanzas.push(stanzaElement);
      currentStanza = [];
    } else {
      currentStanza.push(line);
    }
  }
  if (currentStanza.length > 0) {
    const stanzaText = currentStanza.join('<br>');
    const stanzaElement = p(stanzaText);
    poemStanzas.push(stanzaElement);
  }
  return `${poemTitle}${authorHeader}${poemStanzas.join('')}`;
};

getPoemBtn.onclick = async function () {
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL))
}

