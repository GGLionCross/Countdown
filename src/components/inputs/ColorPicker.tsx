// React
import { useEffect, useRef, useState } from 'react';
import {
    ChangeEvent,
    Dispatch,
    ReactNode,
    SetStateAction
} from 'react';

// TODO: Either utilize debounce to smooth color picking or uninstall lodash
//import { debounce } from 'lodash';
// import { useCallback } from 'react';

// Components
import { ButtonBase } from '@mui/material';

import { styled } from '@mui/material/styles';

interface ColorPickerProps {
    color: string;
    setColor: Dispatch<SetStateAction<string>>;
    children?: ReactNode;
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

const getContrastYIQ = (hexcode: string): string => {

    // Get the RGB values to calculate the contrast
    const r = parseInt(hexcode.slice(1, 3), 16);
    const g = parseInt(hexcode.slice(3, 5), 16);
    const b = parseInt(hexcode.slice(5, 7), 16);
  
    // Calculate the YIQ (luminance) value
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  
    // Return black for light colors and white for dark colors
    return (yiq >= 128) ? 'black' : 'white';
}

export default function FontColorPicker(props: ColorPickerProps) {
    const [iconColor, setIconColor] = useState('white');
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
        setIconColor(getContrastYIQ(props.color));
    };

    const clickColorInput = () => {
        hiddenRef.current?.click();
    }

    useEffect(() => {
        setIconColor(getContrastYIQ(props.color));
    }, [props.color])

    return (
        <ButtonBase
            onClick={clickColorInput}
            sx={{
                backgroundColor: props.color,
                color: iconColor,
                px: 1,
                borderRadius: '4px'
            }}
        >
            {props.children}
            <VisuallyHiddenInput
                type='color'
                ref={hiddenRef}
                onChange={handleColorChange}
            />
        </ButtonBase>
    );
}