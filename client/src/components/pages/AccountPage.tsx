import { useState } from 'react';
import { connect } from 'react-redux';
import { IAuthReduxProps, ITarget, IUserState } from '../../types/interfaces';
import { IconButton, Button, Card, TextField } from '@material-ui/core';
import { Edit as EditIcon, Refresh as ClearIcon } from '@material-ui/icons';

interface AccountPageProps {
    user: IUserState
}
const AccountPage = ({ user }: AccountPageProps) => {

    const [editDisabled, setEditDisabled] = useState(true);
    const [userName, setUserName] = useState(user.name);
    const [userEmail, setUserEmail] = useState(user.email);

    const onNameChange = (e: ITarget) => setUserName(e.target.value);
    const onEmailChange = (e: ITarget) => setUserEmail(e.target.value);
    const toggleEditable = () => setEditDisabled(!editDisabled);
    const resetForm = () => {
        setUserName(user.name);
        setUserEmail(user.email);
    }

    return (
        <div>
            <Card style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
                <IconButton onClick={toggleEditable} color='secondary'>
                    <EditIcon fontSize="small" />
                </IconButton>
                <IconButton onClick={resetForm}>
                    <ClearIcon fontSize="small" />
                </IconButton>
                <form>
                    <TextField id="name" name="name" label="Name" fullWidth margin="normal"
                        value={userName} disabled={editDisabled} variant="outlined" onChange={onNameChange} />
                    <TextField id="email" name="email" type="email" label="Email" fullWidth margin="normal"
                        value={userEmail} disabled={editDisabled} variant="outlined" onChange={onEmailChange} />
                    <Button disabled={editDisabled}>
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

export default connect(mapStateToProps, {})(AccountPage);