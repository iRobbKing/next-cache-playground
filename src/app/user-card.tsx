"use client";

import { FC, useState } from "react";
import { User, getUserDb, getUserDbCached, getUserSite, getUserSiteCached, getUsersDb, getUsersDbCached, getUsersSite, getUsersSiteCached, revalidateUserTags } from "./actions";

export type Props = {
        siteUsers: User[],
        siteUsersCached: User[],
        dbUsers: User[],
        dbUsersCached: User[],
};

const UserCard: FC<Props> = ({ siteUsers, siteUsersCached, dbUsers, dbUsersCached }) => {
        const [siteUsersClient, setSiteUsersClient] = useState<User[]>([]);
        const [siteUsersClientCached, setSiteUsersClientCached] = useState<User[]>([]);
        const [siteUser, setSiteUser] = useState<User | undefined>(undefined);
        const [siteUserCached, setSiteUserCached] = useState<User | undefined>(undefined);
        const [dbUsersClient, setDbUsersClient] = useState<User[]>([]);
        const [dbUsersClientCached, setDbUsersClientCached] = useState<User[]>([]);
        const [dbUser, setDbUser] = useState<User | undefined>(undefined);
        const [dbUserCached, setDbUserCached] = useState<User | undefined>(undefined);

        const [id, setId] = useState(1);

        const handleFetchFromClient = async () => {
                const result = await Promise.all([
                        getUsersSite(),
                        getUsersSiteCached(),
                        getUserSite(id),
                        getUserSiteCached(id),
                        getUsersDb(),
                        getUsersDbCached(),
                        getUserDb(id),
                        getUserDbCached(id),
                ]);

                setSiteUsersClient(result[0]);
                setSiteUsersClientCached(result[1]);
                setSiteUser(result[2]);
                setSiteUserCached(result[3]);
                setDbUsersClient(result[4]);
                setDbUsersClientCached(result[5]);
                setDbUser(result[6]);
                setDbUserCached(result[7]);
        };

        const handleRevalidateCurrentId = () => {
                revalidateUserTags(`user_site:${id}`);
                revalidateUserTags(`user_db:${id}`);
        };

        const handleRevalidateAllIds = () => {
                revalidateUserTags(`user_site`);
                revalidateUserTags(`user_db`);
        };

        return (
                <div>
                        <div>
                                <h2>Site Users From Parent</h2>
                                <li>
                                        {siteUsers.map((user) => <ul key={user.id}><UserC {...user} /></ul>)}
                                </li>
                        </div>
                        <div>
                                <h2>Site Users From Parent Cached</h2>
                                <li>
                                        {siteUsersCached.map((user) => <ul key={user.id}><UserC {...user} /></ul>)}
                                </li>
                        </div>
                        <div>
                                <h2>Site Users From Client</h2>
                                <li>
                                        {siteUsersClient.map((user) => <ul key={user.id}><UserC {...user} /></ul>)}
                                </li>
                        </div>
                        <div>
                                <h2>Site Users From Client Cached</h2>
                                <li>
                                        {siteUsersClientCached.map((user) => <ul key={user.id}><UserC {...user} /></ul>)}
                                </li>
                        </div>
                        <div>
                                <h2>Site User</h2>
                                {siteUser && <UserC {...siteUser} />}
                        </div>
                        <div>
                                <h2>Site User Cached</h2>
                                {siteUserCached && <UserC {...siteUserCached} />}
                        </div>
                        <div>
                                <h2>Db Users From Parent</h2>
                                <li>
                                        {dbUsers.map((user) => <ul key={user.id}><UserC {...user} /></ul>)}
                                </li>
                        </div>
                        <div>
                                <h2>Db Users From Parent Cached</h2>
                                <li>
                                        {dbUsersCached.map((user) => <ul key={user.id}><UserC {...user} /></ul>)}
                                </li>
                        </div>
                        <div>
                                <h2>Db Users From Client</h2>
                                <li>
                                        {dbUsersClient.map((user) => <ul key={user.id}><UserC {...user} /></ul>)}
                                </li>
                        </div>
                        <div>
                                <h2>Db Users From Client Cached</h2>
                                <li>
                                        {dbUsersClientCached.map((user) => <ul key={user.id}><UserC {...user} /></ul>)}
                                </li>
                        </div>
                        <div>
                                <h2>Db User</h2>
                                {dbUser && <UserC {...dbUser} />}
                        </div>
                        <div>
                                <h2>Db User Cached</h2>
                                {dbUserCached && <UserC {...dbUserCached} />}
                        </div>
                        <div>
                                <button onClick={() => revalidateUserTags("users_site_fetch")}>Revalidate Site Fetch</button>
                                <div>Id: {id}</div>
                                <button onClick={() => setId((id) => id + 1)}>Inc Id</button>
                                <button onClick={() => setId((id) => id - 1)}>Dec Id</button>
                                <button onClick={() => handleRevalidateCurrentId()}>Revalidate Current Id</button>
                                <button onClick={() => handleRevalidateAllIds()}>Revalidate All Ids</button>
                                <button onClick={() => handleFetchFromClient()}>Fetch From Client</button>
                        </div>
                </div>
        );
};

const UserC: FC<User> = ({ id, name }) => {
        return (
                <div>
                        <div>Id: {id}</div>
                        <div>Name: {name}</div>
                </div>
        );
};

export default UserCard;

