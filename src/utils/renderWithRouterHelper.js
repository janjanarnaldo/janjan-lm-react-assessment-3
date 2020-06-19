import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

export default function renderWithRouter(ui) {
  return {
    ...render(<BrowserRouter>{ui}</BrowserRouter>)
  }
}
