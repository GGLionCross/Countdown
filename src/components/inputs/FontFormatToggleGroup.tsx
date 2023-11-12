// React
import {
    Dispatch,
    MouseEvent,
    SetStateAction
} from 'react';

// Components
import FormatBoldIcon from '@mui/icons-material/FormatBold';
// * Not all our fonts have Italic or Underline styling, so we are taking them out for now.
// import FormatItalicIcon from '@mui/icons-material/FormatItalic';
// import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import {
    ToggleButton,
    ToggleButtonGroup
} from '@mui/material';

interface FontFormatToggleGroupProps {
    formats: string[];
    setFormats: Dispatch<SetStateAction<string[]>>;
}

export default function FontFormatToggleGroup(props: FontFormatToggleGroupProps) {
    const handleFormat = (
        _: MouseEvent<HTMLElement>,
        newFormats: string[],
    ) => {
        props.setFormats(newFormats);
    };
    return (
        <ToggleButtonGroup
            value={props.formats}
            onChange={handleFormat}
        >
            <ToggleButton value='bold' size='small' aria-label='bold'>
                <FormatBoldIcon />
            </ToggleButton>
            {/* <ToggleButton value='italic' size='small' aria-label='italic'>
                <FormatItalicIcon />
            </ToggleButton>
            <ToggleButton value='underlined' size='small' aria-label='underlined'>
                <FormatUnderlinedIcon />
            </ToggleButton> */}
        </ToggleButtonGroup>
    );
}