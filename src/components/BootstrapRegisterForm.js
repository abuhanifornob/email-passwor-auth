import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import app from '../firebase/firebase.int';

const auth=getAuth(app);

const BootstrapRegisterForm = () => {
   const [passwordError,setpasswordError]=useState('');
   const [success,setSuccess]=useState(false);

    const handleSubmitForm=(event)=>{
        setSuccess(false);
        event.preventDefault();
        const form=event.target; 
        const name=form.name.value;
        const email=form.email.value;
        const password=form.password.value;
        console.log(name,email,password);
        if(password.length <6){
          setpasswordError("The password is at least 8 characters long ");
          return
        }
        if(!/(?=.*[A-Z])/.test(password)){
            setpasswordError('The password has at least one uppercase letter');
            return;
        }
        if(!/(?=.*[a-z])/.test(password)){
            setpasswordError('The password has at least one lowercase letter');
            return;
        }
        if(!/(?=.*[0-9])/.test(password)){
            setpasswordError('The password has at least one digit');
            return;
        }
        if(!/([^A-Za-z0-9])/.test(password)){
            setpasswordError('The password has at least one special character ');
            return;
        }
        setpasswordError("");
         
        createUserWithEmailAndPassword(auth,email,password)
        .then(result=>{
            const user=result.user;
            console.log(user);
            setSuccess(true);
            form.reset();
            handleEmaolVarify();
            handleUpdateProfileName(name);
        }) 
        .catch(error=>{
            console.error("Error ",error);
            const errorMessage = error.message;
            setpasswordError(errorMessage);
        })
    }
    const handleEmaolVarify=()=>{
        sendEmailVerification(auth.currentUser)
        .then(result=>{
            alert("Please Chek your Email and Varify")
        })
    }
    const handleUpdateProfileName=(name)=>{
        updateProfile(auth.currentUser,{
            displayName:name
        })
        .then(result=>{

        })
        .catch(error=>{
            console.error('Error',error)
        })
    }
    return (
        <div className='w-50 mx-auto'>
            <h3 className='text-primary fw-bolder'>Please Register !!!</h3>
            <form onSubmit={handleSubmitForm}>
                <div className="mb-3">
                    <label htmlFor="exampleInputName" className="form-label">Your Name</label>
                    <input type="text" className="form-control" name='name' id="exampleInputName" aria-describedby="emailHelp" required/>
                       
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' id="exampleInputEmail1" aria-describedby="emailHelp" required/>
                       
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' id="exampleInputPassword1" required/>
                   
                </div>
                { passwordError ?
                <p className='text-danger'>{passwordError}</p>: 
                <div><p>We'll never share your email with anyone else.</p></div>
                }
                {
                    success && <p>User Registation is Success !!!</p>
                }
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <p>Already have a account?<Link to="/login">Log in</Link></p>
        </div>
    );
};

export default BootstrapRegisterForm;