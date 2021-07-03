import React, { useState } from 'react';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import { setDarkMode } from '../../actions/themeActions'
import { connect } from 'react-redux';
import { IAuthReduxProps } from '../../types/interfaces';

interface SettingsPageProps {
    theme: string,
    setDarkMode(val: boolean): void
}

const SettingsPage = ({ theme, setDarkMode }: SettingsPageProps) => {

    const THEME = {
        LIGHT: "THEME_LIGHT",
        DARK: "THEME_DARK"
    };

    const [themeAlignment, setThemeAlignment] = useState<String | null>(theme);
    const onThemeChange = (event: React.MouseEvent<HTMLElement>, newAlignemnt: string | null) => {
        if (newAlignemnt) setThemeAlignment(newAlignemnt);
        switch (newAlignemnt) {
            case THEME.DARK:
                setDarkMode(true);
                break;
            case THEME.LIGHT:
                setDarkMode(false);
                break;
            default:
                break;
        }

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


const mapStateToProps = (state: IAuthReduxProps) => ({
    theme: state.auth.user.userPrefs.theme
});

export default connect(mapStateToProps, { setDarkMode })(SettingsPage);