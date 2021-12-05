import {Modal, Input} from 'antd'

export default function SignUpModal(props) {
    const {visible, onSignUp, onCancel, nameRef, passwordRef} = props
    return (
        <Modal
            title="Enter user name and password:"
            visible={visible}
            onOk={onSignUp}
            onCancel={onCancel}
            okText="Sign Up"
        >
            <Input placeholder="Name" ref={nameRef}/>
            <Input.Password placeholder="Password" ref={passwordRef}/>
            
        </Modal>
    )
}
