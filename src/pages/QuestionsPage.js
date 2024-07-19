import React, { useState } from 'react';
import { useChild } from './context/ChildContext';
import ChildList from './accountPages/ChildList';
import QAList from './QAList';
import AddChildForm from './accountPages/AddChildForm';
import EditChildForm from './accountPages/EditChildForm';
import '../styles/questionPage.css';

const QuestionsPage = () => {
  const { childrenData, addChild, updateChild, deleteChild } = useChild();
  const [children, setChildren] = useState(childrenData);
  const [selectedChild, setSelectedChild] = useState(null);
  const [addingChild, setAddingChild] = useState(false);
  const [editingChild, setEditingChild] = useState(null);

  const updateAnswer = (childName, question, answer) => {
    setChildren(children.map(child => 
      child.name === childName 
        ? { ...child, questions: child.questions.map(q => q.question === question ? { ...q, answer } : q) }
        : child
    ));
  };

  return (
    <div className="questions-page">
      <h1 className="page-title">Answer Questions for Each Child</h1>
      <div className="actions">
        <button className="btn-add-child" onClick={() => setAddingChild(true)}>Add Child</button>
        {selectedChild && (
          <button className="btn-edit-child" onClick={() => setEditingChild(selectedChild)}>Edit Child</button>
        )}
      </div>
      <div className="content">
        <div className="child-list section">
          <ChildList children={childrenData} setSelectedChild={setSelectedChild} />
        </div>
        <div className="qa-section section">
          {selectedChild && (
            <QAList 
              questions={selectedChild.questions} 
              updateAnswer={updateAnswer} 
              childName={selectedChild.name}
            />
          )}
        </div>
      </div>

      {addingChild && (
        <div className="modal-overlay" onClick={() => setAddingChild(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <AddChildForm addChild={addChild} setAddingChild={setAddingChild} />
          </div>
        </div>
      )}

      {editingChild && (
        <div className="modal-overlay" onClick={() => setEditingChild(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <EditChildForm 
              child={editingChild} 
              updateChild={updateChild} 
              setEditingChild={setEditingChild} 
              deleteChild={deleteChild}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionsPage;
