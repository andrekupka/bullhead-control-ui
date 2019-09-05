import React from 'react';
import {LightBullContentContainer} from './MainContentContainer';
import {NavigationBar} from './navigation/NavigationBar';

export const LightBullFrame = () => {
    return (
      <div>
          <NavigationBar/>
          <LightBullContentContainer/>
      </div>
    );
};