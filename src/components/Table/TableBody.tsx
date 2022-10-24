import { ReactElement } from 'react';

import TableLine from './TableLine';

const TableBody = ({ data }: ITableBody): ReactElement => {
  return (
    <>
      {data.map((line: Array<any>, index) => (
        <TableLine line={line} index={index} />
      ))}
    </>
  );
};

export default TableBody;
