import {fetchAllRoutines} from "../../api"
import {useState, useEffect} from 'react'


const Routines = () =>{
    const [grabbedRoutines, setGrabbedRoutines] = useState()
    
    const getAllRoutines = async () => {
        try{
            const routines = await fetchAllRoutines(); 
            setGrabbedRoutines(routines)
        }catch (error) {console.error(error)
        }
    }

    useEffect( getAllRoutines, []);
    return(
        <div>
        <h1 align="center">Welcome to Routines</h1>
        <div className ="results">
         {grabbedRoutines?.map((routine, index) => { 
            return (
               <div className = "listing" key={index}>
                    <h2 align="center">Routine: {routine.name} ||  Created by: {routine.creatorName}</h2>
                    <hr></hr>
                    <h4>Goal: {routine.goal}</h4>
                    
                    {routine.activities[0] ?
                        routine.activities.map((activity1, index) => {
                            return(
                                <h6 key={index}><ul >
                                    <li>Activity: {activity1.name}</li>
                                    <li>Description: {activity1.description}</li>
                                    <li>Duration: {activity1.duration}</li>
                                    <li>Count: {activity1.count}</li>
                                </ul></h6>) 
                        
                        }) 
                        :<b>No activities have been added to this routine</b>}                  
               </div> 
            )        
        })}
        </div>
        </div>
   )
}   

export default Routines