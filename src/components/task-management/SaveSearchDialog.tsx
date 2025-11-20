import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from '@mui/material';

interface SaveSearchDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: (name: string) => void;
    title?: string;
    initialValue?: string;
    saveButtonLabel?: string;
}

export const SaveSearchDialog: React.FC<SaveSearchDialogProps> = ({
    open,
    onClose,
    onSave,
    title = 'Save Search',
    initialValue = '',
    saveButtonLabel = 'Save',
}) => {
    const [name, setName] = useState(initialValue);

    useEffect(() => {
        if (open) {
            setName(initialValue);
        }
    }, [open, initialValue]);

    const handleSave = () => {
        if (name.trim()) {
            onSave(name.trim());
            setName('');
            onClose();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && name.trim()) {
            handleSave();
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Search Name"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter a name for this search"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit">
                    Cancel
                </Button>
                <Button
                    onClick={handleSave}
                    variant="contained"
                    disabled={!name.trim()}
                >
                    {saveButtonLabel}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
