import React from 'react';
import { useTable, Column } from 'react-table';

interface Doctor {
  id: string;
  lastname: string;
  name: string;
  speciality: string;
}

interface Paciente {
  cel: string;
  id: number;
  insurance: string;
  lastname: string;
  name: string;
}

interface Cita {
  Doctor: Doctor;
  Paciente: Paciente;
  doctorId: string;
  fecha: string;
  hora: string;
  id: string;
}

interface DoctorAppointmentsTableProps {
  appointments: Cita[];
}

const DoctorAppointmentsTable: React.FC<DoctorAppointmentsTableProps> = ({ appointments }) => {
    const columns: Column<Cita>[] = React.useMemo(
        () => [
          {
            Header: 'Fecha',
            accessor: 'fecha',
          },
          {
            Header: 'Hora',
            accessor: 'hora',
          },
          {
            Header: 'Paciente',
            accessor: (row: Cita) => row.Paciente.name + " " +row.Paciente.lastname,
          },
          {
            Header: 'Mutual',
            accessor: (row: Cita) => row.Paciente.insurance,
          },
        ],
        []
      );

      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable(
        {
          columns,
          data: appointments,
        }
      );
    
    
  return (
    <div className="flex m-auto justify-center items-center h-full w-[50%]">
    {rows.length === 0 ? (
      <p className="text-center text-white font-semibold text-2xl">No hay turnos para este doctor el día de hoy.</p>
    ) : (
      <table {...getTableProps()} className="border-collapse w-full">
        <thead className="sticky top-0 rounded-md">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className= "py-2 px-4 bg-white border border-black text-black font-medium uppercase text-sm"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, index) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className={`bg-white whitespace-nowrap border border-black py-2 px-4 border-b  text-sm ${
                        index !== row.cells.length - 1 ? "border-r" : ""
                      }`}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    )}
  </div>

  );
};

export default DoctorAppointmentsTable;
