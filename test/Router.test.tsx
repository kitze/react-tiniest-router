import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Router } from '../src/index';
import { routes, Root } from './mocks';
import { act } from 'react-dom/test-utils';

describe('Router tests', () => {
  it('should render a Router on the home page', () => {
    // arrange
    render(
      <Router routes={routes}>
        <Root />
      </Router>
    );

    // assert
    expect(screen.getByText('Welcome home')).toBeDefined();
  });

  it('should navigate away from homepage when we click a link button', () => {
    // arrange
    render(
      <Router routes={routes}>
        <Root />
      </Router>
    );

    // act
    fireEvent.click(screen.getByText('go to about'));

    // assert
    expect(screen.queryByText('Welcome home')).toBeNull();
  });

  it('should navigate to the About Us page', () => {
    // arrange
    render(
      <Router routes={routes}>
        <Root />
      </Router>
    );

    // act
    fireEvent.click(screen.getByText('go to about'));

    // assert
    expect(screen.getByText('About us')).toBeDefined();
  });

  it('should navigate to the Picture Gallery using params', () => {
    // arrange
    render(
      <Router routes={routes}>
        <Root />
      </Router>
    );

    // act
    fireEvent.click(screen.getByText('go to picture 2'));

    // assert
    expect(screen.getByText('Browsing picture 2')).toBeDefined();
  });

  it('should navigate to the Picture Gallery using query params', () => {
    // arrange
    render(
      <Router routes={routes}>
        <Root />
      </Router>
    );

    // act
    fireEvent.click(screen.getByText('go to picture 1'));

    // assert
    expect(screen.getByText('Browsing picture 1')).toBeDefined();

    fireEvent.click(screen.getByText('go to about'));
    expect(() => screen.getByText('Browsing picture 1')).toThrow();

    // Simulate "window.location.back()"
    delete global.window.location;
    global.window = Object.create(window);
    global.window.location = {
      search: '?imageId=1',
      pathname: '/gallery2',
    } as Location;
    act(() => window.onpopstate({ type: 'popstate' } as PopStateEvent));

    expect(screen.getByText('Browsing picture 1')).toBeDefined();
  });
});
