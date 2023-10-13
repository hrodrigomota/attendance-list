import Card from "./components/Card";
import AttendanceForm from "./components/AttendanceForm";
import useAttendanceList from "./hooks/useAttendanceList";

export default function App() {
  const {
    personName,
    setPersonName,
    personEmail,
    setPersonEmail,
    personProfession,
    setPersonProfession,
    setEditedPersonName,
    setEditedPersonEmail,
    setEditedPersonProfession,
    handleSubmit,
    attendanceList,
    editInfoPerson,
    removePerson,
  } = useAttendanceList();

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
