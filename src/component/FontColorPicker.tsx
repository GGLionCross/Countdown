// React
import { useRef } from 'react';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

// TODO: Either utilize debounce to smooth color picking or uninstall lodash
//import { debounce } from 'lodash';
// import { useCallback } from 'react';

// Components
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import { IconButton } from '@mui/material';

import { styled } from '@mui/material/styles';

interface ColorPickerProps {
    color: string;
    setColor: Dispatch<SetStateAction<string>>;
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    right: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function FontColorPicker(props: ColorPickerProps) {
    const hiddenRef = useRef<HTMLInputElement>(null);

    // const debouncedSetColor = useCallback(
    //     debounce((value: string) => props.setColor(value), 200),
    //     []
    // );
    // const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     debouncedSetColor(event.target.value);
    // };

    const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.setColor(event.target.value);
    };

    const clickColorInput = () => {
        hiddenRef.current?.click();
    }

    return (
        <IconButton onClick={clickColorInput}>
            <FormatColorTextIcon sx={{ color: props.color }}/>
            <VisuallyHiddenInput
                type='color'
                ref={hiddenRef}
                onChange={handleColorChange}
            />
        </IconButton>
    );
}