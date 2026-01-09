import { useState } from 'react';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import {
  KeyboardArrowDown as ArrowDownIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  FolderOpen as FolderIcon,
  ViewModule as AllIcon,
} from '@mui/icons-material';
import { useBoardsStore } from '../stores/boardsStore';
import { AddBoardDialog } from './AddBoardDialog';

export const BoardSelector = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [boardToDelete, setBoardToDelete] = useState<string | null>(null);
  const open = Boolean(anchorEl);

  const boards = useBoardsStore((state) => state.boards);
  const selectedBoardId = useBoardsStore((state) => state.selectedBoardId);
  const selectBoard = useBoardsStore((state) => state.selectBoard);
  const deleteBoard = useBoardsStore((state) => state.deleteBoard);

  const selectedBoard = boards.find((b) => b.id === selectedBoardId);
  const isAllSelected = selectedBoardId === 'all';

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectBoard = (boardId: string) => {
    selectBoard(boardId);
    handleClose();
  };

  const handleDeleteClick = (event: React.MouseEvent, boardId: string) => {
    event.stopPropagation();
    if (boards.length > 1) {
      setBoardToDelete(boardId);
      setDeleteDialogOpen(true);
    }
  };

  const handleDeleteConfirm = () => {
    if (boardToDelete) {
      deleteBoard(boardToDelete);
    }
    setDeleteDialogOpen(false);
    setBoardToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setBoardToDelete(null);
  };

  const handleAddClick = () => {
    handleClose();
    setAddDialogOpen(true);
  };

  return (
    <>
      <Button
        id="board-selector-button"
        aria-controls={open ? 'board-selector-menu' : undefined}
        aria-haspopup="listbox"
        aria-expanded={open ? 'true' : undefined}
        aria-label={`Layihə seçin: ${isAllSelected ? 'Hamısı' : (selectedBoard?.name || 'Layihə seç')}`}
        onClick={handleClick}
        endIcon={<ArrowDownIcon />}
        sx={{
          backgroundColor: isAllSelected ? '#6366F1' : (selectedBoard?.color || '#2563EB'),
          color: '#fff',
          textTransform: 'none',
          borderRadius: 2,
          px: { xs: 1.5, sm: 2 },
          py: 1,
          minWidth: { xs: 'auto', sm: 140 },
          maxWidth: { xs: 160, sm: 200 },
          '&:hover': {
            backgroundColor: isAllSelected ? '#6366F1' : (selectedBoard?.color || '#2563EB'),
            opacity: 0.9,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, overflow: 'hidden' }}>
          {isAllSelected ? <AllIcon sx={{ fontSize: 18, flexShrink: 0 }} /> : <FolderIcon sx={{ fontSize: 18, flexShrink: 0 }} />}
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: { xs: 12, sm: 14 },
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {isAllSelected ? 'Hamısı' : (selectedBoard?.name || 'Layihə seç')}
          </Typography>
        </Box>
      </Button>

      <Menu
        id="board-selector-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        MenuListProps={{
          'aria-labelledby': 'board-selector-button',
          role: 'listbox',
        }}
        PaperProps={{
          sx: {
            minWidth: 220,
            mt: 1,
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          },
        }}
      >
        {/* All Projects Option */}
        <MenuItem
          role="option"
          aria-selected={isAllSelected}
          onClick={() => handleSelectBoard('all')}
          selected={isAllSelected}
          sx={{
            py: 1.5,
            '&.Mui-selected': {
              backgroundColor: '#6366F115',
            },
          }}
        >
          <ListItemIcon>
            <AllIcon sx={{ fontSize: 20, color: '#6366F1' }} />
          </ListItemIcon>
          <ListItemText
            primary="Hamısı"
            secondary="Bütün layihələrdəki task-lar"
            primaryTypographyProps={{ fontSize: 14, fontWeight: 600 }}
            secondaryTypographyProps={{ fontSize: 11 }}
          />
        </MenuItem>

        <Divider sx={{ my: 1 }} />

        <Box sx={{ px: 2, py: 1 }}>
          <Typography sx={{ fontSize: 12, color: '#6B7280', fontWeight: 500 }}>
            LAYİHƏLƏR
          </Typography>
        </Box>

        {boards.map((board) => (
          <MenuItem
            key={board.id}
            role="option"
            aria-selected={board.id === selectedBoardId}
            onClick={() => handleSelectBoard(board.id)}
            selected={board.id === selectedBoardId}
            sx={{
              py: 1.5,
              '&.Mui-selected': {
                backgroundColor: `${board.color}15`,
              },
            }}
          >
            <ListItemIcon>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: board.color,
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={board.name}
              secondary={board.description}
              primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}
              secondaryTypographyProps={{ fontSize: 11, noWrap: true }}
            />
            {boards.length > 1 && (
              <IconButton
                size="small"
                aria-label={`${board.name} layihəsini sil`}
                onClick={(e) => handleDeleteClick(e, board.id)}
                sx={{
                  ml: 1,
                  opacity: 0.5,
                  '&:hover': { opacity: 1, color: '#EF4444' },
                }}
              >
                <DeleteIcon sx={{ fontSize: 16 }} />
              </IconButton>
            )}
          </MenuItem>
        ))}

        <Divider sx={{ my: 1 }} />

        <MenuItem onClick={handleAddClick} sx={{ py: 1.5 }}>
          <ListItemIcon>
            <AddIcon sx={{ color: '#2563EB' }} />
          </ListItemIcon>
          <ListItemText
            primary="Yeni layihə yarat"
            primaryTypographyProps={{ fontSize: 14, color: '#2563EB', fontWeight: 500 }}
          />
        </MenuItem>
      </Menu>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-board-dialog-title"
        aria-describedby="delete-board-dialog-description"
      >
        <DialogTitle id="delete-board-dialog-title">
          Layihəni silmək istəyirsiniz?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-board-dialog-description">
            "{boards.find((b) => b.id === boardToDelete)?.name}" layihəsi silinəcək. Bu əməliyyat geri qaytarıla bilməz.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="inherit">
            Ləğv et
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained" autoFocus>
            Sil
          </Button>
        </DialogActions>
      </Dialog>

      <AddBoardDialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} />
    </>
  );
};
