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

  const handleDeleteBoard = (event: React.MouseEvent, boardId: string) => {
    event.stopPropagation();
    if (boards.length > 1) {
      deleteBoard(boardId);
    }
  };

  const handleAddClick = () => {
    handleClose();
    setAddDialogOpen(true);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        endIcon={<ArrowDownIcon />}
        sx={{
          backgroundColor: isAllSelected ? '#6366F1' : (selectedBoard?.color || '#2563EB'),
          color: '#fff',
          textTransform: 'none',
          borderRadius: 2,
          px: 2,
          py: 1,
          '&:hover': {
            backgroundColor: isAllSelected ? '#6366F1' : (selectedBoard?.color || '#2563EB'),
            opacity: 0.9,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isAllSelected ? <AllIcon sx={{ fontSize: 18 }} /> : <FolderIcon sx={{ fontSize: 18 }} />}
          <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
            {isAllSelected ? 'Hamısı' : (selectedBoard?.name || 'Layihə seç')}
          </Typography>
        </Box>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
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
                onClick={(e) => handleDeleteBoard(e, board.id)}
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

      <AddBoardDialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} />
    </>
  );
};
