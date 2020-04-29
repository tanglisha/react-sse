import React from 'react';
import { render } from '@testing-library/react';
import { PetData } from './Api';
import sinon, { createSandbox } from 'sinon';
import { Observable, config, Subject } from "rxjs";
import App from "./App";
// @ts-ignore
import EventSource from "eventsourcemock";

const sandbox = createSandbox(sinon.defaultConfig);

describe('the overall app', () => {
  let fakeSocket = new Subject<PetData>();
  beforeEach(() => {
    // sandbox.replace(EventTarget, "dispatchEvent", (event: Event) => { return true; });

    // sinon.spy(Observable, "webSocket").alwaysReturned(fakeSocket);
    // @ts-ignore
    // spyOn(Observable, 'webSocket').and.returnValue(fakeSocket);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('renders without crashing', () => {
    function SendPetData(callback: any) {
      return new Promise<PetData>(callback);
    };

    config.Promise = SendPetData as any;

    const subject = render(<App />);
    SendPetData(() => {return {num_pets: 1, dogs: ["Charlie"], cats: [], birds: []}})
    fakeSocket.subscribe(x => {return {num_pets: 1, dogs: ["Charlie"], cats: [], birds: []}});
    expect(subject).toBeDefined();
    expect(subject).toContain("Charlie");
  });
});
