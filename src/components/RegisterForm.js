import React from 'react';

const RegisterForm = () => {
    const handleFormSubmit=(event)=>{
        event.preventDefault();
        const email=event.target.email.value;
        const password=event.target.password.value;
        
        console.log(email,password);
      }
      const handleOnchangeTriger=(event)=>{
        const email=event.target.value;
        console.log(email);
      }
      const handleOnBlur=(event)=>{
        const password=event.target.value;
        console.log(password);
      }
    return (
        <div>
             <form onSubmit={handleFormSubmit}>
        <input onChange={handleOnchangeTriger} type="email" name="email" id="" />
        <br />
        <input onBlur={handleOnBlur} type="password" name="password" id="" />
        <br />
        <button type="submit">Register</button>

      </form>
            
        </div>
    );
};

export default RegisterForm;