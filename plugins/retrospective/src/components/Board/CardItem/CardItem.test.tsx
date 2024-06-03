// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import CardItem from './CardItem';
//
// describe('<CardItem />', () => {
//   const mockCard = {
//     id: 1,
//     title: 'Card 1',
//     description: 'Description 1',
//     upvotes: 0,
//     done: false,
//     columnId: 0,
//   };
//   const mockOnUpvote = jest.fn();
//   const mockOnEdit = jest.fn();
//   const mockOnToggleDone = jest.fn();
//
//   beforeEach(() => {
//
//   });
//
//   afterEach(() => {
//     jest.resetAllMocks();
//   });
//
//   test('renders card item with title and description', () => {
//     render(<CardItem card={mockCard} onUpvote={mockOnUpvote} onEdit={mockOnEdit} onToggleDone={mockOnToggleDone} />);
//     const titleElement = screen.getByText(/Card 1/i);
//     const descriptionElement = screen.getByText(/Description 1/i);
//     expect(titleElement).toBeInTheDocument();
//     expect(descriptionElement).toBeInTheDocument();
//   });
//
//   test('calls onUpvote function when upvote button is clicked', () => {
//     const onUpvoteMock = jest.fn();
//     render(<CardItem card={mockCard} onUpvote={onUpvoteMock} onEdit={() => {}} onToggleDone={() => {}} />);
//     const upvoteButton = screen.getByRole('button', { name: /Upvote/ });
//     userEvent.click(upvoteButton);
//     expect(onUpvoteMock).toHaveBeenCalledTimes(1);
//   });
//
//   test('calls onEdit function when edit button is clicked', () => {
//     const onEditMock = jest.fn();
//     render(<CardItem card={mockCard} onUpvote={() => {}} onEdit={onEditMock} onToggleDone={() => {}} />);
//     const editButton = screen.getByRole('button', { name: /Edit/ });
//     userEvent.click(editButton);
//     expect(onEditMock).toHaveBeenCalledTimes(1);
//   });
//
//   test('calls onToggleDone function when done button is clicked', () => {
//     const onToggleDoneMock = jest.fn();
//     render(<CardItem card={mockCard} onUpvote={() => {}} onEdit={() => {}} onToggleDone={onToggleDoneMock} />);
//     const doneButton = screen.getByRole('button', { name: /Done/ });
//     userEvent.click(doneButton);
//     expect(onToggleDoneMock).toHaveBeenCalledTimes(1);
//   });
// });