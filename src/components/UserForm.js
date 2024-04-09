import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addUser } from '../store/UserSlice';
import '../styles/UserForm.css';

const UserForm = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      age: '',
      cnic: ''
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      // lastName: Yup.string().required('Required'),
      age: Yup.number().required('Required').positive('Must be positive').integer('Must be an integer'),
      cnic: Yup.string().required('Required').matches(/^\d{5}-\d{7}-\d$/, 'Invalid CNIC format (xxxxx-xxxxxxx-x)')
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(addUser(values));
      resetForm();
    }
  });

  return (
    <div className="user-form-container"> {/* Added a CSS class */}
      <h2 className="form-title" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>ADD USER FORM</h2> {/* Added a CSS class */}
      <form className="user-form" onSubmit={formik.handleSubmit}> {/* Added a CSS class */}
        <input
          className="form-input"
          type="text"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Name"
          autoComplete='off'
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div className="error-message">{formik.errors.firstName}</div>
        ) : null}

        {/* <input
          className="form-input"
          type="text"
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Last Name"
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div className="error-message">{formik.errors.lastName}</div>
        ) : null} */}

        <input
          className="form-input"
          type="number"
          name="age"
          value={formik.values.age}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Age"
        />
        {formik.touched.age && formik.errors.age ? (
          <div className="error-message">{formik.errors.age}</div>
        ) : null}

        <input
          className="form-input"
          type="text"
          name="cnic"
          value={formik.values.cnic}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="CNIC (xxxxx-xxxxxxx-x)"
          autoComplete='off'
        />
        {formik.touched.cnic && formik.errors.cnic ? (
          <div className="error-message">{formik.errors.cnic}</div>
        ) : null}

        <button className="submit-button" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
