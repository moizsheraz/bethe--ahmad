import React, { useState } from 'react';
import '../../styles/addChild.css'

const EditChildForm = ({ child, updateChild, setEditingChild, deleteChild }) => {
  const [name, setName] = useState(child.name);
  const [age, setAge] = useState(child.age);
  const [dob, setDob] = useState(child.dob);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== '' && age.trim() !== '' && dob.trim() !== '') {
      updateChild(child.name, { name, age, dob });
      setEditingChild(null);
    }
  };

  const handleDelete = () => {
    deleteChild(child.name);
    setEditingChild(null);
  };

  return (
    <div className="add-child-form">
      <h2>Edit Child</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Child Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>
        <div className="btns">
          <button type="submit" className="btn btn-primary">Save Changes</button>
          <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete Child</button>
          <button type="button" className="btn btn-secondary" onClick={() => setEditingChild(null)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditChildForm;
