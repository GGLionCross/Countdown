// React
import { ChangeEvent, useRef } from 'react';
import { Dispatch, SetStateAction } from 'react';

import { TextField } from "@mui/material";
import { styled } from '@mui/material/styles';

import ImageIcon from '@mui/icons-material/Image';
import InputAdornment from '@mui/material/InputAdornment';

interface UploadFileFieldProps {
    accept?: string; // Accepted filetypes
    file: File | null;
    setFile: Dispatch<SetStateAction<File | null>>;
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function UploadFileField(props: UploadFileFieldProps) {
    const hiddenRef = useRef<HTMLInputElement>(null);

    const handleUpload = () => {
        hiddenRef.current?.click();
    };
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            props.setFile(event.target.files[0]);
        }
    };

    return (
        <TextField
            value={props.file?.name}
            label='Background Image'
            size='small'
            onClick={handleUpload}
            InputLabelProps={{ 
                // This forces the Input Label not to overlap with our filename
                shrink: Boolean(props.file?.name)
            }}
            InputProps={{
                endAdornment: (
                    <InputAdornment position='end'>
                        <ImageIcon />
                        <VisuallyHiddenInput
                            type='file'
                            accept={props.accept}
                            ref={hiddenRef}
                            onChange={handleFileChange}
                        />
                    </InputAdornment>
                ),
                readOnly: true
            }}
        />
    );
}