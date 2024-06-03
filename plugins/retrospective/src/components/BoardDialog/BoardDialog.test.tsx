// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import BoardDialog from './BoardDialog';
//
// const mockBoard = { id: 1, title: 'Board 1', description: 'Description 1' };
//
// describe('BoardDialog', () => {
//   test('renders create dialog', () => {
//     render(<BoardDialog open={true} onClose={() => {}} onSave={() => {}} existingBoard={null} />);
//     expect(screen.getByText(/Create New Board/i)).toBeInTheDocument();
//   });
//
//   test('renders edit dialog', () => {
//     render(<BoardDialog open={true} onClose={() => {}} onSave={() => {}} existingBoard={mockBoard} />);
//     expect(screen.getByText(/Edit Board/i)).toBeInTheDocument();
//     expect(screen.getByDisplayValue(/Board 1/i)).toBeInTheDocument();
//     expect(screen.getByDisplayValue(/Description 1/i)).toBeInTheDocument();
//   });
//
//   test('calls onSave with new board details', () => {
//     const onSaveMock = jest.fn();
//     render(<BoardDialog open={true} onClose={() => {}} onSave={onSaveMock} existingBoard={null} />);
//     fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'New Board' } });
//     fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'New Description' } });
//     fireEvent.click(screen.getByText(/Create/i));
//     expect(onSaveMock).toHaveBeenCalledWith({ id: 0, title: 'New Board', description: 'New Description' });
//   });
//
//   test('calls onSave with edited board details', () => {
//     const onSaveMock = jest.fn();
//     render(<BoardDialog open={true} onClose={() => {}} onSave={onSaveMock} existingBoard={mockBoard} />);
//     fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Edited Board' } });
//     fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Edited Description' } });
//     fireEvent.click(screen.getByText(/Update/i));
//     expect(onSaveMock).toHaveBeenCalledWith({ id: 1, title: 'Edited Board', description: 'Edited Description' });
//   });
// });
