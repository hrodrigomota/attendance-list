import * as Dialog from "@radix-ui/react-dialog";
import { PencilSimpleLine, X } from "@phosphor-icons/react";

import styles from "./Modal.module.css";

interface ModalProps {
  editInfoPerson: React.MouseEventHandler<HTMLButtonElement>;
  editedName: string;
  editedEmail: string;
  editedProfession: string;
  setEditedName: React.ChangeEventHandler<HTMLInputElement>;
  setEditedEmail: React.ChangeEventHandler<HTMLInputElement>;
  setEditedProfession: React.ChangeEventHandler<HTMLInputElement>;
}

export default function Modal({
  editInfoPerson,
  editedName,
  editedEmail,
  editedProfession,
  setEditedName,
  setEditedEmail,
  setEditedProfession,
}: ModalProps) {
  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <PencilSimpleLine size={16} className={styles.pencilButton} />
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className={styles.modalOverlay} />
          <Dialog.Content className={styles.modalContent}>
            <div>
              <Dialog.Title className={styles.modalTitle}>Editar Dados</Dialog.Title>
              <Dialog.Description className={styles.modalDescription}>Faça alterações nos dados do participante aqui. Clique em Salvar ao finalizar ou em Cancelar para descartar as alterações.</Dialog.Description>
              <Dialog.Close className={styles.closeButton}>
                <X size={16} />
              </Dialog.Close>
            </div>
            <div className={styles.modalForm}>
              <label htmlFor="name">Nome Completo</label>
              <input type="text" id="name" defaultValue={editedName} onChange={setEditedName} required />
              <label htmlFor="email">E-mail</label>
              <input type="email" id="email" defaultValue={editedEmail} onChange={setEditedEmail} required />
              <label htmlFor="profession">Profissão</label>
              <input type="text" id="profession" defaultValue={editedProfession} onChange={setEditedProfession} required />
              <div className={styles.modalButtons}>
                <Dialog.Close className={styles.modalCancelButton}>Cancelar</Dialog.Close>
                <Dialog.Close className={styles.modalSaveButton} onClick={editInfoPerson}>Salvar</Dialog.Close>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
