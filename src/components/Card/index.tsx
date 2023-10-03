import * as Accordion from "@radix-ui/react-accordion";
import { User, CaretDown, Trash } from "@phosphor-icons/react";

import styles from "./Card.module.css";
import Modal from "../Modal";

interface CardProps {
  id: string;
  name: string;
  email: string;
  profession: string;
  editInfoPerson: React.MouseEventHandler<HTMLButtonElement>;
  editedName: string;
  editedEmail: string;
  editedProfession: string;
  setEditedName: React.ChangeEventHandler<HTMLInputElement>;
  setEditedEmail: React.ChangeEventHandler<HTMLInputElement>;
  setEditedProfession: React.ChangeEventHandler<HTMLInputElement>;
  removePerson: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Card({
  id,
  name,
  email,
  profession,
  editInfoPerson,
  editedName,
  editedEmail,
  editedProfession,
  setEditedName,
  setEditedEmail,
  setEditedProfession,
  removePerson,
}: CardProps) {
  return (
    <>
      <Accordion.Root type="single" className={styles.wrapper} collapsible>
        <Accordion.Item value={`item-${id}`}>
          <Accordion.Header>
            <Accordion.Trigger className={styles.cardName}>
              <div>
                <User size={16} />
                <p>{name}</p>
              </div>
              <CaretDown size={16} className={styles.showInfo} />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className={styles.accordionContent}>
            <div className={styles.cardInfo}>
              <div>
                <p>Email: {email}</p>
                <p>Profissão: {profession}</p>
              </div>
              <div className={styles.cardInfoButtons}>
                <Modal
                  editInfoPerson={editInfoPerson}
                  editedName={editedName}
                  editedEmail={editedEmail}
                  editedProfession={editedProfession}
                  setEditedName={setEditedName}
                  setEditedEmail={setEditedEmail}
                  setEditedProfession={setEditedProfession}
                />
                <button onClick={removePerson}>
                  <Trash color="red" size={16} className={styles.trashButton} />
                </button>
              </div>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </>
  );
}
