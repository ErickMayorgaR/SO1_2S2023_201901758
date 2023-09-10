import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
      <Navbar />
      <Router>
        <Switch>
          <Route path="/monitoreo-en-tiempo-real" component={MonitoreoEnTiempoReal} />
          <Route path="/monitoreo-a-lo-largo-del-tiempo" component={MonitoreoAloLargoDelTiempo} />
        </Switch>
      </Router>
    </div>
    </main>
  )
}
