
import Button from 'react-bootstrap/Button';
import Modal, { ModalProps } from 'react-bootstrap/Modal';
import "./Modal.sass"


interface MyModalProps extends ModalProps {}

export default function MyVerticallyCenteredModal(props: MyModalProps) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
    <Modal.Title>
      Faith
    </Modal.Title>
      <Modal.Body>
            <p>
            Faith é uma aplicação web criada para ajudar no acompanhamento da leitura diária da Bíblia. O projeto nasceu de uma necessidade pessoal, onde eu e minha namorada procurávamos um lugar para registrar e organizar nossas leituras diárias. Assim, surgiu a ideia de criar este site.
            </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
