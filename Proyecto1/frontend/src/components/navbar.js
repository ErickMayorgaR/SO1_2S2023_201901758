import React from 'react';

function Navbar(props){
  const [selectedTab, setSelectedTab] = useState('Monitoreo en Tiempo Real');

  return (
    <nav>
      <ul>
        <li>
          <a
            href="#"
            onClick={() => setSelectedTab('Monitoreo en Tiempo Real')}
          >
            Monitoreo en Tiempo Real
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={() => setSelectedTab('Monitoreo a lo largo del Tiempo')}
          >
            Monitoreo a lo largo del Tiempo
          </a>
        </li>
      </ul>
      {props.children}
    </nav>
  );
};

export default Navbar;