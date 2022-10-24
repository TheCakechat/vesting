interface IVestingTable {
  address?: string;
  tge: number;
  duration: number;
}

interface IModal {
  visibility: boolean;
  index: number;
}

interface ITableLine {
  line: Array<any>;
  index: number;
}

interface ITableBody {
  data: Array<Array<any>>;
}
