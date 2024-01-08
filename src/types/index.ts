export interface IFight {
    main: boolean;
    fighterA: {
      name: string;
      link: string;
    };
    fighterB: {
      name: string;
      link: string;
    };
}

export interface IEvent {
    date: string;
    title: string;
    fights: IFight[];
}