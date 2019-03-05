import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import auth0Client from './Auth';
import {getInviteInfo} from '../store/actions/index';
import {MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText} from 'mdbreact';

import './Styles/Invite.css';

class Invite extends React.Component {

    componentWillMount(){
        let inviteCode = this.props.location.search;
        inviteCode = inviteCode.replace('?', '');
        this.props.getInviteInfo(inviteCode); 
    }

    handleSignIn = event => {
        event.preventDefault();

        localStorage.setItem('pendingInvite', this.props.inviteInfo.inviteCode);

        auth0Client.signIn();
    }

    render(){
        return (
            <div className = 'invite-container'>

                INVITE PAGE DUDE
            {this.props.inviteInfo ? (
                <div className = 'invite-present'>
                <MDBCol>
                <MDBCard>
                <MDBCardBody>

                    <MDBCardTitle>
                    <h1>You're invited!</h1>
                    </MDBCardTitle>
                    <MDBCardText>
                    <h2>{this.props.inviteInfo.userName} invited you to join the "{this.props.inviteInfo.groupName}" group!</h2>
                    <h3>Login or Sign Up below!</h3>
                    <MDBBtn onClick = {this.handleSignIn}>Login/Sign Up</MDBBtn>
                    </MDBCardText>
                        
                </MDBCardBody>

                </MDBCard>
                </MDBCol>
                
                
                </div>
            ) : (
                <div className = 'invite-absent'>
                <h1>Hmm... that doesn't seem to be a valid invitation.</h1>
                </div>
            )}
            
            </div>
        )
    }
}


const mapStateToProps = state => {
    state = state.rootReducer; // pull values from state root reducer
    return {
        //state items
        inviteInfo: state.inviteInfo
    }
}

export default withRouter(connect(mapStateToProps, {
    // actions
    getInviteInfo,
})(Invite));