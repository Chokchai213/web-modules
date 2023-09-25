import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { signInWithGoogle, singInWithFacebook } from '../services/firebase';
import EmailFormTextExample from './email_form_text';
import PasswordFormTextExample from './pw_form_text';
import GoogleButton from 'react-google-button';
import FacebookLogin from 'react-facebook-login';
import './SignUpModal.css';
function SignUpModal({ show, setShow }) {
    const handleClose = () => setShow(false);
    const handleSignIn = () => {
        console.log('YOU CLICKED')
    }
    return (
        <Modal show={show} >
            <Modal.Header closeButton onHide={handleClose}>
                <Modal.Title>จ่อย</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <EmailFormTextExample></EmailFormTextExample>
                <PasswordFormTextExample></PasswordFormTextExample>
            </Modal.Body>
            <br></br>
            <div class='btn-wrapper'>
                <GoogleButton onClick={signInWithGoogle} />
            </div>
            <br></br>
            <div class='btn-wrapper'>
                <FacebookLogin
                    onClick={singInWithFacebook}
                    appId='1292285361653293'
                    autoLoad={true}
                    fields="name,email,picture"
                    icon="fa-facebook"
                >
                </FacebookLogin>
            </div>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default SignUpModal;