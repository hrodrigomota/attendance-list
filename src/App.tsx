import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Card from "./components/Card";
import AttendanceForm from "./components/AttendanceForm";

export interface AttendanceList {
  id: string;
  name: string;
  email: string;
  profession: string;
}

export default function App() {
  const [personName, setPersonName] = useState<string>("");
  const [personEmail, setPersonEmail] = useState<string>("");
  const [personProfession, setPersonProfession] = useState<string>("");
  const [editedPersonName, setEditedPersonName] = useState<string>("");
  const [editedPersonEmail, setEditedPersonEmail] = useState<string>("");
  const [editedPersonProfession, setEditedPersonProfession] = useState<string>("");
  const [attendanceList, setAttendanceList] = useState<AttendanceList[]>(() => {
    const attendanceList = localStorage.getItem("attendance-list");
    if (!attendanceList) {
      return [];
    } else {
      return JSON.parse(attendanceList);
    }
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newPersonInfo = {
      id: uuidv4(),
      name: personName,
      email: personEmail,
      profession: personProfession ? personProfession : "Não informado",
    };
    setAttendanceList((currentValue) => {
      const newStateInfo = [...currentValue, newPersonInfo];
      localStorage.setItem("attendance-list", JSON.stringify(newStateInfo));
      return newStateInfo;
    });

    setPersonName("");
    setPersonEmail("");
    setPersonProfession("");
  }

  function editInfoPerson(id: string) {
    setAttendanceList((currentValue): AttendanceList[] => {
      const newStateInfo = currentValue.map((person) => {
        if (person.id !== id) {
          return person;
        } else {
          return {
            ...person,
            name: editedPersonName ? editedPersonName : person.name,
            email: editedPersonEmail ? editedPersonEmail : person.email,
            profession: editedPersonProfession ? editedPersonProfession : person.profession,
          };
        }
      });
      localStorage.setItem("attendance-list", JSON.stringify(newStateInfo));
      return newStateInfo;
    });

    setEditedPersonName("");
    setEditedPersonEmail("");
    setEditedPersonProfession("");
  }

  function removePerson(id: string) {
    const removeConfirmation = confirm("Deseja realmente excluir os dados do participante?");
    if (removeConfirmation) {
      setAttendanceList((currentValue) => {
        const newStateInfo = currentValue.filter((person) => id !== person.id);
        localStorage.setItem("attendance-list", JSON.stringify(newStateInfo));
        return newStateInfo;
      });
    }
  }

  return (
    <div className="wrapper">
      <h1>ATTENDANCE LIST</h1>
      <AttendanceForm
        handleSubmit={handleSubmit}
        personName={personName}
        setPersonName={(event) => setPersonName(event.target.value)}
        personEmail={personEmail}
        setPersonEmail={(event) => setPersonEmail(event.target.value)}
        personProfession={personProfession}
        setPersonProfession={(event) => setPersonProfession(event.target.value)}
      />
      {attendanceList.length > 0 ? (
        attendanceList.map((person) => (
          <Card
            key={person.id}
            id={person.id}
            name={person.name}
            email={person.email}
            profession={person.profession}
            editInfoPerson={() => editInfoPerson(person.id)}
            editedName={person.name}
            setEditedName={(event) => setEditedPersonName(event.target.value)}
            editedEmail={person.email}
            setEditedEmail={(event) => setEditedPersonEmail(event.target.value)}
            editedProfession={person.profession}
            setEditedProfession={(event) => setEditedPersonProfession(event.target.value)}
            removePerson={() => removePerson(person.id)}
          />
        ))
      ) : (
        <p className="attendanceListStatus">Ainda não há registros de participantes.</p>
      )}
      {attendanceList.length > 0 && (
        <p className="attendanceListStatus">Total de {attendanceList.length} Participante(s) Confirmado(s)!</p>
      )}
    </div>
  );
}
