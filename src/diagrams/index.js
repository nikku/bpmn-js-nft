import ApplicationProcessingBPMN from './application-processing.bpmn';
import ApplicationProcessingImg from './application-processing.png';

import DominosBPMN from './dominos.bpmn';
import DominosImg from './dominos.png';

import ErrorEventSubBPMN from './error-event-sub-process.bpmn';
import ErrorEventSubImg from './error-event-sub-process.png';

import HungryBPMN from './hungry.bpmn';
import HungryImg from './hungry.png';

import PlaceholderBPMN from './placeholder.bpmn';
import PlaceholderImg from './placeholder.png';

import JustSayingImg from './just-saying.png';

const diagrams = [
  {
    name: 'The Dominos Resolution',
    author: 'Flip',
    image: DominosImg,
    bpmn: DominosBPMN
  },
  {
    name: 'Playing with event Sub-Processes',
    author: 'The Basics Dude',
    image: ErrorEventSubImg,
    bpmn: ErrorEventSubBPMN
  },
  {
    name: 'What if you are hungry?',
    author: 'nikku',
    image: HungryImg,
    bpmn: HungryBPMN
  },
  {
    name: 'Foo Corp - Application Processing',
    author: 'Crazy Fish',
    image: ApplicationProcessingImg,
    bpmn: ApplicationProcessingBPMN
  },
  {
    name: 'Just Saying',
    author: 'Sina G.',
    image: JustSayingImg,
    bpmn: PlaceholderBPMN
  },
  {
    name: 'Our BPMN Journey',
    author: 'Frederic Mitch Hiker',
    image: PlaceholderImg,
    bpmn: PlaceholderBPMN
  },
  {
    name: 'Signals',
    author: '99MA',
    image: PlaceholderImg,
    bpmn: PlaceholderBPMN
  }
];

export default diagrams;