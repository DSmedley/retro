// import React from 'react';
// import {screen} from '@testing-library/react';
// import BoardItem from './BoardItem';
// import {renderInTestApp} from '@backstage/test-utils';
// import userEvent from '@testing-library/user-event';
//
// describe('<BoardItem />', () => {
//   const mockBoard = {id: 1, title: 'Board 1', description: 'Description 1'};
//   const mockOnEdit = jest.fn();
//   const mockOnDelete = jest.fn();
//
//   afterEach(() => {
//     jest.resetAllMocks();
//   });
//
//   it('should render board item with title and description', async () => {
//     await renderInTestApp(
//       <BoardItem board={mockBoard} onEdit={mockOnEdit} onDelete={mockOnDelete}/>
//     );
//
//     expect(screen.getByText(mockBoard.title)).toBeInTheDocument();
//     expect(screen.getByText(mockBoard.description)).toBeInTheDocument();
//   });
//
//   it('calls onEdit function when edit button is clicked', async () => {
//     await renderInTestApp(
//       <BoardItem board={mockBoard} onEdit={mockOnEdit} onDelete={mockOnDelete}/>
//     );
//
//     await userEvent.click(screen.getByTestId('EditIcon'));
//
//     expect(mockOnEdit).toHaveBeenCalledTimes(1);
//   });
//
//   it('calls onDelete function when delete button is clicked', async () => {
//     await renderInTestApp(
//       <BoardItem board={mockBoard} onEdit={mockOnEdit} onDelete={mockOnDelete}/>
//     );
//
//     await userEvent.click(screen.getByTestId('DeleteIcon'));
//
//     expect(mockOnDelete).toHaveBeenCalledTimes(1);
//   });
// });
