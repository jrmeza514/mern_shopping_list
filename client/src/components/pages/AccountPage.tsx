import { FormEvent, useState } from 'react';
import { connect } from 'react-redux';
import { IAuthReduxProps, ITarget, IUserPrefs, IUserState, UserPrefTheme } from '../../types/interfaces';
import { IconButton, Button, Card, TextField } from '@material-ui/core';
import { Edit as EditIcon, Refresh as ClearIcon } from '@material-ui/icons';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { setDarkMode } from '../../actions/themeActions';
import { saveUserPrefs, updateUserName } from '../../actions/authActions';


interface AccountPageProps {
    user: IUserState
    setDarkMode(val: boolean): void
    saveUserPrefs(userPrefs: IUserPrefs): void
    updateUserName(name: string): void
}
const AccountPage = ({ user, setDarkMode, saveUserPrefs, updateUserName }: AccountPageProps) => {
    const THEME = { LIGHT: "THEME_LIGHT", DARK: "THEME_DARK" };
    const [editDisabled, setEditDisabled] = useState(true);
    const [userName, setUserName] = useState(user.name);
    const [userEmail, setUserEmail] = useState(user.email);
    const [themeAlignment, setThemeAlignment] = useState<UserPrefTheme>(user.userPrefs.theme);

    const onNameChange = (e: ITarget) => setUserName(e.target.value);
    const onEmailChange = (e: ITarget) => setUserEmail(e.target.value);
    const toggleEditable = () => {
        if (!editDisabled) resetForm();
        setEditDisabled(!editDisabled);
    }
    const resetForm = () => {
        setUserName(user.name);
        setUserEmail(user.email);
    }

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
        saveUserPrefs({ ...user.userPrefs, theme: newAlignemnt });
    }

    const onFormSubmit = (event: FormEvent) => {
        event.preventDefault();
        updateUserName(userName);
        setUserName(userName);
        setEditDisabled(true);
    }

    return (
        <div>
            <Card style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
                <h3>Theme</h3>
                <ToggleButtonGroup
                    value={themeAlignment}
                    exclusive
                    onChange={onThemeChange}
                    style={{ backgroundColor: 'white' }}>
                    <ToggleButton value={THEME.LIGHT} style={{ color: 'black', fontWeight: 700 }}>Light</ToggleButton>
                    <ToggleButton value={THEME.DARK} style={{ color: 'black', fontWeight: 700 }}>Dark</ToggleButton>
                </ToggleButtonGroup>
            </Card>
            <br />
            <Card style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
                <IconButton onClick={toggleEditable} color='secondary'>
                    <EditIcon fontSize="small" />
                </IconButton>
                <IconButton onClick={resetForm}>
                    <ClearIcon fontSize="small" />
                </IconButton>
                <form onSubmit={onFormSubmit}>
                    <TextField id="name" name="name" label="Name" fullWidth margin="normal"
                        value={userName} disabled={editDisabled} variant="outlined" onChange={onNameChange} />
                    <TextField id="email" name="email" type="email" label="Email" fullWidth margin="normal"
                        value={userEmail} disabled variant="outlined" onChange={onEmailChange} />
                    <Button disabled={editDisabled} type="submit">
                        Update
                    </Button>
                </form>
            </Card>
        </div>
    )
}

const mapStateToProps = (state: IAuthReduxProps) => ({
    user: state.auth.user
})

export default connect(mapStateToProps, { setDarkMode, saveUserPrefs, updateUserName })(AccountPage);