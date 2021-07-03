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
                onChange={onThemeChange}>
                <ToggleButton value={THEME.LIGHT}>Light</ToggleButton>
                <ToggleButton value={THEME.DARK}>Dark</ToggleButton>
            </ToggleButtonGroup>
        </div>
    )
}
