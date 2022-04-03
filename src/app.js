import BpmnModeler from 'bpmn-js/lib/Modeler';

import fileDrop from 'file-drops';

import fileOpen from 'file-open';

import download from 'downloadjs';

import exampleXML from './newDiagram.bpmn';

import {
  html,
  render
} from 'htm/preact';

import NFTWidget from './NFTWidget';

import './style.css';

const url = new URL(window.location.href);

const persistent = url.searchParams.has('p');
const presentationMode = url.searchParams.has('pm');

let fileName = 'diagram.bpmn';

const initialDiagram = (() => {
  try {
    return persistent && localStorage['diagram-xml'] || exampleXML;
  } catch (err) {
    return exampleXML;
  }
})();

function hideDropMessage() {
  const dropMessage = document.querySelector('.drop-message');

  dropMessage.style.display = 'none';
}

if (persistent) {
  hideDropMessage();
}

const modeler = new BpmnModeler({
  container: '#canvas',
  nft: {
    wallet: {
      provider: 'opensea',
      network: 'https://mainnet.infura.io',
      apiKey: 'YOUR_API_KEY'
    }
  },
  keyboard: {
    bindTo: document
  }
});

render(
  html`
    <${NFTWidget}
      onRemix=${ (diagram) => modeler.openDiagram(diagram.bpmn) }
    />
  `,
  document.querySelector('#sidebar')
);

modeler.openDiagram = function(diagram) {
  return this.importXML(diagram)
    .then(({ warnings }) => {
      if (warnings.length) {
        console.warn(warnings);
      }

      if (persistent) {
        localStorage['diagram-xml'] = diagram;
      }

      this.get('canvas').zoom('fit-viewport');
    })
    .catch(err => {
      console.error(err);
    });
};

if (presentationMode) {
  document.body.classList.add('presentation-mode');
}

function openFile(files) {

  // files = [ { name, contents }, ... ]

  if (!files.length) {
    return;
  }

  hideDropMessage();

  fileName = files[0].name;

  modeler.openDiagram(files[0].contents);
}

document.body.addEventListener('dragover', fileDrop('Open BPMN diagram', openFile), false);

function downloadDiagram() {
  modeler.saveXML({ format: true }, function(err, xml) {
    if (!err) {
      download(xml, fileName, 'application/xml');
    }
  });
}

document.querySelector('.error-panel .toggle').addEventListener('click', () => {
  document.querySelector('.error-panel').classList.toggle('hidden');
});

document.body.addEventListener('keydown', function(event) {
  if (event.code === 'KeyS' && (event.metaKey || event.ctrlKey)) {
    event.preventDefault();

    downloadDiagram();
  }

  if (event.code === 'KeyO' && (event.metaKey || event.ctrlKey)) {
    event.preventDefault();

    fileOpen().then(openFile);
  }
});

document.querySelector('#download-button').addEventListener('click', function(event) {
  downloadDiagram();
});

modeler.openDiagram(initialDiagram);