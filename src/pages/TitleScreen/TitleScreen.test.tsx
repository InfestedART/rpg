import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import TitleScreen from './TitleScreen';
import { vi, describe, beforeEach, it, expect } from 'vitest';
import * as charactersApi from '../../api/characters';

// Mock useNavigate
const mockNavigate = vi.fn();

vi.mock('../../api/characters');

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('TitleScreen', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const renderTitleScreen = () =>
        render(
        <MemoryRouter>
            <TitleScreen />
        </MemoryRouter>
        );

    it('renders the title screen and 2 buttons', () => {
        renderTitleScreen();

        expect(screen.getByTestId('title')).toBeInTheDocument();
        expect(screen.getByTestId('new-btn')).toBeInTheDocument();
        expect(screen.getByTestId('load-btn')).toBeInTheDocument();
    })

    it('redirects to new character', async () => {
        const user = userEvent.setup();
        renderTitleScreen();

        await user.click(screen.getByTestId('new-btn'));

        expect(mockNavigate).toHaveBeenCalledOnce();
        expect(mockNavigate).toHaveBeenCalledWith('/newChar');
    })

    it('redirects to load character', async () => {
        const user = userEvent.setup();
        vi.spyOn(charactersApi, 'getAllCharacters').mockResolvedValue([{
          id:1, character: 'Gandalf'
        }]);
        renderTitleScreen();

        await user.click(screen.getByTestId('load-btn'));

        expect(mockNavigate).toHaveBeenCalledOnce();
        expect(mockNavigate).toHaveBeenCalledWith('/loadChar');
    })

    it('disables LoadCharacter button when no characters exist', async () => {
      vi.spyOn(charactersApi, 'getAllCharacters').mockResolvedValue([]);
      renderTitleScreen();

      await waitFor(() => {
        expect(screen.getByTestId('load-btn')).toBeDisabled();
      });
    });

    it('enables LoadCharacter button when there is at least 1 character', async () => {
      vi.spyOn(charactersApi, 'getAllCharacters').mockResolvedValue([{
        id:1, character: 'Aragorn'
      }]);
      renderTitleScreen();

      await waitFor(() => {
        expect(screen.getByTestId('load-btn')).toBeEnabled();
      });
    });

    it('disables LoadCharacter button when fetch fails', async () => {
      vi.spyOn(charactersApi, 'getAllCharacters').mockRejectedValue(
        new Error('Failed to fetch characters')
      );
      renderTitleScreen();

      await waitFor(() => {
        expect(screen.getByTestId('load-btn')).toBeDisabled();
      });
    });
})