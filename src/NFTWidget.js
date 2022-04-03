import {
  html
} from 'htm/preact';

import {
  useEffect,
  useState
} from 'preact/hooks';

import diagrams from './diagrams';

import './NFTWidget.css';


export default function NFTWidget(props) {
  const [ walletOpen, setWalletOpen ] = useState(false);

  const {
    onRemix
  } = props;

  return html`
    <div class="w-widget">
      <div class="w-widget__title w-link w-link-primary">NTF Market Place</div>

      <div class="w-widget__body">
        ${
          walletOpen
            ? html`<${MarketPlace} diagrams=${ diagrams } onSelect=${ onRemix } />`
            : html`<${ConnectWallet} onOpen=${ setWalletOpen } />`
        }
      </div>
    </div>
  `;
}

function MarketPlace(props) {
  const {
    onSelect,
    diagrams: _diagrams
  } = props;

  const [ filter, setFilter ] = useState('');

  const [ loading, setLoading ] = useState(true);

  const [ diagrams, setDiagrams ] = useState(_diagrams);

  const [ loadingTimeout, setLoadingTimeout ] = useState();

  useEffect(() => {
    if (loading) {
      clearTimeout(loadingTimeout);

      setLoadingTimeout(setTimeout(() => setLoading(false), 2000 + Math.random() * 3000));
    }
  }, [loading]);

  useEffect(() => {
    setLoading(true);
  }, [ filter ]);

  useEffect(() => {

    function match(diagram) {
      const search = [ diagram.name, diagram.author ].map(str => str.toLowerCase()).join('----');

      return search.includes(filter.toLowerCase());
    }

    setDiagrams(_diagrams.filter(match));
  }, [ filter ]);

  return html`
    <div class="w-marketplace">
      <div class="w-marketplace__header">
        <div class="w-marketplace__search">
          <svg class="w-marketplace__search-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.0325 8.5H9.625L13.3675 12.25L12.25 13.3675L8.5 9.625V9.0325L8.2975 8.8225C7.4425 9.5575 6.3325 10 5.125 10C2.4325 10 0.25 7.8175 0.25 5.125C0.25 2.4325 2.4325 0.25 5.125 0.25C7.8175 0.25 10 2.4325 10 5.125C10 6.3325 9.5575 7.4425 8.8225 8.2975L9.0325 8.5ZM1.75 5.125C1.75 6.9925 3.2575 8.5 5.125 8.5C6.9925 8.5 8.5 6.9925 8.5 5.125C8.5 3.2575 6.9925 1.75 5.125 1.75C3.2575 1.75 1.75 3.2575 1.75 5.125Z" fill="#22242A"/>
          </svg>

          <input spellCheck="false" type="text" placeholder="Search for BPMN NFTs" onKeyUp=${ (event) => setFilter(event.target.value) } />
        </div>
      </div>

      <div class="w-marketplace__body">
        <div class="w-marketplace__results">
          ${ loading ? html`
            <${Loader} />
          ` : html`
              ${ diagrams.map((diagram) => html`
                <${DiagramPreview} diagram=${diagram} onSelect=${ () => onSelect(diagram) } />
              ` ) }
          ` }
          </div>
        </div>

      <div class="w-marketplace__footer">
        <button class="w-marketplace__publish w-link w-block">
          Publish diagram
        </button>
      </div>
    </div>
  `;
}


function ConnectWallet(props) {
  const {
    onOpen
  } = props;


  return html`
    <div class="w-configure">
      <div class="wallet-img">
        <${WalletImg} />
      </div>
      <div class="wallet-open">
        <button class="w-link" onClick=${ onOpen }>Connect Wallet</button>
      </div>
    </div>
  `;
}


function Loader(props) {
  return html`
    <div class="spinner-border"></div>
  `;
}

function DiagramPreview(props) {

  const {
    onSelect,
    diagram
  } = props;

  return html`
    <div class="diagram">
      <div class="diagram__image">
        <img src=${ diagram.image } />

        <button class="diagram__remix w-link" onClick=${ onSelect }>Remix</button>
      </div>

      <div class="diagram__description">
        <div class="diagram__name">${ diagram.name }</div>
        <div class="diagram__author">${ diagram.author }</div>
      </div>
    </div>
  `;
}

function WalletImg() {
  return html`
    <svg xmlns="http://www.w3.org/2000/svg" width="100" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path fill="currentColor" d="M282.3 343.7L248.1 376.1C244.5 381.5 238.4 384 232 384H192V424C192 437.3 181.3 448 168 448H128V488C128 501.3 117.3 512 104 512H24C10.75 512 0 501.3 0 488V408C0 401.6 2.529 395.5 7.029 391L168.3 229.7C162.9 212.8 160 194.7 160 176C160 78.8 238.8 0 336 0C433.2 0 512 78.8 512 176C512 273.2 433.2 352 336 352C317.3 352 299.2 349.1 282.3 343.7zM376 176C398.1 176 416 158.1 416 136C416 113.9 398.1 96 376 96C353.9 96 336 113.9 336 136C336 158.1 353.9 176 376 176z"/></svg>
  `;
}