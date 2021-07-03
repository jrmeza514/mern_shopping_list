import React, { useState } from 'react';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';


export default function SettingsPage() {

    const THEME = {
        LIGHT: "THEME_LIGHT",
        DARK: "THEME_DARK"
    };

    const [themeAlignment, setThemeAlignment] = useState<String | null>(THEME.LIGHT);
    const onThemeChange = (event: React.MouseEvent<HTMLElement>, newAlignemnt: string | null) => {
        if (newAlignemnt) setThemeAlignment(newAlignemnt);
    }

    return (
        <div className="settingsPage">
            <ToggleButtonGroup
                value={themeAlignment}
                exclusive
                onChange={onThemeChange}
                style={{ backgroundColor: 'white' }}>
                <ToggleButton value={THEME.LIGHT} style={{ color: 'black', fontWeight: 700 }}>Light</ToggleButton>
                <ToggleButton value={THEME.DARK} style={{ color: 'black', fontWeight: 700 }}>Dark</ToggleButton>
            </ToggleButtonGroup>
        </div>
    )
}
