import React, { useState } from 'react';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import { setDarkMode } from '../../actions/themeActions'
import { connect } from 'react-redux';
import { IAuthReduxProps, UserPrefTheme } from '../../types/interfaces';

interface SettingsPageProps {
    userPrefs: {
        theme: UserPrefTheme
    },
    setDarkMode(val: boolean): void
}

const SettingsPage = ({ userPrefs, setDarkMode }: SettingsPageProps) => {

    const THEME = {
        LIGHT: "THEME_LIGHT",
        DARK: "THEME_DARK"
    };

    const [themeAlignment, setThemeAlignment] = useState<UserPrefTheme>(userPrefs.theme);
    const onThemeChange = (event: React.MouseEvent<HTMLElement>, newAlignemnt: UserPrefTheme) => {
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
    userPrefs: state.auth.user.userPrefs
});

export default connect(mapStateToProps, { setDarkMode })(SettingsPage);