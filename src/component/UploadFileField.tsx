// React
import { ChangeEvent, useRef } from 'react';
import { Dispatch, SetStateAction } from 'react';

import { TextField } from "@mui/material";
import { styled } from '@mui/material/styles';

import ImageIcon from '@mui/icons-material/Image';
import InputAdornment from '@mui/material/InputAdornment';

interface UploadFileFieldProps {
    accept?: string; // Accepted filetypes
    filename: string;
    setFilename: Dispatch<SetStateAction<string>>;
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
            props.setFilename(event.target.files[0].name);
        }
    };

    return (
        <TextField
            value={props.filename}
            label='Background Image'
            size='small'
            onClick={handleUpload}
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