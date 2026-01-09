import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Board } from '../types/board';

const initialBoards: Board[] = [
  {
    id: 'default',
    name: 'Əsas Layihə',
    description: 'Default layihə lövhəsi',
    color: '#2563EB',
    createdAt: '2023-01-01',
  },
  {
    id: 'board-2',
    name: 'Mobil Tətbiq',
    description: 'Mobil tətbiq inkişafı',
    color: '#10B981',
    createdAt: '2023-02-15',
  },
  {
    id: 'board-3',
    name: 'Marketing',
    description: 'Marketing kampaniyaları',
    color: '#F59E0B',
    createdAt: '2023-03-20',
  },
];

interface BoardsState {
  boards: Board[];
  selectedBoardId: string;
  addBoard: (board: Omit<Board, 'id' | 'createdAt'>) => void;
  updateBoard: (id: string, updates: Partial<Omit<Board, 'id'>>) => void;
  deleteBoard: (id: string) => void;
  selectBoard: (id: string) => void;
  getSelectedBoard: () => Board | undefined;
}

export const useBoardsStore = create<BoardsState>()(
  persist(
    (set, get) => ({
      boards: initialBoards,
      selectedBoardId: 'default',

      addBoard: (board) => {
        const newBoard: Board = {
          ...board,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          boards: [...state.boards, newBoard],
          selectedBoardId: newBoard.id,
        }));
      },

      updateBoard: (id, updates) => {
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === id ? { ...board, ...updates } : board
          ),
        }));
      },

      deleteBoard: (id) => {
        const state = get();
        if (state.boards.length <= 1) return;

        set((state) => {
          const newBoards = state.boards.filter((board) => board.id !== id);
          const newSelectedId = state.selectedBoardId === id
            ? newBoards[0]?.id || 'default'
            : state.selectedBoardId;
          return {
            boards: newBoards,
            selectedBoardId: newSelectedId,
          };
        });
      },

      selectBoard: (id) => {
        set({ selectedBoardId: id });
      },

      getSelectedBoard: () => {
        const state = get();
        return state.boards.find((board) => board.id === state.selectedBoardId);
      },
    }),
    {
      name: 'boards-storage',
      onRehydrateStorage: () => (_state, error) => {
        if (error) {
          console.error('Boards store rehydration failed:', error);
        }
      },
      storage: {
        getItem: (name) => {
          try {
            const value = localStorage.getItem(name);
            return value ? JSON.parse(value) : null;
          } catch (error) {
            console.error('Failed to read from localStorage:', error);
            return null;
          }
        },
        setItem: (name, value) => {
          try {
            localStorage.setItem(name, JSON.stringify(value));
          } catch (error) {
            console.error('Failed to write to localStorage:', error);
          }
        },
        removeItem: (name) => {
          try {
            localStorage.removeItem(name);
          } catch (error) {
            console.error('Failed to remove from localStorage:', error);
          }
        },
      },
    }
  )
);
