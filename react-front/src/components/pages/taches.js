


import React, { Component } from 'react'

class Taches extends Component {
 constructor(){
   super();
   this.state={
     taches:[]
   }
 }
 componentDidMount(){
   fetch('http://localhost:5000/content/taches')
   .then(res =>res.json())
   .then(taches => this.setState({taches}))
   
 }

 render() {
   return (
     <div>
       Taches
       {this.state.taches.map(tache =>(
         <ul key={tache.id}>
       hi , {tache.name}
       </ul>
       ))}

     </div>
   )
 }
}
export default Taches;