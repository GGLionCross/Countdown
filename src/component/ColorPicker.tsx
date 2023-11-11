import { useState } from 'react';
import TextField from '@mui/material/TextField';

function ColorPicker() {
    const [color, setColor] = useState('#ffffff'); // Default color set to white

    const handleColorChange = (event) => {
        setColor(event.target.value);
    };

    return (
        <div>
            <input
                type="color"
                value={color}
                onChange={handleColorChange}
                style={{ marginRight: '10px' }}
            />
            <TextField
                type="text"
                value={color}
                onChange={handleColorChange}
                variant="outlined"
            />
        </div>
    );
}

export default ColorPicker;