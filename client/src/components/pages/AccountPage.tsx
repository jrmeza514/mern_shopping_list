import React from 'react';
import { connect } from 'react-redux';
import { IAuthReduxProps } from '../../types/interfaces';

interface AccountPageProps {

}

function AccountPage({ }: AccountPageProps) {
    return (
        <div>

        </div>
    )
}

const mapStateToProps = (state: IAuthReduxProps) => {

}

export default connect(mapStateToProps, {})(AccountPage);