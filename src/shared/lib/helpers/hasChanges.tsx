export function hasChanges<T extends object | string | number | null | undefined>(obj1: T, obj2: T): boolean {
	if (typeof obj1 !== "object" || typeof obj2 !== "object" || obj1 === null || obj2 === null) {
		return obj1 !== obj2;
	}

	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);

	if (keys1.length !== keys2.length) {
		return true;
	}

	for (const key of keys1) {
		if (!(key in obj1)) {
			return true;
		}

		// @ts-ignore
		if (hasChanges(obj1[key], obj2[key])) {
			return true;
		}
	}

	return false;
}
