import { Model } from '../../components/three'
import { useUserStore } from '../../stores/userStore'
import styles from '../../styles/home/home.module.css'

export default function HomePage() {
  const { user } = useUserStore()
  
  return (
    <div className={`${styles.homePage} ${user ? styles.homePageLoggedIn : styles.homePageLoggedOut}`}>
      <Model />
    </div>
  )
}
