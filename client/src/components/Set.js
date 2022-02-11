import React, { useContext, useState } from 'react';
import { SettingContext } from '../context/SettingContext';

const Set = () => {
    const {updateExecute} = useContext(SettingContext)
    const [newTimer, setNewTimer] = useState({
        work: 20.00,
        break: 10.00,
        active: 'work'
    })

    const handleChange = input => {
        const {name, value} = input.target
        switch (name) {
            case 'work':
                setNewTimer({
                    ...newTimer,
                    work: parseInt(value)
                })

                break;

            case 'break':
                setNewTimer({
                    ...newTimer,
                    break: parseInt(value)
                })

                break;
            
            default:
                break;
        }
        console.log(newTimer)
    }
    const handleSubmit = e => {
        e.preventDefault()
        updateExecute(newTimer)
    }
    return (
        <div className="form-container">
            <form noValidate onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <input className="input" name="work" onChange={handleChange} value={newTimer.work}/>
                    <input className="input" name="break" onChange={handleChange} value={newTimer.break}/>
                </div>
                <button type='submit'>Set Timer</button>
            </form>
        </div>
    )
};

export default Set
