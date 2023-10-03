import styles from "./AttendanceForm.module.css"

interface AttendanceFormProps {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  personName: string;
  setPersonName: React.ChangeEventHandler<HTMLInputElement>;
  personEmail: string;
  setPersonEmail: React.ChangeEventHandler<HTMLInputElement>;
  personProfession: string;
  setPersonProfession: React.ChangeEventHandler<HTMLInputElement>;
}

export default function AttendanceForm({
  handleSubmit,
  personName,
  setPersonName,
  personEmail,
  setPersonEmail,
  personProfession,
  setPersonProfession,
}: AttendanceFormProps) {
  return (
    <form onSubmit={handleSubmit} className={styles.wrapper}>
      <label htmlFor="name">Nome Completo</label>
      <input type="text" id="name" value={personName} onChange={setPersonName} placeholder="Ex.: John Doe" required />

      <label htmlFor="email">E-mail</label>
      <input
        type="email"
        id="email"
        value={personEmail}
        onChange={setPersonEmail}
        placeholder="Ex.: seuemail@email.com"
        required
      />

      <label htmlFor="profession">Profissão</label>
      <input
        type="text"
        id="profession"
        value={personProfession}
        onChange={setPersonProfession}
        placeholder="Ex.: Software Engineer"
      />

      <button type="submit">Confirmar Presença!</button>
    </form>
  );
}
