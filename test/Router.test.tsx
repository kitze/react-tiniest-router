import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Router } from '../src/index';
import { routes, Root } from './mocks';

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

  it('should navigateto the Picture Gallery', () => {
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
});
