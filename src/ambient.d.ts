interface IFighter {
	name: string;
	record: string;
	country: string;
	picture: string;
	link: string;
}

interface IFight {
	main: boolean;
	weight: string;
	fighterA: IFighter;
	fighterB: IFighter;
}

interface IEvent {
	title: string;
	date: string;
	link: string;
	fights: IFight[];
}

interface IData {
	_id: string;
	data: IEvent[];
}
