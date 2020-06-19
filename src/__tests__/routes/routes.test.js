import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import Routes from '../../routes';
import BreadCrumb from '../../components/BreadCrumb';
import renderWithRouter from '../../utils/renderWithRouterHelper';

describe('Routes', () => {
  test('Error Page', () => {
    const { queryByText } = renderWithRouter(<Routes />, {
      route: '/random',
    })
  
    expect(queryByText(/error page/i)).toBeInTheDocument()
  })
  
  test('rendering a component that uses withRouter', () => {
    const { queryByText } = renderWithRouter(<BreadCrumb>Test Component With Router</BreadCrumb>);
    expect(queryByText(/test component with router/i)).toBeInTheDocument();
  })
});
