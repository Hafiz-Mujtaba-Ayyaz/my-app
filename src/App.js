import React from 'react';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';

const App = () => {
  return (
    <div style={{ paddingTop: '1rem' }}>
      <div>
        <UserForm />
      </div>
      <div>
        <UserTable />
      </div>
    </div>
  );
};

export default App;
