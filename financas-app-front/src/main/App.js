import React from 'react';
import 'bootswatch/dist/flatly/bootstrap.css'
import '../custom.css'
import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min.js'


import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import ProvedorAuth from './provedorAuth'


import Navbar from '../components/navbar'
import Rotas from './rotas'



class App extends React.Component {
  render() {
    return (
      <ProvedorAuth>
        <Navbar/>
        <Rotas/>
    </ProvedorAuth>
    )
  } 
}

export default App;
