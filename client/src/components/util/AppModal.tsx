import { Card, Modal } from "@material-ui/core";
import { CardContent } from "@material-ui/core";

interface ModalProps {
    open: boolean,
    toggle: () => void,
    children: any
}

const AppModal =  ( props:ModalProps ) =>  {
        return (
            <>
                <Modal
                    open={props.open}
                    onClose={() => {props.toggle()}}>
                    
                    <Card 
                        style={{
                            width: '95vw',
                            maxWidth: '400px',
                            margin: 'auto',
                            marginTop: '10vh',
                            display: 'flex'
                        }}>
                        <CardContent className="content">
                            {props.children}
                        </CardContent>
                    </Card>
                </Modal>
            </>
        )
}

export default AppModal;