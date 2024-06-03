// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import CardForm from './CardForm';
//
// const mockCard = {
//   id: 1,
//   title: 'Card 1',
//   description: 'Description 1',
//   upvotes: 0,
//   done: false,
//   columnId: 0,
// };
//
// test('renders card form with initial values', () => {
//   render(<CardForm card={mockCard} onSubmit={() => {}} />);
//   const titleInput = screen.getByLabelText(/Title/i);
//   const descriptionInput = screen.getByLabelText(/Description/i);
//   expect(titleInput).toHaveValue('Card 1');
//   expect(descriptionInput).toHaveValue('Description 1');
// });
//
// test('calls onSubmit function with updated values when form is submitted', () => {
//   const onSubmitMock = jest.fn();
//   render(<CardForm card={mockCard} onSubmit={onSubmitMock} />);
//   const titleInput = screen.getByLabelText(/Title/i);
//   const descriptionInput = screen.getByLabelText(/Description/i);
//   userEvent.clear(titleInput);
//   userEvent.type(titleInput, 'Updated Title');
//   userEvent.clear(descriptionInput);
//   userEvent.type(descriptionInput, 'Updated Description');
//   const submitButton = screen.getByRole('button', { name: /Submit/ });
//   userEvent.click(submitButton);
//   expect(onSubmitMock).toHaveBeenCalledWith({
//     ...mockCard,
//     title: 'Updated Title',
//     description: 'Updated Description',
//   });
// });