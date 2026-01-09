import { useState, useEffect, useCallback } from 'react';
import { TextField, Box } from '@mui/material';
import { BaseDialog } from './BaseDialog';
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

  // Reset form when dialog closes
  const resetForm = useCallback(() => {
    setName('');
    setDescription('');
    setColor(boardColors[0]);
  }, []);

  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open, resetForm]);

  const handleSubmit = () => {
    if (!name.trim()) return;

    addBoard({
      name: name.trim(),
      description: description.trim() || undefined,
      color,
    });

    onClose();
  };

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title="Yeni Layihə Yarat"
      onSubmit={handleSubmit}
      submitText="Yarat"
      submitDisabled={!name.trim()}
      submitButtonColor={color}
    >
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
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }} role="radiogroup" aria-label="Layihə rəngi">
          {boardColors.map((c) => (
            <Box
              key={c}
              role="radio"
              aria-checked={color === c}
              tabIndex={0}
              onClick={() => setColor(c)}
              onKeyDown={(e) => e.key === 'Enter' && setColor(c)}
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
                '&:focus': {
                  outline: '2px solid #2563EB',
                  outlineOffset: 2,
                },
              }}
            />
          ))}
        </Box>
      </Box>
    </BaseDialog>
  );
};
