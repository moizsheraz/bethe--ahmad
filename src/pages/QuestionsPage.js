import React, { useState, useEffect } from 'react';
import { useChild } from './context/ChildContext';
import ChildList from './accountPages/ChildList';
import QAList from './QAList';
import AddChildForm from './accountPages/AddChildForm';
import EditChildForm from './accountPages/EditChildForm';
import '../styles/questionPage.css';

// Utility function to calculate age from DOB

const QuestionsPage = () => {
  const { childrenData, addChild, updateChild, deleteChild } = useChild();
  const [selectedChild, setSelectedChild] = useState(null);
  const [addingChild, setAddingChild] = useState(false);
  const [editingChild, setEditingChild] = useState(null);

  useEffect(() => {
    // Fetch children data from Firestore when component mounts
    // Here, you'd use a hook or function to fetch data based on the current user
  }, []);

  const updateAnswer = (question, answer) => {
    const updatedQuestions = selectedChild.questions.map(q => 
      q.question === question ? { ...q, answer } : q
    );

    updateChild(selectedChild.id, { ...selectedChild, questions: updatedQuestions });
    setSelectedChild({ ...selectedChild, questions: updatedQuestions });
  };

  const handleAddChild = (newChild) => {
    // Ensure DOB is not in the future
    if (new Date(newChild.dob) > new Date()) {
      alert('Date of Birth cannot be in the future.');
      return;
    }
    
    addChild(newChild);
    setAddingChild(false);
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
            <AddChildForm 
              addChild={handleAddChild} 
              setAddingChild={setAddingChild} 
            />
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
