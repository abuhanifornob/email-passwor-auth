import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.int';
const auth=getAuth(app)

const BoortStrapLoginForm = () => {
    const [restEmail,setRestEmail]=useState('');
    const [success,setSuccess]=useState(false);
    const handleLoginForm=(event)=>{
        setSuccess(false);
        event.preventDefault();
        const form=event.target;
        const email=form.email.value;
        const password=form.password.value;
        signInWithEmailAndPassword(auth,email,password)
        .then(result=>{
            const user=result.user;
            console.log(user);
            setSuccess(true);
        })
        .catch(error=>{
            console.error('error',error)
        })

        
    }
    const handleOnBlurEmaol=(event)=>{
        if(!restEmail){
            alert("Please Enter Email Address")
            return
        }
        const email=event.target.value;
        setRestEmail(email);
    }
    const handleForgetPassword=()=>{
        sendPasswordResetEmail(auth,restEmail)
        .then(result=>{
            alert("Check Your Email and Set New Password");
        })

    }

    return (
        <div className='w-50 mx-auto'>
            <h3 className='text-primary fw-bolder'>Please Log In !!!</h3>
            <form onSubmit={handleLoginForm}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" onBlur={handleOnBlurEmaol} name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required/>
                
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name='password' className="form-control" id="exampleInputPassword1" required/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            {
                success && <p className='text-primary'>Login Successfuly !!!</p>
            }
            <p>Don’t have a account? <Link to="/register">Register now</Link> </p>
            <p>Forget Password ?<button type="button" onClick={handleForgetPassword} className="btn btn-link">Rest Password</button></p>
           
        </div>
    );
};

export default BoortStrapLoginForm;