import { useState, useEffect } from 'react';
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
import type { Project } from '../types/project';

const categories = [
  { value: 'Web design', color: '#DBEAFE' },
  { value: 'Mobile Design', color: '#D1FAE5' },
  { value: 'Invoice', color: '#FEF3C7' },
  { value: 'App Developer', color: '#EDE9FE' },
  { value: 'Dashboard', color: '#FCE7F3' },
];

interface EditTaskDialogProps {
  open: boolean;
  onClose: () => void;
  project: Project | null;
}

export const EditTaskDialog = ({ open, onClose, project }: EditTaskDialogProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Web design');
  const [link, setLink] = useState('');

  const updateProject = useProjectsStore((state) => state.updateProject);

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setDescription(project.description);
      setCategory(project.category);
      setLink(project.link?.label || '');
    }
  }, [project]);

  const handleSubmit = () => {
    if (!title.trim() || !project) return;

    const selectedCategory = categories.find((c) => c.value === category);

    updateProject(project.id, {
      title: title.trim(),
      description: description.trim(),
      category,
      categoryColor: selectedCategory?.color || '#DBEAFE',
      link: link.trim() ? { label: link.trim(), url: link.trim() } : undefined,
    });

    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600 }}>Task Redaktə Et</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>
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
          disabled={!title.trim()}
          sx={{
            backgroundColor: '#2563EB',
            '&:hover': { backgroundColor: '#1D4ED8' },
          }}
        >
          Yadda saxla
        </Button>
      </DialogActions>
    </Dialog>
  );
};
