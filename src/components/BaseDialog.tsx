import { useId, type ReactNode } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface BaseDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children?: ReactNode;
  description?: string;
  onSubmit?: () => void;
  submitText?: string;
  submitDisabled?: boolean;
  cancelText?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
  submitButtonColor?: string;
}

export const BaseDialog = ({
  open,
  onClose,
  title,
  children,
  description,
  onSubmit,
  submitText = 'Yadda saxla',
  submitDisabled = false,
  cancelText = 'Ləğv et',
  maxWidth = 'sm',
  showCloseButton = false,
  submitButtonColor = '#2563EB',
}: BaseDialogProps) => {
  const dialogId = useId();
  const titleId = `${dialogId}-title`;
  const descriptionId = `${dialogId}-description`;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
    >
      <DialogTitle
        id={titleId}
        sx={{
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {title}
        {showCloseButton && (
          <IconButton
            aria-label="Dialogu bağla"
            onClick={onClose}
            size="small"
            sx={{ color: '#6B7280' }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>

      <DialogContent>
        {description && (
          <Box
            id={descriptionId}
            sx={{ color: '#6B7280', fontSize: 14, mb: 2 }}
          >
            {description}
          </Box>
        )}
        {children && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: description ? 0 : 1 }}>
            {children}
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2.5, pt: 0 }}>
        <Button
          onClick={onClose}
          sx={{ color: '#6B7280' }}
        >
          {cancelText}
        </Button>
        {onSubmit && (
          <Button
            onClick={onSubmit}
            variant="contained"
            disabled={submitDisabled}
            sx={{
              backgroundColor: submitButtonColor,
              '&:hover': {
                backgroundColor: submitButtonColor,
                opacity: 0.9
              },
            }}
          >
            {submitText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
