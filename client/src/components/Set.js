import React, { useContext, useState } from 'react';
import { SettingContext } from '../context/SettingContext';
import Button from './Button'

const Set = () => {
    const {updateExecute} = useContext(SettingContext)
    const [newTimer, setNewTimer] = useState({
        work: 20,
        break: 10,
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
            <form noValidate>
                <div className="input-wrapper">
                    <input className="input" name="work" onChange={handleChange} value={newTimer.work}/>
                    <input className="input" name="break" onChange={handleChange} value={newTimer.break}/>
                </div>
                <Button title="Set Timer" _callback={handleSubmit} />
            </form>
        </div>
    )
};

export default Set
