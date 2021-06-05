  
import {/* useEffect,  */useState} from 'react'
import {createActivity, fetchAllActivites} from '../api'

const Activities = ({activities, loggedIn, setActivities}) =>{
    const[newActivity, setNewActivity, ] = useState()
    const handleSubmit = async (event) =>{
        try{
            event.preventDefault()
            const response = await createActivity(newActivity) 
            console.log(response)
            if(response.id){
            alert("success creating activity")
                setActivities(await fetchAllActivites())
            }else{
                return alert(response.message)
            }
            }catch(error){
                console.error(error)
            }
    }

    return ( <div>
        {loggedIn ? 
    <form onSubmit={handleSubmit}>
    <h2> Create An Activity</h2>
    <label>Activity Name:</label>
    <input
      name="Name"
      required
      onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
    />
    <label>Description:</label>
    <input
      type="Description"
      required
      onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
    />
    <button type="submit">submit</button>
  </form> : null }
    
       
            <h1>Activities</h1>
        {activities?.map((activity, index) => {
       return (
       <div key={index}>
        
        <h2>Activity : {activity.name}</h2>
        <h3>Description :</h3> <p>{activity.description}</p>  
       </div>)
    })}
    </div>
    )
    
} 

export default Activities