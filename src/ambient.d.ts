 interface IData {
    doc: {
      updatedAt: string;
      _id: string;
      data: IEvent[]
    }
  }
  
 interface IFight {
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
  
 interface IEvent {
      date: string;
      title: string;
      fights: IFight[];
  }