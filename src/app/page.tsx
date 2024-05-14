import { getUsersDb, getUsersDbCached, getUsersSite, getUsersSiteCached } from "./actions";
import styles from "./page.module.css";
import UserCard from "./user-card";

const Home = async () => {
  const siteUsers = await getUsersSite();
  const siteUsersCached = await getUsersSiteCached();
  const dbUsers = await getUsersDb();
  const dbUsersCached = await getUsersDbCached();

  return (
    <main className={styles.main}>
      <UserCard
        siteUsers={siteUsers}
        siteUsersCached={siteUsersCached}
        dbUsers={dbUsers}
        dbUsersCached={dbUsersCached}
      />
    </main>
  );
};

export default Home;

