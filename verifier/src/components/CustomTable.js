
import * as React from 'react';
import { Table } from '@material-ui/core';
import { TableBody } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import { TableContainer } from '@material-ui/core';
import { TableHead } from '@material-ui/core';
import { TableRow } from '@material-ui/core';
import { Paper } from '@material-ui/core';
export default function CustomTable() {
    var dict = {
        id: 1,
        till: 23,
        locations: "Concourse",
        release: "kali",
        version:"ubuntu",
        os: "linux",
        memory:"8gb"
      };
function createData(id, till, locations, release, version, os, memory) {
        return {id,till,locations,release,version,os,memory};
      }
      
const rows = [
        createData( "1", dict.till,dict.locations,dict.release,dict.version,dict.os,dict.memory),
      ];
  return <div>
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell align="right">till</TableCell>
            <TableCell align="right">locations</TableCell>
            <TableCell align="right">release</TableCell>
            <TableCell align="right">version</TableCell>
            <TableCell align="right">os</TableCell>
            <TableCell align="right">memory</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.till}</TableCell>
              <TableCell align="right">{row.locations}</TableCell>
              <TableCell align="right">{row.release}</TableCell>
              <TableCell align="right">{row.version}</TableCell>
              <TableCell align="right">{row.os}</TableCell>
              <TableCell align="right">{row.memory}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>;
}
