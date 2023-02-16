import SpeechSynthesis from './script';

describe('SpeechSynthesis', () => {
  beforeEach(() => {
    window.speechSynthesis = {
      speak: jest.fn(),
    };
  });

  afterEach(() => {
    delete window.speechSynthesis;
  });

  it('init should call speechSynthesis.speak', () => {
    const speechSynthesis = new SpeechSynthesis();
    speechSynthesis.init();
    expect(window.speechSynthesis.speak).toHaveBeenCalled();
  });

  it('getVoices should return an array of voices', () => {
    const speechSynthesis = new SpeechSynthesis();
    window.speechSynthesis.getVoices = jest.fn(() => [
      { name: 'voice1', lang: 'en-US' },
      { name: 'voice2', lang: 'en-GB' },
    ]);
    const voices = speechSynthesis.getVoices();
    expect(voices).toEqual([
      { name: 'voice1', lang: 'en-US' },
      { name: 'voice2', lang: 'en-GB' },
    ]);
  });
});
