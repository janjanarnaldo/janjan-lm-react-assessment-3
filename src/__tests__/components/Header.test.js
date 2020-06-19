import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Header from '../../components/Header';

describe('<Header />', () => {
  test('That it renders company name', () => {
    render(<Header name="Arjan" />)
    expect(screen.getByText('Arjan Ltd.')).toBeInTheDocument()
  });
});
