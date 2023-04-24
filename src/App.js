import React from 'react';
import { getAuth, signInAnonymously } from "firebase/auth";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from './firebase';
import { ToastContainer, toast } from 'react-toastify';
import Weather from './Weather';
import { getRandomCity } from './utils';



function App() {
  const login = () => {
    signInAnonymously(getAuth()).then(usuario => console.log(usuario));
  }

  const activarMensajes = async () => {
    const token = await getToken(messaging, {
      vapidKey: "AIzaSyA7dH7vd0vafvKvS3_2Iydt7mBZtw312aQ"
    }).catch(error => console.log("error al generar el token paps"));

    if (token) console.log("Este es tu token: " + token);
    if (!token) console.log("No tienes token paps")
  }


  React.useEffect(() => {
    onMessage(messaging, message => {
      console.log("Tu mensaje: ", message);
      toast(message.notification.title);
    })

  }, []);

  return (
    <div style={{backgroundColor: '#252422'}}>
      <ToastContainer />
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={login} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '12px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>Log in</button>
        <button onClick={activarMensajes} style={{ backgroundColor: '#008CBA', color: 'white', padding: '12px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>Generar token</button>
      </div>
      <Weather city={getRandomCity()} />
    </div>
  );
}

export default App;
