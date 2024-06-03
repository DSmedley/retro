// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import Column from './Column';
//
// const mockCards = [
//   { id: 1, title: 'Card 1', description: 'Description 1', upvotes: 0, done: false, columnId: 0 },
//   { id: 2, title: 'Card 2', description: 'Description 2', upvotes: 0, done: false, columnId: 1 },
// ];
//
// const mockProps = {
//   title: 'Test Title',
//   icon: <span>Icon</span>,
//   color: '#FFF',
//   cards: mockCards,
//   updateCard: jest.fn(),
//   addCard: jest.fn(),
//   cardCount: mockCards.length,
// };
//
// test('renders column title', () => {
//   render(<Column {...mockProps} />);
//   const titleElement = screen.getByText(/Test Title/i);
//   expect(titleElement).toBeInTheDocument();
// });
//
// test('renders add card button', () => {
//   render(<Column {...mockProps} />);
//   const addButton = screen.getByRole('button', { name: /Add Card/ });
//   expect(addButton).toBeInTheDocument();
// });
//
// test('calls addCard function when add card button is clicked', () => {
//   render(<Column {...mockProps} />);
//   const addButton = screen.getByRole('button', { name: /Add Card/ });
//   userEvent.click(addButton);
//   expect(mockProps.addCard).toHaveBeenCalledTimes(1);
// });
//
// test('renders correct number of cards', () => {
//   render(<Column {...mockProps} />);
//   const cardElements = screen.getAllByRole('heading', { level: 6 });
//   expect(cardElements.length).toBe(mockCards.length);
// });