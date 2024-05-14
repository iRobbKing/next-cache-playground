"use server";

import { revalidateTag, unstable_cache } from "next/cache";

export type User = {
        id: number;
        name: string;
};

export const getUsersSite = async (): Promise<User[]> => {
        console.log("get users site");
        const response = await fetch(`http://localhost:3001/users`, {
                cache: "force-cache",
                next: { tags: ["users_site_fetch"] },
        });
        return await response.json();
};

export const getUsersSiteCached: () => Promise<User[]> = unstable_cache(async () => {
        console.log("get users site cached");
        return await getUsersSite();
}, ["users_site"], { tags: ["users_site"] });

export const getUserSite = async (id: number): Promise<User | undefined> => {
        console.log("get user site", id);
        const response = await fetch(`http://localhost:3001/user/${id}`, {
                cache: "force-cache",
                next: { tags: ["user_site", `user_site:${id}`] },
        });
        const users = await response.json();
        return users[0];
};

export const getUserSiteCached: (id: number) => Promise<User | undefined> = async (id: number) => {
        console.log("get user site cached outside cache", id);
        return await unstable_cache(async (id: number) => {
                console.log("get user site cached inside cache", id);
                return await getUserSite(id);
        }, ["user_site", `user_site:${id}`], { tags: ["user_site", `user_site:${id}`] })(id);
};

const usersDb = [
        {
                id: 1,
                name: "name1",
        },
        {
                id: 2,
                name: "name2",
        },
];

export const getUsersDb = async (): Promise<User[]> => {
        console.log("get users db");
        return usersDb;
};

export const getUsersDbCached: () => Promise<User[]> = unstable_cache(async () => {
        console.log("get users db cached");
        return await getUsersDb();
}, ["users_db"], { tags: ["users_db"] });

export const getUserDb = async (id: number): Promise<User | undefined> => {
        console.log("get user db", id);
        return usersDb.find(({ id: userId }) => id === userId);
};

export const getUserDbCached: (id: number) => Promise<User | undefined> = async (id: number) => {
        console.log("get user db cached outside cache", id);
        return await unstable_cache(async (id: number) => {
                console.log("get user db cached inside cache", id);
                return await getUserDb(id);
        }, ["user_db", `user_db:${id}`], { tags: ["user_db", `user_db:${id}`] })(id);
};

export const revalidateUserTags = async (...tags: string[]) => {
        tags.forEach((tag) => revalidateTag(tag));
};

