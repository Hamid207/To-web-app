import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';
import { useProjectsStore } from '../stores/projectsStore';
import { useBoardsStore } from '../stores/boardsStore';
import { useAuthStore } from '../stores/authStore';

const categories = [
  { value: 'Web design', color: '#DBEAFE' },
  { value: 'Mobile Design', color: '#D1FAE5' },
  { value: 'Invoice', color: '#FEF3C7' },
  { value: 'App Developer', color: '#EDE9FE' },
  { value: 'Dashboard', color: '#FCE7F3' },
];

interface AddTaskDialogProps {
  open: boolean;
  onClose: () => void;
}

export const AddTaskDialog = ({ open, onClose }: AddTaskDialogProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Web design');
  const [link, setLink] = useState('');
  const [taskBoardId, setTaskBoardId] = useState('');

  const addProject = useProjectsStore((state) => state.addProject);
  const selectedBoardId = useBoardsStore((state) => state.selectedBoardId);
  const boards = useBoardsStore((state) => state.boards);
  const user = useAuthStore((state) => state.user);

  const isAllSelected = selectedBoardId === 'all';
  const effectiveBoardId = isAllSelected ? taskBoardId : selectedBoardId;

  const handleSubmit = () => {
    if (!title.trim()) return;
    if (isAllSelected && !taskBoardId) return;

    const selectedCategory = categories.find((c) => c.value === category);

    addProject({
      boardId: effectiveBoardId,
      title: title.trim(),
      description: description.trim(),
      category,
      categoryColor: selectedCategory?.color || '#DBEAFE',
      status: 'todo',
      author: { name: user?.email?.split('@')[0] || 'User' },
      link: link.trim() ? { label: link.trim(), url: link.trim() } : undefined,
      assignees: [{ id: crypto.randomUUID(), name: user?.email?.split('@')[0] || 'User' }],
    });

    // Reset form
    setTitle('');
    setDescription('');
    setCategory('Web design');
    setLink('');
    setTaskBoardId('');
    onClose();
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setCategory('Web design');
    setLink('');
    setTaskBoardId('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600 }}>Yeni Task Əlavə Et</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>
          {isAllSelected && (
            <FormControl fullWidth required>
              <InputLabel>Layihə</InputLabel>
              <Select
                value={taskBoardId}
                label="Layihə"
                onChange={(e) => setTaskBoardId(e.target.value)}
              >
                {boards.map((board) => (
                  <MenuItem key={board.id} value={board.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          backgroundColor: board.color,
                        }}
                      />
                      {board.name}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <TextField
            label="Başlıq"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
            placeholder="Task başlığını daxil edin"
          />

          <TextField
            label="Təsvir"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={3}
            placeholder="Task haqqında məlumat"
          />

          <FormControl fullWidth>
            <InputLabel>Kateqoriya</InputLabel>
            <Select
              value={category}
              label="Kateqoriya"
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <MenuItem key={cat.value} value={cat.value}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        backgroundColor: cat.color,
                      }}
                    />
                    {cat.value}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Link (isteğe bağlı)"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            fullWidth
            placeholder="www.example.com"
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2.5, pt: 0 }}>
        <Button onClick={handleClose} sx={{ color: '#6B7280' }}>
          Ləğv et
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!title.trim() || (isAllSelected && !taskBoardId)}
          sx={{
            backgroundColor: '#2563EB',
            '&:hover': { backgroundColor: '#1D4ED8' },
          }}
        >
          Əlavə et
        </Button>
      </DialogActions>
    </Dialog>
  );
};
