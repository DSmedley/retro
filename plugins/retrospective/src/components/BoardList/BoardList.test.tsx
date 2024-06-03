// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import BoardList from './BoardList';
//
// describe('App', () => {
//   test('renders without crashing, and creates new board dialog', () => {
//   render(<BoardList />);
//   expect(screen.getByText(/Retro Boards/i)).toBeInTheDocument();
//   fireEvent.click(screen.getByText(/Create New Board/i));
//   expect(screen.getByText(/Create New Board/i)).toBeInTheDocument();
// });
//
// test('creates a new board', () => {
//   render(<BoardList />);
//   fireEvent.click(screen.getByText(/Create New Board/i));
//   fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'New Board' } });
//   fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'New Board Description' } });
//   fireEvent.click(screen.getByText(/Create/i));
//   expect(screen.getByText(/New Board/i)).toBeInTheDocument();
//   expect(screen.getByText(/New Board Description/i)).toBeInTheDocument();
// });
//
// test('edits an existing board', () => {
//   render(<BoardList />);
//   fireEvent.click(screen.getByText(/Create New Board/i));
//   fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Board to Edit' } });
//   fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Description to Edit' } });
//   fireEvent.click(screen.getByText(/Create/i));
//
//   fireEvent.click(screen.getByText(/Edit/i));
//   fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Edited Board' } });
//   fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Edited Description' } });
//   fireEvent.click(screen.getByText(/Update/i));
//
//   expect(screen.getByText(/Edited Board/i)).toBeInTheDocument();
//   expect(screen.getByText(/Edited Description/i)).toBeInTheDocument();
// });
//
// test('deletes a board', () => {
//   render(<BoardList />);
//   fireEvent.click(screen.getByText(/Create New Board/i));
//   fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Board to Delete' } });
//   fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Description to Delete' } });
//   fireEvent.click(screen.getByText(/Create/i));
//
//   fireEvent.click(screen.getByText(/Delete/i));
//
//   expect(screen.queryByText(/Board to Delete/i)).not.toBeInTheDocument();
//   expect(screen.queryByText(/Description to Delete/i)).not.toBeInTheDocument();
// });
// });
