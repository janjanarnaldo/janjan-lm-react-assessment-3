import React from 'react';
import '@testing-library/jest-dom';
import renderWithRouter from '../../utils/renderWithRouterHelper';
import BreadCrumb from '../../components/BreadCrumb';

const navigations = [{ title: 'Dashboard', url: '/dashboard' }];

describe('<BreadCrumb />', () => {
  test('Renders the navigation', () => {
    const { queryByText } = renderWithRouter(<BreadCrumb navigations={navigations} />);
    expect(queryByText('Dashboard')).toBeInTheDocument()
  })

  test('Renders no navigation', () => {
    const { queryByText } = renderWithRouter(<BreadCrumb />);
    expect(queryByText('Dashboard')).not.toBeInTheDocument()
  })

  test('Renders children', () => {
    const { queryByText } = renderWithRouter(<BreadCrumb>My Custom Navigation</BreadCrumb>);
    expect(queryByText(/my custom navigation/i)).toBeInTheDocument()
  })
});
