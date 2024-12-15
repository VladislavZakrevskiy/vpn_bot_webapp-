export type RateCreateInput = {
	id?: string;
	name: string;
	description: string;
	price: number;
	price_XTR: number;
	GB_limit: number;
	max_devices: number;
	MB_speed: number;
	expiresIn: number;
};
