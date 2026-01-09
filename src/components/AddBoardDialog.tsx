import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from '@mui/material';
import { useBoardsStore } from '../stores/boardsStore';

const boardColors = [
  '#2563EB', // Blue
  '#10B981', // Green
  '#F59E0B', // Orange
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#14B8A6', // Teal
  '#6366F1', // Indigo
];

interface AddBoardDialogProps {
  open: boolean;
  onClose: () => void;
}

export const AddBoardDialog = ({ open, onClose }: AddBoardDialogProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState(boardColors[0]);

  const addBoard = useBoardsStore((state) => state.addBoard);

  const handleSubmit = () => {
    if (!name.trim()) return;

    addBoard({
      name: name.trim(),
      description: description.trim() || undefined,
      color,
    });

    setName('');
    setDescription('');
    setColor(boardColors[0]);
    onClose();
  };

  const handleClose = () => {
    setName('');
    setDescription('');
    setColor(boardColors[0]);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600 }}>Yeni Layihə Yarat</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>
          <TextField
            label="Layihə adı"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            placeholder="Layihə adını daxil edin"
          />

          <TextField
            label="Təsvir (isteğe bağlı)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={2}
            placeholder="Layihə haqqında qısa məlumat"
          />

          <Box>
            <Box sx={{ mb: 1, fontSize: 14, color: '#374151' }}>Rəng seçin</Box>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {boardColors.map((c) => (
                <Box
                  key={c}
                  onClick={() => setColor(c)}
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    backgroundColor: c,
                    cursor: 'pointer',
                    border: color === c ? '3px solid #111827' : '3px solid transparent',
                    transition: 'all 0.2s',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2.5, pt: 0 }}>
        <Button onClick={handleClose} sx={{ color: '#6B7280' }}>
          Ləğv et
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!name.trim()}
          sx={{
            backgroundColor: color,
            '&:hover': { backgroundColor: color, opacity: 0.9 },
          }}
        >
          Yarat
        </Button>
      </DialogActions>
    </Dialog>
  );
};
