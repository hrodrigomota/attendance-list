import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export interface AttendanceList {
  id: string;
  name: string;
  email: string;
  profession: string;
}

export default function useAttendanceList() {
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

  return {
    personName,
    setPersonName,
    personEmail,
    setPersonEmail,
    personProfession,
    setPersonProfession,
    setEditedPersonName,
    setEditedPersonEmail,
    setEditedPersonProfession,
    attendanceList,
    handleSubmit,
    editInfoPerson,
    removePerson,
  };
}
