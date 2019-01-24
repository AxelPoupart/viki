import React from 'react'
import { logout as loggingOut } from '../../services/authService';

let logout = () => {
  loggingOut()
  localStorage.clear();
  return (
    <div>
      <h1>Vous avez été déconnecté!</h1>
      <p>Retour à la <a href="/login">page d'accueil</a></p>
    </div>
  )
}

export default logout
