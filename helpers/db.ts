import * as SQLiteAPI from "expo-sqlite";

const db = SQLiteAPI.openDatabase("places.db");

export const init = () => {
	const promise = new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`CREATE TABLE IF NOT EXISTS places (
                    id INTEGER PRIMARY KEY NOT NULL AUTOINCREMENT,
                    title TEXT NOT NULL,
                    imageUri TEXT NOT NULL,
                    address TEXT NOT NULL,
                    lat REAL NOT NULL,
                    lng REAL NOT NULL
                );`,
				[],
				() => {
					resolve("DB init success");
				}, // @ts-ignore
				(_, err) => {
					reject(err);
				}
			);
		});
	});

	return promise;
};

export const insertPlace = (
	title: string,
	imageUri: string,
	address: string,
	lat: number,
	lng: number
) => {
	const promise = new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`INSERT INTO places (title, imageUri, address, lat, lng) 
                VALUES (?,?,?,?,?);`,
				[title, imageUri, address, lat, lng],
				(_, result) => {
					resolve(result);
				}, // @ts-ignore
				(_, err) => {
					reject(err);
				}
			);
		});
	});

	return promise;
};
