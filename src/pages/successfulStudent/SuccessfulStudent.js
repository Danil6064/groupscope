<<<<<<< HEAD
import React, { useState } from 'react';
import './successStudent.css';
import ChoseSubjectMenu from '../../components/choseSubject/ChoseSubjectMenu';
import TaskCardSuccessful from '../../components/taskCard/taskCardSuccessful/TaskCardSuccessful';

function SuccessfulStunent() {
  const [selectedSubject, setSelectedSubject] = useState(null);

  return (
    <main className="main_successfulStudent">
      <div className="container_successfulStudent">
        <ChoseSubjectMenu setSelectedSubject={setSelectedSubject} />
        {selectedSubject && (
          <TaskCardSuccessful selectedSubject={selectedSubject} />
        )}
      </div>
    </main>
  );
}

export default SuccessfulStunent;
=======
import React, { useState } from 'react';
import './successStudent.css';
import ChoseSubjectMenu from '../../components/choseSubject/ChoseSubjectMenu';
import TaskCardSuccessful from '../../components/taskCard/taskCardSuccessful/TaskCardSuccessful';

function SuccessfulStunent() {
  const [selectedSubject, setSelectedSubject] = useState(null);

  return (
    <main className="main_successfulStudent">
      <div className="container_successfulStudent">
        <ChoseSubjectMenu setSelectedSubject={setSelectedSubject} />
        {selectedSubject && (
          <TaskCardSuccessful selectedSubject={selectedSubject} />
        )}
      </div>
    </main>
  );
}

export default SuccessfulStunent;
>>>>>>> 9c66d1cf54a1d5acc5699260c428742d2f684960
